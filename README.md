# Build Rest API using Serverless and Express

Date: July 1, 2023
Last edited: July 11, 2023 12:11 PM
Tag: Lambda, express

### Serverless Architecture

![json-serverless.png](https://private-user-images.githubusercontent.com/74345702/252599763-6c90d805-d23b-4b38-94d3-7410a75a743b.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJrZXkxIiwiZXhwIjoxNjg5MDYzODI1LCJuYmYiOjE2ODkwNjM1MjUsInBhdGgiOiIvNzQzNDU3MDIvMjUyNTk5NzYzLTZjOTBkODA1LWQyM2ItNGIzOC05NGQzLTc0MTBhNzVhNzQzYi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBSVdOSllBWDRDU1ZFSDUzQSUyRjIwMjMwNzExJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDIzMDcxMVQwODE4NDVaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT03NTljNGM2MjYyODU2OTQ5YzgwNTA2ZGNjMGVjNzhjZmZmZjBmZTdlN2ZmOWFiZGM2MWYxYzRkYmJjODFjZmI1JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.P57r5tSZNJ0QPpC4cZqOtmONljFd44vneU75Na6SfMc)

### Step 1:

Create NPM project and install serverless into our project

```json
$ npm init -y
$ npm install -g serverless
$ serverless
```

after selecting `AWS - Node.js - Http API` from serverless project options install express and serverless-http.

```json
$ npm i express serverless-http body-parser
$ npm i -save-dev @types/express eslint typescript
```

now create `tsconfig.json` file.

```json
// tsconfig.json
{
  "compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true,
    "target": "es6",
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist"
  },
  "lib": ["es2015"]
}
```

remove `index.js` file and create `src/app.ts` file and paste this code into `app.ts` file.

```tsx
// app.ts
import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
```

Then, run `eslint`’s initialization command to interactively set up the project:

```tsx
$ npx eslint --init
```

change `package.json` file.

```tsx
"scripts": {
    "start": "tsc && serverless offline"
  },
```

### Step 2:

create `serverless.yml` file in root folder.

![Screenshot 2023-07-11 120016.png](https://private-user-images.githubusercontent.com/74345702/252599772-3734aa0d-e74f-47b3-b77a-2f0d035c4d4a.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJrZXkxIiwiZXhwIjoxNjg5MDYzODQ5LCJuYmYiOjE2ODkwNjM1NDksInBhdGgiOiIvNzQzNDU3MDIvMjUyNTk5NzcyLTM3MzRhYTBkLWU3NGYtNDdiMy1iNzdhLTJmMGQwMzVjNGQ0YS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBSVdOSllBWDRDU1ZFSDUzQSUyRjIwMjMwNzExJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDIzMDcxMVQwODE5MDlaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0xYTZlNmU3MmNmMGFhZDUwNDNhOGQwNzNiNDU5OGE0ZmMxNjY0MzgxMmNjMmFjNzNjMDRlYzBkMDJjMGU3Y2E0JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.5qAoUKl-Sd-19pRTNEkZ7AKVdbFJTa0Yi772gWh819E)

### Step 3:

Create express server

```tsx
// app.ts
import bodyParser from "body-parser";
import express from "express";
import serverless from "serverless-http";

const app = express();

app.get("/", (req, res) => {
  return res.status(200).json({
    statusCode: 200,
    message: "Hello Todos",
    payload: "",
    success: true,
  });
});

export const handler = serverless(app);
```

change the `serverless.yml` file

```yaml
service: http-api
frameworkVersion: "3"
plugins:
  - serverless-offline
provider:
  name: aws
  runtime: nodejs18.x
functions:
  GetTodos:
    handler: dist/app.handler
    events:
      - httpApi:
          path: /
          method: get
```

after starting the server with `npm start` we should see `Hello Todos` in response at [`http://localhost:3000`](http://localhost:3000/).

### Step 4:

Add GET, POST, PUT, DELETE route in `app.ts` file after that we have to add const array for store todos.

```tsx
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

// get route for todo
app.get("/", (req, res) => {
  return res.status(200).json({
    statusCode: 200,
    message: "/ get todos",
    payload: todos,
    success: true,
  });
});

// add new todo
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

// update todo
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

//delete todo
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
```

### Step 5:

we have to add our routes in to `serverless.yml` file

```yaml
service: http-api
frameworkVersion: "3"
plugins:
  - serverless-offline
provider:
  name: aws
  runtime: nodejs18.x
functions:
  GetTodos:
    handler: dist/app.handler
    events:
      - httpApi:
          path: /
          method: get
  AddTodos:
    handler: dist/app.handler
    events:
      - httpApi:
          path: /
          method: post
  EditTodos:
    handler: dist/app.handler
    events:
      - httpApi:
          path: /{id}
          method: put
  DeleteTodos:
    handler: dist/app.handler
    events:
      - httpApi:
          path: /{id}
          method: delete
```

### Step 6:

After running `npm start` we can see below output into our terminal

![Screenshot 2023-07-11 121058.png](https://private-user-images.githubusercontent.com/74345702/252599775-f52c4f4f-2941-4c26-85b0-003496f3c0b2.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJrZXkxIiwiZXhwIjoxNjg5MDYzODQ5LCJuYmYiOjE2ODkwNjM1NDksInBhdGgiOiIvNzQzNDU3MDIvMjUyNTk5Nzc1LWY1MmM0ZjRmLTI5NDEtNGMyNi04NWIwLTAwMzQ5NmYzYzBiMi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBSVdOSllBWDRDU1ZFSDUzQSUyRjIwMjMwNzExJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDIzMDcxMVQwODE5MDlaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT04ZTAyMzI2NGRkOTA3ZjdiMzkxNGQ2MDEzZTgwYmIxYWQ5ZGNmYTg5OGFjMTk4YjU3OTc0YWUwN2U2ZmUzMjBhJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.SLYwdWCtNlw3YoXvBe01MTWM2D7Wo77KmXFVc_QGw54)
