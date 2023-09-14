import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { BookValidation } from './book.validation';
import { BookController } from './book.controller';
// import auth from '../../middlewares/auth';
// import { ENUM_USER_ROLE } from '../../../enums/users';

const router = express.Router();

router.post(
  '/create-book',
  validateRequest(BookValidation.createBookZodSchema),
  //auth(ENUM_USER_ROLE.ADMIN),
  BookController.createBook
);
router.get(
  '/book-details/:id',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.READER),
  BookController.getSingleBook
);
router.patch(
  '/update_book/:id',
  validateRequest(BookValidation.updateBookZodSchema),
  //auth(ENUM_USER_ROLE.ADMIN),
  BookController.updateBook
);
router.delete('/:id', BookController.deleteBook);
router.get('/', BookController.getAllBooks);

export const BookRoutes = router;
