import { environment } from './environment';
export const API_PATHS = {
  //Auth
  signin: `${environment.baseUrl}/api/auth/signin`,
  signup: `${environment.baseUrl}/api/auth/signup`,

  //Tasks
  createNewTask: `${environment.baseUrl}/api/tasks`,
  getTaskById: (id: string) => `${environment.baseUrl}/api/tasks/${id}`,
  deleteTaskById: (id: string) => `${environment.baseUrl}/api/tasks/${id}`,
  updateTasksStatusById: (id: string) =>
    `${environment.baseUrl}/api/tasks/${id}/status`,
  getAllTasks: (search?: string, status?: string) => {
    let api = `${environment.baseUrl}/api/tasks`;
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
