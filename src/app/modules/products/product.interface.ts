import { Model } from 'mongoose';

export type ICategory =
  | 'processor'
  | 'motherboard'
  | 'ram'
  | 'powerSupplyUnit'
  | 'storageDevice'
  | 'monitor'
  | 'other';

export type IStatus = 'In Stock' | 'Out of Stock';

export type IReview = {
  user: string;
  rating: number;
  comment: string;
  date: string;
};

export type IKeyFeatures = {
  [key: string]: string | number;
};

export type IProduct = {
  image: string;
  product_name: string;
  category: ICategory;
  status?: IStatus;
  rating?: number;
  price: string;
  description: string;
  key_features?: IKeyFeatures;
  reviews?: IReview[];
};

export type ProductModel = Model<IProduct, Record<string, unknown>>;

export type IProductFilter = {
  searchTerm?: string;
  productName?: string;
  category?: ICategory;
  status?: IStatus;
};
