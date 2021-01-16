import axios from 'axios';
import { Request, Response } from 'express';
import { SubscriptionModel } from '../data/subscriptions/subscriptions.model';
import Joi from "joi";

const isValidSubscription = Joi.object({
  url: Joi.string().uri().required(),
});

export const subscribe = async (req: Request, res: Response) => {
  try {
    const { body, params: { topic } } = req;
    await isValidSubscription.validateAsync(body);

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
    const published = {};
    const unpublished = {};

    const subscription = await SubscriptionModel.findOne({ topic }).select("+subscribers -_id");

    if (!subscription) {
      return res.status(200).json({
        msg: "There are no subscibers to this topic",
        published, unpublished
      });
    }

    await Promise.all(subscription.subscribers.map(url => {
      return axios.post(url, body)
        .then(_ => {
          published[url] = `Published to ${url} successfully`;
          console.log(`Published to ${url} successfully`);
        })
        .catch(_ => {
          console.error(`Error publishing to ${url}`);
          unpublished[url] = `Error publishing to ${url}`;
        });
    }));

    res.status(200).json({
      published,
      unpublished
    });
  } catch (err) {
    console.error(err);
    res.status(502).json({ msg: 'Something went wrong ' + err })
  }
}