import React from 'react'
import { createContext } from 'react'
import { useState } from 'react'


export const FavoritesContext=createContext()

const FavoritesProvider = ({children}) => {
    let localFavorites=JSON.parse(localStorage.getItem('favs'))
    if(!localFavorites){
        localStorage.setItem('favs',JSON.stringify([]))
    }

    let[favs,setFavs]=useState(localFavorites || [])

  return (
    <FavoritesContext.Provider value={{favs,setFavs}} >
        {children}
    </FavoritesContext.Provider>
  )
}

export default FavoritesProvider