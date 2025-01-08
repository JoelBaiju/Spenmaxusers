import React, { useEffect, useState } from 'react'
import Dropdown from './Dropdown'
import AdminPackageList from './AdminPackageList'
import { get_api } from '../../utils/api';
import { useSelector } from 'react-redux';
import { getErrorMessage } from '../../utils/Validation';
import toast, { Toaster } from 'react-hot-toast';
import CustomModal from './CustomModal';

const AdminAddPackage = () => {

    const [categories, setCategories] = useState([]);
    const [effect, seteffect] = useState(false);
    const [LoginError, setLoginError] = useState([]);
    const [searchkey, setsearchkey] = useState('');
    const [packages, setPackages] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        discription: '',
        type: 'BASIC',
        categories: [],
        options: [{
            actual_price: '',
            discount_price: '',
            duration_days: ''
        }]
    });

    const user = useSelector(state => state.adminAuth.adminUser)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleChangeCategories = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions);
        const selectedValues = selectedOptions.map(option => option.value);
        setFormData(prevState => ({
            ...prevState,
            categories: [...prevState.categories, ...selectedValues]
        }));
    };

    const handleOptionChange = (index, e) => {
        const { name, value } = e.target;

        if (value.trim() === '') {
            setFormData(prevState => ({
                ...prevState,
                options: prevState.options.map((option, i) =>
                    i === index ? { ...option, [name]: value } : option
                )
            }));
            return;
        }

        const isValidInteger = /^[0-9]*$/.test(value);
        if (!isValidInteger) {
            toast.error("Please enter a valid integer.");
            return;
        }

        setFormData(prevState => ({
            ...prevState,
            options: prevState.options.map((option, i) =>
                i === index ? { ...option, [name]: value } : option
            )
        }));
    };

    const handleAddMore = () => {
        const isCurrentOptionsFilled = formData.options.every(option => {
            return option.actual_price && option.discount_price && option.duration_days;
        });

        if (isCurrentOptionsFilled) {
            setFormData(prevState => ({
                ...prevState,
                options: [...prevState.options, { actual_price: '', discount_price: '', duration_days: '' }]
            }));
        } else {
            toast.error("Please fill all fields in the current option before adding more.");
            return
        }

        setFormData({
            ...formData,
            options: [
                ...formData.options,
                { actual_price: '', discount_price: '', duration_days: '' }
            ]
        });
    };

    const handleSubmit = async () => {
        try {
            const requiredFields = ['name', 'discription', 'type', 'categories', 'options'];
            const emptyFields = requiredFields.filter(field => !formData[field]);

            if (emptyFields.length > 0) {
                emptyFields.forEach(field => {
                    toast.error(`${field.charAt(0).toUpperCase() + field.slice(1)} field is required.`);
                });
                return;
            }

            const hasDataInOptions = formData.options.some(option => {
                return option.actual_price || option.discount_price || option.duration_days;
            });

            if (formData.categories.length === 0) {
                toast.error("At least one category must be selected.");
                return;
            }

            if (!hasDataInOptions) {
                toast.error("option must have data filled in.");
                return;
            }

            const allOptionsHaveData = formData.options.every(option => {
                return (
                    option.actual_price.trim() !== '' &&
                    option.discount_price.trim() !== '' &&
                    option.duration_days.trim() !== ''
                );
            });

            if (!allOptionsHaveData) {
                toast.error("All options must have data filled in.");
                return;
            }


            const response = await get_api(user?.token).post('/shop/packages/create/', formData);
            if (response.status === 201) {
                setFormData({
                    name: '',
                    description: '',
                    type: '',
                    categories: '',
                    options: [{ actual_price: '', discount_price: '', duration_days: '' }]
                });
                toast.success("Package created successfully.");
                seteffect(prevEffect => !prevEffect);
            }
        } catch (error) {
            console.error('Fetching categories handleSubmit failed:', error);
            const errorMessages = getErrorMessage(error)
            const generalErrors = errorMessages.filter((error) => error.field === 'general' || error.field === 'non_field_errors' || error.field === 'name');
            if (generalErrors.length >= 0) {
                const newErrors = generalErrors.map(error => error.message);
                console.log('', newErrors);
                newErrors.forEach(error => toast.error(error));
                return newErrors;
            }
            else if (error.message) {
                console.log('here');
                toast.error(`${error.message || 'Somthing went wrong'}`)
            }
        }


    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await get_api(user?.token).get('/shop/categories/');
                if (response.status === 200) {
                    setCategories(response.data);
                }
            } catch (error) {
                console.error('Fetching categories failed:', error);
                const errorMessages = getErrorMessage(error)
                const generalErrors = errorMessages.filter((error) => error.field === 'general' || error.field === 'non_field_errors' || error.field === 'name');
                if (generalErrors.length >= 0) {
                    const newErrors = generalErrors.map(error => error.message);
                    console.log(newErrors);
                    newErrors.forEach(error => toast.error(error));
                    return newErrors;
                }
                else if (error.message) {
                    console.log('here');
                    toast.error(`${error.message || 'Somthing went wrong'}`)
                }
            }
        };

        fetchCategories();
        fectPackages()
    }, [effect]);

    const fectPackages = async () => {
        try {
            const response = await get_api(user?.token).get('/shop/packages/');
            if (response.status === 200) {
                setPackages(response.data)
            }
        } catch (error) {
            console.log('FetchPackages', error);
            const errorMessages = getErrorMessage(error)
            const generalErrors = errorMessages.filter((error) => error.field === 'general' || error.field === 'non_field_errors' || error.field === 'name');
            if (generalErrors.length >= 0) {
                const newErrors = generalErrors.map(error => error.message);
                console.log('', newErrors);
                newErrors.forEach(error => toast.error(error));
                return newErrors;
            }
            else if (error.message) {
                console.log('here');
                toast.error(`${error.message || 'Somthing went wrong'}`)
            }
        }
    }

    const reRender = () => {
        seteffect(prevEffect => !prevEffect);
    }

    const reset = ()=> {
        seteffect(prevEffect => !prevEffect); 
        setsearchkey('')
    }

    const searchPackages = async (text) => {
        try {
            const response = await get_api(user?.token).get(`/shop/packages/?search=${text}`);
            if (response.status === 200) {
                setPackages(response.data)
            }
        } catch (error) {
            console.error('Fetching searchPackages failed:', error);
            const errorMessages = getErrorMessage(error)
            const generalErrors = errorMessages.filter((error) => error.field === 'general' || error.field === 'non_field_errors' || error.field === 'name');
            if (generalErrors.length >= 0) {
                const newErrors = generalErrors.map(error => error.message);
                console.log('', newErrors);
                newErrors.forEach(error => toast.error(error));
                return newErrors;
            }
            else if (error.message) {
                toast.error(`${error.message || 'Somthing went wrong'}`)
            }
        }
    }

    const onchangesearch = (e) => {
        setsearchkey(e.target.value)
        searchPackages(e.target.value)
    }


    return (
        <div className=' m-6 p-2 bg-[#C0DCDD] rounded-lg shadow-lg '>
            <div className='flex items-center justify-between'>
                <h1 className='font-bold p-3'>Add Package</h1>
                <div className="relative m-3">
                    <input
                        type="text"
                        className="border rounded-full pl-10 pr-4 py-2 w-full outline-[#80509F]"
                        placeholder="Search package"
                        value={searchkey}
                        onChange={onchangesearch}
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
            </div>

            <div className='  flex justify-between'>
                <div className='m-2 bg-white p-3 border border-gray-300 w-3/12 rounded-md flex flex-col justify-between'>
                    <div>
                        <h1 className='font-bold'>Add New</h1>
                        <div className='m-3'>
                            <p className='text-sm text-gray-400 p-1'>Name</p>
                            <input
                                value={formData.name}
                                onChange={handleChange}
                                type="text"
                                className='border text-sm outline-[#688687] border-gray-300 pl-5 pr-4 py-1 w-full rounded-sm bg-gray-100'
                                placeholder="Enter name"
                                name="name"
                            />                        </div>
                        <div className='m-3'>
                            <p className='text-sm text-gray-400 p-1'>Description</p>
                            <input
                                value={formData.discription}
                                onChange={handleChange}
                                type="text"
                                className='border text-sm outline-[#688687] border-gray-300 pl-5 pr-4 py-1 w-full rounded-sm bg-gray-100'
                                placeholder="Enter description"
                                name="discription"
                            />                        </div>
                        <div className='m-3'>
                            <p className='text-sm text-gray-400 p-1'>Type</p>
                            <select
                                value={formData.type}
                                onChange={handleChange}
                                className='border outline-[#688687] text-sm border-gray-300 pl-2 pr-4 py-1 w-full rounded-sm bg-gray-100'
                                 name="type"
                            >
                                <option value="BASIC">BASIC</option>
                                <option value="COMBO">COMBO</option>
                                <option value="ALL">ALL</option>
                            </select>
                        </div>
                        <div className='m-3'>
                            <p className='text-sm text-gray-400 p-1'>Categories</p>
                            <select
                                value={formData.categories}
                                onChange={handleChangeCategories}
                                className='border outline-[#688687] text-sm border-gray-300 pl-2 pr-4 py-1 w-full rounded-sm bg-gray-100'
                                name="categories"
                                multiple
                            >
                                {categories
                                    .filter(category => category.is_active)
                                    .map(category => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                            </select>
                        </div>
                        <div className='m-3'>
                            <p className='text-sm text-gray-400 p-1'>Options</p>
                            {formData.options.map((option, index) => (
                                <div key={index}>
                                    <div className='m-3'>
                                        <p className='text-sm text-gray-400 p-1'>Actual Price</p>
                                        <input
                                            type="text"
                                            className='border outline-[#688687] text-sm border-gray-300 pl-5 pr-4 py-1 w-full rounded-sm bg-gray-100'
                                            placeholder="Enter actual price"
                                            name="actual_price"
                                            value={option.actual_price}
                                            onChange={(e) => handleOptionChange(index, e)}
                                        />
                                    </div>
                                    <div className='m-3'>
                                        <p className='text-sm text-gray-400 p-1'>Discount Price</p>
                                        <input
                                            type="text"
                                            className='border outline-[#688687] text-sm border-gray-300 pl-5 pr-4 py-1 w-full rounded-sm bg-gray-100'
                                            placeholder="Enter discount price"
                                            name="discount_price"
                                            value={option.discount_price}
                                            onChange={(e) => handleOptionChange(index, e)}
                                        />
                                    </div>
                                    <div className='m-3'>
                                        <p className='text-sm text-gray-400 p-1'>Duration in days</p>
                                        <input
                                            type="text"
                                            className='border outline-[#688687] text-sm border-gray-300 pl-5 pr-4 py-1 w-full rounded-sm bg-gray-100'
                                            placeholder="Enter duration in days"
                                            name="duration_days"
                                            value={option.duration_days}
                                            onChange={(e) => handleOptionChange(index, e)}
                                        />
                                    </div>
                                </div>
                            ))}
                            <div className='flex justify-center'>
                                <button
                                    className='bg-[#688687] text-white text-xs px-4 py-2 rounded-md'
                                    onClick={handleAddMore}
                                >
                                    Add More
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='m-4 p-2 flex justify-center items-center bg-[#688687] text-white rounded-lg'>
                        <button onClick={handleSubmit}>Add Packages</button>
                    </div>
                </div>

                <div className='w-9/12 border m-2 p-2 bg-white  border-gray-300   rounded-md'>

                    <div className=' '>
                        <div className='w-full border border-gray-300 flex items-center justify-between rounded-md'>

                            <div className='p-2 flex items-center border-r-2    justify-center w-3/12'>
                                <img src="/filter.png" alt="" className='w-4 h-4 ' />
                                <p className='text-sm font-sans p-0 m-0 font-bold'>Filter By</p>
                            </div>

                            <div className='p-2 flex items-center border-r-2  justify-center w-3/12'>
                                <p className='text-sm font-sans p-0 m-0 font-bold'>14-Feb-2024</p>
                                <img src="  /down-arrow (1).png" alt="" className='w-4 h-4' />
                            </div>

                            <div className='p-2 flex items-center border-r-2  justify-center w-3/12'>
                                <p className='text-sm font-sans p-0 m-0 font-bold'>Package</p>
                                <img src="  /down-arrow (1).png" alt="" className='w-4 h-4' />
                            </div>

                            <div className='flex items-center justify-center w-3/12 '>
                                <p className='text-sm font-sans text-gray-400 p-0 m-0 font-bold'>Order Status</p>
                                <img src="  /down-arrow (1).png" alt="" className='w-4 h-4' />
                            </div>

                            <div className='flex items-center justify-center w-3/12 cursor-pointer' onClick={reset}>
                                <img src="/undo (1).png" alt="" className='w-4 h-4' />
                                <p className='text-sm text-red-500 font-sans p-0 m-0 font-bold'>Reset Filter</p>

                            </div>
                        </div>

                    </div>
                    <div className=' '>
                        <AdminPackageList packages={packages} reRender={reRender} />
                    </div>
                </div>

            </div>
            <Toaster />
        </div>
    )
}

export default AdminAddPackage
