import React, { useEffect, useState } from 'react'
import AnimatedText from '../ResuableComponents/AnimatedText'
import { useSelector } from 'react-redux';
import { getErrorMessage } from '../../utils/Validation';
import { get_api } from '../../utils/api';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import AddOfferModal from './AddOfferModal';

const ViewBranch = () => {

    const [branchData, setBranchData] = useState([])
    const [onEdit, setOnEdit] = useState('')
    const [onEditData, setonEditData] = useState('')
    const [effect, seteffect] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const vendor = useSelector(state => state.vendorAuth.vendor);
    const { id } = useParams()

    useEffect(() => {
        fetchBranchdata()
    }, [effect])

    const handleEdit = async (offerId) => {
        if (branchData?.is_active) {
            try {
                const response = await get_api(vendor?.token).post(`/shop/notification/vendor/offer/update/`, { offer_id: offerId, new_offer: onEditData });
                if (response.status === 201) {
                    setOnEdit('')
                    setonEditData('')
                    toast.success('successfully sent a request to update the offer.')
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
        } else {
            toast.error('This Branch is not acitive')
            return
        }
    };
    const handleDelete = async (offerId) => {
        if (branchData?.is_active) {
            try {
                const response = await get_api(vendor?.token).post(`/shop/notification/vendor/offer/delete/`, { offer_id: offerId });
                if (response.status === 201) {
                    seteffect(!effect)
                    toast.success('successfully sent a request to delete the offer.')
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
        } else {
            toast.error('This Branch is not acitive')
            return
        }
    };
    const fetchBranchdata = async () => {
        try {
            const response = await get_api(vendor?.token).get(`/shop/vendor/branches/${id}/`);
            if (response.status === 200) {
                setBranchData(response.data)
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
    const handleSetEdit = (offer) => {
        setOnEdit(offer.id)
        setonEditData(offer.offer)
    }
    const onClose = () => setOpenModal(false)

    return (
        <div className=' m-6  bg-gray-50 rounded-lg shadow-lg md:flex gap-5 p-5'>
            <div className='border border-gray-300 rounded-sm md:w-3/12'>
                <p className='font-bold text-center py-3 bg-gray-200 rounded-t-sm'>Vendor Details</p>
                <div className="p-4">
                    <div className="mb-3">
                        <p className="text-sm font-semibold">District:</p>
                        <p className="text-xs">{branchData?.District}</p>
                    </div>
                    <div className="mb-3">
                        <p className="text-sm font-semibold">Key Person Name:</p>
                        <p className="text-xs">{branchData?.KeyPersonName}</p>
                    </div>
                    <div className="mb-3">
                        <p className="text-sm font-semibold">Key Person Contact:</p>
                        <p className="text-xs">{branchData?.KeyPersonContact}</p>
                    </div>
                    <div className="mb-3">
                        <p className="text-sm font-semibold">Landline:</p>
                        <p className="text-xs">{branchData?.Landphone}</p>
                    </div>
                    <div className="mb-3">
                        <p className="text-sm font-semibold">Locality:</p>
                        <p className="text-xs">{branchData?.Locality}</p>
                    </div>
                    <div className="mb-3">
                        <p className="text-sm font-semibold">Normal Working Hours From:</p>
                        <p className="text-xs">{branchData?.NormalWorkingHoursFrom}</p>
                    </div>
                    <div className="mb-3">
                        <p className="text-sm font-semibold">Normal Working Hours To:</p>
                        <p className="text-xs">{branchData?.NormalWorkingHoursTo}</p>
                    </div>
                    <div className="mb-3">
                        <p className="text-sm font-semibold">Pin Code:</p>
                        <p className="text-xs">{branchData?.PinCode}</p>
                    </div>
                    <div className="mb-3">
                        <p className="text-sm font-semibold">Registered Address:</p>
                        <p className="text-xs">{branchData?.RegisteredAddress}</p>
                    </div>
                    <div className="mb-3">
                        <p className="text-sm font-semibold">State:</p>
                        <p className="text-xs">{branchData?.State}</p>
                    </div>
                    <div className="mb-3">
                        <p className="text-sm font-semibold">Town:</p>
                        <p className="text-xs">{branchData?.Town}</p>
                    </div>
                    <div className="mb-3">
                        <p className="text-sm font-semibold">Country:</p>
                        <p className="text-xs">{branchData?.country}</p>
                    </div>
                    <div className="mb-3">
                        <p className="text-sm font-semibold">Google Map Link:</p>
                        <a href={branchData?.google_map_link} className="text-xs text-blue-500">View on Google Maps</a>
                    </div>
                    <div className="mb-3">
                        <p className="text-sm font-semibold">Sales Type:</p>
                        <p className="text-xs">{branchData?.sales_type}</p>
                    </div>
                </div>
            </div>
            <div className='md:w-9/12 border border-gray-300 rounded-sm mt-5 md:mt-0'>
                <div className='py-5'>
                    <AnimatedText text='Your Offers' className='font-bold text-3xl 649597-[#5f1c7c] font-poppins' />
                    <div className='py-3 my-5 shadow-sm rounded-md border border-[#649597] mx-5 '>
                        <p className='px-8 font-medium '><span>{branchData?.Locality}</span> Branch</p>
                        <div className="mx-5 my-3 flex flex-col gap-3">
                            {branchData?.offers?.length === 0 ?
                                <div><p className='text-center p-5'>No Offer Found</p></div>
                                :
                                branchData?.offers?.map((offer, index) => (
                                    <div key={index} className="bg-white cursor-pointer rounded-md shadow-md p-6 transition duration-300 transform hover:scale-105 border border-gray-300 mb-4">
                                        <div className="flex items-center">
                                            <img src={`${branchData?.company.logo ?? '/icons8-shop-100.png'}`} alt="Logo" className="w-8 h-8 mr-4 hidden md:block" />
                                            <div className="flex-1">
                                                {offer.discount_type === 'flat' ? (
                                                    <div className="flex flex-col md:flex-row justify-between items-center">
                                                        {
                                                            onEdit === offer.id ?
                                                                <input type="text" value={onEditData} onChange={(e) => setonEditData(e.target.value)} className='outline-[#649597] border px-2 py-1 border-[#649597] rounded-md' />
                                                                :
                                                                <p className="text-sm font-medium text-gray-700 md:w-1/2 mb-2 md:mb-0">{`Flat ${offer.offer}`}</p>
                                                        }

                                                        {onEdit === offer.id ?
                                                            <div className='flex gap-5'>
                                                                <button className='bg-[#649597] text-white px-3 py-1 text-center rounded-md' onClick={() => handleEdit(offer.id)}>save</button>
                                                                <button className='bg-[#77544b] text-white px-3 py-1 text-center rounded-md' onClick={() => setOnEdit('')}>cancel</button>
                                                            </div>
                                                            :
                                                            <div className='flex gap-5'>
                                                                <button><img src="/edit.png" className='w-4 h-4' alt="" onClick={() => handleSetEdit(offer)} /></button>
                                                                <button><img src="/delete (3).png" className='w-4 h-4' alt="" onClick={() => handleDelete(offer.id)} /></button>
                                                            </div>
                                                        }
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col md:flex-row justify-between items-center">
                                                        {
                                                            onEdit === offer.id ?
                                                                <input type="text" value={onEditData} onChange={(e) => setonEditData(e.target.value)} className='outline-[#649597] border px-2 py-1 border-[#649597] rounded-md' />
                                                                :
                                                                <p className="text-sm font-medium text-gray-700 md:w-1/2 mb-2 md:mb-0">{`Flat ${offer.offer}`}</p>
                                                        }

                                                        {onEdit === offer.id ?
                                                            <div className='flex gap-5'>
                                                                <button className='bg-[#649597] text-white px-3 py-1 text-center rounded-md' onClick={() => handleEdit(offer.id)}>save</button>
                                                                <button className='bg-[#77544b] text-white px-3 py-1 text-center rounded-md' onClick={() => setOnEdit('')}>cancel</button>
                                                            </div>
                                                            :
                                                            <div className='flex gap-5'>
                                                                <button><img src="/edit.png" className='w-4 h-4' alt="" onClick={() => handleSetEdit(offer)} /></button>
                                                                <button><img src="/delete (3).png" className='w-4 h-4' alt="" onClick={() => handleDelete(offer.id)} /></button>
                                                            </div>
                                                        }
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <button className='bg-[#649597] text-white px-5 py-2 md:w-max w-full text-center rounded-md' onClick={() => setOpenModal(true)} >Add Offer</button>
                </div>
            </div>
            {openModal && <AddOfferModal onClose={onClose} branchData={branchData} seteffect={seteffect} effect={effect} />}
            <Toaster />
        </div>
    )
}

export default ViewBranch
