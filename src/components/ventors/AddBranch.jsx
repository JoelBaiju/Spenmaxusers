import React, { useEffect, useRef, useState } from 'react'
import PartnersRegistration from '../admin/PartnersRegistration'
import VendorBranchList from './VentorBranchList'
import VentorResgistration from './VentorResgistration'
import { get_api } from '../../utils/api'
import { getErrorMessage } from '../../utils/Validation'
import toast, { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'


const AddBranch = () => {

    const [Branches, setBranches] = useState([])

    const vendor = useSelector(state => state.vendorAuth.vendor);

    useEffect(() => {
        fetchBranches()
    }, [])
    const fetchBranches = async () => {
        try {
            const response = await get_api(vendor?.token).get('/shop/vendor/branches/');
            if (response.status === 200) {
                setBranches(response.data)
            }
        } catch (error) {
            console.error('Fetching data failed:', error);
            const errorMessages = getErrorMessage(error)
            const generalErrors = errorMessages.filter((error) => error.field === 'general' || error.field === error.field || error.field === 'name');
            if (generalErrors.length >= 0) {
                const newErrors = generalErrors.map(error => error.message);
                newErrors.forEach(error => toast.error(error));
                return newErrors;
            }
            else if (error.message) {
                toast.error(`${error.message || 'Somthing went wrong'}`)
            }
        }
    }
    const secondDivRef = useRef(null);

    const scrollToSecondDiv = () => {
        const { top } = secondDivRef.current.getBoundingClientRect();

        window.scrollTo({
            top: window.scrollY + top,
            behavior: 'smooth'
        });
    };

    return (
        <div className=' m-6 p-2 bg-[#C0DCDD] rounded-lg shadow-lg '>
            <div className='flex items-center justify-between'>
                <h1 className='font-bold p-3 m-2'>Add Branch</h1>
                <button className='px-5 py-1 rounded-md bg-[#507b7d] text-white' onClick={scrollToSecondDiv}>Add</button>
            </div>

            <div className='  md:flex justify-between'>
                <div className='m-2 p-3 border bg-white border-gray-300 md:w-3/12  rounded-md flex flex-col '>
                    <div >
                        <h1 className='font-bold'>Branch</h1>

                        <div className='flex gap-5' >
                            <div className="relative w-8/12 ">
                                <input
                                    type="text"
                                    className="border rounded-full text-xs pl-10 pr-4 py-2 w-full"
                                    placeholder="Search Branch"
                                />
                                <svg
                                    className="absolute left-3 top-2 h-5 w-5 text-gray-500 "
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 11a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17.5 17.5l2.5 2.5"
                                    />
                                </svg>
                            </div>

                            <button className='bg-[#507b7d] w-4/12 text-white text-sm rounded-full p-1'>Search </button>
                        </div>

                    </div>
                    <VendorBranchList Branches={Branches} />
                </div>

                <div ref={secondDivRef} className=' md:w-9/12 border m-2 p-2  border-gray-300 bg-white   rounded-md'>

                    <div className=' '>
                        <div className='m-2 p-2'>
                            <h1 className='font-bold'>Add New</h1>
                        </div>

                    </div>
                    <div className=''>
                        <VentorResgistration />
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default AddBranch
