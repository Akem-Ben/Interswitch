"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateOtp = exports.confirmTransaction = exports.payWithCard = void 0;
const utils_1 = require("../utils/utils");
const authentication_1 = require("../config/authentication");
const utils_2 = require("../utils/utils");
const merchantCode = process.env.merchantCode;
const payItemId = process.env.payItemId;
const dataRef = process.env.dataRef;
const clientId = process.env.clientId;
const secretKey = process.env.secretKey;
const apiUrl = process.env.apiUrl;
const payWithCard = async (req, res) => {
    try {
        //fetch data from the input
        const { customerId, amount, transactionRef, currency, card, pin, expiry, cvv, } = req.body;
        //extract the data needed for the authData
        const extracts = { card, pin, expiry, cvv };
        //generate the authData
        const authData = await (0, utils_2.generateAuthData)(extracts);
        //generate the token
        const token = await (0, utils_1.generateToken)();
        //generate the authorization
        const authorization = `Bearer ${token.access_token}`;
        const paymentDetails = { customerId, amount, transactionRef, currency, authData };
        //include the interswitch link for the api
        const resourceUrl = "https://qa.interswitchng.com/api/v3/purchases";
        //create the reaquired headers
        const headers = {
            "Authorization": authorization,
            "Content-Type": "application/json"
        };
        //initialize the response and call the method for post requests contained in the authentication.ts file in the config folder
        const response = await (0, authentication_1.makeApiPostRequests)("POST", resourceUrl, headers, paymentDetails);
        //return the response in json format
        return res.status(200).json({ message: response.data });
    }
    catch (error) {
        console.log(error.message);
    }
};
exports.payWithCard = payWithCard;
const confirmTransaction = async (req, res) => {
    try {
        //Generate the token
        const token = await (0, utils_1.generateToken)();
        //Set the authorization
        const authorization = `Bearer ${token.access_token}`;
        //set the headers
        const headers = {
            "Authorization": authorization,
            "Content-Type": 'application/json'
        };
        //set the query params
        const params = {
            "merchantCode": process.env.merchantCode,
            "transactionReference": req.body
        };
        //set resourceUrl
        const resourceUrl = `https://qa.interswitchng.com/collections/api/v1/gettransaction.json?merchantcode={merchantcode}&transactionreference={reference}&amount={amount}`;
        //Get the result by calling the mmethod responsible for making get requests from the authentication.ts in the config folder
        const result = await (0, authentication_1.makeApiGetRequests)("GET", resourceUrl, headers, params);
        return res.status(200).json({ message: result.data });
    }
    catch (error) {
        console.log(error);
    }
};
exports.confirmTransaction = confirmTransaction;
const authenticateOtp = async (req, res) => {
    try {
        //generate the token
        const token = await (0, utils_1.generateToken)();
        //create the bearer authorization
        const Authorization = `Bearer ${token.access_token}`;
        //create headers
        const headers = {
            "Accept": 'application/json',
            "Authorization": Authorization,
            "Content-Type": 'application/json'
        };
        //get the resourceUrl
        const resourceUrl = "https://qa.interswitchng.com/api/v3/purchases/otps/auths";
        //fetch the data from the input
        const { paymentId = req.body.paymentId, otp = req.body.otp, transactionId = req.body.transactionId } = req.body;
        //Store required data in a variable
        const data = { paymentId, otp, transactionId };
        //get a response by calling the method responsible for making axios post requests from the authentication.ts file in the config folder
        const response = await (0, authentication_1.makeApiPostRequests)("POST", resourceUrl, headers, data);
        return res.status(200).json({ message: response.data });
        // return response
    }
    catch (err) {
        console.log(err.message);
    }
};
exports.authenticateOtp = authenticateOtp;
