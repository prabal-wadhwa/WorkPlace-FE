import { apiRequest } from "./client";

// 📌 Get all tasks (HomePage + TaskBoard)
export const getTasksApi = () =>
  apiRequest({
    endpoint: "/tasks",
  });

// ➕ Add task (AddTask screen)
export const addTaskApi = (payload) =>
  apiRequest({
    endpoint: "/tasks/add-task",
    method: "POST",
    body: payload,
  });

// ✏️ Update full task (Edit)
export const updateTaskApi = (id, payload) =>
  apiRequest({
    endpoint: `/tasks/update/${id}`,
    method: "PUT",
    body: payload,
  });

// 🔄 Update status (TaskBoard drag + HomePage toggle)
export const updateTaskStatusApi = (id, status) =>
  apiRequest({
    endpoint: `/tasks/mark-as-done/${id}`,
    method: "PUT",
    body: { status },
  });

// ❌ Delete single task
export const deleteTaskApi = (id) =>
  apiRequest({
    endpoint: `/tasks/delete/${id}`,
    method: "DELETE",
  });

// ❌ Bulk delete (HomePage select mode)
export const deleteMultipleTasksApi = async (ids = []) => {
  return Promise.all(ids.map((id) => deleteTaskApi(id)));
};