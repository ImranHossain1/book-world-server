import express from 'express';
// import validateRequest from '../../middlewares/validateRequest';
import { ReviewController } from './review.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewValidation } from './review.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-review/:id',
  auth(),
  //validateRequest(ReviewValidation.createReviewZodSchema),
  ReviewController.createReview
);
router.get('/:id', ReviewController.getAllReviewsForSingleBook);
router.patch(
  '/:id',
  auth(),
  validateRequest(ReviewValidation.updateReviewZodSchema),
  ReviewController.updateReview
);
router.delete(
  '/:id',
  auth(),
  ReviewController.deleteReview
);
export const ReviewRoutes = router;
