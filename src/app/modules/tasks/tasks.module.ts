import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TasksRoutingModule } from "./tasks-routing.module";
import { TasksComponent } from "./tasks.component";
import { MainComponent } from "./components/main/main.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TasksService } from "./services/tasks.services";
import { CreateTaskComponent } from "./components/create-task/create-task.component";
import { TasksListComponent } from "./components/tasks-list/tasks-list.component";
import { TaskItemComponent } from "./components/task-item/task-item.component";

@NgModule({
  declarations: [
    TasksComponent,
    MainComponent,
    CreateTaskComponent,
    TasksListComponent,
    TaskItemComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TasksRoutingModule],
  providers: [TasksService],
})
export class TasksModule {}
