"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.string({
            required_error: 'role is required',
        }),
        password: zod_1.z.string().min(6, {
            message: 'password should be at least 6 characters',
        }),
        phoneNumber: zod_1.z.string().nonempty({
            message: 'phoneNumber is required',
        }),
        email: zod_1.z.string().nonempty({
            message: 'Email is required',
        }),
        name: zod_1.z.object({
            firstName: zod_1.z.string().nonempty({
                message: 'firstName is required',
            }),
            lastName: zod_1.z.string().nonempty({
                message: 'lastName is required',
            }),
        }),
        address: zod_1.z.string().nonempty({
            message: 'address is required',
        }),
    }),
});
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.string().optional(),
        password: zod_1.z.string().min(6).optional(),
        phoneNumber: zod_1.z.string().nonempty().optional(),
        name: zod_1.z
            .object({
            firstName: zod_1.z.string().nonempty().optional(),
            lastName: zod_1.z.string().nonempty().optional(),
        })
            .optional(),
        address: zod_1.z.string().nonempty().optional(),
    }),
});
exports.UserValidation = { createUserZodSchema, updateUserZodSchema };
