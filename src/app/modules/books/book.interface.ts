import { Model } from 'mongoose';
export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
};

export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
  searchTerm?: string;
  publicationDate?: string;
  author?: string;
  genre?: string;
};
