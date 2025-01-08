import React, { useEffect, useState } from 'react'
import { get_api } from '../../utils/api';
import { getErrorMessage } from '../../utils/Validation';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import EditVendorModal from './EditVendorModal ';
import VendorBranchEditModal from './VendorBranchEditModal';

const VendorProfileRight = () => {

    const [vendorDetails, setVendorDetails] = useState({})
    const [BranchData, setBranchData] = useState({})
    const [OpenModal, setOpenModal] = useState(false)
    const [OpenModal2, setOpenModal2] = useState(false)
    const vendor = useSelector(state => state.vendorAuth.vendor);

    useEffect(() => {
        fetchVenorData()
    }, [OpenModal, OpenModal2])

    const fetchVenorData = async () => {
        try {
            const response = await get_api(vendor?.token).get('/shop/vendor/company/detail/');
            if (response.status === 200) {
                setVendorDetails(response.data)
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
    const OpenModalWithData = (data) => {
        setBranchData(data);
        setOpenModal2(true)
    }
    const DeleteBranch = async (Branch_id) => {
        try {
            const response = await get_api(vendor?.token).post('/shop/notification/vendor/branch/delete/', { Branch_id });
            if (response.status === 201) {
                toast(
                    "Your request to delete the branch has been submitted. It will be reviewed by the admin. Please wait for approval.",
                    {
                        duration: 6000,
                    }
                );
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

    const onClose = () => setOpenModal(false)
    const onClose2 = () => setOpenModal2(false)

    return (
        <div className='p-5 flex flex-col gap-4 border-2 '>
            <div className='border border-gray-300 p-4 '>
                <div>
                    <p className='text-sm font-bold'>Registration Details</p>
                </div>

                <div className='md:flex gap-6 mt-2'>

                    <div className='md:w-6/12  '>

                        <div className='p-2'>
                            <p className='text-[10px]'>Name Of Organization</p>
                            <div className='flex justify-between'>
                                <p >{vendorDetails?.organization}</p>
                            </div>
                            <hr className='mt-2' />
                        </div>
                        <div className='p-2'>
                            <p className='text-[10px]'>Phone</p>
                            <div className='flex justify-between'>
                                <p>+91 {vendorDetails?.mobile_number}</p>
                            </div>
                            <hr className='mt-2' />
                        </div>
                        <div className='p-2'>
                            <p className='text-[10px]'>Address</p>
                            <div className='flex justify-between'>
                                <p className='truncate'>{vendorDetails?.head_office_address}</p>
                            </div>
                            <hr className='mt-2' />
                        </div>
                        {/* <div className='p-2'>
                            <p className='text-[10px]'>State</p>
                            <div className='flex justify-between'>
                                <p>Kerala</p>
                            </div>
                            <hr className='mt-2' />
                        </div>
                        <div className='p-2'>
                            <p className='text-[10px]'>Address</p>
                            <div className='flex justify-between'>
                                <p>Kerala,India</p>
                            </div>
                            <hr className='mt-2' />
                        </div> */}

                    </div>

                    <div className='md:w-6/12 '>

                        <div className='p-2'>
                            <p className='text-[10px]'>Joined Date</p>
                            <div className='flex justify-between'>
                                <p>{vendorDetails?.join_date}</p>
                            </div>
                            <hr className='mt-2' />
                        </div>
                        <div className='p-2'>
                            <p className='text-[10px]'>Email</p>
                            <div className='flex justify-between'>
                                <p>{vendorDetails?.email_id}</p>
                            </div>
                            <hr className='mt-2' />
                        </div>
                        {/* <div className='p-2'>
                            <p className='text-[10px]'>Pin Code</p>
                            <div className='flex justify-between'>
                                <p>691019</p>
                            </div>
                            <hr className='mt-2' />
                        </div>
                        <div className='p-2'>
                            <p className='text-[10px]'>Country</p>
                            <div className='flex justify-between'>
                                <p>India</p>
                            </div>
                            <hr className='mt-2' />
                        </div> */}

                        <div className='mt-6 flex justify-end'>
                            <button onClick={() => setOpenModal(true)} className='bg-gray-200 rounded-full'><p className='text-[10px] px-3 p-1 '>Edit</p></button>

                        </div>
                    </div>
                </div>
            </div>
            <div className='border hidden md:block  border-gray-300 p-4'>

                <div>
                    <p className='text-sm font-bold'>Branch Details</p>
                </div>

                <div className=' mt-3'>
                    <div className='flex w-full'>
                        <div className='w-3/12'><p className='font-medium text-sm borde'>Location</p></div>
                        <div className='w-3/12'><p className='font-medium text-sm '>Store Manager</p></div>
                        <div className='w-3/12'><p className='font-medium text-sm '>Contact Number</p></div>
                        <div className='w-3/12'><p className='font-medium text-sm text-center'>Action</p></div>
                    </div>
                    <hr className='my-2' />
                    <div className='overflow-scroll h-[350px] customscrollbar'>
                        {
                            vendorDetails?.branches?.map((branch, index) => (
                                <div key={index}>
                                    <div className='flex w-full py-2'>

                                        <div className='w-3/12'><p className=' text-sm borde'>{branch?.District}</p></div>
                                        <div className='w-3/12'><p className='text-sm'>{branch?.KeyPersonName}</p></div>
                                        <div className='w-3/12'><p className='text-sm'>+91 {branch?.KeyPersonContact}</p></div>
                                        <div className='w-3/12 flex justify-center'>
                                            <div className='flex justify-between  border border-gray-300   rounded-md bg-gray-100'>
                                                <div onClick={() => OpenModalWithData(branch)} className=' border-gray-300 p-1 px-4 border-r'>
                                                    <img src="/edit.png" alt="" className='w-5 cursor-pointer' />
                                                </div>
                                                <div onClick={() => DeleteBranch(branch.id)} className='p-1 px-4 cursor-pointer'>
                                                    <img src="/delete (3).png" alt="" className='w-5 ' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>
            {OpenModal2 && BranchData && <VendorBranchEditModal vendorData={BranchData} onClose={onClose2} />}
            {OpenModal && <EditVendorModal user={vendorDetails} onClose={onClose} />}
            <Toaster />
        </div>
    )
}

export default VendorProfileRight
