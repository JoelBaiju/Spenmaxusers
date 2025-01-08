import React, { useEffect, useState } from 'react'
import VendorHeadder from './VentoHeadder'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { getErrorMessage } from '../../utils/Validation';
import { get_api } from '../../utils/api';

const Ventors = () => {
 
  return (
    <div>
      <VendorHeadder />
      <div className=' m-6 p-2 md:flex justify-between items-center'>
        <div>
          <h1 className='text-black font-bold text-2xl'>Welcome,</h1>
          <h1 className='text-black font-bold text-3xl'>Spenmax Vendor</h1>
        </div>
        {/* <div className='bg-white rounded-full md:w-2/12 w-5/12 sm:mt-2 flex'>
          <div className='w-6/12 p-1 flex justify-center bg-[#80509F] rounded-full'><p className='text-xs text-white '>Profile</p></div>
          <div className='w-6/12 p-1 flex justify-center rounded-full'><p className='text-xs text-[#80509F]'>Orders</p></div>
        </div> */}
      </div>
      <Outlet />
      <Toaster />
    </div>
  )
}

export default Ventors
