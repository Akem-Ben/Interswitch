"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cardPayment_1 = require("../controllers/card payments/cardPayment");
const transfers_1 = require("../controllers/transfers/transfers");
const visa_1 = require("../controllers/visa payments/visa");
const utils_1 = require("../utils/utils");
const router = express_1.default.Router();
//card transactions
router.post('/card-payments', cardPayment_1.payWithCard);
router.get('/payments-confirmation', cardPayment_1.confirmTransaction);
router.post('/otp-authentication', cardPayment_1.authenticateOtp);
router.post('/token', utils_1.generateToken);
router.post('/resend-otp', cardPayment_1.resendOtp);
//Route for visa transactions
router.get('/visa-auth', visa_1.authorizeVisaTransactions);
//Routes for Transfers
router.post('/trans', transfers_1.virtualTransfer);
exports.default = router;
