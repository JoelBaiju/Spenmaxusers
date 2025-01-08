import React, { useEffect, useState } from 'react';
import AnimatedText from '../ResuableComponents/AnimatedText';
import { useSelector } from 'react-redux';
import { getErrorMessage } from '../../utils/Validation';
import toast, { Toaster } from 'react-hot-toast';
import { get_api } from '../../utils/api';

const UsersNotification = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
      
        fetchMessage()
    }, []);

    const user = useSelector(state => state.auth.user);

    const fetchMessage = async () => {
        try {
            const response = await get_api(user?.token).get(`/shop/notification/user/`);
            if (response.status === 200) {
                setMessages(response.data)
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

    return (
        <div className='bg-gray-50 rounded-lg m-6 p-6 shadow-lg'>
            <div className='flex justify-center'>
                <AnimatedText text='Your Notifications' className='font-bold text-4xl text-[#8ab2b4] font-poppins' />
            </div>
            {messages.map((message, index) => (
                <div key={index} className='border border-gray-400 rounded-sm shadow-md p-5 my-2 bg-white cursor-pointer hover:bg-[#f6edff]'>
                    <p className='font-semibold text-gray-700 text-sm'>Message:</p>
                    <p className='text-gray-900 font-poppins text-xs'>{message.message}</p>
                </div>
            ))}
            {messages.length === 0 && (
                <div className='flex justify-center items-center h-48'>
                    <p className='text-gray-500 text-lg'>No new notifications</p>
                </div>
            )}
            <Toaster />
        </div>
    );
};

export default UsersNotification;
