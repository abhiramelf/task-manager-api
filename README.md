# Task Manager API
REST APIs for creating a task management solution

## Supported Functionalities
1. Add tasks
2. Get all tasks
3. Get tasks by completion and priority
4. Update individual task
5. Delete individual task

## Dependencies
Express, CORS, Nodemon(dev dependency)

## Commands to Start the Project
### Install Dependencies
```npm install```
### Start Server
```npm run start```

## End Point Documentation
### Create a task
```curl -X POST -d '{"id": 1,"priority": "medium","title": "Sleep at 10PM","description": "Make sure to go to bed at 10PM","completed": true}' -H 'Content-Type: application/json' 'http://localhost:3000/tasks' | jq```
### Get all tasks
```curl 'http://localhost:3000/tasks' | jq```
### Get tasks based on completion status(query param - 'completion=true|false')
```curl 'http://localhost:3000/tasks?completion=true' | jq```
### Get tasks based on priority level
```curl 'http://localhost:3000/tasks/priority/high' | jq```
### Get individual task details
```curl 'http://localhost:3000/tasks/3' | jq```
### Update individual task
```curl -X PUT -d '{"id": 1,"priority": "medium","title": "Sleep at 10PM","description": "Make sure to go to bed at 10PM","completed": true}' -H 'Content-Type: application/json' 'http://localhost:3000/tasks/1' | jq```
### Delete individual task
```curl -X DELETE 'http://localhost:3000/tasks/1'```
