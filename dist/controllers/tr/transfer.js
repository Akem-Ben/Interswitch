"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import dotenv from 'dotenv'
// dotenv.config()
// export const staticTransfer = async (req:Request, res:Response) => {
//     try{
//         //generate token
//         const token = await generateToken()
//         //set authorization for the header
//         const authorization = `Bearer ${token.access_token}`
//         //set url
//         const resourceUrl = `https://qa.interswitchng.com/paymentgateway/api/v1/payable/virtualaccount`
//         //set the headers
//         const header = {
//             "Accept": "application/json",
//             "Authorization": authorization,
//             "Content-Type": "application/json"
//         }
//         //initialize the result and call the post method
//         const result = await makeApiPostRequests("POST", resourceUrl, header)
//         return res.status(200).json({message:result.data})
//     }catch(error:any){
//         console.log(error.message)
//     }
// }
//{
//     "currencyCode": "566",
//     "amount": "10",
//     "accountName": "This transaction",
//     "transactionReference": "123456xxx"
// }
// export const virtualTransfer = async (req:Request, res:Response) => {
//     try{
//         //Generate token
//         const token = await generateToken()
//         return res.status(200).json({message: token.access_token})
//         //Generate authorizaton
//         // const authorization = `Bearer ${token.access_token}`
//         // console.log(authorization)
//         // //fetch merchant code
//         // const merchantCode = process.env.merchantCode
//         // console.log(merchantCode)
//         // //fetch payable code
//         // const payableCode = process.env.payable_id
//         // console.log(payableCode)
//         // //get data from input
//         // const { currencyCode, amount, accountName, transactionReference } = req.body
//         // console.log(req.body)
//         // //get all required data into a single variable
//         // const data = { currencyCode, amount, accountName, transactionReference, merchantCode, payableCode }
//         // console.log(data)
//         // //create headers
//         // const headers = {
//         //     "Accept": "application/json",
//         //     "Authorization": authorization,
//         //     "Content-Type": "application/json"
//         // }
//         // console.log(headers)
//         //initiate the resource url
//         // const resourceUrl = `https://qa.interswitchng.com/paymentgateway/api/v1/virtualaccounts/transaction`
//         // //initialize result and call the post method
//         // const result = await makeApiPostRequests('POST', resourceUrl, headers, data)
//         // return res.status(200).json({message:result.data})
//     }catch(error:any){
//         console.log(error.message)
//     }
// }
