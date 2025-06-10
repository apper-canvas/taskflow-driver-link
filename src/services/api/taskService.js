import { toast } from 'react-toastify';

class TaskService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'task';
    
    // All fields for fetch operations
    this.allFields = [
      'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy',
      'title', 'description', 'priority', 'due_date', 'completed', 'list_id', 'archived', 'created_at', 'completed_at'
    ];
    
    // Only updateable fields for create/update operations
    this.updateableFields = [
      'Name', 'Tags', 'Owner', 'title', 'description', 'priority', 'due_date', 'completed', 'list_id', 'archived', 'created_at', 'completed_at'
    ];
  }

  async getAll() {
    try {
      const params = {
        fields: this.allFields,
        orderBy: [
          {
            fieldName: "created_at",
            SortType: "DESC"
          }
        ]
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to load tasks");
      return [];
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: this.allFields
      };
      
      const response = await this.apperClient.getRecordById(this.tableName, id, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching task with ID ${id}:`, error);
      toast.error("Failed to load task");
      return null;
    }
  }

  async create(taskData) {
    try {
      // Filter to only include updateable fields
      const filteredData = {};
      this.updateableFields.forEach(field => {
        if (taskData.hasOwnProperty(field)) {
          filteredData[field] = taskData[field];
        }
      });
      
      // Set defaults for required fields
      if (!filteredData.created_at) {
        filteredData.created_at = new Date().toISOString();
      }
      if (!filteredData.hasOwnProperty('completed')) {
        filteredData.completed = false;
      }
      if (!filteredData.hasOwnProperty('archived')) {
        filteredData.archived = false;
      }
      
      const params = {
        records: [filteredData]
      };
      
      const response = await this.apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${failedRecords}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          toast.success('Task created successfully!');
          return successfulRecords[0].data;
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task");
      return null;
    }
  }

  async update(id, taskData) {
    try {
      // Filter to only include updateable fields
      const filteredData = { Id: parseInt(id) };
      this.updateableFields.forEach(field => {
        if (taskData.hasOwnProperty(field)) {
          filteredData[field] = taskData[field];
        }
      });
      
      const params = {
        records: [filteredData]
      };
      
      const response = await this.apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${failedUpdates}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulUpdates.length > 0) {
          toast.success('Task updated successfully!');
          return successfulUpdates[0].data;
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task");
      return null;
    }
  }

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const response = await this.apperClient.deleteRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${failedDeletions}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulDeletions.length > 0) {
          toast.success('Task deleted successfully!');
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
      return false;
    }
  }

  async getByList(listId) {
    try {
      const params = {
        fields: this.allFields,
        where: [
          {
            fieldName: "list_id",
            operator: "ExactMatch",
            values: [listId]
          }
        ],
        orderBy: [
          {
            fieldName: "created_at",
            SortType: "DESC"
          }
        ]
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching tasks by list:", error);
      return [];
    }
  }

  async getByDateRange(startDate, endDate) {
    try {
      const params = {
        fields: this.allFields,
        where: [
          {
            fieldName: "due_date",
            operator: "GreaterThanOrEqualTo",
            values: [startDate.toISOString().split('T')[0]]
          },
          {
            fieldName: "due_date",
            operator: "LessThanOrEqualTo",
            values: [endDate.toISOString().split('T')[0]]
          }
        ],
        orderBy: [
          {
            fieldName: "due_date",
            SortType: "ASC"
          }
        ]
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching tasks by date range:", error);
      return [];
    }
  }

  async getCompleted() {
    try {
      const params = {
        fields: this.allFields,
        where: [
          {
            fieldName: "completed",
            operator: "ExactMatch",
            values: [true]
          }
        ],
        orderBy: [
          {
            fieldName: "completed_at",
            SortType: "DESC"
          }
        ]
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching completed tasks:", error);
      return [];
    }
  }

  async getArchived() {
    try {
      const params = {
        fields: this.allFields,
        where: [
          {
            fieldName: "archived",
            operator: "ExactMatch",
            values: [true]
          }
        ],
        orderBy: [
          {
            fieldName: "created_at",
            SortType: "DESC"
          }
        ]
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching archived tasks:", error);
      return [];
    }
  }
}

export const taskService = new TaskService();