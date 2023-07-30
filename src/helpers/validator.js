class validator {
  static validateTaskInfo(taskInfo, taskData) {
    if(taskInfo.hasOwnProperty("id") &&
      taskInfo.hasOwnProperty("priority") &&
      taskInfo.hasOwnProperty("title") &&
      taskInfo.hasOwnProperty("description") &&
      taskInfo.hasOwnProperty("completed") && this.validateUniqueTaskId(taskInfo, taskData)) {
        return {
          "status": true,
          "message": "Task has been added"
        };
      }
      if(!this.validateUniqueTaskId(taskInfo, taskData)){
        return {
          "status": false,
          "message": "Task id has to be unique"
        };
      }
      return {
        "status": false,
        "message": "Task Info is incomplete please provide all the properties"
      }
  }

  static validateUpdateTaskInfo(taskInfo) {
    if(taskInfo.hasOwnProperty("id") &&
      taskInfo.hasOwnProperty("priority") &&
      taskInfo.hasOwnProperty("title") &&
      taskInfo.hasOwnProperty("description") &&
      taskInfo.hasOwnProperty("completed")) {
        return {
          "status": true,
          "message": "Task has been updated"
        };
      }
      return {
        "status": false,
        "message": "Task Info is incomplete please provide all the properties"
      }
  }

  static validateUniqueTaskId(taskInfo, taskData) {
    let valueFound = taskData.tasks.some(x => x.id === taskInfo.id);
    if(valueFound) return false;
    return true;
  }
}

module.exports = validator;