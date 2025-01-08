import React from 'react';

const ServicesCard = ({ branchDetails }) => {
    return (
        <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
            <div className="p-6">
                <h2 className="text-xl font-medium mb-4 text-[#678B8D]">Exclusive discount for you</h2>
                <div className="flex justify-center bg-gray-50 border py-2 px-4 rounded-md mb-4">
                    <p className="text-sm text-gray-600">Facility/Services Offered</p>
                    {/* <p className="text-sm text-gray-600">Max. Discount Permissible [%]</p> */}
                </div>

                <div className=" gap-4">
                    {branchDetails?.offers.map((offer, index) => (
                        <div key={index} className="bg-white cursor-pointer rounded-md shadow-md p-6 transition duration-300 transform hover:scale-105 border border-gray-300 mb-4">
                            <div className="flex items-center">
                                <img src={`${branchDetails.company.logo??'/icons8-shop-100.png'}`} alt="Logo" className="w-8 h-8 mr-4 hidden md:block" />
                                <div className="flex-1">
                                    {offer.discount_type === 'flat' ? (
                                        <div className="flex flex-col md:flex-row justify-between items-center">
                                            <p className="text-sm font-medium text-gray-700 md:w-1/2 mb-2 md:mb-0">{`Flat ${offer.offer}`}</p>
                                            <button className={`text-white font-semibold py-1 px-1 rounded-lg ${offer.discount_type === 'flat' ? 'bg-yellow-500' : 'bg-green-500'}`}>
                                                <div className="flex items-center gap-2">
                                                    <img src="/fire.png" alt="fire" className="w-4 h-4" />
                                                    <span className="text-xs">Save with Spenmax</span>
                                                </div>
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col md:flex-row justify-between items-center">
                                            <p className="text-sm font-medium text-gray-700 md:w-1/2 mb-2 md:mb-0">{offer.offer}</p>
                                            <button className={`text-white font-semibold py-1 px-1 rounded-lg ${offer.discount_type === 'flat' ? 'bg-yellow-500' : 'bg-green-500'}`}>
                                                <div className="flex items-center gap-2">
                                                    <img src="/fire.png" alt="fire" className="w-4 h-4" />
                                                    <span className="text-xs">Save with Spenmax</span>
                                                </div>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>



            </div>
        </div>
    );
}

export default ServicesCard;
