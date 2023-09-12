import express from 'express';
// import validateRequest from '../../middlewares/validateRequest';
import { ReviewController } from './review.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewValidation } from './review.validation';

const router = express.Router();

router.post(
  '/create-review',
  validateRequest(ReviewValidation.createReviewZodSchema),
  //auth(ENUM_USER_ROLE.BUYER),
  ReviewController.createReview
);
router.get('/:id', ReviewController.getAllReviewsForSingleBook);
router.patch(
  '/:id',
  validateRequest(ReviewValidation.updateReviewZodSchema),
  ReviewController.updateReview
);
router.delete('/:id', ReviewController.deleteReview);
export const ReviewRoutes = router;
