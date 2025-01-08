import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ExpiryModal = () => {
    const [isVisible, setIsVisible] = useState(true);
    const navigate = useNavigate();

    const redirect = () => {
        navigate('/Pricing');
    };

    const closeModal = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white rounded-md shadow-md p-8 max-w-md relative">
                <button 
                    onClick={closeModal} 
                    className="absolute top-2 right-2 text-3xl text-gray-500 hover:text-gray-800 focus:outline-none"
                >
                    &times;
                </button>
                <h2 className="text-red-500 font-medium text-2xl mb-4">Your subscription has expired!</h2>
                <p className="font-medium text-sm mb-6">Please contact our customer care to renew your subscription.</p>
                <div className='flex justify-center'>
                    <button onClick={redirect} className="bg-[#678B8D] text-white px-5 py-2 rounded-md">Purchase</button>
                </div>
            </div>
        </div>
    );
};

export default ExpiryModal;
