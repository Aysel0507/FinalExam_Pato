import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useGetOneQuery } from '../../services/ProductsApi';
import {Button} from 'antd'
import {Helmet} from "react-helmet";

const Detail = () => {


  const {id}=useParams();
  const navigate=useNavigate()
  const { data: product, error, isLoading }=useGetOneQuery(id)
  console.log(id);
  console.log(product)

  return (
    <>
     <Helmet>
          <title>Detail</title>
      </Helmet>
    {product && <div style={{marginTop:'150px',}}>
      <img width={'350px'} src={product.data?.image} alt={product.data?.title} />
      <h3>{product.data?.title}</h3>
      <p>{product.data?.description}</p>
      <h5>{product.data?.price}</h5>
      <Button onClick={()=>navigate(-1)}>Go Back</Button>
      </div>}
    </>
  )
}

export default Detail