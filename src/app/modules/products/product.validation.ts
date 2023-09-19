import { z } from 'zod';

const createProductZodSchema = z.object({
  body: z.object({
    product_name: z.string().nonempty({
      message: 'Product Name is required',
    }),
    image: z.string().nonempty({
      message: 'Image is required',
    }),
    category: z.string().nonempty({
      message: 'Category is required',
    }),
    status: z.string().optional(),
    rating: z.number().positive().optional(),
    price: z
      .string()
      .nonempty()
      .regex(/^\d+(\.\d{1,4})?$/, {
        message: 'Price must be a positive number with up to 2 decimal places',
      }),
    description: z.string().nonempty({
      message: 'Description is required',
    }),
    key_features: z.record(z.union([z.string(), z.number()])).optional(),
    reviews: z
      .array(
        z.object({
          user: z.string().nonempty(),
          rating: z.number().int().min(1).max(5),
          comment: z.string().nonempty(),
          date: z.string(),
        })
      )
      .optional(),
  }),
});
const updateProductZodSchema = z.object({
  body: z.object({
    product_name: z.string().nonempty().optional(),
    image: z.string().nonempty().optional(),
    category: z.string().nonempty().optional(),
    status: z.string().optional(),
    rating: z.number().positive().optional(),
    price: z
      .string()
      .nonempty()
      .regex(/^\d+(\.\d{1,4})?$/, {
        message: 'Price must be a positive number with up to 2 decimal places',
      })
      .optional(),
    description: z
      .string()
      .nonempty({
        message: 'Description is required',
      })
      .optional(),
    key_features: z.record(z.union([z.string(), z.number()])).optional(),
    reviews: z
      .object({
        user: z.string().nonempty(),
        rating: z.number().min(1).max(5),
        comment: z.string().nonempty(),
        date: z.string(),
      })
      .optional(),
  }),
});

export const ProductValidation = {
  createProductZodSchema,
  updateProductZodSchema,
};
