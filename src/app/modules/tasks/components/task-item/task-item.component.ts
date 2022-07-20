import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { Task, TaskStatus } from "src/app/interface/task.interface";

@Component({
  selector: "app-task-item",
  templateUrl: "./task-item.component.html",
  styleUrls: ["./task-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItemComponent implements OnInit {
  @Input() task!: Task;
  @Output() onDeleteTask = new EventEmitter();
  @Output() onTaskStatusChange = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  deleteTask() {
    this.onDeleteTask.emit();
  }

  statusChange(status: TaskStatus) {
    this.onTaskStatusChange.emit(status);
  }
}
