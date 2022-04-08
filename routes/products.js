const express=require('express');
const productController=require('../controllers/products');

const router=express.Router();

router.get('/productsTest',productController.getAllProductsTest);

router.get('/',productController.getAllProducts);

module.exports=router;
