import React, { useState } from 'react'
import { BsQrCodeScan } from 'react-icons/bs'
import {LuShirt} from "react-icons/lu"
import {BiUser, BiPrinter} from "react-icons/bi"
import { Link } from 'react-router-dom'

function AdminNav() {
  const [icon1, setIcon1] = useState(false)
  const [icon2, setIcon2] = useState(false)
  const [icon3, setIcon3] = useState(false)

  function handleIcon1(){
    setIcon1(true)
    setIcon2(false)
    setIcon3(false)
  }

  function handleIcon2(){
    setIcon1(false)
    setIcon2(true)
    setIcon3(false)
  }

  function handleIcon3(){
    setIcon1(false)
    setIcon2(false)
    setIcon3(true)
  }

  return (
    <div className='admin-nav'>
        <ul className='admin-nav-icons' >
            <Link style={{marginTop: '10px'}} to={"/admin"}><LuShirt  fontSize={"50"} color='white' /></Link>
            <Link style={{marginTop: '10px'}} to={"/admin/qr"}><BiPrinter className='icon' fontSize={"50"} color='#f0efef3a'/></Link> 
            <Link style={{marginTop: '10px'}} to={"/admin/reader"}><BsQrCodeScan className='icon' fontSize={"50"} color='#f0efef3a'/></Link>
        </ul>
    </div>
  )
}

export default AdminNav