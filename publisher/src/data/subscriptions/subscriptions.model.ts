import mongoose, { Document } from 'mongoose';
import { SubscriptionSchema } from './subscription.schema';

interface Subscription extends Document {
  topic: string;
  subscribers: string[];
}

export const SubscriptionModel = mongoose.model<Subscription>("Subscription", SubscriptionSchema);