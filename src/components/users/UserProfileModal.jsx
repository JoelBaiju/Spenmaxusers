import React from 'react';

const UserProfileModal = ({ close, data }) => {
    const userData = {
        name: "John Doe",
        customerId: "123456",
        profileImage: "/man.png"
    };
    const handleCloseModal = () => {
        close();
    };

    return (
        <>

            <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg max-w-md relative">
                    <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-600"
                        onClick={handleCloseModal}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                    <div className="flex justify-center">
                        <img src={data?.image ??userData.profileImage} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2 text-center">{data?.name}</h2>
                    <p className="text-gray-600 mb-4">Customer ID: {data?.customer_id}</p>
                </div>
            </div>

        </>
    );
};

export default UserProfileModal;
