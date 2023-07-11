# Build Rest API using Serverless and Express

Date: July 1, 2023
Last edited: July 11, 2023 12:11 PM
Tag: Lambda, express

### Serverless Architecture

![json-serverless.png](https://github.com/jenilsavani9/serverless_demo/assets/74345702/1bc38857-fd6d-471f-b6e6-dc00f73a77fc)

### Step 1:

Create NPM project and install serverless into our project

```bash
$ npm init -y
$ npm install -g serverless
$ serverless
```

after selecting `AWS - Node.js - Http API` from serverless project options install express and serverless-http.

```bash
$ npm i express serverless-http body-parser
$ npm i -save-dev @types/express eslint typescript
```

now create `tsconfig.json` file.

```json
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

![Screenshot 2023-07-11 120016.png](https://github.com/jenilsavani9/serverless_demo/assets/74345702/44049456-c94b-4163-9095-f00e7353ce25)

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

![Screenshot 2023-07-11 121058.png](https://github.com/jenilsavani9/serverless_demo/assets/74345702/3d17d2cd-f9ef-4783-b267-5b69e92271ce)
