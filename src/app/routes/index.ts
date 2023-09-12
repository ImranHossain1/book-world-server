import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { BookRoutes } from '../modules/books/book.route';
import { ReviewRoutes } from '../modules/reviews/review.route';
import { AuthRoutes } from '../modules/auth/auth.route';

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
    path: '/auth',
    route: AuthRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
