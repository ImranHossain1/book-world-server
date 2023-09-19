import { Types } from 'mongoose';
import { IWish } from './wishList.interface';
import { Wish } from './wishList.model';

const createWish = async (payload: IWish) => {
  const result = await (
    await (await Wish.create(payload)).populate('book')
  ).populate('user');
  return result;
};

const getUsersWishList = async (
  id: Types.ObjectId
): Promise<IWish[] | null> => {
  const result = await Wish.find({ user: id })
    .populate('book')
    .populate('user');
  return result;
};

const deleteWish = async (id: string): Promise<IWish | null> => {
  const result = await Wish.findByIdAndDelete(id);

  return result;
};
export const WishService = {
  createWish,
  getUsersWishList,
  deleteWish,
};
