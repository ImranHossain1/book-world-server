import { Request, Response } from 'express';

import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ReviewService } from './review.service';
import { IReview } from './review.interface';
import { User } from '../user/user.model';
import ApiError from '../../../errors/ApiError';
import { Review } from './review.model';
/* import { Review } from './review.model';
import ApiError from '../../../errors/ApiError'; */

const createReview = catchAsync(async (req: Request, res: Response) => {
  const bookId = req.params;
  const { ...review } = req.body;
  let user;
  //console.log('req.user', req.user);
  if (req.user?.userEmail) {
    const { userEmail } = req.user;
    user = await User.findOne({
      email: userEmail,
    });
  }

  review.user = user?._id;
  review.book = bookId.id;
  const result = await ReviewService.createReview(review);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review is uploaded Successfully',
    data: result,
  });
});

const getAllReviewsForSingleBook = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await ReviewService.getAllReviewsForSingleBook(id);
    sendResponse<IReview[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review retrieved successfully!',
      data: result,
    });
  }
);

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  let user;
  if (req.user?.userEmail) {
    const { userEmail } = req.user;
    user = await User.findOne({
      email: userEmail,
    });
  }

  const reviewUser = await Review.findById(id);
  //console.log(reviewUser);
  if (reviewUser) {
    if (!user?._id.equals(reviewUser?.user.toString())) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'You are not authorized to update this review'
      );
    }
  }

  const result = await ReviewService.updateReview(id, updatedData);

  sendResponse<IReview>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review updated successfully !',
    data: result,
  });
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  let user;
  if (req.user?.userEmail) {
    const { userEmail } = req.user;
    user = await User.findOne({
      email: userEmail,
    });
  }
  const reviewUser = await Review.findById(id);
  if (!user?._id.equals(String(reviewUser?.user))) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You are not authorized to Delete this review'
    );
  }

  const result = await ReviewService.deleteReview(id);
  sendResponse<IReview>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review Deleted successfully!',
    data: result,
  });
});
export const ReviewController = {
  createReview,
  getAllReviewsForSingleBook,
  updateReview,
  deleteReview,
};
