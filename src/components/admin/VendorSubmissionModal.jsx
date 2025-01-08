import React from 'react';

const VendorSubmissionModal = ({ setShowModal }) => {
    const handleModalClose = () => {
        setShowModal(false);
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-10">
            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white p-8">
                            <button className="absolute top-2 right-2" onClick={handleModalClose}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-gray-600 hover:text-gray-800 cursor-pointer transition-transform transform rotate-0 hover:rotate-90"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <div className='flex flex-col justify-center items-center'>
                                <h2 className="text-2xl font-bold mb-4 text-center">Welcome to Kriyado Partners!</h2>
                                <p className="text-lg mb-6">Your email has been successfully verified.</p>
                                <p className="text-lg mb-6">You are now a Kriyado partner.</p>
                            </div>
                            <div className="flex justify-center mt-4  ">
                                <img src="/mail-truck.gif" alt="" className='w-1/4' />
                            </div>

                            <div className="flex justify-center mt-4">
                                <button className="bg-[#80509F] text-white py-2 px-4 rounded-md transition-colors hover:bg-purple-700" onClick={handleModalClose}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorSubmissionModal;
