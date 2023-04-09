"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeApiGetRequests = exports.makeApiPostRequests = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const makeApiPostRequests = async (httpMethod, resourceUrl, headers, info) => {
    const response = await (0, axios_1.default)({
        method: httpMethod,
        url: resourceUrl,
        headers: headers,
        data: info,
    });
    return response;
};
exports.makeApiPostRequests = makeApiPostRequests;
const makeApiGetRequests = async (httpMethod, resourceUrl, headers, params, info) => {
    const response = await (0, axios_1.default)({
        method: httpMethod,
        url: resourceUrl,
        headers: headers,
        params: params,
        data: info
    });
    return response;
};
exports.makeApiGetRequests = makeApiGetRequests;
