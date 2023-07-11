import bodyParser from "body-parser";
import express from "express";
import serverless from "serverless-http";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const todos = [
  {
    id: 1,
    todo: "create serverless app",
  },
  {
    id: 2,
    todo: "Learn about serverless aws",
  },
];

app.get("/", (req, res) => {
  return res.status(200).json({
    statusCode: 200,
    message: "/ get todos",
    payload: todos,
    success: true,
  });
});

app.post("/", (req, res) => {
  const newTodoId = todos.length + 1;
  const newTodo = req.body.todo;

  todos.push({ id: newTodoId, todo: newTodo });

  return res.status(200).json({
    statusCode: 200,
    message: "/ add todos",
    payload: todos,
    success: true,
  });
});

app.put("/:id", (req, res) => {
  const updateId = req.params.id;
  const updateTodo = req.body.todo;

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id == parseInt(updateId)) {
      todos[i].todo = updateTodo;
    }
  }

  return res.status(200).json({
    statusCode: 200,
    message: `/ edit todos ${req.params.id}`,
    payload: todos,
    success: true,
  });
});

app.delete("/:id", (req, res) => {

  const updateId = req.params.id;

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id == parseInt(updateId)) {
      todos.splice(i, 1);
    }
  }

  return res.status(200).json({
    statusCode: 200,
    message: `/ delete todos ${req.params.id}`,
    payload: todos,
    success: true,
  });
});

export const handler = serverless(app);
