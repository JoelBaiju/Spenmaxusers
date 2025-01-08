import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SmallCardSkeleton from '../../components/ResuableComponents/smallCardSkelton'

const PartnersDeatails = ({ Data }) => {

    return Data.length === 0 ?
        <div className='flex justify-center p-5'><p>No data found</p></div>
        : (
            <div className='border border-gray-300 rounded-sm md:p-5 md:flex flex-wrap   justify-center overflow-scroll h-[470px] customscrollbar'>
                {Data?.map((d, i) => (
                    <div className='md:w-6/12 p-3 ' key={i}>
                        <div className='bg-white w-full rounded-md shadow-lg p-3 '>
                            <div className='flex justify-between items-center'>
                                <p className='text-xs font-medium'>{d?.company_name}</p>
                                <div>
                                    <p className='text-sm text-gray-400'>{d?.category_name}</p>
                                </div>
                            </div>
                            <div className='flex mt-2'>
                                <div className='w-3/12'>
                                    <p className='text-xs text-gray-400'>Locality</p>
                                </div>
                                <div>
                                    <p className='text-xs font-medium'>{d?.Locality}</p>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='w-3/12'>
                                    <p className='text-xs text-gray-400'>District</p>
                                </div>
                                <div>
                                    <p className='text-xs font-medium'>{d?.District}</p>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='w-3/12'>
                                    <p className='text-xs text-gray-400'>State</p>
                                </div>
                                <div>
                                    <p className='text-xs font-medium'>{d?.State}</p>
                                </div>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='mt-3'>
                                    <Link to={`/MorePartners/${d.id}`}>
                                        <button className='text-xs border rounded-full border-black px-5 py-1'>Exclusive Offers</button>
                                    </Link>
                                </div>
                                <div className='flex items-center'>
                                    <p className='text-xs text-green-500'>Active</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
}

export default PartnersDeatails
