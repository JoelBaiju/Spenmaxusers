import React, { useEffect, useState } from 'react';
import profileEditForm from '../../utils/FormData';
import { useSelector } from 'react-redux';
import { get_api } from '../../utils/api';
import { getErrorMessage } from '../../utils/Validation';
import toast, { Toaster } from 'react-hot-toast';

const EditProfileModal = ({ isOpen, onClose, data, setData }) => {

    const [fullName, setFullName] = useState('');
    const [DateOfBirth, setDateOfBirth] = useState('')
    const { formData, handleChange, setFormData } = profileEditForm();
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        const dateObject2 = new Date(data?.dob);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        setDateOfBirth(dateObject2.toLocaleDateString('en-US', options))
        setFormData(data)
    }, [data])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await get_api(user?.token).put('/shop/customer/detail_update/user/', formData);
            if (response.status === 200) {
                setData(response.data)
                onClose();
            }
        } catch (error) {
            console.log('error', error);
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
        <div className={`fixed top-0 left-0 w-full z-50 h-full  bg-black bg-opacity-50 ${isOpen ? '' : 'hidden'}`}>
            <div className="fixed top-1/2 left-1/2 w-11/12 md:w-6/12 overflow-scroll md:overflow-auto   transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md shadow-md">
                <form onSubmit={handleSubmit} >
                    <h2 className="text-xl text-center font-bold mb-4">Edit Profile</h2>
                    <div className='md:flex gap-8'>
                        <div className='md:w-8/12'>
                            <input required type="text" name='name' value={formData?.name} onChange={handleChange} placeholder="Full Name" className="w-full mb-4 p-2 border outline-[#678B8D] rounded-md" />
                            <input required type="text" name='number' value={formData?.number} onChange={handleChange} placeholder="Mobile number" className="w-full mb-4 p-2 border outline-[#678B8D] rounded-md" />
                            <input required type="text" name='district' value={formData?.district} onChange={handleChange} placeholder="District" className="w-full mb-4 p-2 border outline-[#678B8D] rounded-md" />
                            <input required type="text" name='state' value={formData?.state} onChange={handleChange} placeholder="State" className="w-full mb-4 p-2 border outline-[#678B8D] rounded-md" />
                            <input required type="text" name='address' value={formData?.address} onChange={handleChange} placeholder="Full Name" className="w-full mb-4 p-2 border outline-[#678B8D] rounded-md" />
                        </div>
                        <div className='md:w-8/12'>
                            <input required type="text" name='dob' value={formData?.dob} onChange={handleChange} placeholder="Dob" className="w-full mb-4 p-2 border outline-[#678B8D] rounded-md" />
                            <input required type="text" name='email_id' value={formData?.email_id} onChange={handleChange} placeholder="Email" className="w-full mb-4 p-2 outline-[#678B8D] border rounded-md" />
                            <input required type="text" name='pincode' value={formData?.pincode} onChange={handleChange} placeholder="pincode" className="w-full mb-4 p-2 outline-[#678B8D] border rounded-md" />
                            <input required type="text" name='country' value={formData?.country} onChange={handleChange} placeholder="country" className="w-full mb-4 p-2 outline-[#678B8D] border rounded-md" />
                        </div>
                    </div>
                    <div className='md:flex justify-between gap-6 pt-10 '>
                        <button type='submit' className="bg-[#678B8D] md:w-6/12 text-white py-2 px-4 rounded-md ">Save Changes</button>
                        <button onClick={onClose} className="bg-[#EF3826] text-white md:w-6/12 ml-2 py-2 px-4 rounded-md ">Cancel</button>
                    </div>
                </form>
            </div>
            <Toaster />
        </div >
    );
};

export default EditProfileModal;
