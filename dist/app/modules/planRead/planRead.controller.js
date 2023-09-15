"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanReadController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../user/user.model");
const planRead_service_1 = require("./planRead.service");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const planRead_model_1 = require("./planRead.model");
const createPlan = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const bookId = req.params;
    const planlist = __rest(req.body, []);
    let user;
    //console.log('req.user', req.user);
    if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.userEmail) {
        const { userEmail } = req.user;
        user = yield user_model_1.User.findOne({
            email: userEmail,
        });
    }
    planlist.user = user === null || user === void 0 ? void 0 : user._id;
    const myList = yield planRead_service_1.PlanService.getUsersPlanList(planlist.user);
    const isBookInPlanlist = myList === null || myList === void 0 ? void 0 : myList.some(item => {
        var _a, _b;
        return ((_b = (_a = item === null || item === void 0 ? void 0 : item.book) === null || _a === void 0 ? void 0 : _a._id) === null || _b === void 0 ? void 0 : _b.toString()) === bookId.id.toString();
    });
    if (isBookInPlanlist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'You already have this book in your Plan list');
    }
    planlist.book = bookId.id;
    // console.log(review)
    const result = yield planRead_service_1.PlanService.createPlan(planlist);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Plan Added Successfully',
        data: result,
    });
}));
const getUsersPlanList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    let user;
    if ((_b = req.user) === null || _b === void 0 ? void 0 : _b.userEmail) {
        const { userEmail } = req.user;
        user = yield user_model_1.User.findOne({
            email: userEmail,
        });
    }
    const id = user === null || user === void 0 ? void 0 : user._id;
    const result = yield planRead_service_1.PlanService.getUsersPlanList(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Plan retrieved successfully!',
        data: result,
    });
}));
const updatePlan = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    // console.log(updatedData);
    const result = yield planRead_service_1.PlanService.updatePlan(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Plan updated successfully !',
        data: result,
    });
}));
const deletePlan = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const id = req.params.id;
    let user;
    if ((_c = req.user) === null || _c === void 0 ? void 0 : _c.userEmail) {
        const { userEmail } = req.user;
        user = yield user_model_1.User.findOne({
            email: userEmail,
        });
    }
    const PlanUser = yield planRead_model_1.Plan.findById(id);
    if (!(user === null || user === void 0 ? void 0 : user._id.equals(String(PlanUser === null || PlanUser === void 0 ? void 0 : PlanUser.user)))) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'You are not authorized to delete this Plan');
    }
    const result = yield planRead_service_1.PlanService.deletePlan(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Plan Deleted successfully!',
        data: result,
    });
}));
exports.PlanReadController = {
    createPlan,
    getUsersPlanList,
    deletePlan,
    updatePlan,
};
