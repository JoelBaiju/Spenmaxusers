import React, { useState, useEffect } from 'react';

const ServiceProvider = ({ branchDetails }) => {
    const { name, logo, mobile_number, KeyPersonName, KeyPersonContact, address, company } = branchDetails;
    const [coverIndex, setCoverIndex] = useState(0);

    const coverImages = branchDetails?.images || [];
    useEffect(() => {
        const interval = setInterval(() => {
            setCoverIndex((prevIndex) => (prevIndex + 1) % coverImages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [coverImages]);

    return (
        <div className="border border-gray-300 p-4 shadow-md rounded-lg overflow-hidden">
            <div className="relative mb-10">
                    <img
                        src={`${coverImages.length > 0 && coverImages[coverIndex] ? coverImages[coverIndex].image : '/Default_i_need_to_default_image_for_our_partners_for_my_web_ap_1.jpg'}`}
                        alt="Cover Image"
                        className="w-full h-40 object-cover rounded-t-lg"
                    />
                <div className="absolute top-[115px]  left-0 right-0 flex items-center justify-center">
                    <img src={`${branchDetails.company.logo ?? '/icons8-shop-100.png'}`} alt='logo' className="w-20 h-20 rounded-full bg-[#e6d8ef] p-1" />
                </div>
            </div>

            <div className='px-1 flex flex-col gap-2'>
                <p className="font-medium text-lg mb-4 text-center">{branchDetails.company.organization}</p>
                <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm text-gray-600">Mobile Number</p>
                    <p className="text-sm">{branchDetails?.company?.mobile_number}</p>
                </div>
                <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm text-gray-600">Email</p>
                    <p className="text-sm">{branchDetails?.company?.email_id}</p>
                </div>
                <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm text-gray-600">country</p>
                    <p className="text-sm">{branchDetails?.country}</p>
                </div>
                <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm text-gray-600">State</p>
                    <p className="text-sm">{branchDetails?.State}</p>
                </div>
                <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm text-gray-600">District</p>
                    <p className="text-sm">{branchDetails?.District}</p>
                </div>
                <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm text-gray-600">Town</p>
                    <p className="text-sm">{branchDetails?.Town}</p>
                </div>
                <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm text-gray-600">PinCode</p>
                    <p className="text-sm">{branchDetails?.PinCode}</p>
                </div>
                <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm text-gray-600">Address</p>
                    <p className="text-sm">{branchDetails?.company?.head_office_address}</p>
                </div>
                <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm text-gray-600">Locality</p>
                    <p className="text-sm">{branchDetails?.Locality}</p>
                </div>
                <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm text-gray-600">RegisteredAddress</p>
                    <p className="text-sm">{branchDetails?.RegisteredAddress}</p>
                </div>
                <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm text-gray-600">Key Person Name</p>
                    <p className="text-sm">{KeyPersonName}</p>
                </div>
                <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm text-gray-600">Key Person Contact</p>
                    <p className="text-sm">{KeyPersonContact}</p>
                </div>
                <div className='flex items-center justify-around mb-2 py-3'>
                    <div className='flex flex-col items-center cursor-pointer'>
                        <img src="/instagram (1).png" className='w-4' alt="" />
                        <p className='text-xs'>instagram</p>
                    </div>
                    <div className='flex flex-col items-center cursor-pointer'>
                        <img src="/facebook.png" className='w-4' alt="" />
                        <p className='text-xs'>Facebook</p>
                    </div>
                    <div className='flex flex-col items-center cursor-pointer'>
                        <img src="/twitter.png" className='w-4' alt="" />
                        <p className='text-xs'>Twitter</p>
                    </div>
                    <div className='flex flex-col items-center cursor-pointer'>
                        <img src="/youtube (1).png" className='w-4' alt="" />
                        <p className='text-xs'>Youtube</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ServiceProvider;
