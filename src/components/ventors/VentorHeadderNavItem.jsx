import React from 'react'
import { Link } from 'react-router-dom'

const VendorHeadderNavItem = ({ icon, text, to, NotoficationCount, MenuClose }) => {
  return (
    <Link to={to} className="flex flex-col items-center relative px-2 py-2 mt-2 md:mt-0 cursor-pointer" onClick={MenuClose}>
      <img src={icon} alt={text} className='w-4 h-4' />
      <p className='text-black text-xs font-sans ml-2'>{text}</p>
      {NotoficationCount > 0 && (
        <span className="absolute top-0 right-1 bg-red-500 text-white rounded-full w-4 h-4 flex justify-center items-center text-xs"> {NotoficationCount} </span>
      )}
    </Link>
  )
}

export default VendorHeadderNavItem
