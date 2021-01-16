import express from "express";
import bodyParser from 'body-parser';
import morgan from "morgan";
import { router } from "./server/router";

export const app = express()
  .use(bodyParser.json())
  .use(morgan('tiny'))
  .use("/", router);