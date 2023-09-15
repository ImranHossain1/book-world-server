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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishListController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
// import { ReviewService } from './wishList.service';
// import { IReview } from './wishList.interface';
const user_model_1 = require("../user/user.model");
const wishList_service_1 = require("./wishList.service");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const wishList_model_1 = require("./wishList.model");
// import ApiError from '../../../errors/ApiError';
// import { Review } from './wishList.model';
/* import { Review } from './review.model';
import ApiError from '../../../errors/ApiError'; */
const createWish = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const bookId = req.params;
    const wishlist = __rest(req.body, []);
    let user;
    //console.log('req.user', req.user);
    if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.userEmail) {
        const { userEmail } = req.user;
        user = yield user_model_1.User.findOne({
            email: userEmail,
        });
    }
    wishlist.user = user === null || user === void 0 ? void 0 : user._id;
    const myList = yield wishList_service_1.WishService.getUsersWishList(wishlist.user);
    const isBookInWishlist = myList === null || myList === void 0 ? void 0 : myList.some(item => {
        var _a, _b;
        // Assuming bookId.id and item.book._id are both of type string
        return ((_b = (_a = item === null || item === void 0 ? void 0 : item.book) === null || _a === void 0 ? void 0 : _a._id) === null || _b === void 0 ? void 0 : _b.toString()) === bookId.id.toString();
    });
    if (isBookInWishlist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'You already have this book in your wish list');
    }
    wishlist.book = bookId.id;
    // console.log(review)
    const result = yield wishList_service_1.WishService.createWish(wishlist);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Wish Added Successfully',
        data: result,
    });
}));
const getUsersWishList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    let user;
    if ((_b = req.user) === null || _b === void 0 ? void 0 : _b.userEmail) {
        const { userEmail } = req.user;
        user = yield user_model_1.User.findOne({
            email: userEmail,
        });
    }
    const id = user === null || user === void 0 ? void 0 : user._id;
    const result = yield wishList_service_1.WishService.getUsersWishList(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Wish retrieved successfully!',
        data: result,
    });
}));
const deleteWish = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const id = req.params.id;
    let user;
    if ((_c = req.user) === null || _c === void 0 ? void 0 : _c.userEmail) {
        const { userEmail } = req.user;
        user = yield user_model_1.User.findOne({
            email: userEmail,
        });
    }
    const wishUser = yield wishList_model_1.Wish.findById(id);
    if (!(user === null || user === void 0 ? void 0 : user._id.equals(String(wishUser === null || wishUser === void 0 ? void 0 : wishUser.user)))) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'You are not authorized to delete this wish');
    }
    const result = yield wishList_service_1.WishService.deleteWish(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Wish Deleted successfully!',
        data: result,
    });
}));
exports.WishListController = {
    createWish,
    getUsersWishList,
    deleteWish,
};
