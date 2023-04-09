"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.virtualTransfer = void 0;
const utils_1 = require("../../utils/utils");
const methods_1 = require("../../config/methods");
const virtualTransfer = async (req, res) => {
    try {
        //generate token
        const token = await (0, utils_1.generateToken)();
        //initialize the authorization for the header
        const authorization = `Bearer ${token.access_token}`;
        //call the merchant code from the env file
        const merchantCode = process.env.merchantCode;
        //call the payableItemId from the env file
        const payableCode = process.env.payItemId;
        //fetch data from the input
        const { currencyCode, amount, accountName, transactionReference } = req.body;
        //store all required data in a variable
        const data = { currencyCode, amount, accountName, transactionReference, merchantCode, payableCode };
        //initialize the header
        const headers = {
            "Authorization": authorization,
            "Accept": "application/json",
            "Content-Type": "application/json"
        };
        //initialize the api url
        const resourceUrl = `https://qa.interswitchng.com/paymentgateway/api/v1/virtualaccounts/transaction`;
        //store the result and call the method responsible for making post requests
        const result = await (0, methods_1.makeApiPostRequests)('POST', resourceUrl, headers, data);
        return res.status(200).json({ message: result.data });
    }
    catch (error) {
        console.log(error.message);
    }
};
exports.virtualTransfer = virtualTransfer;
