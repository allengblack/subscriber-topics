import bodyParser from 'body-parser';
import express from 'express';
import morgan from "morgan";
import { subscribe } from "./server/subscriber.controller";

const router = express
  .Router({
    strict: true
  })
  .get('/', (req, res) => {
    res.send("Everything OK!");
  })
  .post('/', subscribe);

express()
  .use(bodyParser.json())
  .use(morgan('tiny'))
  .use("/", router)
  .listen(9001, () => console.log("Listening on 9001"))
