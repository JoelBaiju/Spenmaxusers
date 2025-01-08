import React, { useState } from 'react'
import EditDeatilsModal from '../ResuableComponents/EditDeatilsModal'

const VentorBranchDetails = () => {


    const [isEditing, setIsEditing] = useState(false);
    const [data, setData] = useState('Data');

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        setData(e.target.value);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
    };

    const handleDeleteClick = () => {

    }


    return (
        <div className=''>
            <div className='border border-gray-300 p-4 shadow-md'>
                <div className='flex justify-between'>
                    <p className='font-medium'>Service Provider Empanment</p>
                    {/* <EditDeatilsModal /> */}
                </div>
                <div className='flex mt-2'>
                    <div className='w-8/12'><p className='text-xs text-gray-400'>Deatils</p></div>
                    <div><p className='text-xs text-gray-400'>Info</p></div>
                </div>
                <div className='flex mt-2'>
                    <div className='w-8/12'><p className='text-xs '>Name</p></div>
                    <div><p className='text-xs '>Data</p></div>
                </div>
                <hr className='mt-2 ' />
                <div className='flex mt-2'>
                    <div className='w-8/12'><p className='text-xs '>Mobile Number</p></div>
                    <div><p className='text-xs '>Data</p></div>
                </div>
                <hr className='mt-2 ' />
                <div className='flex mt-2'>
                    <div className='w-8/12'><p className='text-xs '>Key Person Name</p></div>
                    <div><p className='text-xs '>Data</p></div>
                </div>
                <hr className='mt-2 ' />
                <div className='flex mt-2'>
                    <div className='w-8/12'><p className='text-xs '>Address</p></div>
                    <div><p className='text-xs '>Data</p></div>
                </div>
                <hr className='mt-2 ' />
            </div>

            <div className='border border-gray-300 p-4 mt-5 shadow-md'>
                <div className='flex justify-between'>
                    <p className='font-medium'>Terms And Services</p>
                    <EditDeatilsModal Text='Add' />
                </div>
                <div className='flex mt-2'>
                    <div className='w-8/12'><p className='text-xs text-gray-400'>Facility/Services Offered</p></div>
                    <div><p className='text-xs text-gray-400'>Max. Discount Permissible [%]</p></div>
                </div>
                <div className='flex mt-2'>
                    <div className='w-8/12'><p className='text-xs '>Service 1</p></div>
                    <div className='flex justify-between w-4/12'>
                        {isEditing ? (
                            <input
                                type="text"
                                className=' border border-gray-300 rounded-md p-1 text-xs outline-none w-[4rem] md:w-full'
                                value={data}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <p className='text-xs'>{data}</p>
                        )}
                        {isEditing ? (
                            <button onClick={handleSaveClick} className='bg-[#649597] rounded-md px-3 text-white py-0'><div><p className='text-xs'>Save</p></div></button>
                        ) : (
                            <div className='flex gap-2 md:gap-5'>
                                <img src="/edit.png" alt="" className='w-4 cursor-pointer' onClick={handleEditClick} />
                                <img src="/delete (3).png" alt="" className='w-4 cursor-pointer' onClick={handleDeleteClick} />
                            </div>
                        )}
                    </div>
                </div>
                <hr className='mt-2 ' />
                <div className='flex mt-2'>
                    <div className='w-8/12'><p className='text-xs '>Service 2</p></div>
                    <div><p className='text-xs '>Data</p></div>
                </div>
                <hr className='mt-2 ' />
                <div className='flex mt-2'>
                    <div className='w-8/12'><p className='text-xs '>Service 3</p></div>
                    <div><p className='text-xs '>Data</p></div>
                </div>
                <hr className='mt-2 ' />
                <div className='flex mt-2'>
                    <div className='w-8/12'><p className='text-xs '>Service 4</p></div>
                    <div><p className='text-xs '>Data</p></div>
                </div>
                <hr className='mt-2 ' />
            </div>

            <div className='shadow-sm mt-20'>
                <div className='flex px-4'>
                    <div className='w-6/12'><p className='text-xs text-gray-400'>Name</p></div>
                    <div><p className='text-xs text-gray-400'>Designation</p></div>
                </div>
                <div className='flex px-4 py-1'>
                    <div className='w-6/12'><p className='text-xs font-medium '>ABC Shop</p></div>
                    <div><p className='text-xs font-medium '>Manager</p></div>
                </div>
            </div>

        </div>
    )
}

export default VentorBranchDetails
