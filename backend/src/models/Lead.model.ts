import mongoose, { Document, Schema } from 'mongoose';

export interface ILead extends Document {
  name:      string;
  email:     string;
  company?:  string;
  phone?:    string;
  message:   string;
  source:    string;
  status:    'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name:    { type: String, required: true, trim: true },
    email:   { type: String, required: true, trim: true, lowercase: true },
    company: { type: String, trim: true },
    phone:   { type: String, trim: true },
    message: { type: String, required: true },
    source:  {
      type:    String,
      enum:    ['contact_form', 'booking_form', 'referral', 'other'],
      default: 'contact_form',
    },
    status: {
      type:    String,
      enum:    ['new', 'contacted', 'qualified', 'converted', 'lost'],
      default: 'new',
    },
  },
  { timestamps: true }
);

export const Lead = mongoose.model<ILead>('Lead', LeadSchema);