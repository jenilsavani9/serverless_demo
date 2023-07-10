import express, { Request, Response } from "express";
import serverless from "serverless-http";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export const handler = serverless(app);
