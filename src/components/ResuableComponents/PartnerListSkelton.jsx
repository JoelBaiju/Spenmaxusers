import React from 'react'

const PartnerListSkelton = () => {
    return (
        <div className='animate-pulse bg-white border border-gray-300 rounded-md mt-3 p-3'>
            <div className='font-bold text-sm font-sans'>Partners Name</div>
            <div className='flex items-center justify-between mt-3'>
                <div className='flex gap-3'>
                    <div className='bg-gray-300 w-20 h-4'></div>
                </div>
                <div className='bg-gray-300 w-20 h-6 rounded-full'></div>
            </div>
            <div className='my-3 flex items-center gap-1'>
                {/* <div className='bg-gray-300 w-20 h-4'></div>
                <div className='bg-gray-300 w-24 h-4'></div> */}
                <div className='my-3 flex items-center gap-3'>
                    <div className='bg-gray-300 w-20 h-4'></div>
                    <div className='bg-gray-300 w-20 h-4'></div>
                </div>
                <div className='flex justify-end'>
                    <div className='bg-gray-300 w-20 h-8 rounded-full'></div>
                </div>
            </div>
        </div>
    )
}

export default PartnerListSkelton
