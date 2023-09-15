"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const zod_1 = require("zod");
const createBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().nonempty({
            message: 'Title is required',
        }),
        author: zod_1.z.string().nonempty({
            message: 'Author is required',
        }),
        genre: zod_1.z.string().nonempty({
            message: 'Genre is required',
        }),
        publicationDate: zod_1.z.string().nonempty({
            message: 'publication date is required',
        }),
    }),
});
const updateBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().nonempty().optional(),
        author: zod_1.z.string().nonempty().optional(),
        genre: zod_1.z.string().nonempty().optional(),
        publicationDate: zod_1.z.string().nonempty().optional(),
    }),
});
exports.BookValidation = { createBookZodSchema, updateBookZodSchema };
