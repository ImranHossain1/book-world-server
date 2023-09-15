"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishListRoutes = void 0;
const express_1 = __importDefault(require("express"));
// import validateRequest from '../../middlewares/validateRequest';
const auth_1 = __importDefault(require("../../middlewares/auth"));
const wishList_controller_1 = require("./wishList.controller");
const router = express_1.default.Router();
router.post('/create-wish/:id', (0, auth_1.default)(), wishList_controller_1.WishListController.createWish);
router.get('/', (0, auth_1.default)(), wishList_controller_1.WishListController.getUsersWishList);
router.delete('/:id', (0, auth_1.default)(), wishList_controller_1.WishListController.deleteWish);
exports.WishListRoutes = router;
