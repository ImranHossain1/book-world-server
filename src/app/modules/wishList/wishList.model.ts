import { Schema, model } from 'mongoose';
import { IWish, WishModel } from './wishList.interface';
const WishSchema = new Schema<IWish>(
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Wish = model<IWish, WishModel>('wish', WishSchema);
