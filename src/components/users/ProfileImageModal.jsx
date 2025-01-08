// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import toast, { Toaster } from 'react-hot-toast';
// import { useSelector } from 'react-redux';
// import { get_api_form } from '../../utils/api';
// import { getErrorMessage } from '../../utils/Validation';

// const ProfileImageModal = ({ close, id }) => {

//     const [selectedImage, setSelectedImage] = useState(null);

//     const user = useSelector(state => state.auth.user)

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         setSelectedImage(file);
//     };

//     const handleUpload = async () => {
//         try {
//             if (selectedImage) {
//                 const response = await get_api_form(user?.token).put(`/shop/customer/photo/${id}/update/user/`, {image:selectedImage});
//                 if (response.status === 200) {
//                     close();
//                 }
//             } else {
//                 toast.error('please add a picture')
//             }
//         } catch (error) {
//             console.error('Fetching data failed:', error);
//             const errorMessages = getErrorMessage(error)
//             const generalErrors = errorMessages.filter((error) => error.field === 'general' || error.field === error.field || error.field === 'name');
//             if (generalErrors.length >= 0) {
//                 const newErrors = generalErrors.map(error => error.message);
//                 newErrors.forEach(error => toast.error(error));
//                 return newErrors;
//             }
//             else if (error.message) {
//                 toast.error(`${error.message || 'Somthing went wrong'}`)
//             }
//         }

//     };

//     return (
//         <>
//             <motion.div
//                 className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 overflow-y-auto"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.3 }}
//             >
//                 <motion.div
//                     className="bg-white p-6 rounded-lg w-full md:max-w-md"
//                     initial={{ scale: 0.5, opacity: 0 }}
//                     animate={{ scale: 1, opacity: 1 }}
//                     exit={{ scale: 0.5, opacity: 0 }}
//                     transition={{ duration: 0.3 }}
//                 >
//                     <h2 className="text-2xl font-bold mb-4 text-center font-poppins">Upload Your Profile Picture</h2>
//                     <p className="mb-6 text-center text-gray-600 font-poppins text-sm md:max-w-lg mx-auto">Upload your profile picture to enjoy enhanced discounts and access even more savings at local shops near you.</p>
//                     <div className="flex justify-center mb-4">
//                         <input type="file" accept="image/*" onChange={handleImageChange} />
//                     </div>
//                     <div className="flex justify-center">
//                         <button className="bg-[#80509F] text-white px-6 py-2 rounded-md hover:bg-[#6a4384]" onClick={handleUpload}>
//                             Upload
//                         </button>
//                     </div>
//                 </motion.div>
//             </motion.div>
//             <Toaster />
//         </>
//     );
// };

// export default ProfileImageModal;





















import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { get_api_form } from '../../utils/api';
import { getErrorMessage } from '../../utils/Validation';

const ProfileImageModal = ({didUpload, close, id }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const user = useSelector(state => state.auth.user);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };

    const handleUpload = async () => {
        try {
            if (selectedImage) {
                const response = await get_api_form(user?.token).put(`/shop/customer/photo/${id}/update/user/`, { image: selectedImage });
                if (response.status === 200) {
                    didUpload();
                }
            } else {
                toast.error('Please add a picture');
            }
        } catch (error) {
            console.error('Fetching data failed:', error);
            const errorMessages = getErrorMessage(error);
            const generalErrors = errorMessages.filter((error) => error.field === 'general' || error.field === error.field || error.field === 'name');
            if (generalErrors.length >= 0) {
                const newErrors = generalErrors.map(error => error.message);
                newErrors.forEach(error => toast.error(error));
                return newErrors;
            } else if (error.message) {
                toast.error(`${error.message || 'Something went wrong'}`);
            }
        }
    };

    return (
        <>
            <motion.div
                className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 overflow-y-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <motion.div
                    className="bg-white p-6 rounded-lg w-full md:max-w-md relative"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <button
                        onClick={close}
                        className="absolute top-2 right-2 text-3xl text-gray-500 hover:text-gray-800 focus:outline-none"
                    >
                        &times;
                    </button>
                    <h2 className="text-2xl font-bold mb-4 text-center font-poppins">Upload Your Profile Picture</h2>
                    <p className="mb-6 text-center text-gray-600 font-poppins text-sm md:max-w-lg mx-auto">
                        Upload your profile picture to enjoy enhanced discounts and access even more savings at local shops near you.
                    </p>
                    <div className="flex justify-center mb-4">
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                    </div>
                    <div className="flex justify-center">
                        <button
                            className="bg-[#80509F] text-white px-6 py-2 rounded-md hover:bg-[#6a4384]"
                            onClick={handleUpload}
                        >
                            Upload
                        </button>
                    </div>
                </motion.div>
            </motion.div>
            <Toaster />
        </>
    );
};

export default ProfileImageModal;
