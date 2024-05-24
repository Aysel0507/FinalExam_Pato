import * as Yup from 'yup';
 

 const ProductsValidation = Yup.object().shape({
   image: Yup.string().url().required(),
   title: Yup.string().min(2).required(),
   description: Yup.string().required(),
   price: Yup.number().required()
});

export default ProductsValidation