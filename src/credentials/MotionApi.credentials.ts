import {
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class MotionApi implements ICredentialType {
  name = 'motionApi';
  displayName = 'Motion API';
  documentationUrl = 'https://developer.usemotion.com/docs';
  properties: INodeProperties[] = [
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      default: '',
      required: true,
      typeOptions: {
        password: true,
      },
    },
    {
      displayName: 'Workspace ID',
      name: 'workspaceId',
      type: 'string',
      default: '',
      required: true,
      description: 'ID of the Motion workspace',
    }
  ];
} 