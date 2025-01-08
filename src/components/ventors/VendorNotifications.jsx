import React, { useEffect, useState } from 'react';
import AnimatedText from '../ResuableComponents/AnimatedText';
import { useSelector } from 'react-redux';
import { getErrorMessage } from '../../utils/Validation';
import toast, { Toaster } from 'react-hot-toast';
import { get_api } from '../../utils/api';

const VendorNotifications = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {

        fetchMessage()
    }, []);

    const vendor = useSelector(state => state.vendorAuth.vendor);

    const fetchMessage = async () => {
        try {
            const response = await get_api(vendor?.token).get(`/shop/notification/vendor/`);
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
        <div className=' m-6 p-6'>
            <div className='flex justify-center'>
                <AnimatedText text='Your Notifications' className='font-bold text-4xl text-[#497576] font-poppins' />
            </div>
            {messages.map((message, index) => (
                <div key={index} className='border border-gray-300 rounded-lg shadow-md p-5 my-2 bg-white cursor-pointer hover:bg-[#f6edff]'>
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

export default VendorNotifications;
