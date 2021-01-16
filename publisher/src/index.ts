import mongoose from 'mongoose';
import { app } from "./app";

mongoose.connect("mongodb://localhost:27017/pub-sub", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

export const server = app.listen(9000, () => console.log("Listening on 9000"));
