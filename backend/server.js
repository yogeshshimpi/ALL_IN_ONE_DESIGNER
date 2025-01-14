import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import { user_detail } from '../models/userinfos.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

connectDB();  // Call the DB connection function

// Middleware
app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:5174', 'https://all-in-one-designer.vercel.app/'],
  credentials: true
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// Routes
app.post('/api/sign-up', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const data = new user_detail({ name, email, password });
    await data.save();
    res.status(200).json({ message: true });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

app.post('/api/nameExist', async (req, res) => {
  const { name } = req.body;
  try {
    const result = await user_detail.findOne({ name });
    if (!result) {
      res.json({ message: true });
    } else {
      res.json({ message: false });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

app.post('/api/sign-in', async (req, res) => {
  const { name, password } = req.body;
  try {
    const result = await user_detail.findOne({ name });
    if (result) {
      const validUser = await user_detail.findOne({ name, password });
      if (validUser) {
        res.cookie('userinfo', JSON.stringify({ name, password }), {
          httpOnly: true,
          secure: true , // set to true in production for HTTPS
          sameSite: 'Strict',
          domain: 'all-in-one-designer.vercel.app',
          maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
        });
        res.json({ message: "success" });
      } else {
        res.json({ message: "passwordInvalid" });
      }
    } else {
      res.json({ message: "usernameInvalid" });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

app.post('/api/redirect-home', async (req, res) => {
  const { name, password } = req.body;
  try {
    const result = await user_detail.findOne({ name, password });
    if (result) {
      res.json({ message: true });
    } else {
      res.json({ message: false });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

app.post('/api/get-cookie', (req, res) => {
  try {
    if (!req.cookies.userinfo) {
      return res.status(400).json({ message: 'Userinfo cookie not found' });
    }
    const userinfo = JSON.parse(req.cookies.userinfo);
    const { name, password } = userinfo;
    res.json({ message: "success", data: { name, password } });
  } catch (error) {
    res.status(400).json({ message: 'Invalid or missing userinfo cookie', error });
  }
});

const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
    port: 465,
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
  // secure:true
})

app.post('/api/verifiedOtp',async (req, res) => {
  const { name, password, otp } = req.body
  console.log(name, password, otp)
  const cookieData = req.cookies.loginotp
  console.log(cookieData)
  if(cookieData){
      const {name:cookieName,otpHash} = JSON.parse(cookieData)
      console.log(otpHash)
      const otpString = String(otp)
    // console.log(isOtpValid)
    if(name === cookieName){
    const isValidOtp = await bcrypt.compare(otpString,otpHash)
      if(isValidOtp){
        res.json({message:"success"})
      }else{
        res.json({message:"otpInvalid"})

      }
    }else{
      res.json({message:"nameInvalid"})
    }
  }else{
    res.json({message:"sendOtp"})
  }

})
app.post('/api/sendOtp', async(req, res) => {
  try {
    const name = req.body.name
    const otp = generateOTP()
    const data = await user_detail.findOne({name:name})
    if(data){
      const email = data.email
      const mailOptions = {
        from: process.env.EMAIL,
        to:email,
        subject:"All In One Designer",
        text:`Your otp code is ${otp}. It is valid for 5 minutes.`,
      }
      transporter.sendMail(mailOptions, (error)=>{
        if (error) {
          console.log("failed",error)
          res.json({server:true})
        }
      })
      const otpHash =await bcrypt.hash(`${otp}`,12)
      res.cookie('loginotp', JSON.stringify({ otpHash,name }), {
        httpOnly: true,
        secure: true,  // Set to true for production
        sameSite: 'Strict',
        domain: 'all-in-one-designer.vercel.app',
        maxAge: 5 * 60 * 1000, // Expires in 5 minutes
      });
      res.json({message:false})
    }else{
      res.json({message:true})
    }
    // res.json({ message: true })
  } catch (error) {
    console.log(error)
    res.json({ message: false })

  }

})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
