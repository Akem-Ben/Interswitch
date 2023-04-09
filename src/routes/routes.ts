import express from 'express'
import { payWithCard, confirmTransaction, authenticateOtp, resendOtp } from '../controllers/card payments/cardPayment'
import { virtualTransfer } from '../controllers/transfers/transfers'
import { authorizeVisaTransactions } from '../controllers/visa payments/visa'
import {generateToken} from '../utils/utils'

const router = express.Router()

//card transactions
router.post('/card-payments', payWithCard)
router.get('/payments-confirmation', confirmTransaction)
router.post('/otp-authentication', authenticateOtp)
router.post('/token', generateToken)
router.post('/resend-otp', resendOtp)

//Route for visa transactions
router.get('/visa-auth', authorizeVisaTransactions)

//Routes for Transfers
router.post('/trans', virtualTransfer )

export default router