import { Schema, model } from 'mongoose';
import { IPlan, PlanModel } from './planRead.interface';
const PlanSchema = new Schema<IPlan>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: 'book',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    complete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Plan = model<IPlan, PlanModel>('plan', PlanSchema);
