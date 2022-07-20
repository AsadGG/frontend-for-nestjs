import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateTaskComponent } from "./components/create-task/create-task.component";
import { MainComponent } from "./components/main/main.component";
import { TasksComponent } from "./tasks.component";

const routes: Routes = [
  {
    path: "",
    component: TasksComponent,
    children: [
      {
        path: "",
        component: MainComponent,
      },
      {
        path: "create",
        component: CreateTaskComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
