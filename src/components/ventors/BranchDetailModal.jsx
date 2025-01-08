import React from 'react';

const BranchDetailModal = ({ vendorData, onClose }) => {
    const {
        District,
        KeyPersonContact,
        KeyPersonName,
        Landphone,
        Locality,
        NormalWorkingHoursFrom,
        NormalWorkingHoursTo,
        PinCode,
        RegisteredAddress,
        State,
        Town,
        country,
        google_map_link,
        sales_type
    } = vendorData;
console.log(vendorData);
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-10/12 md:w-full">
                <div className="flex justify-between mb-4">
                    <h2 className="text-2xl font-bold">Vendor Details</h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div className="space-y-4">
                    <p><span className="font-semibold">District:</span> {District}</p>
                    <p><span className="font-semibold">Key Person Name:</span> {KeyPersonName}</p>
                    <p><span className="font-semibold">Key Person Contact:</span> {KeyPersonContact}</p>
                    <p><span className="font-semibold">Landline:</span> {Landphone}</p>
                    <p><span className="font-semibold">Locality:</span> {Locality}</p>
                    <p><span className="font-semibold">Normal Working Hours From:</span> {NormalWorkingHoursFrom}</p>
                    <p><span className="font-semibold">Normal Working Hours To:</span> {NormalWorkingHoursTo}</p>
                    <p><span className="font-semibold">Pin Code:</span> {PinCode}</p>
                    <p><span className="font-semibold">Registered Address:</span> {RegisteredAddress}</p>
                    <p><span className="font-semibold">State:</span> {State}</p>
                    <p><span className="font-semibold">Town:</span> {Town}</p>
                    <p><span className="font-semibold">Country:</span> {country}</p>
                    <p><span className="font-semibold">Google Map Link:</span> <a href={google_map_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">View on Google Maps</a></p>
                    <p><span className="font-semibold">Sales Type:</span> {sales_type}</p>
                </div>
            </div>
        </div>
    );
};

export default BranchDetailModal;
