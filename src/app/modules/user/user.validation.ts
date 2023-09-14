import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'role is required',
    }),
    password: z.string().min(6, {
      message: 'password should be at least 6 characters',
    }),
    phoneNumber: z.string().nonempty({
      message: 'phoneNumber is required',
    }),
    email: z.string().nonempty({
      message: 'Email is required',
    }),
    name: z.object({
      firstName: z.string().nonempty({
        message: 'firstName is required',
      }),
      lastName: z.string().nonempty({
        message: 'lastName is required',
      }),
    }),
    address: z.string().nonempty({
      message: 'address is required',
    }),
  }),
});

const updateUserZodSchema = z.object({
  body: z.object({
    role: z.string().optional(),
    password: z.string().min(6).optional(),
    phoneNumber: z.string().nonempty().optional(),
    name: z
      .object({
        firstName: z.string().nonempty().optional(),
        lastName: z.string().nonempty().optional(),
      })
      .optional(),
    address: z.string().nonempty().optional(),
  }),
});

export const UserValidation = { createUserZodSchema, updateUserZodSchema };
