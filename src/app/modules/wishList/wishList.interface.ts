/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';
import { IBook } from '../books/book.interface';

export type IWish = {
  book: Types.ObjectId | IBook;
  user: Types.ObjectId | IUser;
};

export type WishModel = Model<IWish, Record<string, unknown>>;
