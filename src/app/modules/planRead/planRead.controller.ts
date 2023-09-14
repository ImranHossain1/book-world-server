/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express';

import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

import { User } from '../user/user.model';
import { PlanService } from './planRead.service';
import { IPlan } from './planRead.interface';
import ApiError from '../../../errors/ApiError';
import { Plan } from './planRead.model';

const createPlan = catchAsync(async (req: Request, res: Response) => {
  const bookId = req.params;
  const { ...planlist } = req.body;
  let user;
  //console.log('req.user', req.user);
  if (req.user?.userEmail) {
    const { userEmail } = req.user;
    user = await User.findOne({
      email: userEmail,
    });
  }

  planlist.user = user?._id;

  const myList = await PlanService.getUsersPlanList(planlist.user!);

  const isBookInPlanlist = myList?.some(item => {
    return item?.book?._id?.toString() === bookId.id.toString();
  });

  if (isBookInPlanlist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You already have this book in your Plan list'
    );
  }

  planlist.book = bookId.id;
  // console.log(review)
  const result = await PlanService.createPlan(planlist);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Plan Added Successfully',
    data: result,
  });
});

const getUsersPlanList = catchAsync(async (req: Request, res: Response) => {
  let user;
  if (req.user?.userEmail) {
    const { userEmail } = req.user;
    user = await User.findOne({
      email: userEmail,
    });
  }
  const id = user?._id;
  const result = await PlanService.getUsersPlanList(id!);
  sendResponse<IPlan[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Plan retrieved successfully!',
    data: result,
  });
});

const updatePlan = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  // console.log(updatedData);
  const result = await PlanService.updatePlan(id, updatedData);

  sendResponse<IPlan>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Plan updated successfully !',
    data: result,
  });
});

const deletePlan = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  let user;
  if (req.user?.userEmail) {
    const { userEmail } = req.user;
    user = await User.findOne({
      email: userEmail,
    });
  }
  const PlanUser = await Plan.findById(id);
  if (!user?._id.equals(String(PlanUser?.user))) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You are not authorized to delete this Plan'
    );
  }

  const result = await PlanService.deletePlan(id);
  sendResponse<IPlan>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Plan Deleted successfully!',
    data: result,
  });
});
export const PlanReadController = {
  createPlan,
  getUsersPlanList,
  deletePlan,
  updatePlan,
};
