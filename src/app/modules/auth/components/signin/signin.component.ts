import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthCredentialsDTO } from "src/app/interface/auth.interface";
import { UserService } from "src/app/services";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninComponent implements OnInit {
  signinForm = new FormGroup({
    username: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(32),
      Validators.pattern(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
      ),
    ]),
  });
  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {}

  onSignin() {
    const authCredentialsDTO: AuthCredentialsDTO = this.signinForm.value;
    this.userService.onSignin(authCredentialsDTO);
  }
}
