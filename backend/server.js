import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import { user_detail } from './models/userinfos.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'
import path from 'path'
import { fileURLToPath } from 'url';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Database connection
const connectDB = async() => {
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
  origin: ['http://localhost:3000', 'http://localhost:5173','https://all-in-one-designer.onrender.com/', 'https://all-in-one-designer.vercel.app/'],
  credentials: true
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// Routes


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
  secure:true
})

app.post('/api/verifiedOtp',async (req, res) => {
  const { name, password, otp } = req.body
  console.log(name, password, otp)
  const cookieData = req.cookies.loginotp
  console.log(cookieData)
  if(cookieData){
      const {name:cookieName,otpHash} = JSON.parse(cookieData)
      const otpString = String(otp)
    if(name === cookieName){
    const isValidOtp = await bcrypt.compare(otpString,otpHash)
      if(isValidOtp){
        await user_detail.updateOne({name:name},{password:password})
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
      transporter.sendMail(mailOptions, (error,info)=>{
        if (error) {
          console.log("failed",error)
          res.json({server:true})
        }else{
          console.log("done")
        }
      })
      const otpHash = await bcrypt.hash(`${otp}`,12)
      res.cookie('loginotp', JSON.stringify({ otpHash,name }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",  // Set to true for production
        sameSite: 'Strict',
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
app.post('/api/sign-up', async (req, res) => {
  try {
  const { name, email, password,image } = req.body;
  console.log({ name, email, password,image })
  //   const cookiedata = req.cookies.loginotp
  //   if(cookiedata){
  //     const {otpHash:Hashotp,email:cookieEmail} = JSON.parse(cookiedata)
  //   const isValidOtp = await bcrypt.compare(otp,Hashotp)
  //   console.log(isValidOtp)
  //   if(email === cookieEmail && isValidOtp){
  //     const data = new user_detail({name:name,email:email,password:password})
  //     await data.save()
  //     res.json({message:true})
  //   }else{
  //     res.json({message:false})
  //   }
  //   }else{
      res.json({message:"server"})
  //   }
  
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});
app.post('/api/verifiedSignUpOtp',async(req,res)=>{
  try {
    const { email,otp } = req.body;
      const cookiedata = req.cookies.loginotp
      if(cookiedata){
        const {otpHash:Hashotp,email:cookieEmail} = JSON.parse(cookiedata)
      const isValidOtp = await bcrypt.compare(otp,Hashotp)
      console.log(isValidOtp)
      if(email === cookieEmail && isValidOtp){
        res.json({message:true})
      }else{
        res.json({message:false})
      }
      }else{
        res.json({message:"server"})
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error });
    }
})
app.post('/api/sendSignUpOtp', async (req,res)=>{
  try {
    const {email} = req.body
    const otp = generateOTP()
    console.log(email)
      const mailOptions = {
        from: process.env.EMAIL,
        to:email,
        subject:"All In One Designer",
        text:`Your otp code is ${otp}. It is valid for 5 minutes.`,
      }
      transporter.sendMail(mailOptions, (error,info)=>{
        if (error) {
          console.log("failed",error)
          res.json({server:true})
        }else{
          console.log("done")
        }
      })
      const otpHash =await bcrypt.hash(`${otp}`,12)
      res.cookie('loginotp', JSON.stringify({ otpHash,email }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",  // Set to true for production
        sameSite: 'Strict',
        maxAge: 5 * 60 * 1000, // Expires in 5 minutes
      });
      res.json({message:true})
  
   
    // res.json({ message: true })
  } catch (error) {
    console.log(error)
    res.json({ message: false })

  }
})   
// sign-in section apif

app.post('/api/sendSignInOtp', async(req,res)=>{
  const {name,password} = req.body

  try {
    const result = await user_detail.findOne({ name });
    if (result) {
      const validUser = await user_detail.findOne({ name, password });
      if (validUser) {
        const otp = generateOTP()
          const mailOptions = {
            from: process.env.EMAIL,
            to:validUser.email,
            subject:"All In One Designer",
            text:`Your otp code is ${otp}. It is valid for 5 minutes.`,
          }
          transporter.sendMail(mailOptions, (error,info)=>{
            if (error) {
              console.log("failed",error)
              res.json({server:true})
            }else{
              console.log("done")
            }
          })
          const otpHash = await bcrypt.hash(`${otp}`,12)
          res.cookie('loginotp', JSON.stringify({ otpHash,name }), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",  // Set to true for production
            sameSite: 'Strict',
            maxAge: 5 * 60 * 1000, // Expires in 5 minutes
          });
        return res.json({ message: "success" });
      } else {
        return res.json({ message: "passwordInvalid" });
      }
    } else {
      res.json({ message: "usernameInvalid" });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
})

app.post('/api/sign-in', async (req, res) => {
  const { name, password ,otp} = req.body;
  try {
    const isValidCookie = req.cookies.loginotp
    if(isValidCookie){
      const otpString = String(otp)
      const {otpHash:Hashotp, name:nameCookie} = JSON.parse(isValidCookie)
      const isValidOtp = await bcrypt.compare(otpString,Hashotp)
      if(name === nameCookie && isValidOtp){
        const passwordHash = await bcrypt.hash(`${password}`,12)
        res.cookie('login_info',JSON.stringify({name,passwordHash}),{
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",  // Set to true for production
          sameSite: 'Strict',
          maxAge: 14 *24 * 60 * 1000,
        })
        res.json({message:"success"})
      }else{
        res.json({message:"invalidOtp"})
      }
    }else{
      res.json({message:"invalidOtp"})
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../dist'))); 

// Handle SPA routing (catch-all route)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});






// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
