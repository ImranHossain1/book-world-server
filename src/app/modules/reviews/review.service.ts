import { IReview } from './review.interface';
import { Review } from './review.model';

const createReview = async (payload: IReview) => {
  const result = await (
    await (await Review.create(payload)).populate('book')
  ).populate('user');
  return result;
};

const getAllReviewsForSingleBook = async (
  id: string
): Promise<IReview[] | null> => {
  const result = await Review.find({ book: id });
  return result;
};

const updateReview = async (
  id: string,
  payload: Partial<IReview>
): Promise<IReview | null> => {
  const { message } = payload;
  const updatedReviewData: Partial<IReview> = { message };

  const result = await Review.findOneAndUpdate({ _id: id }, updatedReviewData, {
    new: true,
  });
  return result;
};

const deleteReview = async (id: string): Promise<IReview | null> => {
  const result = await Review.findByIdAndDelete(id);
  return result;
};
export const ReviewService = {
  createReview,
  getAllReviewsForSingleBook,
  updateReview,
  deleteReview,
};
