import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { BookValidation } from './book.validation';
import { BookController } from './book.controller';

const router = express.Router();

router.post(
  '/create-book',
  validateRequest(BookValidation.createBookZodSchema),
  //auth(ENUM_USER_ROLE.SELLER),
  BookController.createBook
);
router.get('/:id', BookController.getSingleBook);
router.patch(
  '/:id',
  validateRequest(BookValidation.updateBookZodSchema),
  //auth(ENUM_USER_ROLE.SELLER),
  BookController.updateBook
);
router.delete('/:id', BookController.deleteBook);
router.get('/', BookController.getAllBooks);

export const BookRoutes = router;
