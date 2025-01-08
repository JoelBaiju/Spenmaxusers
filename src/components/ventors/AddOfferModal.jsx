import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { get_api } from '../../utils/api';
import { getErrorMessage } from '../../utils/Validation';
import toast, { Toaster } from 'react-hot-toast';

const AddOfferModal = ({ onSave, onClose, branchData, seteffect, effect }) => {
    const [offerData, setOfferData] = useState({
        discount_type: "flat",
        branch: branchData.id,
        offer_type: "NORMAL",
        offer: "",
        category: ""
    });
    const vendor = useSelector(state => state.vendorAuth.vendor);
    const [showCategory, setshowCategory] = useState(false)
    const handleChange = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const dataId = selectedOption.getAttribute('data-id');
        setshowCategory(dataId === 'category_option');
        const { name, value } = e.target;
        setOfferData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setOfferData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleApiCall = async () => {
        if (offerData.offer_type === "SPECIAL") {
            offerData.discount_type = 'special'
        }
        try {
            const response = await get_api(vendor?.token).post(`/shop/branches/offers/create/`, offerData);
            if (response.status === 201) {
                toast.success('Offer Created')
                seteffect(!effect)
                onClose();
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
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg p-6 max-w-md">
                <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-semibold">Add Offer</h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div>
                    <form>
                        <div className="mb-4 relative">
                            <label className="block text-sm font-bold mb-2" htmlFor="offer_type">Offer Type:</label>
                            <div className="relative ">
                                <select
                                    id="offer_type"
                                    name="offer_type"
                                    value={offerData.offer_type}
                                    onChange={handleChange}
                                    className="shadow  appearance-none border rounded  w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    <option value="NORMAL" data-id="discount_option">Disocunt</option>
                                    <option value="NORMAL" data-id="category_option" onClick={() => setshowCategory(true)}>Category Based</option>
                                    <option value="SPECIAL" data-id="special_option">Special Offer</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        {offerData.offer_type !== "SPECIAL" &&
                            <div className="mb-4 relative">
                                <label className="block text-sm font-bold mb-2" htmlFor="discount_type">Discount Type:</label>
                                <div className="relative ">
                                    <select
                                        id="discount_type"
                                        name="discount_type"
                                        value={offerData.discount_type}
                                        onChange={handleChange}
                                        className="shadow  appearance-none border rounded  w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    >
                                        <option value="flat" data-id={showCategory ? "category_option" : ""}>flat</option>
                                        <option value="percentage" data-id={showCategory ? "category_option" : ""}>percentage</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>}
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2" htmlFor="offer">Offer:</label>
                            <input
                                type="text"
                                id="offer"
                                name="offer"
                                data-id='offer'
                                value={offerData.offer}
                                onChange={handleChangeInput}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        {showCategory &&
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2" htmlFor="category">Category</label>
                                <input
                                    type="text"
                                    id="category"
                                    name="category"
                                    value={offerData.category}
                                    onChange={handleChangeInput}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>}
                    </form>
                </div>
                <div className="flex justify-center mt-4">
                    <button onClick={handleApiCall} className="bg-[#4e7d7e] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save</button>
                </div>
            </div >
            <Toaster />
        </div >
    );
};

export default AddOfferModal;
