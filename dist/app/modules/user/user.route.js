"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const router = express_1.default.Router();
router.post('/signup', (0, validateRequest_1.default)(user_validation_1.UserValidation.createUserZodSchema), 
//auth(ENUM_USER_ROLE.ADMIN),
user_controller_1.UserController.createUser);
router.get('/my-profile', 
// auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER),
user_controller_1.UserController.getMyProfile);
// router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser);
router.patch('/my-profile', 
// auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER),
user_controller_1.UserController.updateMyProfile);
router.patch('/:id', (0, validateRequest_1.default)(user_validation_1.UserValidation.updateUserZodSchema), 
// auth(ENUM_USER_ROLE.ADMIN),
user_controller_1.UserController.updateUser);
router.delete('/:id', //auth(ENUM_USER_ROLE.ADMIN),
user_controller_1.UserController.deleteUser);
router.get('/', //auth(ENUM_USER_ROLE.ADMIN),
user_controller_1.UserController.getAllUsers);
exports.UserRoutes = router;
