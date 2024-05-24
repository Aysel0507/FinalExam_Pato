import React from 'react'
import {useNavigate } from 'react-router-dom';
import { useGetProductsByNameQuery, usePostOneMutation } from '../../services/ProductsApi'
import { useFormik } from 'formik';
import Button from '@mui/material/Button'
import ProductsValidation from '../../validations/ProductsValidation';
import {Helmet} from "react-helmet";
import { Table } from 'antd';

const AddPage = () => {
  const [postOne]=usePostOneMutation()
  const navigate=useNavigate()
  const {data: products, refetch}=useGetProductsByNameQuery()

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      render:(image)=>{
        return <img width={'150px'} height={'100px'} src={image}/>
      }
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Description',
      dataIndex: 'description'
    }
  ];

  const formik = useFormik({
    initialValues: {
      image: '',
      title: '',
      description: '',
      price:''
    },
    onSubmit: async(values,actions) => {
      await postOne(values)
      refetch()
      navigate('/')
      actions.resetForm()
    }, 
    validationSchema: ProductsValidation
  });
  return (
    <>

            <Helmet>
                <title>Add Page</title>
            </Helmet>

    <form style={{marginTop:'100px'}} onSubmit={formik.handleSubmit}>

      <input onBlur={formik.handleBlur} type="url" name="image" onChange={formik.handleChange} value={formik.values.image} />
      {formik.errors.image && formik.touched.image && <span style={{color:'red'}}></span>}

      <input  onBlur={formik.handleBlur} type="text" name="title" onChange={formik.handleChange}  value={formik.values.title} />
      {formik.errors.title && formik.touched.title && <span style={{color:'red'}}>{formik.errors.title}</span>}

      <input  onBlur={formik.handleBlur} type="text" name="description" onChange={formik.handleChange}  value={formik.values.description} />
      {formik.errors.description && formik.touched.description && <span style={{color:'red'}}>{formik.errors.description}</span>}

      <input  onBlur={formik.handleBlur} type="number" name="price" onChange={formik.handleChange}  value={formik.values.price} />  
      {formik.errors.price && formik.touched.price && <span style={{color:'red'}}>{formik.errors.price}</span>}

      <Button variant="contained">Add</Button>
    </form>
    


    <Table columns={columns} dataSource={products?.data}  />;
    </>


  )
}

export default AddPage