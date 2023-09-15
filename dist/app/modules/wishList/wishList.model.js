"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wish = void 0;
const mongoose_1 = require("mongoose");
const WishSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'book',
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Wish = (0, mongoose_1.model)('wish', WishSchema);
