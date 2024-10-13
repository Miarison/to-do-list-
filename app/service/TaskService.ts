
import { Task } from '../interface/Todo';

const apiUrl = 'http://192.168.1.135:3000/tasks'; 

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch(apiUrl,{
      method: 'GET',
      headers :{
        'content-type': 'application/json',
      }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json(); 
};

export const addTask = async (task: Task): Promise<Task> => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error('Échec de l\'ajout de la tâche');
  }
  return response.json(); 
};

export const updateTask = async (taskId: number, completed: boolean): Promise<void> => {
 console.log('id task a modifier ', taskId);
  const response = await fetch(`${apiUrl}/${taskId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ completed }),
  });
  if (!response.ok) {
    throw new Error('Échec de marquer une tâche comme terminée');
  }
};

export const deleteTask = async (taskId: number): Promise<void> => {
  const response = await fetch(`${apiUrl}/${taskId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('La suppression de la tâche a échoué');
  }
};
