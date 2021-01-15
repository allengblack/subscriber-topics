import mongoose from 'mongoose';

export const SubscriptionSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  subscribers: [String]
});

SubscriptionSchema.index({ 'topic': 1 }, { unique: true })