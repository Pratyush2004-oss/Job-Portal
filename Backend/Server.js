import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv'
import connectDB from './utils/db.js';
import userRoute from './routes/user.route.js';
import companyRoute from './routes/company.route.js'

dotenv.config({});

const app = express();

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
const corsoptions = {
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsoptions));

const PORT = process.env.PORT || 3000;

// APIs calling

app.use('/api/v1/user', userRoute);     // user api

app.use('/api/v1/company',companyRoute)// company api 


app.listen(PORT, () => {
    connectDB();
    console.log(`server is running in port ${PORT}`)
})