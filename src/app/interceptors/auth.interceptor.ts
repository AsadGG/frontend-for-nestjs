import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserService } from "../services/user.service";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly userService: UserService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const modifiedRequest = this.attachHeaders(req);
    return next
      .handle(modifiedRequest)
      .pipe(catchError((error) => this.handleAuthError(error)));
  }

  handleAuthError(error: HttpErrorResponse): Observable<never> {
    console.log("handleAuthError error", error);
    if (error.status === 401) {
      this.userService.logout();
    }
    return throwError(() => new Error(error.error.message));
  }

  attachHeaders(request: HttpRequest<any>): HttpRequest<any> {
    const accessToken = this.userService.auth;
    console.log("accessToken", accessToken);
    if (accessToken) {
      request = request.clone({
        headers: request.headers.set("Authorization", "Bearer " + accessToken),
      });
    }

    if (!request.headers.has("Content-Type")) {
      request = request.clone({
        headers: request.headers.set("Content-Type", "application/json"),
      });
    }

    return request.clone(request);
  }
}
