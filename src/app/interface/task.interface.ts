export interface CreateTaskDTO {
  title: string;
  description: string;
}
export interface Task {
  title: string;
  description: string;
  status: TaskStatus;
  id: string;
}

export enum TaskStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}
export interface DeleteTaskByIdResponse {
  raw: any[];
  affected: number;
}

export interface UpdateTaskStatusDTO {
  status: TaskStatus;
}
