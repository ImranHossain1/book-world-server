/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';
import { IBook } from '../books/book.interface';

export type IPlan = {
  book: Types.ObjectId | IBook;
  user: Types.ObjectId | IUser;
  complete: boolean;
};

export type PlanModel = Model<IPlan, Record<string, unknown>>;
