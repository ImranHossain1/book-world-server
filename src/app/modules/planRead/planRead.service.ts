import { Types } from 'mongoose';
import { IPlan } from './planRead.interface';
import { Plan } from './planRead.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createPlan = async (payload: IPlan) => {
  const result = await (
    await (await Plan.create(payload)).populate('book')
  ).populate('user');
  return result;
};

const getUsersPlanList = async (
  id: Types.ObjectId
): Promise<IPlan[] | null> => {
  const result = await Plan.find({ user: id })
    .populate('book')
    .populate('user');
  return result;
};
const updatePlan = async (
  id: string,
  payload: Partial<IPlan>
): Promise<IPlan | null> => {
  const isExist = await Plan.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book is Not Found');
  }
  const { ...BookData } = payload;
  const updatedPlanData: Partial<IPlan> = { ...BookData };

  const result = await Plan.findOneAndUpdate({ _id: id }, updatedPlanData, {
    new: true,
  });

  return result;
};
const deletePlan = async (id: string): Promise<IPlan | null> => {
  const result = await Plan.findByIdAndDelete(id);

  return result;
};
export const PlanService = {
  createPlan,
  getUsersPlanList,
  deletePlan,
  updatePlan,
};
