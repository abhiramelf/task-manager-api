// Imports
const express = require('express')
const taskRoutes = require('express').Router();
const taskData = require('../taskData.json');
const path = require('path');
const fs = require('fs');

// Initializations
taskRoutes.use(express.urlencoded({ extended: false }));
taskRoutes.use(express.json());

// Get all tasks with an option to filter with task completion status
taskRoutes.get("/", (req, res) => {
    if (req.query.completion === undefined) {
        res.status(200).send(taskData);  
    }
    else {
        let result;
        switch (String(req.query.completion)) {
            case "true":
                result = taskData.tasks.filter((x) => { return x.completed == true });
                break;
            case "false":
                result = taskData.tasks.filter((x) => { return x.completed == false });
                break;
        }

        let taskDataModified = JSON.parse(JSON.stringify(taskData));
        taskDataModified.tasks = result;
        res.status(200).send(taskDataModified);
    }
});

// Get a task by it's id
taskRoutes.get("/:id", (req, res) => {
    let allTasks = taskData.tasks;
    let reqTaskID = req.params.id;

    let result = allTasks.filter(x => x.id == reqTaskID);

    res.status(200).send(result);
});

// Get tasks by their priority level
taskRoutes.get("/priority/:level", (req, res) => {
    let reqTaskPriority = req.params.level;

    let result;
    switch (reqTaskPriority) {
        case "low":
            result = taskData.tasks.filter((x) => { return x.priority === "low" });
            break;
        case "medium":
            result = taskData.tasks.filter((x) => { return x.priority === "medium" });
            break;
        case "high":
            result = taskData.tasks.filter((x) => { return x.priority === "high" });
            break;
    }

    let taskDataModified = JSON.parse(JSON.stringify(taskData));
    taskDataModified.tasks = result;
    res.status(200).send(taskDataModified);
});

// Create a task
taskRoutes.post("/", (req, res) => {
    let taskDetails = req.body;
    let writePath = path.join(__dirname, '..', 'taskData.json');

    let taskDataModified = JSON.parse(JSON.stringify(taskData));
    taskDataModified.tasks.push(taskDetails);
    fs.writeFileSync(writePath, JSON.stringify(taskDataModified), {encoding:'utf8', flag:'w'});
    res.status(200).send(taskDataModified);
});

// Update a task by it's id
taskRoutes.put("/:id", (req, res) => {
    let taskDetails = req.body;
    let reqTaskID = req.params.id;
    let writePath = path.join(__dirname, '..', 'taskData.json');

    let taskDataModified = JSON.parse(JSON.stringify(taskData));
    taskDataModified.tasks[reqTaskID - 1] = taskDetails;
    fs.writeFileSync(writePath, JSON.stringify(taskDataModified), {encoding:'utf8', flag:'w'});
    res.status(200).send(taskDataModified);
});

// Delete a task by it's id
taskRoutes.delete("/:id", (req, res) => {
    let reqTaskID = req.params.id;
    let writePath = path.join(__dirname, '..', 'taskData.json');

    let result = taskData.tasks.filter((x) => { 
        return x.id.toString() !== reqTaskID });

    let taskDataModified = JSON.parse(JSON.stringify(taskData));
    taskDataModified.tasks = result;
    fs.writeFileSync(writePath, JSON.stringify(taskDataModified), {encoding:'utf8', flag:'w'});
    res.status(200).send(taskDataModified);
});

// Exports
module.exports = taskRoutes;