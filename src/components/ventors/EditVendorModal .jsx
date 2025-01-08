import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { get_api } from '../../utils/api';
import { getErrorMessage } from '../../utils/Validation';
import toast, { Toaster } from 'react-hot-toast';

const EditVendorModal = ({ user, onSave, onClose }) => {
    const [editedUser, setEditedUser] = useState({ ...user });
    const vendor = useSelector(state => state.vendorAuth.vendor);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            const response = await get_api(vendor?.token).put(`/shop/vendor/company/${editedUser.id}/update/`, editedUser);
            if (response.status === 200) {
                onClose()
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
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 ">
            <div className="bg-white p-4 w-11/12 rounded-lg md:w-1/2 md:max-h-3/4 overflow-y-auto">
                <span className="absolute top-0 right-0 m-2 text-gray-600 cursor-pointer" onClick={onClose}>&times;</span>
                <h2 className="text-xl font-bold mb-2">Edit User Details</h2>
                <form>
                    <div className="mb-2">
                        <label className="block text-sm font-bold mb-1" htmlFor="name">Name:</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            id="owner"
                            name="owner"
                            value={editedUser.owner}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-bold mb-1" htmlFor="name">Number:</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            id="mobile_number"
                            name="mobile_number"
                            value={editedUser.mobile_number}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-bold mb-1" htmlFor="name">Address:</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            id="head_office_address"
                            name="head_office_address"
                            value={editedUser.head_office_address}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-bold mb-1" htmlFor="name">FaceBook Link:</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            id="facebook_link"
                            name="facebook_link"
                            value={editedUser.facebook_link}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-bold mb-1" htmlFor="name">Instagram Link:</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            id="instagram_link"
                            name="instagram_link"
                            value={editedUser.instagram_link}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-bold mb-1" htmlFor="name">Website Link:</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            id="website"
                            name="website"
                            value={editedUser.website}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-bold mb-1" htmlFor="name">Youtube Link:</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            id="youtube_link"
                            name="youtube_link"
                            value={editedUser.youtube_link}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex justify-around gap-5 py-5'>
                        <button
                            className="bg-[#649597] w-6/12 hover:bg-[#487071] text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                        <button
                            className="bg-[#935050] w-6/12 hover:bg-[#793d3d] text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={() => onClose()}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
            <Toaster />
        </div>
    );
};

export default EditVendorModal;