import React from 'react'
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai'

const Footer = () => {
  return (
    <div className='text-slate-700 text-center px-7 py-2 font-extrabold flex flex-col items-center gap-2 justify-center mt-12'>
      <p>2023 <span className='font-mono'>ọlá viBes gadgets </span>  All rights reserved</p>
      <p className='text-3xl flex gap-2 '>
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  )
}

export default Footer