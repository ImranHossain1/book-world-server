import express from 'express';
// import validateRequest from '../../middlewares/validateRequest';
import { ReviewController } from './review.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewValidation } from './review.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/users';

const router = express.Router();

router.post(
  '/create-review',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.READER),
  validateRequest(ReviewValidation.createReviewZodSchema),
  ReviewController.createReview
);
router.get('/:id', ReviewController.getAllReviewsForSingleBook);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.READER),
  validateRequest(ReviewValidation.updateReviewZodSchema),
  ReviewController.updateReview
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.READER),
  ReviewController.deleteReview
);
export const ReviewRoutes = router;
