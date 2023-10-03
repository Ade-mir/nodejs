require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    title: String,
    content: String,
  })
);

app.use(cors());
app.use(bodyParser.json());

// Create a new Post
app.post("/posts", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    await newPost.save();
    res.status(201).send(newPost);
  } catch (error) {
    res.status(500).send("Database connection failed");
  }
});

// Read all Posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send("Database connection failed");
  }
});

// Update a Post
app.put("/posts/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(updatedPost);
  } catch (error) {
    res.status(500).send("Database connection failed");
  }
});

// Delete a Post
app.delete("/posts/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Post deleted" });
  } catch (error) {
    res.status(500).send("Database connection failed");
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
