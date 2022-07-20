import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <ngx-spinner type="ball-scale-multiple"></ngx-spinner>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  title = "frontend-for-nestjs";
}
