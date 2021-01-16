import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import morgan from "morgan";
import { publish, subscribe } from './controllers/publish.controller';

const router = express
  .Router({
    strict: true
  })
  .get('/', (req, res) => {
    res.send("Everything OK!");
  })
  .post('/subscribe/:topic', subscribe)
  .post('/publish/:topic', publish);

mongoose.connect("mongodb://localhost:27017/pub-sub", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

express()
  .use(bodyParser.json())
  .use(morgan('tiny'))
  .use("/", router)
  .listen(9000, () => console.log("Listening on 9000"))
