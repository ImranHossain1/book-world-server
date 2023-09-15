"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const book_validation_1 = require("./book.validation");
const book_controller_1 = require("./book.controller");
// import auth from '../../middlewares/auth';
// import { ENUM_USER_ROLE } from '../../../enums/users';
const router = express_1.default.Router();
router.post('/create-book', (0, validateRequest_1.default)(book_validation_1.BookValidation.createBookZodSchema), 
//auth(ENUM_USER_ROLE.ADMIN),
book_controller_1.BookController.createBook);
router.get('/book-details/:id', 
// auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.READER),
book_controller_1.BookController.getSingleBook);
router.patch('/update_book/:id', (0, validateRequest_1.default)(book_validation_1.BookValidation.updateBookZodSchema), 
//auth(ENUM_USER_ROLE.ADMIN),
book_controller_1.BookController.updateBook);
router.delete('/:id', book_controller_1.BookController.deleteBook);
router.get('/', book_controller_1.BookController.getAllBooks);
exports.BookRoutes = router;
