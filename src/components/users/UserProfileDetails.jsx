import React, { useEffect, useState } from 'react'
import UserProfileModal from './UserProfileModal'
import './Button.css'
import { useNavigate } from 'react-router-dom'
import AdCarousel from '../ResuableComponents/AdCarousel'
const UserProfileDetails = ({ data, onOpen }) => {

    const [PurchaseDate, setPurchaseDate] = useState('')
    const [DateOfBirth, setDateOfBirth] = useState('')
    const [ExpiryDate, setExpiryDate] = useState('')
    const [isProfileOpen, setisProfileOpen] = useState(false);

    const navigate = useNavigate()

    const profileClose = () => {
        setisProfileOpen(false)
    }

    useEffect(() => {
        const packageData = data?.package_c.find(pkg => pkg.is_active === true);
        if (packageData) {
            const { purchase_date, expiry_date } = packageData;
            const dateObject = new Date(purchase_date);
            const dateObject2 = new Date(data?.dob);
            const dateObject3 = new Date(expiry_date);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            setPurchaseDate(dateObject.toLocaleDateString('en-US', options))
            setDateOfBirth(dateObject2.toLocaleDateString('en-US', options))
            setExpiryDate(dateObject3.toLocaleDateString('en-US', options))
        }
    }, [data])

    return (
        <div className='md:flex  justify-center'>

            <div className=' p-2 w-full md:w-8/12 '>
                <div className='md:flex  mb-5 justify-between divbody bg-gradient-to-r from-[#678B8D] to-[#84b1b3] rounded-lg'>
                    <div className='p-3 md:w-5/12 ' >
                        {/* <h1 className='font-bold text-black sm:p-1 '>My Profile</h1>
                        <p className='text-[10px] font-sans sm:p-1'>Customer ID</p>
                        <p className='text-xs font-sans  font-thin sm:p-1'><span>KID </span>{data?.customer_id}</p> */}
                        <div className="profilediv w-full  shadow-md rounded-lg overflow-hidden">
                            <div className="px-4 py-6">
                                <img
                                    className="w-24 h-24 mx-auto rounded-full"
                                    src={data.image === null ? "/man.png" :data.image}
                                    alt="User Profile"
                                />
                                <div className="text-center mt-4">
                                    <h2 className="text-lg font-bold text-black">{data?.name}</h2>
                                    <p className="text-sm text-gray-100">Customer ID: <span>{data?.customer_id}</span></p>
                                </div>
                                <div className=" flex justify-center  pt-3">
                                    <button onClick={() => setisProfileOpen(true)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
                                        View Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 md:mt-0   border-gray-300 md:shadow-sm rounded-md text-black md:w-6/12 ">
                        <div className='flex justify-between items-center p-2 py-10'>
                            <div className="">
                                <p className="text-xs ">Purchase Date</p>
                                <p className="text-sm font-semibold">{PurchaseDate}</p>
                            </div>
                            <div className="">
                                <p className="text-xs ">Expiry Date</p>
                                <p className="text-sm font-semibold">{ExpiryDate}</p>
                            </div>
                        </div>
                        <div className="container">
                            {/* <div className="btn"><a href="#">Read more 1</a></div>
                            <div className="btn"><a href="#">Read more 3</a></div> */}
                            <div className="btn" onClick={() => navigate('/Partners')}><a href="#">Find Partners</a></div>
                        </div>
                    </div>
                </div>
                <div className='border md:flex justify-between p-3 border-gray-300 rounded-sm'>
                    <div className=' md:w-6/12 m-2'>
                        <div className='p-2'>
                            <p className='text-[10px]'>Full name</p>
                            <div className='flex justify-between'>
                                <p>{data.name}</p>
                            </div>
                            <hr className='mt-2' />
                        </div>
                        <div className='p-2'>
                            <p className='text-[10px]'>Phone</p>
                            <div className='flex justify-between'>
                                <p><span>+91 </span>{data.number}</p>
                            </div>
                            <hr className='mt-2' />
                        </div>
                        <div className='p-2'>
                            <p className='text-[10px]'>District</p>
                            <div className='flex justify-between'>
                                <p>{data?.district}</p>
                            </div>
                            <hr className='mt-2' />
                        </div>
                        <div className='p-2'>
                            <p className='text-[10px]'>State</p>
                            <div className='flex justify-between'>
                                <p>{data?.state}</p>
                            </div>
                            <hr className='mt-2' />
                        </div>
                        <div className='p-2'>
                            <p className='text-[10px]'>Address</p>
                            <div className='flex justify-between'>
                                <p>{data?.address}</p>
                            </div>
                            <hr className='mt-2' />
                        </div>
                    </div>
                    <div className=' w-full md:w-6/12 m-2'>
                        <div className='p-2'>
                            <p className='text-[10px]'>Date of birth</p>
                            <div className='flex justify-between'>
                                <p>{DateOfBirth}</p>
                            </div>
                            <hr className='mt-2' />
                        </div>
                        <div className='p-2'>
                            <p className='text-[10px]'>Email</p>
                            <div className='flex justify-between'>
                                <p>{data?.email_id}</p>
                            </div>
                            <hr className='mt-2' />
                        </div>
                        <div className='p-2'>
                            <p className='text-[10px]'>Pincode</p>
                            <div className='flex justify-between'>
                                <p>{data?.pincode}</p>
                            </div>
                            <hr className='mt-2' />
                        </div>
                        <div className='p-2'>
                            <p className='text-[10px]'>Country</p>
                            <div className='flex justify-between'>
                                <p>{data?.country}</p>
                            </div>
                            <hr className='mt-2' />
                        </div>
                        <div className='pt-7'>
                            <div className='flex justify-end items-end '>
                                <button className='bg-gray-200 rounded-full' onClick={() => (onOpen())}><p className='text-[10px] px-6 p-1 '>Edit</p></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='m-2 p-2 w-full  md:w-4/12 flex flex-col justify-between '>
                {/* <div className='border p-5  shadow-sm'>
                    <div className='p-1 pb-0'>
                        <p className='text-[10px]'>Legal</p>
                    </div>
                    <div className='flex justify-between p-1'>
                        <p>KYC Status</p>
                        <div className='bg-[#99FDD2] flex items-center justify-center  rounded-full font-sans px-3' >
                            <p className='text-[10px] font-bold tracking-wider'>Verified</p>
                        </div>
                    </div>
                    <div className='flex justify-between p-1'>
                        <p>KYC Details</p>
                        <div className='bg-gray-100 flex justify-center items-center rounded-full px-3'>
                            <p className='text-[10px] font-bold'>View</p>
                        </div>
                    </div>
                </div> */}
                <div className='rounded-sm'>
                    <AdCarousel />
                </div>
            </div>
            {isProfileOpen && <UserProfileModal data={data} close={profileClose} />}
        </div>
    )
}

export default UserProfileDetails
