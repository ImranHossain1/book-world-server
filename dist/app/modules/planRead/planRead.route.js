"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanReadRoutes = void 0;
const express_1 = __importDefault(require("express"));
// import validateRequest from '../../middlewares/validateRequest';
const auth_1 = __importDefault(require("../../middlewares/auth"));
const planRead_controller_1 = require("./planRead.controller");
const router = express_1.default.Router();
router.post('/:id', (0, auth_1.default)(), planRead_controller_1.PlanReadController.createPlan);
router.patch('/:id', (0, auth_1.default)(), planRead_controller_1.PlanReadController.updatePlan);
router.get('/', (0, auth_1.default)(), planRead_controller_1.PlanReadController.getUsersPlanList);
router.delete('/:id', (0, auth_1.default)(), planRead_controller_1.PlanReadController.deletePlan);
exports.PlanReadRoutes = router;
