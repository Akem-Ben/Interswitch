import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';
import bodyParser from 'body-parser';
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import routes from './routes/routes'

const app = express();

dotenv.config();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(logger('dev'))
app.use('/api', routes)
app.use(bodyParser.json());
app.use(cors())
app.use(axios)

app.listen(process.env.PORT, ()=>{
    console.log(`Server listening on Port ${process.env.PORT}`)
})