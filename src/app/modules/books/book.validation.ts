import { z } from 'zod';

const createBookZodSchema = z.object({
  body: z.object({
    title: z.string().nonempty({
      message: 'Title is required',
    }),
    price: z.number().positive({
      message: 'Price must be a positive number',
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
    title: z
      .string()
      .nonempty({
        message: 'Title is required',
      })
      .optional(),
    price: z
      .number()
      .positive({
        message: 'Price must be a positive number',
      })
      .optional(),
    author: z
      .string()
      .nonempty({
        message: 'Author is required',
      })
      .optional(),
    genre: z
      .string()
      .nonempty({
        message: 'Genre is required',
      })
      .optional(),
    publicationDate: z
      .string()
      .nonempty({
        message: 'publication date is required',
      })
      .optional(),
  }),
});

export const BookValidation = { createBookZodSchema, updateBookZodSchema };
