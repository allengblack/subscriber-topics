import axios from 'axios';
import { Request, Response } from 'express';
import { SubscriptionModel } from '../data/subscriptions/subscriptions.model';

export const subscribe = async (req: Request, res: Response) => {
  try {
    const { body, params: { topic } } = req;
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
}

export const publish = async (req: Request, res: Response) => {
  try {
    const { body, params: { topic } } = req;
    const subscription = await SubscriptionModel.findOne({ topic }).select("+subscribers -_id");

    if (!subscription) return res.status(200).json({ msg: "There are no subscibers to this topic" })

    for (const s of subscription.subscribers) {
      axios.post(s, body)
        .then(_ => { console.log(`Published to ${s} successfully`); })
        .catch(_ => { console.error(`Error publishing to ${s}`); });
    }

    res.status(202).json({
      topic,
      data: body
    });
  } catch (err) {
    console.error(err);
    res.status(502).json({ msg: 'Something went wrong ' + err })
  }
}