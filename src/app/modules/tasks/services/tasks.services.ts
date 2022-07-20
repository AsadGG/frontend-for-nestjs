import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  CreateTaskDTO,
  DeleteTaskByIdResponse,
  Task,
  UpdateTaskStatusDTO,
} from "src/app/interface/task.interface";
import { API_PATHS } from "src/environments/api-paths";

@Injectable()
export class TasksService {
  constructor(private readonly httpClient: HttpClient) {}
  createTask(createTaskDTO: CreateTaskDTO): Observable<Task> {
    return this.httpClient.post<Task>(API_PATHS.createNewTask, createTaskDTO);
  }
  getAllTasks(search?: string, status?: string): Observable<Task[]> {
    return this.httpClient.get<Task[]>(API_PATHS.getAllTasks(search, status));
  }

  deleteTaskById(id: string): Observable<DeleteTaskByIdResponse> {
    return this.httpClient.delete<DeleteTaskByIdResponse>(
      API_PATHS.deleteTaskById(id)
    );
  }

  updateTaskStatusById(
    id: string,
    updateTaskStatusDTO: UpdateTaskStatusDTO
  ): Observable<Task> {
    return this.httpClient.patch<Task>(
      API_PATHS.updateTasksStatusById(id),
      updateTaskStatusDTO
    );
  }
}
