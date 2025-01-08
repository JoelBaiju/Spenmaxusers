import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

const AdminNotification = () => {
    const location = useLocation();

    const isActive = (url) => {
        return location.pathname === url;
    };

    return (
        <div className='m-6 p-2 bg-[#C0DCDD] rounded-md'>
            <div className='flex items-center justify-between'>
                <h1 className='font-bold p-3'>All Notifications</h1>
                <div className="relative m-3">
                    <input
                        type="text"
                        className="border rounded-full pl-10 pr-4 py-2 w-full"
                        placeholder="Search package"
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
            </div>

            <div className='flex gap-5'>
                <div className='m-2 p-3 border  border-gray-300 w-3/12  rounded-md bg-white shadow-md'>
                    <div className='flex items-center gap-4 bg-white p-2 my-1'>
                        <div><img className='w-4' src="/team.png" alt="" /></div>
                        <div><p className='text-xs text-[#426869]'>Partners Message</p></div>
                    </div>
                    <div className='flex items-center gap-4 bg-white p-2 my-1'>
                        <div><img className='w-4' src="/customer.png" alt="" /></div>
                        <div><p className='text-xs text-[#426869]'>Custmors Message</p></div>
                    </div>
                    <div className='flex items-center gap-4 bg-white p-2 my-1'>
                        <div><img className='w-4' src="/bar-chart.png" alt="" /></div>
                        <div><p className='text-xs text-[#426869]'>Ads</p></div>
                    </div>
                </div>
                <div className='w-9/12 border m-2 p-2  border-gray-300 shadow-md   rounded-md bg-white'>
                    <h1 className='font-bold p-3'> Notifications</h1>
                    <div className='flex px-5 border-b-2'>
                        <Link
                            to='/admin-home/Notification'
                            className={` ${isActive('/admin-home/Notification') ? 'border-b-2 border-[#426869]' : ''} w-1/12 pb-1`}
                        >
                            <p className='font-medium text-sm text-center'>All</p>
                        </Link>
                        <Link
                            to='/admin-home/Notification/NewRegistration'
                            className={`${isActive('/admin-home/Notification/NewRegistration') ? 'border-b-2 border-[#426869]' : ''} w-3/12 pb-1`}
                        >
                            <p className='font-medium text-sm text-center'>New Registration</p>
                        </Link>
                        <Link
                            to='/admin-home/Notification/ChangesinOffer'
                            className={`${isActive('/admin-home/Notification/ChangesinOffer') ? 'border-b-2 border-[#426869]' : ''} w-3/12 pb-1`}
                        >
                            <p className='font-medium text-sm text-center'>Changes in Offer</p>
                        </Link>
                    </div>
                    <div>
                        <Outlet />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AdminNotification
