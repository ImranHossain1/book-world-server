import { z } from 'zod';

const createReviewZodSchema = z.object({
  body: z.object({
    book: z
      .string()
      .nonempty({
        message: 'book id is required',
      })
      .optional(),
    user: z
      .string()
      .nonempty({
        message: 'user id is required',
      })
      .optional(),

    message: z.string().nonempty({
      message: 'Review is required',
    }),
  }),
});
const updateReviewZodSchema = z.object({
  body: z.object({
    book: z.string().nonempty().optional(),
    user: z.string().nonempty().optional(),
    message: z.string().nonempty().optional(),
  }),
});

export const ReviewValidation = {
  createReviewZodSchema,
  updateReviewZodSchema,
};
