import React, { useState } from 'react';

function EditDetailsModal({ Text }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('John Doe');
    const [mobileNumber, setMobileNumber] = useState('1234567890');
    const [keyPersonName, setKeyPersonName] = useState('Jane Doe');
    const [address, setAddress] = useState('123 Main Street, City, Country');

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <button
                className="bg-[#9F5080] hover:bg-[#893e6b] text-white font-bold py-2 px-4 rounded"
                onClick={openModal}
            >
                {Text}
            </button>

            {isModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto backdrop-filter backdrop-blur-sm border border-gray-500 shadow-lg">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="bg-white md:w-1/2 p-6 rounded-lg">
                            {/* Modal content */}
                            <div className="mb-4">
                                <h2 className="text-lg font-bold mb-2">Edit Details</h2>
                                <input
                                    type="text"
                                    className="border border-gray-300 rounded-md p-2 mb-2"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="border border-gray-300 rounded-md p-2 mb-2"
                                    value={mobileNumber}
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="border border-gray-300 rounded-md p-2 mb-2"
                                    value={keyPersonName}
                                    onChange={(e) => setKeyPersonName(e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="border border-gray-300 rounded-md p-2 mb-2"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            <div className='flex justify-between'>
                                <button
                                    className="bg-[#9F5080] hover:bg-[#893e6b] w-4/12 text-white font-bold py-2 px-4 rounded"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                                <button
                                    className="bg-[#80509F] hover:bg-[#6d418b] w-4/12 text-white font-bold py-2 px-4 rounded"
                                    onClick={closeModal}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EditDetailsModal;
