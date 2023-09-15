"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/user/user.route");
const book_route_1 = require("../modules/books/book.route");
const review_route_1 = require("../modules/reviews/review.route");
const auth_route_1 = require("../modules/auth/auth.route");
const wishList_route_1 = require("../modules/wishList/wishList.route");
const planRead_route_1 = require("../modules/planRead/planRead.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/books',
        route: book_route_1.BookRoutes,
    },
    {
        path: '/reviews',
        route: review_route_1.ReviewRoutes,
    },
    {
        path: '/wish',
        route: wishList_route_1.WishListRoutes,
    },
    {
        path: '/plan',
        route: planRead_route_1.PlanReadRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
