import mongoose from 'mongoose';
import { app } from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 9000;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

export const server = app.listen(PORT, () => console.log(`Publisher listening on ${PORT}`));
