/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { SortOrder } from 'mongoose';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../helpers/paginationHelpers';
import { productSearchableFields } from './product.constant';
import { IProduct, IProductFilter, IReview } from './product.interface';
import { Product } from './product.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createProduct = async (payload: IProduct): Promise<IProduct | null> => {
  const result = await Product.create(payload);
  return result;
};

const getAllProducts = async (
  filters: IProductFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IProduct[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: productSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder, minPrice, maxPrice } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions: {
    $and?: any[];
    price?: { $gte?: number; $lte?: number };
  } = {};

  if (andConditions.length > 0) {
    whereConditions.$and = andConditions;
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    whereConditions.price = {};

    if (minPrice !== undefined) {
      whereConditions.price.$gte = minPrice;
    }

    if (maxPrice !== undefined) {
      whereConditions.price.$lte = maxPrice;
    }
  }

  const result = await Product.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Product.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleProduct = async (id: string): Promise<IProduct | null> => {
  const result = await Product.findById(id);
  return result;
};

const updateProduct = async (
  id: string,
  payload: Partial<IProduct>,
  review: IReview
): Promise<IProduct | null> => {
  const isExist = await Product.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product Not Found');
  }
  const { ...ProductData } = payload;
  const updatedProductData: Partial<IProduct> = { ...ProductData };

  let result;
  if (review) {
    if (isExist) {
      const reviews = [isExist.reviews ?? [], review];
      const totalRating = reviews.reduce((sum, r) => sum + r.rating!, 0);
      const averageRating = totalRating / reviews.length;
      updatedProductData.rating = averageRating;
    } else {
      updatedProductData.rating = review.rating;
    }
    result = await Product.findByIdAndUpdate(
      id,
      {
        $push: { reviews: review },
      },
      { new: true }
    );
  }

  result = await Product.findOneAndUpdate({ _id: id }, updatedProductData, {
    new: true,
  });
  return result;
};

const deleteProduct = async (id: string): Promise<IProduct | null> => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};
export const ProductService = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
