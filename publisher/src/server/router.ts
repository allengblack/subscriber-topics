import express from "express";
import { publish, subscribe } from './publish.controller';

export const router = express
  .Router({
    strict: true
  })
  .get('/', (req, res) => {
    res.send("Everything OK!");
  })
  .post('/subscribe/:topic', subscribe)
  .post('/publish/:topic', publish);