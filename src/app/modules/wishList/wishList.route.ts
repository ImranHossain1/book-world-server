import express from 'express';
// import validateRequest from '../../middlewares/validateRequest';

import auth from '../../middlewares/auth';
import { WishListController } from './wishList.controller';

const router = express.Router();

router.post('/create-wish/:id', auth(), WishListController.createWish);
router.get('/', auth(), WishListController.getUsersWishList);

router.delete('/:id', auth(), WishListController.deleteWish);
export const WishListRoutes = router;
