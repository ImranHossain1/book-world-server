import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { BookRoutes } from '../modules/books/book.route';
import { ReviewRoutes } from '../modules/reviews/review.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { WishListRoutes } from '../modules/wishList/wishList.route';
import { PlanReadRoutes, PlanReadtRoutes } from '../modules/planRead/planRead.route';

const router = express.Router();
const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/books',
    route: BookRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
  {
    path: '/wish',
    route: WishListRoutes,
  },
  {
    path: '/plan',
    route: PlanReadRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
