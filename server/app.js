const express = require('express')
const app = express()
const mongoose=require('mongoose')


const cors = require('cors');
const bodyParser=require('body-parser')
require('dotenv').config()


const DB=process.env.DB_URL
const port=process.env.port

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(DB).then(()=>{
    console.log("Connected!")
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })
});


const { Schema } = mongoose;

const ProductsSchema = new Schema({
  title: {type: String, required:true},
  description: {type: String, required:true},
  price: {type: Number, required:true},
});


const Products = mongoose.model('Products', ProductsSchema);

app.get('/products',async(req,res)=>{
    try {
        const products=await Products.find({})
        if(products.length>0){
            res.status(200).send({
                data: products,
                message: 'success'
            })
        }
        else{
            res.status(204).send({
                message: 'data is empty!'
            }) 
        }
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
})

app.get('/products/:id',async(req,res)=>{
    const {id}=req.params
    try {
        const product=await Products.findById(id)
        if(product){
            res.status(200).send({
                data: product,
                message: 'success'
            })
        }
        else{
            res.status(204).send({
                message: 'data is empty!'
            })
        }
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
})

app.delete('/products/:id',async(req,res)=>{
    const {id}=req.params
    try {
        const deletedProduct=await Products.findByIdAndDelete(id)
            res.status(200).send({
                data: deletedProduct,
                message: 'success'
            })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
})


app.post('/products', async(req,res)=>{
    const newProduct=new Products(req.body)
    try {
        await newProduct.save()
        res.status(200).send({
            data: newProduct,
            message:'success'
        })
    } catch (error) {
        res.status(500).send({
            message:error.message
        })
    }
})