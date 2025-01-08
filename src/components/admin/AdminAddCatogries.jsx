import React, { useEffect, useState } from 'react'
import Dropdown from './Dropdown'
import AdminCatogryList from './AdminCatogryList'
import { useDispatch, useSelector } from 'react-redux'
import { get_api } from '../../utils/api'
import { getErrorMessage } from '../../utils/Validation'
import toast, { Toaster } from 'react-hot-toast'
import MorePartnersSkelton from '../ResuableComponents/MorePartnersSkelton'
import { adminLogout } from '../../Reducer/adminAuthReducer'

const AdminAddCatogries = () => {

    const [LoginError, setLoginError] = useState([]);
    const [Categories, setCategories] = useState(null);
    const [NewCategories, setNewCategories] = useState('');
    const [effect, seteffect] = useState(false);
    const [inputData, setinputData] = useState('');


    const user = useSelector(state => state.adminAuth.adminUser)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await get_api(user?.token).get('/shop/categories/');
                if (response.status === 200) {
                    setCategories(response?.data)
                }
            } catch (error) {
                console.error('Fetching data failed:', error);
                if (error.message) {
                    toast.error(`${error.message || 'Somthing went wrong'}`)
                }
                const errorMessages = getErrorMessage(error)
                const generalErrors = errorMessages.filter((error) => error.field === null);
                if (error.response?.data.type === 'client_error') {
                    dispatch(adminLogout())
                } else if (generalErrors) {
                    setLoginError(generalErrors.map(error => error.message));
                    {
                        LoginError.map((error, index) => (
                            toast.error(`${error}`)
                        ))
                    }
                }
            }
        };

        fetchData();

    }, [effect]);

    const createCategory = async () => {
        try {
            const response = await get_api(user?.token).post('/shop/categories/create/', { name: NewCategories })
            setNewCategories('');
            if (response.status === 201) {
                setCategories(prevCategories => [...prevCategories, response.data]);
            }
        } catch (error) {
            console.log(error);
            setNewCategories('');
            const errorMessages = getErrorMessage(error)
            const generalErrors = errorMessages.filter((error) => error.field === 'general' || error.field === 'non_field_errors' || error.field === 'name');
            if (generalErrors.length > 0) {
                setLoginError(generalErrors.map(error => error.message));
                LoginError.map((error, index) => (
                    toast.error(`${error}`)
                ))
            } else if (error.message) {
                toast.error(`${error.message || 'Somthing went wrong'}`)
            }
        }
    }

    const deleteCategory = async (id) => {
        try {
            const response = await get_api(user?.token).delete(`/shop/categories/${id}/delete/`)
            console.log('response', response);
            if (response.status === 204) {
                toast.success('Category deleted successfully.', {
                    position: "bottom-center"
                })
                seteffect(prevEffect => !prevEffect);
            }
        } catch (error) {
            console.log('deleteCategory', error);
            const errorMessages = getErrorMessage(error)
            const generalErrors = errorMessages.filter((error) => error.field === 'general' || error.field === 'non_field_errors' || error.field === 'name');
            if (generalErrors.length >= 0) {
                const newErrors = generalErrors.map(error => error.message);
                newErrors.forEach(error => toast.error(error));
                return newErrors;
            } else if (error.message) {
                toast.error(`${error.message || 'Somthing went wrong'}`)
            }
        }
    }

    const render = () => {
        seteffect(prevEffect => !prevEffect);
    }

    const fetchSearchData = async () => {
        try {
            const response = await get_api(user?.token).get(`/shop/categories/?search=${inputData}`)
            setCategories(response.data);
        } catch (error) {
            console.log(error);
            const errorMessages = getErrorMessage(error)
            const generalErrors = errorMessages.filter((error) => error.field === 'general' || error.field === 'non_field_errors' || error.field === 'name');
            if (generalErrors.length >= 0) {
                const newErrors = generalErrors.map(error => error.message);
                newErrors.forEach(error => toast.error(error));
                return newErrors;
            } else if (error.message) {
                toast.error(`${error.message || 'Somthing went wrong'}`)
            }
        }
    }

    const searchOnChange = (text) => {
        setinputData(text)
        fetchSearchData()
    }

    const reset= ()=> {
        seteffect(prevEffect => !prevEffect)
        setinputData('')
    }

    return (
        <div className=' m-6 p-2 bg-[#C0DCDD] rounded-lg shadow-lg '>
            <div className='flex items-center justify-between'>
                <h1 className='font-bold p-3'>Add Categories</h1>
                <div className='flex px-5 gap-5'>
                    <div className="relative m-3">
                        <input
                            type="text"
                            className="border rounded-full pl-10 pr-4 py-2 w-full outline-[#688687]"
                            placeholder="Search package"
                            value={inputData}
                            onChange={(e) => { searchOnChange(e.target.value) }}
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
                    <div className='flex items-center justify-center w-3/12 cursor-pointer' onClick={reset}>
                        <img src="/undo (1).png" alt="" className='w-4 h-4' />
                        <p className='text-sm text-red-500 font-sans p-0 m-0 font-bold'>Reset Filter</p>
                    </div>
                </div>
            </div>

            <div className='  flex justify-between'>
                <div className='m-2 p-3 border bg-white rounded-md  border-gray-300 w-3/12  flex flex-col justify-between '>
                    <div>
                        <h1 className='font-bold'>Add New</h1>
                        <div className='m-3'>
                            <p className='text-sm text-gray-400 p-1 '>Categories</p>
                            <input type="text" value={NewCategories} onChange={(e) => { setNewCategories(e.target.value) }} className='border text-sm outline-[#688687]  border-gray-300 pl-5 pr-4 py-1 w-full rounded-sm bg-gray-100' placeholder="Enter name" />
                        </div>
                        <div className='m-3'>
                            <p className='text-sm text-gray-400 p-1 '>Type</p>
                            <input type="text" disabled className='border text-sm  pointer-events-none border-gray-300 pl-5 pr-4 py-1 w-full rounded-sm outline-[#688687] bg-gray-200 text-gray-500' placeholder="Enter Amount" />
                        </div>
                        <div className='m-3'>
                            <p className='text-sm text-gray-400 p-1 '>Choose Type</p>
                            <input type="text" disabled className='border text-sm  pointer-events-none border-gray-300 pl-5 pr-4 py-1 w-full rounded-sm outline-[#688687] bg-gray-200 text-gray-500' placeholder="Enter Type" />
                        </div>
                    </div>
                    <div className='m-4 p-2 flex justify-center items-center bg-[#688687] text-white rounded-lg'>
                        <button onClick={createCategory} disabled={!NewCategories.trim()} >
                            Add Categories
                        </button>
                    </div>

                </div>
                <div className='w-9/12 border bg-white rounded-md m-2 p-2  border-gray-300   '>

                    <div className=' '>

                    </div>
                    <div className=' '>
                        {Categories == null ? <div>
                            <div className='mb-10'>
                                <MorePartnersSkelton />
                            </div>
                            <MorePartnersSkelton />
                        </div>
                            :
                            <AdminCatogryList render={render} Categories={Categories} deleteCategory={deleteCategory} />}
                    </div>
                </div>

            </div>
            <Toaster />
        </div>
    )
}

export default AdminAddCatogries
