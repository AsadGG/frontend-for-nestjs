import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthCredentialsDTO } from "src/app/interface/auth.interface";
import { UserService } from "src/app/services";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
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

  onSignup() {
    const authCredentialsDTO: AuthCredentialsDTO = this.signupForm.value;
    this.userService.onSignup(authCredentialsDTO);
  }
}
