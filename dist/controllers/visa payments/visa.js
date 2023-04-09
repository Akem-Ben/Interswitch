"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeVisaTransactions = void 0;
const methods_1 = require("../../config/methods");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//=======THIS FUNCTION HAS NOT BEEN TESTED YET========
const authorizeVisaTransactions = async (req, res) => {
    try {
        //fetch data from input
        const { paymentId, transactionId, eciFlag } = req.body;
        //initialise data into a variable
        const data = { paymentId, transactionId, eciFlag };
        //initialize the url in a variable
        const resourceUrl = `https://qa.interswitchng.com/api/v3/purchases/otps/auths`;
        //set the headers
        const headers = {
            "Accept": 'application/json',
            'Content-Type': 'application/json'
        };
        //Get the result by calling the mmethod responsible for making get requests from the methods.ts in the config folder
        const result = await (0, methods_1.makeApiGetRequests)("GET", resourceUrl, headers, data);
        return res.status(200).json({ message: result.data });
    }
    catch (error) {
        console.log(error.message);
    }
};
exports.authorizeVisaTransactions = authorizeVisaTransactions;
