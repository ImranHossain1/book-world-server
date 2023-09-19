import { z } from 'zod';

const createBookZodSchema = z.object({
  body: z.object({
    title: z.string().nonempty({
      message: 'Title is required',
    }),
    author: z.string().nonempty({
      message: 'Author is required',
    }),
    genre: z.string().nonempty({
      message: 'Genre is required',
    }),
    publicationDate: z.string().nonempty({
      message: 'publication date is required',
    }),
  }),
});
const updateBookZodSchema = z.object({
  body: z.object({
    title: z.string().nonempty().optional(),
    author: z.string().nonempty().optional(),
    genre: z.string().nonempty().optional(),
    publicationDate: z.string().nonempty().optional(),
  }),
});

export const BookValidation = { createBookZodSchema, updateBookZodSchema };
