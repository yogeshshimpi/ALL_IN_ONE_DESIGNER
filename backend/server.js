import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import { user_detail } from '../models/userinfos.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

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
  origin: ['http://localhost:3001', 'http://localhost:5173', 'https://all-in-one-designer.vercel.app'], 
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
          secure: process.env.NODE_ENV === 'production', // set to true in production for HTTPS
          sameSite: 'None',
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

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
