require("dotenv").config();
const express = require("express");
const app = express();
const connection = require('cors');
const upload = require('express-fileupload');
const userRouter = require("./api/users/user.router");
const projectRouter = require("./api/projects/project.router");
const detailRouter = require("./api/details/detail.router");

app.use(express.json());
app.use(connection());
app.use(upload());

app.use("/users", userRouter);
app.use("/projects", projectRouter);
app.use("/details", detailRouter);

app.listen(process.env.APP_PORT, ()=>{
    console.log("Server up and running on PORT: ", process.env.APP_PORT);
});