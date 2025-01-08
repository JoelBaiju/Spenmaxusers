import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BranchDetailModal from './BranchDetailModal'
import { data } from 'autoprefixer'

const VendorBranchList = ({ Branches }) => {

    const [openModal, setopenModal] = useState(false)
    const [branch, setBranch] = useState({})
    const onClose = () => setopenModal(false)
    const navigate = useNavigate()
    const OpenModalWithData = (data) => {
        setBranch(data);
        setopenModal(true)
    }
    return (
        <div className='overflow-x-scroll h-[550px] customscrollbar'>
            {Branches.map((branch, index) => (
                <div className='bg-white border border-gray-300 rounded-md mt-3 p-3' key={index}>
                    <p className='font-bold text-sm font-sans'>Branch Name</p>
                    <div className='flex items-center justify-between mt-3'>
                        <div className='flex gap-3 '>
                            <p className='text-xs text-gray-400'>Shop Type</p>
                        </div>
                        {
                            branch?.is_active ?
                                (
                                    <button className=' px-2 rounded-full text-xs text-gray-600 font-thin bg-[#99FDD2]'>Approved</button>
                                )
                                :
                                (
                                    <button className=' px-2 rounded-full text-xs text-gray-600 font-thin bg-[#99FDD2]'>Not Approved</button>
                                )
                        }
                    </div>
                    <div className='my-3 flex items-center gap-3'>
                        <p className='text-xs text-gray-400 w-4/12'>District:</p>
                        <p className='text-xs'>{branch?.District}</p>
                    </div>
                    <div className='my-3 flex items-center gap-3'>
                        <p className='text-xs text-gray-400 w-4/12'>State:</p>
                        <p className='text-xs'>{branch?.State}</p>
                    </div>
                    <div className='flex justify-end'>
                        <button className='text-sm text-gray-500 border border-gray-400 rounded-full px-3 ' onClick={() => navigate(`/vendors/View-Branch/${branch.id}`)}>Details</button>
                    </div>
                </div>
            ))}
            {openModal && <BranchDetailModal vendorData={branch} onClose={onClose} />}
        </div>
    )
}

export default VendorBranchList
