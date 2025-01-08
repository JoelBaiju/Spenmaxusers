// import React from 'react';

// const CustomerEditModal = ({ show, closeModal, data, storeName }) => {
//     console.log(data)
//     if (!show) {
//         return null;
//     }


//     const saveController=()=>{
//         const name=document.getElementById('name').value
//         const number=document.getElementById('number').value
//         const dob=document.getElementById('dob').value
//         const district=document.getElementById('district').value
//         const pincode=document.getElementById('pincode').value
//         const state=document.getElementById('state').value
//         const country=document.getElementById('country').value
        
        
//         console.log(name)
//     }



//     return (
//         <div className="fixed w-full inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//             <div className="bg-white w-11/12 md:w-fit p-6 rounded-lg shadow-xl">

//                 <div className="flex justify-between items-center">
//                     <h2 className="text-xl font-semibold">Edit User</h2>
//                     <button
//                         className="text-xl font-bold text-gray-500 hover:text-gray-800"
//                         onClick={closeModal}
//                     >
//                         &times;
//                     </button>
//                 </div>

//                 <div>
                   


//                     <div className='grid grid-cols-3 gap-4 my-5'>
//                         <div>
//                             <p className='font-bold mb-2'>Name</p>
//                             <input className='border p-2 hover:border-[#678B8D]' id='name' placeholder={data.name} />
                            
//                         </div>
//                         <div>
//                             <p className='font-bold mb-2'>Date of Birth</p>
//                             <input className='border p-2 hover:border-[#678B8D]' id='dob' placeholder={data.dob} />
//                         </div>
//                         <div className=''>
//                             <p className='font-bold mb-2'>Address</p>
//                             <input className='border p-2 hover:border-[#678B8D]' id='number' placeholder={data.number} />
//                         </div>
//                         <div>
//                             <p className='font-bold mb-2'>District</p>
//                             <input className='border p-2 hover:border-[#678B8D]' id='district' placeholder={data.district} />
//                         </div>
//                         <div>
//                             <p className='font-bold mb-2'>Pincode</p>
//                             <input className='border p-2 hover:border-[#678B8D]' id='pincode' placeholder={data.pincode} />
//                         </div>
//                         <div>
//                             <p className='font-bold mb-2'>State</p>
//                             <input className='border p-2 hover:border-[#678B8D]' id='state' placeholder={data.state} />
//                         </div>

//                         <div>
//                             <p className='font-bold mb-2'>Country</p>
//                             <input className='border p-2 hover:border-[#678B8D]' id='country' placeholder={data.country} />
//                         </div>

//                     </div>  

//                     <div className='w-full flex justify-end p-5 '>
//                         <button className='px-5 py-1 bg-[#649597] rounded-lg text-white ' onClick={saveController}>Save</button>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default CustomerEditModal;



























import React from 'react';
import { get_api } from '../../utils/api';
import { useSelector } from 'react-redux';

const CustomerEditModal = ({ show, closeModal, data }) => {
    console.log(data);

    const user = useSelector((state) => state.adminAuth.adminUser);

    const saveController = () => {
        // Original data
        const originalData = {
            name: data.name || "",
            address: data.address || "",
            dob: data.dob || "",
            district: data.district || "",
            pincode: data.pincode || "",
            state: data.state || "",
            country: data.country || "",
        };

        // Grab input values
        const name = document.getElementById('name').value.trim();
        const address = document.getElementById('address').value.trim();
        const dob = document.getElementById('dob').value.trim();
        const district = document.getElementById('district').value.trim();
        const pincode = document.getElementById('pincode').value.trim();
        const state = document.getElementById('state').value.trim();
        const country = document.getElementById('country').value.trim();

        // Create final payload with unchanged or updated values
        const payload = {
            name: name || originalData.name,
            address: address || originalData.address,
            dob: dob || originalData.dob,
            district: district || originalData.district,
            pincode: pincode || originalData.pincode,
            state: state || originalData.state,
            country: country || originalData.country,
        };

        // Log payload for debugging
        console.log("Sending data to server:", payload);

        // Send data to server using API
        get_api(user?.token)
            .put(`shop/customer/update/${data.id}/admin/`, payload)
            .then((response) => {
                closeModal();
                if (!response.ok) {
                    throw new Error("Failed to update customer details");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Server response:", data);
                alert("Customer details updated successfully!");
            })
            .catch((error) => {
                console.error("Error:", error);
                // alert("An error occurred while updating customer details.");
            });
    };


    
    if (!show) {
        return null;
    }

    return (
        <div className="fixed w-full inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-11/12 md:w-fit p-6 rounded-lg shadow-xl">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Edit Customer</h2>
                    <button
                        className="text-xl font-bold text-gray-500 hover:text-gray-800"
                        onClick={closeModal}
                    >
                        &times;
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-4 my-5">
                    <div>
                        <p className="font-bold mb-2">Name</p>
                        <input
                            className="border p-2 hover:border-[#678B8D] w-full"
                            id="name"
                            placeholder={data.name || "No name"}
                        />
                    </div>
                    <div>
                        <p className="font-bold mb-2">Date of Birth</p>
                        <input
                            className="border p-2 hover:border-[#678B8D] w-full"
                            id="dob"
                            placeholder={data.dob || "No DOB"}
                        />
                    </div>
                    <div>
                        <p className="font-bold mb-2">Address</p>
                        <input
                            className="border p-2 hover:border-[#678B8D] w-full"
                            id="address"
                            placeholder={data.address || "No address"}
                        />
                    </div>
                    <div>
                        <p className="font-bold mb-2">District</p>
                        <input
                            className="border p-2 hover:border-[#678B8D] w-full"
                            id="district"
                            placeholder={data.district || "No district"}
                        />
                    </div>
                    <div>
                        <p className="font-bold mb-2">Pincode</p>
                        <input
                            className="border p-2 hover:border-[#678B8D] w-full"
                            id="pincode"
                            placeholder={data.pincode || "No pincode"}
                        />
                    </div>
                    <div>
                        <p className="font-bold mb-2">State</p>
                        <input
                            className="border p-2 hover:border-[#678B8D] w-full"
                            id="state"
                            placeholder={data.state || "No state"}
                        />
                    </div>
                    <div>
                        <p className="font-bold mb-2">Country</p>
                        <input
                            className="border p-2 hover:border-[#678B8D] w-full"
                            id="country"
                            placeholder={data.country || "No country"}
                        />
                    </div>
                </div>

                <div className="w-full flex justify-end p-5">
                    <button
                        className="px-5 py-1 bg-[#649597] rounded-lg text-white"
                        onClick={saveController}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomerEditModal;
