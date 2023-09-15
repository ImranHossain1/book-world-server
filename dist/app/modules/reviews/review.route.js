"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
// import validateRequest from '../../middlewares/validateRequest';
const review_controller_1 = require("./review.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const review_validation_1 = require("./review.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/create-review/:id', (0, auth_1.default)(), 
//validateRequest(ReviewValidation.createReviewZodSchema),
review_controller_1.ReviewController.createReview);
router.get('/:id', review_controller_1.ReviewController.getAllReviewsForSingleBook);
router.patch('/:id', (0, auth_1.default)(), (0, validateRequest_1.default)(review_validation_1.ReviewValidation.updateReviewZodSchema), review_controller_1.ReviewController.updateReview);
router.delete('/:id', (0, auth_1.default)(), review_controller_1.ReviewController.deleteReview);
exports.ReviewRoutes = router;
