import { Request, Response } from 'express';

import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ReviewService } from './review.service';
import { IReview } from './review.interface';

const createReview = catchAsync(async (req: Request, res: Response) => {
  const { ...review } = req.body;
  const result = await ReviewService.createReview(review);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review is uploaded Successfully',
    data: result,
  });
});

/* const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const result = await ReviewService.getAllReviews(paginationOptions);

  sendResponse<IReview[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews found successfully!',
    meta: result.meta,
    data: result.data,
  });
}); */

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
