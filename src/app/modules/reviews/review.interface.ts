/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';
import { IBook } from '../books/book.interface';

export type IReview = {
  book: Types.ObjectId | IBook;
  user: Types.ObjectId | IUser;
  message: string;
};

export type ReviewModel = Model<IReview, Record<string, unknown>>;
