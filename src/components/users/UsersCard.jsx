import React from 'react'

const UsersCard = ({data,formateddata}) => {
    console.log(data)
    console.log(data.is_expired)
    const packageExpired = (
        <>
          Package Expired <i className="fa-solid fa-triangle-exclamation fa-xl animate-pulse" style={{ color: '#ff622e' }} />
        </>
      );
      

    return (
        <div className='bg-[#657575] rounded-md shadow-lg  '>
            <div className='flex gap-3 px-5 pt-5'>
                <img src="/chip.png" alt="" />
                <p className="text-white text-lg">{data.package_c.length!=0 ? data.package_c[0].package_name:packageExpired}</p>
            </div>
            <div className='flex gap-3 py-3 px-5  ml-3'>
                <p className='text-lg text-white'>* * * * </p>
                <p className='text-lg text-white'>* * * * </p>
                <p className='text-lg text-white'>*  {data?.customer_id?.toString().substring(0,3)}</p>
                <p className='text-lg text-white'>{data?.customer_id?.toString().substring(3, 7)}</p>
            </div>
            <div className='absolute top-36 px-5 flex text-white gap-10'>
                <div>
                    <p className='text-xs text-gray-300 py-1 font-medium'>Card Holder Name</p>
                    <p className='text-xs'>{data?.name}</p>
                </div>
                <div>
                    <p className='text-xs text-gray-300 py-1 font-medium'>Expiry Date</p>
                    <p className='text-xs'>{formateddata}</p>
                </div>
            </div>
            <div className='flex items-center '>
                <img src="/Vector.png" alt="" className='w-10/12' />
                <img src="/Spenmax transparent 1.png" alt="" className='w-15 h-3 relative top-5 right-2  ' />
            </div>

        </div>
    )
}

export default UsersCard
