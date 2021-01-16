import bodyParser from 'body-parser';
import express from 'express';
import morgan from "morgan";
import { subscribe } from "./server/subscriber.controller";
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 9001;

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
  .listen(PORT, () => console.log(`Subscriber listening on ${PORT}`))
