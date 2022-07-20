import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards";

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () =>
      import("./modules/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    canLoad: [AuthGuard],
    path: "tasks",
    loadChildren: () =>
      import("./modules/tasks/tasks.module").then((m) => m.TasksModule),
  },
  {
    path: "",
    redirectTo: "tasks",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
