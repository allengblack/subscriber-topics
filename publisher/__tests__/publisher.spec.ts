import { default as request } from 'supertest';
import { app } from "../src/app";
import mongoose from 'mongoose';
import supertest from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import faker from "faker";
import { SubscriptionModel } from '../src/data/subscriptions/subscriptions.model';

const mongod = new MongoMemoryServer();
let server;

beforeAll(async () => {
  server = app.listen(4000);
  supertest(server);

  mongoose.connect(await mongod.getUri(),
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
});

afterAll(async () => {
  mongoose.connections.forEach(async con => {
    await con.close();
  });
  await mongoose.disconnect();
  if (server) {
    await server.close();
  }
});

afterEach(async () => {
  await mongoose.connection.dropDatabase();
})

describe("Publisher controller", () => {
  it("should receive subscriptions", async () => {
    const topic = faker.random.word();
    const url = faker.internet.url();
    const res = await request(app)
      .post(`/subscribe/${topic}`)
      .send({
        url
      });

    expect(res.body.url).toBe(url);
    expect(res.body.topic).toBe(topic);

    const sub = await SubscriptionModel.findOne({ topic });
    expect(sub.subscribers[0]).toBe(url)
  });

  it("should publish to registered subscribers", async () => {
    const topic = faker.random.word();
    const url = faker.internet.url();
    const message = faker.lorem.words();
    await SubscriptionModel.create({ topic, subscribers: [url] });

    await request(app)
      .post(`/publish/${topic}`)
      .send({
        message
      })
      .expect(200);
  });
});