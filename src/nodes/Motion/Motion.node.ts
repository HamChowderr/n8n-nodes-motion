import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
  IHttpRequestOptions,
  IHttpRequestMethods,
  NodeConnectionType,
} from "n8n-workflow";

export class Motion implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Motion',
    name: 'motion',
    icon: 'file:motion.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Consume Motion API',
    defaults: {
      name: 'Motion',
    },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],
    credentials: [
      {
        name: 'motionApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Workspace',
            value: 'workspace',
          },
          {
            name: 'Task',
            value: 'task',
          },
        ],
        default: 'workspace',
      },
      // Workspace Operations
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: [
              'workspace',
            ],
          },
        },
        options: [
          {
            name: 'Get All',
            value: 'getAll',
            description: 'Get a list of all workspaces',
            action: 'Get all workspaces',
          },
        ],
        default: 'getAll',
      },
      // Workspace: Get All operation options
      {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
          show: {
            resource: [
              'workspace',
            ],
            operation: [
              'getAll',
            ],
          },
        },
        options: [
          {
            displayName: 'Cursor',
            name: 'cursor',
            type: 'string',
            default: '',
            description: 'Cursor for pagination. Use if a previous request returned a cursor.',
          },
          {
            displayName: 'IDs',
            name: 'ids',
            type: 'string',
            default: '',
            description: 'Comma-separated list of workspace IDs to retrieve. If not provided, all workspaces will be returned.',
          },
        ],
      },
      // Task Operations
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: [
              'task',
            ],
          },
        },
        options: [
          {
            name: 'Create',
            value: 'create',
            description: 'Create a task',
            action: 'Create a task',
          },
          {
            name: 'Get',
            value: 'get',
            description: 'Get a task',
            action: 'Get a task',
          },
          {
            name: 'Get All',
            value: 'getAll',
            description: 'Get all tasks',
            action: 'Get all tasks',
          },
          {
            name: 'Update',
            value: 'update',
            description: 'Update a task',
            action: 'Update a task',
          },
          {
            name: 'Delete',
            value: 'delete',
            description: 'Delete a task',
            action: 'Delete a task',
          },
        ],
        default: 'create',
      },
      // Task: Create operation
      {
        displayName: 'Workspace ID',
        name: 'workspaceId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
          show: {
            resource: [
              'task',
            ],
            operation: [
              'create',
            ],
          },
        },
        description: 'The ID of the workspace to create the task in',
      },
      {
        displayName: 'Title',
        name: 'title',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
          show: {
            resource: [
              'task',
            ],
            operation: [
              'create',
            ],
          },
        },
        description: 'The title of the task',
      },
      {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
          show: {
            resource: [
              'task',
            ],
            operation: [
              'create',
            ],
          },
        },
        options: [
          {
            displayName: 'Description',
            name: 'description',
            type: 'string',
            default: '',
            description: 'The description of the task',
          },
          {
            displayName: 'Project ID',
            name: 'projectId',
            type: 'string',
            default: '',
            description: 'The ID of the project to assign the task to',
          },
          {
            displayName: 'Assignee ID',
            name: 'assigneeId',
            type: 'string',
            default: '',
            description: 'The ID of the user to assign the task to',
          },
          {
            displayName: 'Due Date',
            name: 'dueDate',
            type: 'dateTime',
            default: '',
            description: 'The due date of the task',
          },
          {
            displayName: 'Priority',
            name: 'priority',
            type: 'options',
            options: [
              {
                name: 'Low',
                value: 'low',
              },
              {
                name: 'Medium',
                value: 'medium',
              },
              {
                name: 'High',
                value: 'high',
              },
              {
                name: 'Urgent',
                value: 'urgent',
              },
            ],
            default: 'medium',
            description: 'The priority of the task',
          },
        ],
      },
      // Task: Get operation
      {
        displayName: 'Task ID',
        name: 'taskId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
          show: {
            resource: [
              'task',
            ],
            operation: [
              'get',
              'delete',
              'update',
            ],
          },
        },
        description: 'The ID of the task',
      },
      // Task: Update operation
      {
        displayName: 'Update Fields',
        name: 'updateFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
          show: {
            resource: [
              'task',
            ],
            operation: [
              'update',
            ],
          },
        },
        options: [
          {
            displayName: 'Title',
            name: 'title',
            type: 'string',
            default: '',
            description: 'The title of the task',
          },
          {
            displayName: 'Description',
            name: 'description',
            type: 'string',
            default: '',
            description: 'The description of the task',
          },
          {
            displayName: 'Project ID',
            name: 'projectId',
            type: 'string',
            default: '',
            description: 'The ID of the project to assign the task to',
          },
          {
            displayName: 'Assignee ID',
            name: 'assigneeId',
            type: 'string',
            default: '',
            description: 'The ID of the user to assign the task to',
          },
          {
            displayName: 'Due Date',
            name: 'dueDate',
            type: 'dateTime',
            default: '',
            description: 'The due date of the task',
          },
          {
            displayName: 'Status',
            name: 'status',
            type: 'options',
            options: [
              {
                name: 'To Do',
                value: 'todo',
              },
              {
                name: 'In Progress',
                value: 'in_progress',
              },
              {
                name: 'Done',
                value: 'done',
              },
            ],
            default: 'todo',
            description: 'The status of the task',
          },
          {
            displayName: 'Priority',
            name: 'priority',
            type: 'options',
            options: [
              {
                name: 'Low',
                value: 'low',
              },
              {
                name: 'Medium',
                value: 'medium',
              },
              {
                name: 'High',
                value: 'high',
              },
              {
                name: 'Urgent',
                value: 'urgent',
              },
            ],
            default: 'medium',
            description: 'The priority of the task',
          },
        ],
      },
      // Task: Get All operation
      {
        displayName: 'Workspace ID',
        name: 'workspaceId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
          show: {
            resource: [
              'task',
            ],
            operation: [
              'getAll',
            ],
          },
        },
        description: 'The ID of the workspace to get tasks from',
      },
      {
        displayName: 'Return All',
        name: 'returnAll',
        type: 'boolean',
        displayOptions: {
          show: {
            resource: [
              'task',
            ],
            operation: [
              'getAll',
            ],
          },
        },
        default: false,
        description: 'Whether to return all results or only up to a given limit',
      },
      {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        displayOptions: {
          show: {
            resource: [
              'task',
            ],
            operation: [
              'getAll',
            ],
            returnAll: [
              false,
            ],
          },
        },
        typeOptions: {
          minValue: 1,
          maxValue: 100,
        },
        default: 50,
        description: 'Max number of results to return',
      },
      {
        displayName: 'Filters',
        name: 'filters',
        type: 'collection',
        placeholder: 'Add Filter',
        default: {},
        displayOptions: {
          show: {
            resource: [
              'task',
            ],
            operation: [
              'getAll',
            ],
          },
        },
        options: [
          {
            displayName: 'Project ID',
            name: 'projectId',
            type: 'string',
            default: '',
            description: 'Filter tasks by project ID',
          },
          {
            displayName: 'Status',
            name: 'status',
            type: 'options',
            options: [
              {
                name: 'To Do',
                value: 'todo',
              },
              {
                name: 'In Progress',
                value: 'in_progress',
              },
              {
                name: 'Done',
                value: 'done',
              },
            ],
            default: 'todo',
            description: 'Filter tasks by status',
          },
          {
            displayName: 'Assignee ID',
            name: 'assigneeId',
            type: 'string',
            default: '',
            description: 'Filter tasks by assignee ID',
          },
        ],
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];
    
    const resource = this.getNodeParameter('resource', 0) as string;
    const operation = this.getNodeParameter('operation', 0) as string;
    
    let responseData;
    
    const credentials = await this.getCredentials('motionApi') as {
      apiKey: string;
    };
    
    // Base API URL for Motion
    const baseUrl = 'https://api.usemotion.com/v1';
    
    for (let i = 0; i < items.length; i++) {
      try {
        // ----------------------------------------
        //          workspace operations
        // ----------------------------------------
        if (resource === 'workspace') {
          // **********************************************
          //             workspace:getAll
          // **********************************************
          if (operation === 'getAll') {
            const additionalFields = this.getNodeParameter('additionalFields', i) as {
              cursor?: string;
              ids?: string;
            };
            
            const qs: Record<string, any> = {};
            
            if (additionalFields.cursor) {
              qs.cursor = additionalFields.cursor;
            }
            
            if (additionalFields.ids) {
              // Convert comma-separated string to array
              qs.ids = additionalFields.ids.split(',').map(id => id.trim());
            }
            
            const options: IHttpRequestOptions = {
              method: 'GET' as IHttpRequestMethods,
              url: `${baseUrl}/workspaces`,
              headers: {
                'X-API-Key': credentials.apiKey,
              },
              qs,
              json: true,
            };
            
            responseData = await this.helpers.httpRequest(options);
          }
        }
        
        // ----------------------------------------
        //             task operations
        // ----------------------------------------
        else if (resource === 'task') {
          // **********************************************
          //                task:create
          // **********************************************
          if (operation === 'create') {
            const workspaceId = this.getNodeParameter('workspaceId', i) as string;
            
            const title = this.getNodeParameter('title', i) as string;
            const additionalFields = this.getNodeParameter('additionalFields', i) as {
              description?: string;
              projectId?: string;
              assigneeId?: string;
              dueDate?: string;
              priority?: string;
            };
            
            const data: Record<string, any> = {
              title,
              workspace_id: workspaceId,
            };
            
            if (additionalFields.description) {
              data.description = additionalFields.description;
            }
            
            if (additionalFields.projectId) {
              data.project_id = additionalFields.projectId;
            }
            
            if (additionalFields.assigneeId) {
              data.assignee_id = additionalFields.assigneeId;
            }
            
            if (additionalFields.dueDate) {
              data.due_date = additionalFields.dueDate;
            }
            
            if (additionalFields.priority) {
              data.priority = additionalFields.priority;
            }
            
            const options: IHttpRequestOptions = {
              method: 'POST' as IHttpRequestMethods,
              url: `${baseUrl}/tasks`,
              headers: {
                'X-API-Key': credentials.apiKey,
                'Content-Type': 'application/json',
              },
              body: data,
              json: true,
            };
            
            responseData = await this.helpers.httpRequest(options);
          }
          
          // **********************************************
          //                task:get
          // **********************************************
          else if (operation === 'get') {
            const taskId = this.getNodeParameter('taskId', i) as string;
            
            const options: IHttpRequestOptions = {
              method: 'GET' as IHttpRequestMethods,
              url: `${baseUrl}/tasks/${taskId}`,
              headers: {
                'X-API-Key': credentials.apiKey,
              },
              json: true,
            };
            
            responseData = await this.helpers.httpRequest(options);
          }
          
          // **********************************************
          //                task:getAll
          // **********************************************
          else if (operation === 'getAll') {
            const workspaceId = this.getNodeParameter('workspaceId', i) as string;
            
            const returnAll = this.getNodeParameter('returnAll', i) as boolean;
            const filters = this.getNodeParameter('filters', i) as {
              projectId?: string;
              status?: string;
              assigneeId?: string;
            };
            
            const qs: Record<string, any> = {
              workspace_id: workspaceId,
            };
            
            if (filters.projectId) {
              qs.project_id = filters.projectId;
            }
            
            if (filters.status) {
              qs.status = filters.status;
            }
            
            if (filters.assigneeId) {
              qs.assignee_id = filters.assigneeId;
            }
            
            const options: IHttpRequestOptions = {
              method: 'GET' as IHttpRequestMethods,
              url: `${baseUrl}/tasks`,
              headers: {
                'X-API-Key': credentials.apiKey,
              },
              qs,
              json: true,
            };
            
            if (returnAll === false) {
              const limit = this.getNodeParameter('limit', i) as number;
              qs.limit = limit;
            }
            
            responseData = await this.helpers.httpRequest(options);
          }
          
          // **********************************************
          //                task:update
          // **********************************************
          else if (operation === 'update') {
            const taskId = this.getNodeParameter('taskId', i) as string;
            const updateFields = this.getNodeParameter('updateFields', i) as {
              title?: string;
              description?: string;
              projectId?: string;
              assigneeId?: string;
              dueDate?: string;
              status?: string;
              priority?: string;
            };
            
            if (Object.keys(updateFields).length === 0) {
              throw new NodeOperationError(this.getNode(), 'Please specify at least one field to update');
            }
            
            const data: Record<string, any> = {};
            
            if (updateFields.title) {
              data.title = updateFields.title;
            }
            
            if (updateFields.description) {
              data.description = updateFields.description;
            }
            
            if (updateFields.projectId) {
              data.project_id = updateFields.projectId;
            }
            
            if (updateFields.assigneeId) {
              data.assignee_id = updateFields.assigneeId;
            }
            
            if (updateFields.dueDate) {
              data.due_date = updateFields.dueDate;
            }
            
            if (updateFields.status) {
              data.status = updateFields.status;
            }
            
            if (updateFields.priority) {
              data.priority = updateFields.priority;
            }
            
            const options: IHttpRequestOptions = {
              method: 'PATCH' as IHttpRequestMethods,
              url: `${baseUrl}/tasks/${taskId}`,
              headers: {
                'X-API-Key': credentials.apiKey,
                'Content-Type': 'application/json',
              },
              body: data,
              json: true,
            };
            
            responseData = await this.helpers.httpRequest(options);
          }
          
          // **********************************************
          //                task:delete
          // **********************************************
          else if (operation === 'delete') {
            const taskId = this.getNodeParameter('taskId', i) as string;
            
            const options: IHttpRequestOptions = {
              method: 'DELETE' as IHttpRequestMethods,
              url: `${baseUrl}/tasks/${taskId}`,
              headers: {
                'X-API-Key': credentials.apiKey,
              },
              json: true,
            };
            
            responseData = await this.helpers.httpRequest(options);
          }
        }
        
        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } },
        );
        
        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          const executionErrorData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ error: (error as Error).message }),
            { itemData: { item: i } },
          );
          returnData.push(...executionErrorData);
          continue;
        }
        throw error;
      }
    }
    
    return [returnData];
  }
} 