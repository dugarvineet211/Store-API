//Environment file
require('dotenv').config();
//async errors
require('express-async-errors');

//INSTALLED MODULES
const express=require('express');
const app=express();

//DATABASE CONNECTION FUNCTION
const connectDB=require('./db/connect');


//USER DEFINED MIDDLEWARES
const notFoundMiddleware=require('./middleware/not-found');
const errorHandlerMiddleware=require('./middleware/error-handler');

//IMPORTING REQUIRED ROUTES
const productRoutes=require('./routes/products');

app.use(express.json());

//ROUTES
app.get('/',(req,res)=>{
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products</a>');
})
app.use('/api/v1/products',productRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port=process.env.PORT || 3000;
const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`Server started on port ${port}`));
    }
    catch(error){
        console.log(error);
    }
}

start();