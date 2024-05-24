import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

const MainRoot = () => {
  return (
    <>
    <Header />
    <Outlet />
    <Footer />
    </>
  )
}

export default MainRoot