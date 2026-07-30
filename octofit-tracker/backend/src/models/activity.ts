import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  title: string;
  type: string;
  durationMinutes: number;
  calories: number;
  date: Date;
  userId: string;
}

const activitySchema = new Schema<IActivity>({
  title: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  durationMinutes: { type: Number, required: true, min: 1 },
  calories: { type: Number, required: true, min: 0 },
  date: { type: Date, default: Date.now },
  userId: { type: String, required: true, trim: true },
});

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
