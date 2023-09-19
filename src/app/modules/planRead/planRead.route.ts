import express from 'express';
// import validateRequest from '../../middlewares/validateRequest';

import auth from '../../middlewares/auth';
import { PlanReadController } from './planRead.controller';

const router = express.Router();

router.post('/:id', auth(), PlanReadController.createPlan);
router.patch('/:id', auth(), PlanReadController.updatePlan);
router.get('/', auth(), PlanReadController.getUsersPlanList);

router.delete('/:id', auth(), PlanReadController.deletePlan);
export const PlanReadRoutes = router;
