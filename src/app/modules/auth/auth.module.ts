import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./auth.component";
import { SigninComponent } from "./components/signin/signin.component";
import { SignupComponent } from "./components/signup/signup.component";

@NgModule({
  declarations: [AuthComponent, SigninComponent, SignupComponent],
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule],
  providers: [],
})
export class AuthModule {}
