import React, { useState } from 'react'
import VendorProfileLeft from './VendorProfileLeft'
import VendorProfileRight from './VendorProfileRight'
import { Outlet } from 'react-router-dom'

const VentorProfile = () => {
    const [imageSrc, setImageSrc] = useState('')


    return (
        <div>
            <div className='flex justify-center w-3/12 absolute mt-[-2rem] left-[9rem]  md:left-5'>
                <div className='shadow-md  bg-white rounded-full h-20 w-20 flex items-center justify-center p-1 '>
                    {/* <img src="https://imgs.search.brave.com/_TUY9FhuARvZX0FHCYwnarcmxgLWI4T0BqUNQD-UGuY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9jL2NhL1dh/bG1hcnRfbG9nby5z/dmcvNjQwcHgtV2Fs/bWFydF9sb2dvLnN2/Zy5wbmc" alt="" /> */}
                    <img src={imageSrc} alt=" logo" />
                </div>
            </div>
            <div className='  m-6 p-2 pt-5 border-black md:flex gap-6'>

                <div className='md:w-3/12 rounded-md bg-white shadow-lg'>
                    <VendorProfileLeft setImageSrc={setImageSrc} />
                </div>
                <div className='md:w-9/12 bg-white shadow-lg border-2 border-[#649597] rounded-md'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default VentorProfile
