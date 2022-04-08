const Product=require('../models/product');

// exports.getAllProductsTest=async(req,res,next)=>{
//     const search='ab';
//     const products=await Product.find().sort('-name');
//     res.status(200).json({products});
// }

//HAVE TO IMPLEMENT NUMERIC FILTERS IN THIS PROJECT
//GREATER THAN, LESS THAN ETC.

exports.getAllProducts=async(req,res,next)=>{
    const {company,featured,name,sort,fields}=req.query;
    const queryObject={};
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    if(company)
    {
        queryObject.company=company;
    }
    if(featured)
    {
        queryObject.featured=featured==='true'?true:false;
    }
    if(name)
    {
        queryObject.name={$regex:name,$options:'i'}
    }
    
    let result=Product.find(queryObject);
    result = result.skip(skip).limit(limit);

    if(sort)
    {
        const sortList=sort.toString().split(',').join(' ');
        result=result.sort(sortList);
    }
    else{
        result=result.sort('createdAt');
    }

    if(fields)
    {
        const fieldList=fields.toString().split(',').join(' ');
        result=result.select(fieldList);
    }
    const products=await result;
    res.status(200).json({products});
}

