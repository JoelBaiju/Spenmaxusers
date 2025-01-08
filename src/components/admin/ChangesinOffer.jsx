import React from 'react'

const ChangesinOffer = () => {
  return (
    <div className=' py-2 customscrollbar overflow-scroll h-[450px]'>

            <div className='bg-[#f6edff] rounded-sm  py-2'>
                <div className='px-5'>
                    <div><p className='text-xs'><span className='text-xs font-medium'>PartnerName</span> is requesting approval for change in Offer</p></div>
                    <div className='py-2 flex gap-4'>
                        <div><button className='bg-[#80509F] py-1 px-4 text-white text-xs rounded-sm'>Accept</button></div>
                        <div><button className='bg-white py-1 px-4  text-xs rounded-sm'>Decline</button></div>
                    </div>
                </div>
            </div>

            <div className='bg-white  py-2'>
                <div className='px-5 '>
                    <div><p className='text-xs'><span className='text-xs font-medium'>PartnerName</span> approved</p></div>
                    <div className='py-2 flex gap-4'>
                        <div><button className='bg-[#C31071] py-1 px-4 text-white text-xs rounded-sm'>Remove</button></div>
                        <div><button className='bg-white py-1 px-4  text-xs rounded-sm'>Update</button></div>
                    </div>
                </div>
            </div>

        </div>
  )
}

export default ChangesinOffer
