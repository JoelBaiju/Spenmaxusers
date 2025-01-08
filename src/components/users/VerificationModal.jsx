import React from 'react';
import './WarningAnimation.css';
const VerificationModal = ({ close, verifyApi }) => {
    const handleVerify = () => {
        verifyApi()
        close()

    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
                <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Verification Required</h2>
                <div className='flex justify-center'>
                    <img src="/warning.png" alt="" className='warning-img w-1/3' />
                </div>
                <p className="text-lg mb-6 text-center text-gray-700">It seems the user is not verified yet.</p>
                <button
                    className="bg-[#9F5080] text-white px-6 py-3 rounded-md block mx-auto hover:bg-[#804066] focus:outline-none"
                    onClick={handleVerify}
                >
                    Verify Now
                </button>
            </div>
        </div>
    );
};

export default VerificationModal;
