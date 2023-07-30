const express = require("express");
const cors = require('cors');
const routes = require('express').Router();
const taskManager = require("./routes/taskManager");

const app = express();
app.use(cors());
app.use(routes);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = 3000;

routes.get("/", (req, res) => {
    res.status(200).send("Welcome to the Task Manager API project!");
});

routes.use('/tasks', taskManager);

app.listen(PORT, (err) =>{
    if(!err)
        console.log("Server hs started successfully at port " + PORT);
    else
        console.log("Error occurred, server can't start", err);
    }
);