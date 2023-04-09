import { Request, Response } from "express";
import { generateToken } from '../../utils/utils';
import { makeApiPostRequests, makeApiGetRequests } from '../../config/methods'
import { generateAuthData } from '../../utils/utils'

export const payWithCard = async (req: Request, res: Response) => {
    try {

    //fetch data from the input
    const {
      customerId,
      amount,
      transactionRef,
      currency,
      card,
      pin,
      expiry,
      cvv,
    } = req.body

    //extract the data needed for the authData
    const extracts = { card, pin, expiry, cvv }

    //generate the authData
    const authData = generateAuthData(extracts)

    //generate the token
    const token = await generateToken()

    //generate the authorization
    const authorization = `Bearer ${token.access_token}`

    const paymentDetails = {customerId, amount, transactionRef, currency, authData}

    //include the interswitch link for the api
    const resourceUrl = "https://qa.interswitchng.com/api/v3/purchases"

    //create the reaquired headers
    const   headers = {
          "Authorization": authorization,
          "Content-Type": "application/json"
        }

    //initialize the response and call the method for post requests contained in the methods.ts file in the config folder
    const response = await makeApiPostRequests("POST", resourceUrl, headers, paymentDetails)

    //return the response in json format
    return res.status(200).json({ message: response.data})
    } catch (error:any) {
        console.log(error.message);
    }
}

export const confirmTransaction = async (req:Request, res:Response) => {
    try{
        //Generate the token
        const token = await generateToken()

        //Set the authorization
        const authorization = `Bearer ${token.access_token}`

        //set the headers
        const headers = {
                "Authorization": authorization,
                "Content-Type": 'application/json'
             }
        
        //set the query params
        const params = {
            "merchantCode": process.env.merchantCode,
            "transactionReference": req.body
        }

        //set resourceUrl
        const resourceUrl = `https://qa.interswitchng.com/collections/api/v1/gettransaction.json?merchantcode={merchantcode}&transactionreference={reference}&amount={amount}`

        //Get the result by calling the mmethod responsible for making get requests from the methods.ts in the config folder
        const result = await makeApiGetRequests("GET", resourceUrl, headers, params)
        return res.status(200).json({message: result.data})
    }catch(error:any){
        console.log(error.message)
    }
}

export const authenticateOtp = async (req:Request, res:Response) => {
    try{
        //generate the token
        const token = await generateToken()

        //create the bearer authorization
        const Authorization = `Bearer ${token.access_token}`

        //create headers
        const headers = {
            "Accept": 'application/json',
            "Authorization": Authorization,
            "Content-Type": 'application/json'
        }

        //get the resourceUrl
        const resourceUrl = "https://qa.interswitchng.com/api/v3/purchases/otps/auths"

        //fetch the data from the input
        const {
            paymentId = req.body.paymentId,
            otp = req.body.otp,
            transactionId = req.body.transactionId
            } = req.body

        //Store required data in a variable
        const data = {paymentId, otp, transactionId}

        //get a response by calling the method responsible for making axios post requests from the methods.ts file in the config folder
    const response = await makeApiPostRequests("POST", resourceUrl, headers, data )
        return res.status(200).json({message:response.data})
} catch(err:any){
    console.log(err.message)
}
}

export const resendOtp = async (req:Request, res:Response) => {

    try{
    //fetch data from input
    const {
        paymentId,
        amount,
        currency
    } = req.body

    //store data in a variable
    const data = {paymentId, amount, currency}

    //generate token for the headers
    const token = await generateToken()

    //set the authorization
    const authorization = `Bearer ${token.access_token}`

    //set the headers
    const headers = {
        "Accept": "text/plain",
        "Authorization": authorization,
        "content-Type": "application/json"
    }

    //initialize the resource Url
    const resourceUrl = `https://qa.interswitchng.com/api/v3/purchases/otps/resend`

    //set the result and call the post method from the methods.ts file in the config folder
    const result = await makeApiPostRequests("POST", resourceUrl, headers, data)
    return res.status(200).json({message:result.data})

}
catch(error:any){
    console.log(error.message)
}
}