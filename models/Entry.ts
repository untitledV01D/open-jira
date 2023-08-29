import mongoose, { Schema, Model } from 'mongoose';
import { Entry } from '../interfaces';

export interface IEntry extends Entry {};

const entrySchema = new Schema({
  description: { type: String, required: true },
  createdAt: { type: Date, required: true },
  status: {
    type: String,
    enum: {
      values: [
        'pending',
        'in-progress',
        'finished'
      ],
      message: '{VALUE} is not a permited state'
    },
    default: 'pending'
  }
});

const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema);

export default EntryModel;