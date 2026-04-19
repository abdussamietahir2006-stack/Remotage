import mongoose, { Document, Schema } from 'mongoose';

export interface IPageContent extends Document {
  pageSlug: string;
  content:  Record<string, unknown>;
  images:   Record<string, unknown>;
  sections: unknown[];
  updatedAt: Date;
}

const PageContentSchema = new Schema<IPageContent>(
  {
    pageSlug: { type: String, required: true, unique: true },
    content:  { type: Schema.Types.Mixed, default: {} },
    images:   { type: Schema.Types.Mixed, default: {} },
    sections: { type: [Schema.Types.Mixed], default: [] },
  },
  { timestamps: true }
);

export const PageContent = mongoose.model<IPageContent>('PageContent', PageContentSchema);