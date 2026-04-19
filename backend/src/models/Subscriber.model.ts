import mongoose, { Document, Schema } from 'mongoose';

export interface ISubscriber extends Document {
  email:     string;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriberSchema = new Schema<ISubscriber>(
  {
    email: {
      type:     String,
      required: true,
      unique:   true,
      trim:     true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

export const Subscriber = mongoose.model<ISubscriber>('Subscriber', SubscriberSchema);