import React from 'react';
import './LoadingSpinner.css'

const LoadingSpinners = () => {
    return (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
        </div>
    );
};

export default LoadingSpinners;
   