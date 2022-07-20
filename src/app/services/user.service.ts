import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { API_PATHS } from "src/environments/api-paths";
import { AuthCredentialsDTO } from "../interface/auth.interface";

@Injectable({ providedIn: "root" })
export class UserService {
  private accessToken: string | null = null;
  get auth() {
    return this.accessToken;
  }
  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router,
    private readonly ngxSpinnerService: NgxSpinnerService
  ) {
    this.initialize();
  }

  onSignin(authCredentialsDTO: AuthCredentialsDTO) {
    this.ngxSpinnerService.show();
    const handleSigninResponse = (response: any) => {
      this.ngxSpinnerService.hide();
      this.setAccessToken(response.accessToken);
      console.log("response", response);
      this.router.navigateByUrl("/tasks");
    };
    const handleSigninError = (error: any) => {
      this.ngxSpinnerService.hide();
      console.log("error", error);
    };
    return this.httpClient
      .post(API_PATHS.signin, authCredentialsDTO)
      .subscribe({ next: handleSigninResponse, error: handleSigninError });
  }

  onSignup(authCredentialsDTO: AuthCredentialsDTO) {
    this.ngxSpinnerService.show();
    const handleSignupResponse = (response: any) => {
      this.ngxSpinnerService.hide();
      console.log("response", response);
      this.router.navigateByUrl("/auth/signin");
    };
    const handleSignupError = (error: any) => {
      this.ngxSpinnerService.hide();
      console.log("error", error);
    };
    return this.httpClient
      .post(API_PATHS.signup, authCredentialsDTO)
      .subscribe({
        next: handleSignupResponse,
        error: handleSignupError,
      });
  }

  initialize() {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (accessToken) {
      this.accessToken = accessToken;
      return;
    }
    this.accessToken = null;
  }

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
    localStorage.setItem("ACCESS_TOKEN", this.accessToken);
  }

  removeAccessToken() {
    this.accessToken = null;
    localStorage.removeItem("ACCESS_TOKEN");
  }

  logout() {
    this.removeAccessToken();
    this.router.navigateByUrl("/auth/signin");
  }
}
