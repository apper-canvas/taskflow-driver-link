import tasksData from '../mockData/tasks.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class TaskService {
  constructor() {
    this.tasks = [...tasksData];
  }

  async getAll() {
    await delay(300);
    return [...this.tasks];
  }

  async getById(id) {
    await delay(200);
    const task = this.tasks.find(t => t.id === id);
    if (!task) {
      throw new Error('Task not found');
    }
    return { ...task };
  }

  async create(taskData) {
    await delay(400);
    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      createdAt: new Date().toISOString(),
      completedAt: null,
      archived: false
    };
    this.tasks.unshift(newTask);
    return { ...newTask };
  }

  async update(id, taskData) {
    await delay(300);
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Task not found');
    }
    
    this.tasks[index] = { ...this.tasks[index], ...taskData };
    return { ...this.tasks[index] };
  }

  async delete(id) {
    await delay(250);
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Task not found');
    }
    
    this.tasks.splice(index, 1);
    return true;
  }

  async getByList(listId) {
    await delay(300);
    return this.tasks.filter(task => task.listId === listId);
  }

  async getByDateRange(startDate, endDate) {
    await delay(300);
    return this.tasks.filter(task => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      return taskDate >= startDate && taskDate <= endDate;
    });
  }

  async getCompleted() {
    await delay(300);
    return this.tasks.filter(task => task.completed);
  }

  async getArchived() {
    await delay(300);
    return this.tasks.filter(task => task.archived);
  }
}

export const taskService = new TaskService();