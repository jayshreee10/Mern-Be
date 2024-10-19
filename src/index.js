import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import TodoModel from "./models/Todo.js";

const app = express();

// MongoDB Connection
mongoose
  .connect(
    "mongodb://127.0.0.1:27017/mern?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.2"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.status(200).json(todos);
  } catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

app.post("/", (req, res) => {
  const { task, isCompleted } = req.body;

  TodoModel.create({ task, isCompleted })
    .then((result) => {
      console.log("Task saved:", result);
      res.json(result);
    })
    .catch((err) => {
      console.error("Error saving task:", err);
      res.status(500).json({ error: "Failed to create task" });
    });
});

app.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { task, isCompleted } = req.body;

  try {
    const updatedTask = await TodoModel.findByIdAndUpdate(
      id,
      { task, isCompleted },
      { new: true }
    );

    // Check if the task was found and updated
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Return the updated task
    res.json(updatedTask);
  } catch (err) {
    // Handle any errors
    console.error("Error updating task:", err);
    res.status(500).json({ error: "Failed to update task" });
  }
});

app.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deleteTask = await TodoModel.findByIdAndDelete(id);

    if (!deleteTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "task deleted" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

// Start the server
app.listen(2000, (err) => {
  if (err) {
    console.error("Server error:", err);
  } else {
    console.log("Server started on port 2000");
  }
});
