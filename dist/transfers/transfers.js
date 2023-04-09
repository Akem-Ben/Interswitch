"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transfer = void 0;
const utils_1 = require("../utils/utils");
const transfer = async (req, res) => {
    try {
        const token = await (0, utils_1.generateToken)();
        return res.status(200).json({ message: token.access_token });
    }
    catch (error) {
        console.log(error.message);
    }
};
exports.transfer = transfer;
