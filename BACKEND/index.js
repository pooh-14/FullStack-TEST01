import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import { Login, Register, getCurrentUser } from './Controllers/User.Controller.js'
import { addProduct } from './Controllers/Product.Controller.js'

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());
app.use(morgan("dev"))

app.get('/', (req,res)=>{
    res.send("Working!!")
})

app.post('/register', Register)

app.post('/login', Login)

app.post('/get-current-user', getCurrentUser)

app.post('/add-product', addProduct)

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to DB!");
  });
  
  app.listen(8008, () => {
    console.log("Server running on port 8008!");
  });