# n8n-nodes-motion

This is an n8n community node for integrating with [Motion](https://www.usemotion.com/), a project management platform. It provides a node that allows you to interact with the Motion API from your n8n workflows.

## Installation

### Community Nodes (Recommended)

For users with n8n v0.187+, the easiest way to install is through the Community Nodes feature:

1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-motion` in **Enter npm package name**
4. Agree to the risks
5. Click **Install**

### Manual Installation

To install this node manually:

```bash
npm install n8n-nodes-motion
```

For Docker-based n8n installations, add this to your Dockerfile:

```dockerfile
RUN cd /usr/local/lib/node_modules/n8n && \
  npm install n8n-nodes-motion
```

## Usage

1. **Authentication**: You will need to create an API key from your Motion account. Navigate to Settings > Developer and create a new API key.

2. **Creating Credentials**: In n8n, go to the Credentials tab and add Motion API credentials with your API key and workspace ID.

3. **Using the Node**: Add the Motion node to your workflow and choose from the available operations:
   - Task: Create, Get, Get All, Update, Delete

## Examples

### Create a Task

1. Add a Motion node to your workflow
2. Select the "Task" resource and "Create" operation
3. Enter the required fields (Workspace ID and Title)
4. Optional: Add additional fields like description, assignee, due date, etc.

### Fetch Tasks from a Project

1. Add a Motion node to your workflow
2. Select the "Task" resource and "Get All" operation
3. Enter the Workspace ID
4. Add a filter for Project ID
5. Choose if you want to return all results or limit the number

## Resources

- [Motion API Documentation](https://developer.usemotion.com/docs)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](LICENSE.md) 