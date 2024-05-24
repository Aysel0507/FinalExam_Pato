import React, { useContext } from 'react'
import { FavoritesContext } from '../../context/FavoritesContext'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import {Button} from 'antd'
import {Helmet} from "react-helmet";

const Favorites = () => {
  const {favs,setFavs}=useContext(FavoritesContext)

  return (
    <>
     <Helmet>
                <title>Favorites</title>
    </Helmet>

    
    <h1 style={{marginTop:'200px', textAlign: 'center'}}>Favorites Page</h1>
     <List  sx={{ width: '100%', marginTop:'150px', maxWidth: 1060, bgcolor: 'background.paper' }}>
{
  favs && favs.map((favsItem)=>{
    return  <ListItem alignItems="flex-start">
    <ListItemText
      primary={favsItem.title}
      secondary={
        <>
          <Typography
            sx={{ display: 'inline' }}
            component="span"
            variant="body2"
            color="text.primary"
          >
           {favsItem.price}
          </Typography>
        </>
      }
    />
    <Button onClick={()=>{
      const updatedProduct=favs.filter((x)=>x._id!=favsItem._id)
      setFavs([...updatedProduct])
      localStorage.setItem('favs',JSON.stringify([...updatedProduct]))
    }}>Remove</Button>
  </ListItem>
  })
}
</List>

    </>
  )
}

export default Favorites