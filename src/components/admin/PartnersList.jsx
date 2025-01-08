import React, { useState } from 'react'
import PartnerListSkelton from '../ResuableComponents/PartnerListSkelton'

const PartnersList = ({ vendors, fetchComapnyDetails }) => {
    const [count, useCount] = useState([1, 2, 1, 1, 1, 1, 1, 1, 1, 11, 1])
    return vendors.length === 0 ?
        <div>
            {count.map((c, i) => (<PartnerListSkelton key={i} />))}
        </div>
        :
        (
            <div className='overflow-x-scroll h-[550px] customscrollbar'>
                {vendors.map((vendor, index) => (
                    <div className='bg-white border border-gray-300 rounded-md mt-3 p-3' key={index}>
                        <p className='font-bold text-sm font-sans'>{vendor.organization}</p>
                        <div className='flex items-center justify-between mt-3'>
                            <div className='flex gap-3 '>
                                <p className='text-xs text-gray-400'>Shop Type</p>
                            </div>
                            <button className=' px-2 rounded-full text-xs text-gray-600 font-thin bg-[#99FDD2]'>{vendor.is_registered ? 'Approved' : 'Not Approved'}</button>
                        </div>
                        <div className='my-3 flex items-center gap-3'>
                            <p className='text-xs text-gray-400 w-4/12'>Email:</p>
                            <p className='text-xs'>{vendor.email_id}</p>
                        </div>
                        <div className='my-3 flex items-center gap-3'>
                            <p className='text-xs text-gray-400 w-4/12'>Number:</p>
                            <p className='text-xs'>{vendor.mobile_number}</p>
                        </div>
                        <div className='flex justify-end'>
                            <button className='text-sm text-gray-500 border border-gray-400 rounded-full px-3 ' onClick={() => { fetchComapnyDetails(vendor.id , false) }}>Details</button>
                            <button className='text-sm text-gray-500 border border-gray-400 rounded-full px-3 ' onClick={() => { fetchComapnyDetails(vendor.id,true) }}>Edit</button>

                        </div>
                    </div>
                ))}
            </div>
        )
}

export default PartnersList
