import React, { useEffect, useState } from 'react'
import PartnersList from './PartnersList'
import PartnersRegistration from './PartnersRegistration'
import { getErrorMessage } from '../../utils/Validation'
import toast, { Toaster } from 'react-hot-toast'
import { get_api } from '../../utils/api'
import { useSelector } from 'react-redux'
import PartnerListSkelton from '../ResuableComponents/PartnerListSkelton'
import CompanyModal from './CompanyModal'
import PartnerEditModal from './PartnerEditModal'

const AdminAddParnter = () => {

    const [vendors, setVendors] = useState([]);
    const [searchQuery, setsearchQuery] = useState('');
    const [companyDetails, setcompanyDetails] = useState({});
    const [isOPen, setisOPen] = useState(false);

    const user = useSelector(state => state.adminAuth.adminUser)

    useEffect(() => {
        fetchComapnies()
    }, [])

    const fetchComapnies = async () => {
        try {
            const response = await get_api(user?.token).get('/shop/vendor/company/');
            if (response.status === 200) {
                setVendors(response.data)
            }
        } catch (error) {
            console.log(error);
            const errorMessages = getErrorMessage(error)
            const generalErrors = errorMessages.filter((error) => error.field === 'general' || error.field === error.field || error.field === 'name');
            if (generalErrors.length >= 0) {
                const newErrors = generalErrors.map(error => error.message);
                newErrors.forEach(error => toast.error(error));
            }
            else if (error.message) {
                toast.error(`${error.message || 'Somthing went wrong'}`)
            }
        }
    }

    const searchCompany = async (text) => {
        try {
            const response = await get_api(user?.token).get(`/shop/vendor/company/?search=${text}`);
            if (response.status === 200) {
                if (response.data.length === 0) {
                    toast(
                        `${searchQuery} not found`,
                        {
                            duration: 6000,
                        }
                    );
                    setsearchQuery('')
                } else {
                    setVendors(response.data)
                    setsearchQuery('')
                }
            }
        } catch (error) {
            console.log(error);
            setsearchQuery('')
            const errorMessages = getErrorMessage(error)
            const generalErrors = errorMessages.filter((error) => error.field === 'general' || error.field === error.field || error.field === 'name');
            if (generalErrors.length >= 0) {
                const newErrors = generalErrors.map(error => error.message);
                newErrors.forEach(error => toast.error(error));
            }
            else if (error.message) {
                toast.error(`${error.message || 'Somthing went wrong'}`)
            }
        }
    }

    const searchInput = (e) => {
        setsearchQuery(e.target.value)
    }

    const OnSubmitSearch = () => {
        searchCompany(searchQuery)
    }






    const [showEditModal, setShowEditModal] = useState(false);
    const closeEditModal = () => setShowEditModal(false);




    const fetchComapnyDetails = async (id, edit) => {
        try {
            const response = await get_api(user?.token).get(`/shop/vendor/company/${id}/`);
            if (response.status === 200) {
                setcompanyDetails(response.data)
                if (edit===true){
                    setShowEditModal(true)
                }
                else{
                    setisOPen(true)
                }
            }
        } catch (error) {
            console.log(error);
            const errorMessages = getErrorMessage(error)
            const generalErrors = errorMessages.filter((error) => error.field === 'general' || error.field === error.field || error.field === 'name');
            if (generalErrors.length >= 0) {
                const newErrors = generalErrors.map(error => error.message);
                newErrors.forEach(error => toast.error(error));
            }
            else if (error.message) {
                toast.error(`${error.message || 'Somthing went wrong'}`)
            }
        }
    }

    const closingModal = () => {
        setisOPen(false)
    }


    return (
        <div className=' m-6 p-2 bg-[#C0DCDD] rounded-lg shadow-lg '>
            <div className='flex items-center justify-between'>
                <h1 className='font-bold p-3 m-2'>Add Partners</h1>
            </div>

            <div className='flex justify-between'>
                <div className='m-2 p-3 border  border-gray-300 w-3/12  rounded-md bg-white flex flex-col '>
                    <div >
                        <h1 className='font-bold'>Partners</h1>

                        <div className='flex gap-5' >
                            <div className="relative w-8/12 ">
                                <input
                                    type="text"
                                    className="border rounded-full text-xs pl-10 pr-4 py-2 w-full outline-[#699496]"
                                    placeholder="Search Partner"
                                    value={searchQuery}
                                    onChange={searchInput}
                                />
                                <svg
                                    className="absolute left-3 top-2 h-5 w-5 text-gray-500 "
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 11a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17.5 17.5l2.5 2.5"
                                    />
                                </svg>
                            </div>

                            <button className='bg-[#699496] w-4/12 text-white text-sm rounded-full p-1' onClick={OnSubmitSearch}>Search </button>
                        </div>

                    </div>
                    <PartnersList vendors={vendors} fetchComapnyDetails={fetchComapnyDetails} />
                </div>

                <div className='w-9/12 border m-2 p-2  border-gray-300   rounded-md bg-white'>

                    <div className=' '>
                        <div className='m-2 p-2'>
                            <h1 className='font-bold'>Add New</h1>
                        </div>

                    </div>
                    <div className=' '>
                        <PartnersRegistration />
                    </div>
                </div>

            </div>
            <CompanyModal data={companyDetails} isOpen={isOPen} onClose={closingModal} />

            <PartnerEditModal show={showEditModal} closeModal={closeEditModal} data={companyDetails} />

            <Toaster />
        </div>
    )
}

export default AdminAddParnter
