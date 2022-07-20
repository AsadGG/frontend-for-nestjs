import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
} from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import {
  DeleteTaskByIdResponse,
  Task,
  TaskStatus,
} from "src/app/interface/task.interface";
import { TasksService } from "../../services/tasks.services";

@Component({
  selector: "app-tasks-list",
  templateUrl: "./tasks-list.component.html",
  styleUrls: ["./tasks-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksListComponent implements OnInit {
  @Input() tasks: Task[] = [];
  constructor(
    private readonly tasksService: TasksService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly ngxSpinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  deleteTaskById(id: string) {
    this.ngxSpinnerService.show();
    const handleDeleteTaskByIdResponse = (response: DeleteTaskByIdResponse) => {
      this.ngxSpinnerService.hide();
      console.log("response", response);
      if (response.affected) {
        this.tasks = this.tasks.filter((task) => task.id !== id);
        this.changeDetectorRef.markForCheck();
      }
    };
    const handleDeleteTaskByIdError = (error: any) => {
      this.ngxSpinnerService.hide();
      console.log("error", error);
    };
    this.tasksService.deleteTaskById(id).subscribe({
      next: handleDeleteTaskByIdResponse,
      error: handleDeleteTaskByIdError,
    });
  }

  taskStatusChangeById(id: string, status: TaskStatus) {
    const updateTaskStatusDTO = { status };
    this.ngxSpinnerService.show();
    const handleTaskStatusChangeByIdResponse = (response: Task) => {
      this.ngxSpinnerService.hide();
      console.log("response", response);
    };
    const handleTaskStatusChangeByIdError = (error: any) => {
      this.ngxSpinnerService.hide();
      console.log("error", error);
    };
    this.tasksService.updateTaskStatusById(id, updateTaskStatusDTO).subscribe({
      next: handleTaskStatusChangeByIdResponse,
      error: handleTaskStatusChangeByIdError,
    });
  }
}
