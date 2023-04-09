import { Request, Response } from "express";
import { makeApiGetRequests } from '../../config/methods'
import dotenv from 'dotenv'

dotenv.config()


//=======THIS FUNCTION HAS NOT BEEN TESTED YET========
export const authorizeVisaTransactions = async(req:Request, res:Response) => {
    try{

        //fetch data from input
        const {
            paymentId,
            transactionId,
            eciFlag
        } = req.body

        //initialise data into a variable
        const data = {paymentId, transactionId, eciFlag}

        //initialize the url in a variable
        const resourceUrl =`https://qa.interswitchng.com/api/v3/purchases/otps/auths`

        //set the headers
        const headers ={
            "Accept": 'application/json',
            'Content-Type': 'application/json'
        }

        //Get the result by calling the mmethod responsible for making get requests from the methods.ts in the config folder
        const result = await makeApiGetRequests("GET", resourceUrl, headers, data)
        return res.status(200).json({message: result.data})
    }catch(error:any){
        console.log(error.message)
    }
}