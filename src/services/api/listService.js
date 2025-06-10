import listsData from '../mockData/lists.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ListService {
  constructor() {
    this.lists = [...listsData];
  }

  async getAll() {
    await delay(200);
    return [...this.lists];
  }

  async getById(id) {
    await delay(150);
    const list = this.lists.find(l => l.id === id);
    if (!list) {
      throw new Error('List not found');
    }
    return { ...list };
  }

  async create(listData) {
    await delay(300);
    const newList = {
      id: Date.now().toString(),
      ...listData,
      sortOrder: this.lists.length
    };
    this.lists.push(newList);
    return { ...newList };
  }

  async update(id, listData) {
    await delay(250);
    const index = this.lists.findIndex(l => l.id === id);
    if (index === -1) {
      throw new Error('List not found');
    }
    
    this.lists[index] = { ...this.lists[index], ...listData };
    return { ...this.lists[index] };
  }

  async delete(id) {
    await delay(200);
    const index = this.lists.findIndex(l => l.id === id);
    if (index === -1) {
      throw new Error('List not found');
    }
    
    this.lists.splice(index, 1);
    return true;
  }
}

export const listService = new ListService();