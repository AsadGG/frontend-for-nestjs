import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { CreateTaskDTO, Task } from "src/app/interface/task.interface";
import { TasksService } from "../../services/tasks.services";

@Component({
  selector: "app-create-task",
  templateUrl: "./create-task.component.html",
  styleUrls: ["./create-task.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTaskComponent implements OnInit {
  createTaskForm = new FormGroup({
    title: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
  });
  constructor(
    private readonly tasksService: TasksService,
    private readonly router: Router,
    private readonly ngxSpinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  onCreateTask() {
    const createTaskDTO: CreateTaskDTO = this.createTaskForm.value;
    this.createTask(createTaskDTO);
  }

  createTask(createTaskDTO: CreateTaskDTO) {
    this.ngxSpinnerService.show();
    const handleCreateTaskResponse = (response: Task) => {
      this.ngxSpinnerService.hide();

      console.log("response", response);
      this.router.navigateByUrl("/tasks");
    };
    const handleCreateTaskError = (error: any) => {
      this.ngxSpinnerService.hide();

      console.debug("error", error);
    };
    this.tasksService.createTask(createTaskDTO).subscribe({
      next: handleCreateTaskResponse,
      error: handleCreateTaskError,
    });
  }
}
