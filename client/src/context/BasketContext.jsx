import React from 'react'
import { createContext } from 'react'
import { useState } from 'react'


export const BasketContext=createContext()

const BasketProvider = ({children}) => {
    let localBasket=JSON.parse(localStorage.getItem('basket'))
    if(!localBasket){
        localStorage.setItem('basket',JSON.stringify([]))
    }

    let[basket,setBasket]=useState(localBasket || [])

  return (
    <BasketContext.Provider value={{basket,setBasket}} >
        {children}
    </BasketContext.Provider>
  )
}

export default BasketProvider