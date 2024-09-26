const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
mongoose.connect(`${process.env.mongourl}`, {
  useNewUrlParser: true,
});
app.use(express.json());
app.get("/", (req, res) => {
  res.json("Hello Backend is Running");
});

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
const schema = {
  Title: String,
  Description: String,
  Priority: String,
  Due: String,
  Status: Boolean,
};

const taskTable = mongoose.model("TaskList", schema);

app.listen(process.env.PORT || 3000, () => {
  console.log("Backend is running");
});

app.get("/tasks", (req, res) => {
  //   let alltasks;
  taskTable
    .find()
    .then(function (foundItems) {
      res.status(200).json(foundItems);
    })
    .catch(function (err) {
      console.log(err);
      res.status(404).json(err);
    });
});

app.post("/create", (req, res) => {
  const { Title, Description, Priority, Due, Status } = req.body;
  try {
    newtask = new taskTable({ Title, Description, Priority, Due, Status });
    newtask.save();
    res.json("Saved your task");
  } catch (e) {
    console.log(e);
    res.json(e);
  }
});

app.post("/mark", async (req, res) => {
  const { id } = req.body;
  try {
    const updatedTask = await taskTable.findOneAndUpdate(
      { _id: id },
      { Status: true }
    );
    res.status(200).json(updatedTask);
  } catch (e) {}
});
