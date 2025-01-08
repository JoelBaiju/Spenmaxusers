import React, { useEffect, useState } from 'react'
import Dropdown from '../admin/Dropdown'
import PartnersDeatails from './PartnersDeatails'
import { useQuery } from 'react-query';
import { get_api } from '../../utils/api';
import { useSelector } from 'react-redux';
import { toast, Toaster } from 'react-hot-toast';
import { getErrorMessage } from '../../utils/Validation';
import AdCarousel from '../ResuableComponents/AdCarousel';


const UserPartners = () => {

    const [Data, setData] = useState([])
    const [categories, setcategories] = useState([])
    const [Value, setValue] = useState('')
    const [seletedCategories, setseletedCategories] = useState('')
    const [inputFocous, setinputFocous] = useState(false)
    const user = useSelector(state => state.auth.user);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(()=>{
        searchFilter()
    },[seletedCategories])

    const fetchUserData = async () => {
        try {
            const response = await get_api(user?.token).get('/shop/vendor/branches/customer/');
            if (response.status === 200) {
                setData(response.data)
            }
        } catch (error) {
            console.log(error);
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

    const fetchCatagories = async () => {
        try {
            const response = await get_api(user?.token).get('/shop/categories/');
            if (response.status === 200) {
                setcategories(response.data)
            }
        } catch (error) {
            console.log(error);
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


    const searchFilter = async () => {
        if (Value !== '' && seletedCategories === '') {
            console.log('if ' ,Value,seletedCategories)
            setinputFocous(false)
            try {
                const response = await get_api(user?.token).get(`/shop/vendor/branches/customer/?search=${Value}`);
                if (response.status === 200 && response.data.length >= 0) {
                    setData(response.data);
                    setValue('')
                    setseletedCategories('')
                } else {
                    toast.error("This didn't work.")
                    setValue('')
                    setseletedCategories('')
                }
            } catch (error) {
                console.error('Error fetching data:', error);
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
        } else if (seletedCategories !== '' && Value == '') {
            console.log('else if',Value,seletedCategories)
            try {
                const response = await get_api(user?.token).get(`/shop/vendor/branches/customer/?category__name=${seletedCategories}`);
                if (response.status === 200 && response.data.length >= 0) {
                    setData(response.data);
                    setseletedCategories('')
                    setValue('')
                } else {
                    toast.error("This didn't work.")
                    setseletedCategories('')
                    setValue('')
                }
            } catch (error) {
                console.error('Error fetching data:', error);
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
            console.log('else block',Value,seletedCategories)
            setValue('') 
            setseletedCategories('')
            // toast.error("Please use only one filter at a time.")
        }
    }

    useEffect(() => {
        fetchUserData()
        fetchCatagories()
    }, [])

    const { data, isLoading, isError } = useQuery('userData', fetchUserData, {
        refetchInterval: 60000,
    });

    const handleSearchChange = (e) => {
        setValue(e.target.value);
        setseletedCategories('');
    };
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div >
            <div className='md:absolute md:top-0 md:right-0 md:mt-[12rem] '>
                <div className='m-2 p-2'>
                    <div className='flex bg-[#99FDD2] items-center pl-3 sm:w-8/12 md:w-full justify-center rounded-full '>
                        <div className=''>
                            <h1 className='text-xs'>Active</h1>
                        </div>
                        <div className='bg-black rounded-full h-full p-1 ml-3 w-full  '>
                            <h1 className='text-white text-xs p-1'>Spenmax Lifestyle + Services</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-gray-50 border-[1px] border-[#4f6e6f] rounded-lg m-6 p-6 shadow-lg md:flex  gap-3'>
                <div className='md:w-10/12 '>

                    <div className='flex items-center flex-col md:flex-row'>
                        <div className='w-5/12 hidden  sm:block'>
                            <h1 className='font-bold'>Partners</h1>
                        </div>

                        <div className=' w-full border flex rounded overflow-hidden'>
                            <input type="text" value={Value} onFocus={() => setinputFocous(true)} onChange={handleSearchChange} className='border p-1 w-full h-8  md:px-3 border-gray-200 outline-0 bg-gray-50 text-sm placeholder-black' placeholder='Search' />

                            <div className='bg-[#9abbbc] flex justify-center items-center px-3' onClick={searchFilter}>
                                <img src="/search-interface-symbol (1).png" alt="" className='w-5' />
                            </div>
                        </div>
                        <div className='md:w-80'>
                            <Dropdown search={searchFilter} data={categories} p='2' onUpdate={setseletedCategories} text='Category' bg='bg-gray-50' textcolor='text-black' font='font-medium' textsize='text-sm' />
                        </div>
                        <hr className='w-full md:hidden text-black border-[1px] ' />


                    </div>
                    <div className='mt-5'>
                        <PartnersDeatails Data={Data} />
                    </div>
                </div>
                <div className='md:w-4/12 mt-10 border shadow-md'>
                    <div className='  rounded-sm'>
                        <AdCarousel/>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default UserPartners
