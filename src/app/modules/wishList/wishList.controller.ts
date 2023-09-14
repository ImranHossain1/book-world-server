/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express';

import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
// import { ReviewService } from './wishList.service';
// import { IReview } from './wishList.interface';
import { User } from '../user/user.model';
import { WishService } from './wishList.service';
import { IWish } from './wishList.interface';
import ApiError from '../../../errors/ApiError';
import { Types } from 'mongoose';
import { Wish } from './wishList.model';
// import ApiError from '../../../errors/ApiError';
// import { Review } from './wishList.model';
/* import { Review } from './review.model';
import ApiError from '../../../errors/ApiError'; */

const createWish = catchAsync(async (req: Request, res: Response) => {
  const bookId = req.params;
  const { ...wishlist } = req.body;
  let user;
  //console.log('req.user', req.user);
  if (req.user?.userEmail) {
    const { userEmail } = req.user;
    user = await User.findOne({
      email: userEmail,
    });
  }

  wishlist.user = user?._id;

  const myList = await WishService.getUsersWishList(wishlist.user!);

  const isBookInWishlist = myList?.some(item => {
    // Assuming bookId.id and item.book._id are both of type string
    return item?.book?._id?.toString() === bookId.id.toString();
  });

  if (isBookInWishlist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You already have this book in your wish list'
    );
  }

  wishlist.book = bookId.id;
  // console.log(review)
  const result = await WishService.createWish(wishlist);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wish Added Successfully',
    data: result,
  });
});

const getUsersWishList = catchAsync(async (req: Request, res: Response) => {
  let user;
  if (req.user?.userEmail) {
    const { userEmail } = req.user;
    user = await User.findOne({
      email: userEmail,
    });
  }
  const id = user?._id;
  const result = await WishService.getUsersWishList(id!);
  sendResponse<IWish[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wish retrieved successfully!',
    data: result,
  });
});

const deleteWish = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  let user;
  if (req.user?.userEmail) {
    const { userEmail } = req.user;
    user = await User.findOne({
      email: userEmail,
    });
  }
  const wishUser = await Wish.findById(id);
  if (!user?._id.equals(String(wishUser?.user))) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You are not authorized to delete this wish'
    );
  }

  const result = await WishService.deleteWish(id);
  sendResponse<IWish>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wish Deleted successfully!',
    data: result,
  });
});
export const WishListController = {
  createWish,
  getUsersWishList,
  deleteWish,
};
