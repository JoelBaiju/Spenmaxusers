import React from 'react';
import { get_api } from '../../utils/api';
import { useSelector } from 'react-redux';

const PartnerEditModal = ({ show, closeModal, data, storeName }) => {
    console.log(data);
   

    const user = useSelector(state => state.adminAuth.adminUser)


    const saveController = () => {
        // Original data
        const originalData = {
            organization: data.organization || "",
            owner: data.owner || "",
            website: data.website || "",
            fb: data.facebook_link || "",
            insta: data.instagram_link || "",
            youtube: data.youtube_link || "",
            head_office_address: data.head_office_address || "",
        };

        // Grab input values
        const organization = document.getElementById('organization').value.trim();
        const owner = document.getElementById('owner').value.trim();
        const website = document.getElementById('website').value.trim();
        const fb = document.getElementById('fb').value.trim();
        const insta = document.getElementById('insta').value.trim();
        const youtube = document.getElementById('youtube').value.trim();
        const head_office_address = document.getElementById('head_office_address').value.trim();

        // Create final data to send, keeping original values if unchanged
        const payload = {
            organization: organization || originalData.organization,
            owner: owner || originalData.owner,
            website: website || originalData.website,
            facebook_link: fb || originalData.fb,
            instagram_link: insta || originalData.insta,
            youtube_link: youtube || originalData.youtube,
            head_office_address: head_office_address || originalData.head_office_address,
        };

        // Log payload for debugging
        console.log("Sending data to server:", payload);

        // Send data to server using fetch (or axios)
        get_api(user?.token).put(`/shop/vendor/company/${data.id}/a_update/`, payload)
            
            .then((response) => {
                closeModal()
                if (!response.ok) {
                    throw new Error("Failed to update vendor details");
                }
                
                return response.json();
            })
            .then((data) => {
                console.log("Server response:", data);
                alert("Vendor details updated successfully!");
            })
            .catch((error) => {
                console.error("Error:", error);
                // alert("An error occurred while updating vendor details.");
            });
    };


    if (!show) {
        return null;
    }
    return (
        <div className="fixed w-full inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-11/12 md:w-fit p-6 rounded-lg shadow-xl">

                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Edit Vendor Details</h2>
                    <button
                        className="text-xl font-bold text-gray-500 hover:text-gray-800"
                        onClick={closeModal}
                    >
                        &times;
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-4 my-5">
                    <div>
                        <p className="font-bold mb-2">Organization</p>
                        <input
                            className="border p-2 hover:border-[#678B8D] w-full"
                            id="organization"
                            placeholder={data.organization}
                        />
                    </div>
                    <div>
                        <p className="font-bold mb-2">Owner</p>
                        <input
                            className="border p-2 hover:border-[#678B8D] w-full"
                            id="owner"
                            placeholder={data.owner}
                        />
                    </div>
                    <div>
                        <p className="font-bold mb-2">Website</p>
                        <input
                            className="border p-2 hover:border-[#678B8D] w-full"
                            id="website"
                            placeholder={data.website || "No website"}
                        />
                    </div>
                    <div>
                        <p className="font-bold mb-2">Facebook</p>
                        <input
                            className="border p-2 hover:border-[#678B8D] w-full"
                            id="fb"
                            placeholder={data.facebook_link || "No Facebook"}
                        />
                    </div>
                    <div>
                        <p className="font-bold mb-2">Instagram</p>
                        <input
                            className="border p-2 hover:border-[#678B8D] w-full"
                            id="insta"
                            placeholder={data.instagram_link || "No Instagram"}
                        />
                    </div>
                    <div>
                        <p className="font-bold mb-2">Youtube</p>
                        <input
                            className="border p-2 hover:border-[#678B8D] w-full"
                            id="youtube"
                            placeholder={data.youtube_link || "No youtube"}
                        />
                    </div>
                    <div>
                        <p className="font-bold mb-2">Head Office Address</p>
                        <input
                            className="border p-2 hover:border-[#678B8D] w-full"
                            id="head_office_address"
                            placeholder={data.head_office_address || "No address"}
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

export default PartnerEditModal;
