"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
const createReviewZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        book: zod_1.z
            .string()
            .nonempty({
            message: 'book id is required',
        })
            .optional(),
        user: zod_1.z
            .string()
            .nonempty({
            message: 'user id is required',
        })
            .optional(),
        message: zod_1.z.string().nonempty({
            message: 'Review is required',
        }),
    }),
});
const updateReviewZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        book: zod_1.z.string().nonempty().optional(),
        user: zod_1.z.string().nonempty().optional(),
        message: zod_1.z.string().nonempty().optional(),
    }),
});
exports.ReviewValidation = {
    createReviewZodSchema,
    updateReviewZodSchema,
};
