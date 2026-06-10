import mongoose, { Schema } from 'mongoose';

// ── Lead ──────────────────────────────────────────────────────────────────────
const LeadSchema = new Schema({
  name:    { type: String, required: true, trim: true },
  email:   { type: String, required: true, trim: true, lowercase: true },
  company: { type: String, trim: true },
  phone:   { type: String, trim: true },
  message: { type: String, required: true },
  source:  { type: String, enum: ['contact_form', 'booking_form', 'referral', 'other'], default: 'contact_form' },
  status:  { type: String, enum: ['new', 'contacted', 'qualified', 'converted', 'lost'], default: 'new' },
  service: { type: String },
}, { timestamps: true });

// ── Booking ───────────────────────────────────────────────────────────────────
const BookingSchema = new Schema({
  name:          { type: String, required: true, trim: true },
  email:         { type: String, required: true, trim: true, lowercase: true },
  company:       { type: String, trim: true },
  phone:         { type: String, trim: true },
  preferredTime: { type: String },
  timezone:      { type: String },
  notes:         { type: String },
  status:        { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' },
  service:       { type: String },
}, { timestamps: true });

// ── Subscriber ────────────────────────────────────────────────────────────────
const SubscriberSchema = new Schema({
  email:  { type: String, required: true, unique: true, trim: true, lowercase: true },
}, { timestamps: true });

// ── PageContent ───────────────────────────────────────────────────────────────
const PageContentSchema = new Schema({
  pageSlug: { type: String, required: true, unique: true },
  content:  { type: Schema.Types.Mixed, default: {} },
  images:   { type: Schema.Types.Mixed, default: {} },
  sections: { type: [Schema.Types.Mixed], default: [] },
}, { timestamps: true });

// ── PasswordReset ─────────────────────────────────────────────────────────────
const PasswordResetSchema = new Schema({
  email:     { type: String, required: true, lowercase: true },
  token:     { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
}, { timestamps: true });
PasswordResetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// ── BlogPost ──────────────────────────────────────────────────────────────────
const BlogPostSchema = new Schema({
  title:           { type: String, required: true, trim: true },
  slug:            { type: String, required: true, unique: true, trim: true, lowercase: true },
  content:         { type: String, required: true },
  excerpt:         { type: String, trim: true },
  coverImage:      { type: String, trim: true },
  author:          { type: String, default: 'Remotage Team' },
  status:          { type: String, enum: ['draft', 'published'], default: 'draft' },
  publishedAt:     { type: Date },
  metaTitle:       { type: String, trim: true },
  metaDescription: { type: String, trim: true },
  targetKeyword:   { type: String, trim: true },
  tags:            { type: [String], default: [] },
}, { timestamps: true });

export const Lead          = mongoose.models.Lead          || mongoose.model('Lead',          LeadSchema);
export const Booking       = mongoose.models.Booking       || mongoose.model('Booking',       BookingSchema);
export const Subscriber    = mongoose.models.Subscriber    || mongoose.model('Subscriber',    SubscriberSchema);
export const PageContent   = mongoose.models.PageContent   || mongoose.model('PageContent',   PageContentSchema);
export const PasswordReset = mongoose.models.PasswordReset || mongoose.model('PasswordReset', PasswordResetSchema);
export const BlogPost      = mongoose.models.BlogPost      || mongoose.model('BlogPost',      BlogPostSchema);

