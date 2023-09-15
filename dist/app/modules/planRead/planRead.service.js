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
exports.PlanService = void 0;
const planRead_model_1 = require("./planRead.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createPlan = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (yield (yield planRead_model_1.Plan.create(payload)).populate('book')).populate('user');
    return result;
});
const getUsersPlanList = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield planRead_model_1.Plan.find({ user: id })
        .populate('book')
        .populate('user');
    return result;
});
const updatePlan = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield planRead_model_1.Plan.findOne({ _id: id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Book is Not Found');
    }
    const BookData = __rest(payload, []);
    const updatedPlanData = Object.assign({}, BookData);
    const result = yield planRead_model_1.Plan.findOneAndUpdate({ _id: id }, updatedPlanData, {
        new: true,
    });
    return result;
});
const deletePlan = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield planRead_model_1.Plan.findByIdAndDelete(id);
    return result;
});
exports.PlanService = {
    createPlan,
    getUsersPlanList,
    deletePlan,
    updatePlan,
};
