"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishService = void 0;
const wishList_model_1 = require("./wishList.model");
const createWish = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (yield (yield wishList_model_1.Wish.create(payload)).populate('book')).populate('user');
    return result;
});
const getUsersWishList = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wishList_model_1.Wish.find({ user: id })
        .populate('book')
        .populate('user');
    return result;
});
const deleteWish = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wishList_model_1.Wish.findByIdAndDelete(id);
    return result;
});
exports.WishService = {
    createWish,
    getUsersWishList,
    deleteWish,
};
