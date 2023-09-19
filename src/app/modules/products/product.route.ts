import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { ProductController } from './product.controller';
import { ProductValidation } from './product.validation';

const router = express.Router();

router.post(
  '/create-product',
  validateRequest(ProductValidation.createProductZodSchema),
  ProductController.createProduct
);
router.get(
  '/product-details/:id',

  ProductController.getSingleProduct
);
router.patch(
  '/update_product/:id',
  validateRequest(ProductValidation.updateProductZodSchema),
  ProductController.updateProduct
);
router.delete('/:id', ProductController.deleteProduct);
router.get('/', ProductController.getAllProducts);

export const ProductRoutes = router;
