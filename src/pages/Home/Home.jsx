import React, { useEffect, useState } from 'react'

import './home.css'

import Newproduct from '../../components/newproduct/Newproduct'
import Hero from '../../components/Heropage/Hero'
import About from '../../components/About/About'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'




function Home() {


  return (
    <div>

<Header />
        <Hero/>
        <Newproduct/>
        <About/>
        <Footer/>
 
   
    </div>
  )
}

export default Home