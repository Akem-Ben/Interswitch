"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.generateAuthData = exports.authData = exports.generateAuthorizationHeader = void 0;
const node_forge_1 = __importDefault(require("node-forge"));
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
const crypto_1 = __importDefault(require("crypto"));
dotenv_1.default.config();
const publicModulus = process.env.publicModulus;
const publicExponent = process.env.publicExponent;
function generateAuthorizationHeader(httpMethod, resourceUrl, clientId, secretKey) {
    const Timestamp = Math.floor(Date.now() / 1000).toString();
    const nonceLength = 30;
    const nonceBytes = crypto_1.default.randomBytes(nonceLength);
    const nonce = nonceBytes.toString('base64');
    const signatureData = `${httpMethod}&${encodeURIComponent(resourceUrl)}&${Timestamp}&${nonce}&${clientId}&${secretKey}`;
    const Signature = crypto_1.default.createHash('sha1').update(signatureData).digest('hex');
    const Authorization = "interswitchAuth" + " " + Buffer.from(clientId).toString('base64');
    const SignatureMethod = "SHA1";
    const ContentType = "application/json";
    const response = { Authorization, ContentType, nonce, SignatureMethod, Signature, Timestamp };
    return response;
}
exports.generateAuthorizationHeader = generateAuthorizationHeader;
const authData = (options) => {
    const authString = "1Z" + options.card + 'Z' + options.pin + 'Z' + options.expiry + 'Z' + options.cvv;
    const hexing = toHex(authString);
    const authDataBytes = node_forge_1.default.util.hexToBytes(hexing);
    const clearSecureBytes = node_forge_1.default.util.createBuffer();
    const rsa = node_forge_1.default.pki.rsa;
    const modulos = new node_forge_1.default.jsbn.BigInteger(publicModulus, 16);
    const exp = new node_forge_1.default.jsbn.BigInteger(publicExponent, 16);
    const publicKey = rsa.setPublicKey(modulos, exp);
    const pexp = new node_forge_1.default.jsbn.BigInteger('4913cc0183c7a4a74b5405db55a15db8942f38c8cd7974b3644f6b625d22451e917345baa9750be9f8d10da47dbb45e602c86a6aa8bc1e7f7959561dbaaf35e78a8391009c8d86ee11da206f1ca190491bd765f04953765a2e55010d776044cb2716aee6b6f2f1dc38fce7ab0f4eafec8903a73555b4cf74de1a6bfc7f6a39a869838e3678dcbb96709068358621abf988e8049d5c07d128c5803e9502c05c3e38f94658480621a3e1c75fb4e39773e6eec50f5ef62958df864874ef0b00a0fb86f8382d1657381bc3c283567927f1f68d60205fd7ca1197265dd85c173badc1a15044f782602a9e14adc56728929c646c24fe8e10d26afc733158841d9ed4d1', 16);
    // const privateKey = rsa.setPrivateKey(modulos, pexp);
    clearSecureBytes.putBytes(authDataBytes);
    const clear = clearSecureBytes.getBytes();
    const authBytes = publicKey.encrypt(clear);
    const auth = node_forge_1.default.util.encode64(authBytes);
    return auth;
};
exports.authData = authData;
const toHex = function (str) {
    let hex = '';
    for (let i = 0; i < str.length; i++) {
        hex += '' + str.charCodeAt(i).toString(16);
    }
    return hex;
};
const generateAuthData = (options) => {
    let card = options.card || null;
    let expiry = options.expiry || null;
    let cvv = options.cvv || null;
    let pin = options.pin || null;
    let publicMod = options.publicModulus || null;
    let publicExpo = options.publicExponent || null;
    let SecureAuthData = {
        publicKeyModu: publicMod != null ? publicModulus : process.env.publicModulus,
        publicKeyExpon: publicExpo != null ? publicExponent : process.env.publicExponent,
        card: card,
        expiry: expiry,
        cvv: cvv,
        pin: pin
    };
    return (0, exports.authData)(SecureAuthData);
};
exports.generateAuthData = generateAuthData;
const generateToken = async () => {
    const auth = `Basic ${Buffer.from(`${process.env.clientId}:${process.env.secretKey}`).toString("base64")}`;
    const headers = {
        "Authorization": auth,
        "Content-Type": "application/x-www-form-urlencoded",
    };
    const response = await (0, axios_1.default)({
        method: "POST",
        url: "https://apps.qa.interswitchng.com/passport/oauth/token",
        headers: headers,
        params: { grant_type: "client_credentials" },
    });
    return await response.data;
};
exports.generateToken = generateToken;
