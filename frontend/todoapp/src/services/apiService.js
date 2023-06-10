import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000/api/v1";

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

export const createTask = async (title) => {
  try {
    const response = await apiService.post('/tasks', { title });
    return response;
  } catch (error) {
    console.log(error);
    throw new Error('Error while adding task');
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await apiService.delete(`/tasks/${id}`);
    return response;
  } catch (error) {
    console.log(error);
    throw new Error('Error while deleting task');
  }
};

export const getTasks = async () => {
  try {
    const response = await apiService.get('/tasks');
    return response;
  } catch (error) {
    console.log(error);
    throw new Error('Error while fetching tasks');
  }
};

export const uncheckTask = async (id) => {
  try {
    const response = await apiService.patch(`/tasks/${id}/uncheck`);
    return response;
  } catch (error) {
    console.log(error);
    throw new Error('Error while updating task');
  }
};

export const checkTask = async (id) => {
  try {
    const response = await apiService.patch(`/tasks/${id}/check`);
    return response;
  } catch (error) {
    console.log(error);
    throw new Error('Error while updating task');
  }
};
