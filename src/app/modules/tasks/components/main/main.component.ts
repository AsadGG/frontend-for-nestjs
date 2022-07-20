import { HttpClient } from "@angular/common/http";
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
} from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { BehaviorSubject, debounceTime, distinctUntilChanged } from "rxjs";
import { Task } from "src/app/interface/task.interface";
import { SubSink } from "subsink";
import { TasksService } from "../../services/tasks.services";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit, OnDestroy {
  search: string = "";
  searchChanged: BehaviorSubject<string> = new BehaviorSubject<string>("");
  status: string = "";
  statusChanged: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private subscriptions = new SubSink();
  tasks: Task[] = [];
  constructor(
    private readonly tasksService: TasksService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly ngxSpinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.subscriptions.sink = this.searchChanged
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((search) => {
        this.search = search;
        this.getAllTasks(this.search, this.status);
      });
    this.subscriptions.sink = this.statusChanged
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((status) => {
        this.status = status;
        this.getAllTasks(this.search, this.status);
      });
    this.getAllTasks();
  }

  getAllTasks(search?: string, status?: string) {
    this.ngxSpinnerService.show();
    const handleGetAllTasksResponse = (response: Task[]) => {
      this.ngxSpinnerService.hide();
      console.log("response", response);
      this.tasks = response;
      this.changeDetectorRef.markForCheck();
    };
    const handleGetAllTasksError = (error: any) => {
      this.ngxSpinnerService.hide();
      console.debug("error", error);
    };
    this.tasksService.getAllTasks(search, status).subscribe({
      next: handleGetAllTasksResponse,
      error: handleGetAllTasksError,
    });
  }

  searchChangedHandler(search: string) {
    this.searchChanged.next(search);
  }
  statusChangedHandler(status: string) {
    this.statusChanged.next(status);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
