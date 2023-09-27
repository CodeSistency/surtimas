import React, { useState } from 'react'
import { BsQrCodeScan } from 'react-icons/bs'
import {LuShirt} from "react-icons/lu"
import {BiUser, BiPrinter} from "react-icons/bi"
import {TbReportMoney} from 'react-icons/tb'
import { Link } from 'react-router-dom'


function AdminNav() {
  const [icon1, setIcon1] = useState(false)
  const [icon2, setIcon2] = useState(false)
  const [icon3, setIcon3] = useState(false)
  const [icon4, setIcon4] = useState(false)

  function handleIcon1(){
    setIcon1(true)
    setIcon2(false)
    setIcon3(false)
    setIcon4(false)
  }

  function handleIcon2(){
    setIcon1(false)
    setIcon2(true)
    setIcon3(false)
    setIcon4(false)
  }

  function handleIcon3(){
    setIcon1(false)
    setIcon2(false)
    setIcon3(true)
    setIcon4(false)
  }

  function handleIcon4(){
    setIcon1(false)
    setIcon2(false)
    setIcon3(false)
    setIcon4(true)
  }

  return (
    <div className='admin-nav'>
        <ul className='admin-nav-icons' >
            <Link style={{marginTop: '10px'}} onClick={handleIcon1} to={"/admin"}><LuShirt  fontSize={"50"} color={`${icon1 ? 'white' : '#f0efef3a'}`} /></Link>
            <Link style={{marginTop: '10px'}} onClick={handleIcon2} to={"/admin/qr"}><BiPrinter className='icon' fontSize={"50"} color={`${icon2 ? 'white' : '#f0efef3a'}`}/></Link> 
            <Link style={{marginTop: '10px'}} onClick={handleIcon3} to={"/admin/reader"}><BsQrCodeScan className='icon' fontSize={"50"} color={`${icon3 ? 'white' : '#f0efef3a'}`}/></Link>
            <Link style={{marginTop: '10px'}} onClick={handleIcon4} to={"/admin/sales"}><TbReportMoney className='icon' fontSize={"50"} color={`${icon4 ? 'white' : '#f0efef3a'}`}/></Link>
        </ul>
    </div>
  )
}

export default AdminNav