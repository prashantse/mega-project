import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
// import LoadingAnimation from './components/LoadingAnimation'

function Layout() {
  return (
    < >
    
    {/* <LoadingAnimation/> */}
    <Header/>
    <Outlet />
    <Footer />
   
    </>
  )
}

export default Layout