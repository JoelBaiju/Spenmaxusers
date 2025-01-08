import React, { useEffect, useState } from 'react'
import UserHeadderNav from './UserHeadderNav';
import { useDispatch, useSelector } from 'react-redux';
import UserProfileModal from './UserProfileModal';
import { get_api } from '../../utils/api';
import { getErrorMessage } from '../../utils/Validation';
import toast, { Toaster } from 'react-hot-toast';
import { logout } from '../../Reducer/authReducer';

const UserHeadder = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setisProfileOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [userProfileData, setuserProfileData] = useState('');
    const [notificationCount, setnotificationCount] = useState(0);

    const user = useSelector(state => state.auth.user);
    const Dispatch = useDispatch()

    useEffect(() => {
        fetchProfileData()
        fetchNotificationCountInitial()
        fetchnotificationCount()
    }, [isProfileOpen])

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const profileClose = () => {
        setisProfileOpen(false)
        setIsOpen(false);
    }
    const OpenProfile = () => {
        setIsMenuOpen(false);
        setisProfileOpen(true)
    }
    const fetchProfileData = async () => {
        try {
            const response = await get_api(user?.token).get('/shop/customer/quick_profile/user/');
            if (response.status === 200) {
                setuserProfileData(response.data)
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
    const fetchnotificationCount = async () => {
        const socket = new WebSocket('ws://192.168.1.6:8000/ws/notifications/user/');

        socket.onopen = () => {
            console.log('WebSocket connection opened.');
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setnotificationCount(notificationCount + data.increment);
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed.');
        };

        return () => {
            socket.close();
        };
    }
    const fetchNotificationCountInitial = async () => {
        try {
            const response = await get_api(user?.token).get(`/shop/notification/count/user/`);
            if (response.status === 200) {
                setnotificationCount(response?.data?.notification_count)
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
    const onClickFuntion = () => {
        setnotificationCount(0)
    }
    const Onlogout = () => {
        Dispatch(logout())
    }

    return (
        <div className='bg-[#C0DCDD] shadow-lg m-6 rounded-lg '>
            <div className=' mx-auto px-4 md:py-0 py-3 md:flex justify-between items-center'>
                <div className='flex justify-between items-center'>
                    <img src="/Spenmax transparent 1.png" alt="" className="w-32" />
                    <button
                        className='md:hidden focus:outline-none'
                        onClick={handleMenuToggle}
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
                <div className={`md:flex  ${isMenuOpen ? 'block' : 'hidden'}`}>
                    <div className=' mt-10 md:mt-0  flex flex-row justify-around md:flex-row md:space-x-4 items-center ' onClick={handleMenuToggle} >
                        <UserHeadderNav icon='/home.png' text='Home' to='/' />
                        <UserHeadderNav icon='/team.png' text='Partner' to='/Partners' />
                        <UserHeadderNav icon='/bell (2).png' text='Notifications' to='/Users-Notification' notificationCount={notificationCount} onClickFuntion={onClickFuntion} />
                        <UserHeadderNav icon='/rupee.png' text='Pricing' to='Pricing' />
                    </div>
                    <div className="  flex items-center justify-end ml-4 mt-10 md:mt-0 relative">
                        <img src="/man.png" alt="profile" className="w-4" />
                        <div className="ml-2">
                            <p className="text-xs">Welcome Back</p>
                            <p>{user && user?.name}</p>
                        </div>
                        <button onClick={toggleDropdown} className="ml-2 focus:outline-none">
                            <img src="/down-arrow.png" alt="down-arrow" className="w-4" />
                        </button>
                        {isOpen && (
                            <div className="absolute border flex justify-center top-full right-0 mt-1 bg-white shadow-md rounded-md w-36 z-10">
                                <ul>
                                    <li>
                                        <a href="#" onClick={OpenProfile} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
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
            {isProfileOpen && <UserProfileModal data={userProfileData} close={profileClose} />}
            <Toaster />
        </div>
    );
}

export default UserHeadder
