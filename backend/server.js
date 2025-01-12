import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors'
import { user_detail } from '../models/userinfos.js'; 
import cookieParser from 'cookie-parser';

await mongoose.connect('mongodb://localhost:27017/all-in-one-designer')
const app = express();

const port = 3000;
app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:5173'], // Allow multiple origins
  credentials: true 
}));

app.use(bodyParser.json());
app.use(express.json()); 
app.use(cookieParser());


app.use(express.json());




app.post('/api/sign-up', async (req, res) => {
  const {name , email, password} = req.body
  try {
    const data =  new user_detail({name:name,email:email,password:password})
    await data.save()
    res.status(200).json({message:true}) 
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

app.post('/api/nameExist', async (req,res)=>{
  try {
    const {name} = req.body

    const result = await user_detail.findOne({name:name})

    if(!result){
      res.json({message:true})
    }else{
    res.json({message:false})

    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
    
  }
})
app.post('/api/sign-in', async(req, res) => {
  try {
    const { name, password } = req.body;
    const result = await user_detail.findOne({ name: name });

    if (result) {
      const validUser = await user_detail.findOne({ name: name, password: password });
      if (validUser) {
        console.log("done");
        
        res.cookie('userinfo', JSON.stringify({ name: name, password: password }), {
          httpOnly: true, 
          secure: false,  
          sameSite: 'Strict',
          maxAge: 14 * 24 * 60 * 60 * 1000, 
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

app.post('/api/redirect-home',async (req,res)=>{
  try {
    const{name,password } = req.body
  const result = await user_detail.findOne({name:name,password:password})
  if(result){
      res.json({message:true})
  }else{
    res.json({message:false})
  }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
})
app.post('/api/get-cookie', (req, res) => {
  try {
    if (!req.cookies.userinfo) {
      console.error('Userinfo cookie is not set or undefined');
      return res.status(400).json({ message: 'Userinfo cookie not found' });
    }
    const userinfo = JSON.parse(req.cookies.userinfo);
    const { name, password } = userinfo;

    res.json({ message: "success", data:{name,password} });
  } catch (error) {
    console.error('Failed to parse userinfo cookie:', error);
    res.status(400).json({ message: 'Invalid or missing userinfo cookie' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/`);
});
