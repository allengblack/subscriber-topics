import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { SubscriptionModel } from './data/subscriptions/subscriptions.model';

const router = express.Router({
  strict: true
});

router.get('/', (req, res) => {
  res.send("Everything OK!");
});

router.post('/subscribe/:topic', async (req: Request, res: Response) => {
  const { body, params: { topic } } = req;

  try {
    await SubscriptionModel.updateOne({ topic },
      {
        topic: topic,
        "$addToSet": { "subscribers": body.url }
      },
      { upsert: true, strict: true })

    res.send({
      url: body.url,
      topic
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "there was an error subscribing to this topic " + err })
  }
});

router.post("/publish/:topic", async (req: Request, res: Response) => {
  try {
    const { body, params: { topic } } = req;

    res.send({
      topic,
      data: body
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Something went wrong ' + err })
  }
});

const app = express();
app.use(bodyParser.json());
app.use("/", router);
mongoose.connect("mongodb://localhost:27017/pub-sub", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

app.listen(9000, () => console.log("Listening on 9000"))
