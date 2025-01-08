import React, { useEffect, useState } from 'react';
import logo from '../../assets/images/Spenmax transparent 1.png'
import { Link } from 'react-router-dom';
import VendorHeadderNavItem from './VentorHeadderNavItem';
import { useDispatch, useSelector } from 'react-redux';
import { get_api } from '../../utils/api';
import { getErrorMessage } from '../../utils/Validation';
import toast, { Toaster } from 'react-hot-toast';
import { vendorlogout } from '../../Reducer/vendorAuthReducer';

const VendorHeadder = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [NotoficationCount, setNotoficationCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const vendor = useSelector(state => state.vendorAuth.vendor);
    const dispatch = useDispatch()

    useEffect(() => {
        fetchNotificationCount()
        const intervalId = setInterval(fetchNotificationCount, 15 * 60 * 1000);
        return () => clearInterval(intervalId);
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const fetchNotificationCount = async () => {
        try {
            const response = await get_api(vendor?.token).get('/shop/notification/count/vendor/');
            if (response.status === 200) {
                setNotoficationCount(response.data)
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
    const Onlogout = () => dispatch(vendorlogout())
    const MenuClose = () => setIsMenuOpen(false)
    return (
        <div className='bg-[#C0DCDD] shadow-lg m-6 rounded-lg'>
            <div className=' mx-auto px-4 py-2 md:flex md:justify-between md:items-center'>
                <div className='flex justify-between items-center'>
                    <Link to="/vendors">
                        <img src={logo} alt="" className="w-32" />
                    </Link>
                    <button
                        className='md:hidden focus:outline-none'
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg
                            className='h-6 w-6 text-gray-500'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M4 6h16M4 12h16M4 18h16'
                            />
                        </svg>
                    </button>
                </div>
                <div className={`md:flex ${isMenuOpen ? 'block' : 'hidden'}`}>
                    <div className='flex flex-col md:flex-row md:space-x-4 items-center mt-4 md:mt-0' >
                        <VendorHeadderNavItem icon='/dashboards.png' text='DashBoard' to="/vendors" MenuClose={MenuClose} />
                        <VendorHeadderNavItem icon='/agency.png' text='Branch' to="/vendors/add-Branch" MenuClose={MenuClose} />
                        <VendorHeadderNavItem icon='/bar-chart.png' text='Ads' to='/vendors/Vendor-Ad' MenuClose={MenuClose} />
                        <VendorHeadderNavItem icon='/bell (2).png' text='Notification' to='/vendors/Vendor-Notifications' MenuClose={MenuClose} NotoficationCount={NotoficationCount} />
                    </div>
                    <div className='flex items-center ml-4 mt-4 md:mt-0 relative'>
                        <img src="/man.png" alt="profile" className='w-4' />
                        <div className='ml-2'>
                            <p className='text-xs'>Welcome Back</p>
                            <p>{vendor?.name}</p>
                        </div>
                        <button onClick={toggleDropdown} className="ml-2 focus:outline-none">
                            <img src="/down-arrow.png" alt="down-arrow" className="w-4" />
                        </button>
                        {isOpen && (
                            <div className="absolute border top-full left-0 mt-1 bg-white shadow-md rounded-md w-36 z-10">
                                <ul>
                                    <li>
                                    </li>
                                    <li>
                                        <a href="#" onClick={Onlogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Log out</a>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    );
};


export default VendorHeadder;
