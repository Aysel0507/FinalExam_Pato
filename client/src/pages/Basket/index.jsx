import React from 'react'
import { useContext } from 'react'
import { BasketContext } from '../../context/BasketContext'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import {Button} from 'antd'
import {Helmet} from "react-helmet";

const Basket = () => {
  const {basket,setBasket}=useContext(BasketContext)

  return (
    <>
            <Helmet>
                <title>Basket</title>
            </Helmet>
     <List sx={{ width: '100%', maxWidth: 1000, bgcolor: 'background.paper',marginTop:20}}>
    {basket && basket.map((basketItem)=>{
      return <ListItem alignItems="flex-start">
       <ListItemAvatar>
         <Avatar alt="Remy Sharp" src={basketItem.image} />
       </ListItemAvatar>
       <ListItemText
         primary={basketItem.title}
         secondary={
           <>
             <Typography
               sx={{ display: 'inline' }}
               component="span"
               variant="body2"
               color="text.primary"
             >
               {basketItem.count}
             </Typography>
           </>
         }
       />
        <Button onClick={()=>{
          const currentItem=basket.find((x)=>x._id==basketItem._id)
          if(currentItem.count>1){
            currentItem.count-=1
            setBasket([...basket])
            localStorage.setItem('basket',JSON.stringify([...basket]))
          }
          else{
            const removedProduct=basket.filter((x)=>x._id!=basketItem._id)
            setBasket([...removedProduct])
            localStorage.setItem('basket',JSON.stringify([...removedProduct]))
          }
 
        }}>-</Button>
        <Button onClick={()=>{
          const currentItem=basket.find((x)=>x._id==basketItem._id)
          currentItem.count+=1
          setBasket([...basket])
          localStorage.setItem('basket',JSON.stringify([...basket]))
        }}>+</Button>

        <Button onClick={()=>{
          const removedProduct=basket.filter((x)=>x._id!=basketItem._id)
          setBasket([...removedProduct])
          localStorage.setItem('basket',JSON.stringify([...removedProduct]))
        }}>Remove</Button>
     </ListItem>
    })} 

<Button onClick={()=>{
  if(window.confirm("Are you sure Order?")){
    setBasket([])
    localStorage.setItem('basket', JSON.stringify([]))
  }
}}>Order</Button>
    </List>
    </>
  )
}

export default Basket