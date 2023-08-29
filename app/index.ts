import express, { Express, Request, Response } from "express";
import chatRouter from "./router/chat";
import dotenv from "dotenv";
import cors from "cors";
import bosyParser from "body-parser";

dotenv.config();

// dns.setDefaultResultOrder("ipv4first");

const app: Express = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(bosyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  // res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const port = process.env.PORT || 3000;

app.use(chatRouter);

app.get("/", async (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, async () => {
  console.log(
    `⚡️[server]: Server with https is running at http://localhost:${port} ⚡`
  );
});
