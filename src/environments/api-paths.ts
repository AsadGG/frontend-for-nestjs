import { environment } from "./environment";
export const API_PATHS = {
  //Auth
  signin: `${environment.baseUrl}/auth/signin`,
  signup: `${environment.baseUrl}/auth/signup`,

  //Tasks
  createNewTask: `${environment.baseUrl}/tasks`,
  getTaskById: (id: string) => `${environment.baseUrl}/tasks/${id}`,
  deleteTaskById: (id: string) => `${environment.baseUrl}/tasks/${id}`,
  updateTasksStatusById: (id: string) =>
    `${environment.baseUrl}/tasks/${id}/status`,
  getAllTasks: (search?: string, status?: string) => {
    let api = `${environment.baseUrl}/tasks`;
    let first = false;
    if (search || status) {
      api += `?`;
    }
    if (search) {
      api += `search=${search}`;
      first = true;
    }
    if (status) {
      api += first ? `&status=${status}` : `status=${status}`;
    }
    return api;
  },
} as const;
