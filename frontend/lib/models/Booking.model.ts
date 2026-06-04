import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
  name:          string;
  email:         string;
  company?:      string;
  phone?:        string;
  preferredTime?: string;
  timezone?:     string;
  notes?:        string;
  status:        'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt:     Date;
  updatedAt:     Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    name:          { type: String, required: true, trim: true },
    email:         { type: String, required: true, trim: true, lowercase: true },
    company:       { type: String, trim: true },
    phone:         { type: String, trim: true },
    preferredTime: { type: String },
    timezone:      { type: String },
    notes:         { type: String },
    status:        {
      type:    String,
      enum:    ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export const Booking = mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);
