import React, { useEffect, useRef, useState } from 'react'
import CoustomInput from '../admin/CoustomInput'
import Dropdown from '../admin/Dropdown'
import { get_api, get_api_form } from '../../utils/api'
import { getErrorMessage } from '../../utils/Validation'
import toast, { Toaster } from 'react-hot-toast'
import { getStates, keralaDistricts } from '../../utils/FormData'
import { useSelector } from 'react-redux'

const VendorAdd = () => {
    const [count] = useState([1, 1, 1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 1])
    const [formData, setFormData] = useState({
        image: '',
        url: '',
        district: '',
        state: '',
        country: '',
        branch: ''
    });
    const [effect, setEffect] = useState(false)
    const [Branches, setBranches] = useState([])
    const [Advertisment, setAdvertisment] = useState([])
    const [districts] = useState(keralaDistricts);
    const [states] = useState(getStates());
    const fileInputRef = useRef(null);
    const vendor = useSelector(state => state.vendorAuth.vendor)

    useEffect(() => {
        fetchAdd()
        fetchBranches()
    }, [effect])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleImageUploadClick = () => {
        fileInputRef.current.click(); // Programmatically trigger click event on file input
    };
    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await get_api_form(vendor?.token).post('/shop/advertisements/create/', formData);
            if (response.status === 201) {
                setEffect(!effect)
                setFormData({
                    image: '',
                    adLink: '',
                    district: '',
                    state: '',
                    country: '',
                    Branch: ''
                })
                toast.success('Advertisement Created')
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
    };
    const updateDistrict = (newDistrict) => {
        setFormData(prevState => ({
            ...prevState,
            district: newDistrict,
        }));
    };
    const updateState = (State) => {
        setFormData(prevState => ({
            ...prevState,
            state: State,
        }));
    };
    const updateCountry = (Country) => {
        setFormData(prevState => ({
            ...prevState,
            country: Country,
        }));
    };
    const updateBranch = (branchLocality) => {
        const id = Branches.find(item => item.Locality === branchLocality)?.id;
        setFormData(prevState => ({
            ...prevState,
            branch: id,
        }));
    }
    const fetchBranches = async () => {
        try {
            const response = await get_api(vendor?.token).get('/shop/branches/vendor/');
            if (response.status === 200) {
                setBranches(response.data)
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
    const fetchAdd = async () => {
        try {
            const response = await get_api(vendor?.token).get('/shop/advertisements/vendor/');
            if (response.status === 200) {
                setAdvertisment(response.data)
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
    const DeleteAdd = async (id) => {
        try {
            const response = await get_api(vendor?.token).delete(`/shop/advertisements/${id}/`);
            if (response.status === 204) {
                setEffect(!effect)
                toast.success('Advertisement Deleted')
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
        <div className='p-5 flex flex-col border-2  gap-6'>
            <form onSubmit={handleSubmit}>
                <div className='border border-gray-300 p-4 shadow-md rounded-lg'>
                    <div className="mb-4">
                        <p className='font-bold text-sm mb-2'>Add New Ads</p>
                    </div>
                    <div className='md:flex gap-5'>
                        <div className='md:w-4/12'>
                            <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700 cursor-pointer">
                                <input
                                    type="file"
                                    id="imageUpload"
                                    name="image"
                                    accept="image/*"
                                    className="sr-only"
                                    onChange={handleImageChange}
                                    ref={fileInputRef} // Assign ref to file input element
                                />
                                <p className='text-xs text-gray-400' onClick={handleImageUploadClick}>Choose Image</p>
                                <input
                                    type="text"
                                    className='bg-gray-100 border w-full p-3 outline-[#649597] disabled text-xs text-gray-50 cursor-pointer'
                                    placeholder='Add image'
                                    readOnly
                                    onClick={handleImageUploadClick} // Trigger file input click event when clicked
                                />
                            </label>
                        </div>
                        <div className='md:w-4/12'>
                            <p className='text-xs text-gray-400 '>Enter URL</p>
                            <input
                                type="text"
                                name="url"
                                value={formData.url}
                                onChange={handleChange}
                                className='bg-gray-100 border w-full  p-3 outline-[#649597] text-xs text-gray-800'
                                placeholder='Enter Url'
                            />
                        </div>
                        <div className='md:w-4/12'>
                            <p className='text-xs text-gray-400'>Branch</p>
                            <Dropdown text="Choose Branch" p='3' font="font-normal" textcolor="text-gray-400" data={Branches.map(item => item.Locality)} onUpdate={updateBranch} />
                        </div>
                    </div>

                    <div className='md:flex gap-5 mt-4'>
                        <div className='md:w-4/12'>
                            <p className='text-xs text-gray-400'>District</p>
                            <Dropdown text="Choose District" p='3' font="font-normal" textcolor="text-gray-400" data={districts} onUpdate={updateDistrict} />
                        </div>
                        <div className='md:w-4/12'>
                            <p className='text-xs text-gray-400'>State</p>
                            <Dropdown text="Choose State" p='3' font="font-normal" textcolor="text-gray-400" data={states} onUpdate={updateState} />
                        </div>
                        <div className='md:w-4/12'>
                            <p className='text-xs text-gray-400'>Country</p>
                            <Dropdown text="Choose Country" p='3' font="font-normal" textcolor="text-gray-400" data={["India"]} onUpdate={updateCountry} />
                        </div>
                    </div>

                    <div className='flex justify-center my-5'>
                        <button type="submit" className='bg-[#649597] px-5 rounded-md text-white py-1'>Submit</button>
                    </div>
                </div>
            </form>


            <div className='border border-gray-300  shadow-md rounded-lg'>
                <div className='hidden md:block'>
                    <div className='p-4 flex  '>
                        <div className='md:w-2/12'><p className='font-medium text-sm'>Ad Image</p></div>
                        <div className='md:w-2/12'><p className='font-medium text-sm'>Link</p></div>
                        <div className='md:w-2/12'><p className='font-medium text-sm'>District</p></div>
                        <div className='md:w-2/12'><p className='font-medium text-sm'>State</p></div>
                        <div className='md:w-2/12'><p className='font-medium text-sm'>Country</p></div>
                        <div className='md:w-2/12'><p className='font-medium text-sm'>Action</p></div>
                    </div>
                </div>
                <div className='md:hidden'>
                    <p className='font-medium text-sm text-center'>Ad Images</p>
                </div>
                <hr />
                <div className='overflow-scroll h-[350px] customscrollbar'>
                    {Advertisment.length === 0 ? (
                        <div className='flex justify-center items-center h-full '>
                            <p className='text-sm font-medium font-poppins'>No Advertisement Found</p>
                        </div>
                    ) : (
                        Advertisment.map((add, index) => (
                            <div className='p-4 md:flex' key={index}>
                                <div className='md:w-2/12'><img className='md:w-10' src="/WhatsApp Image 2024-02-05 at 17.25.25_63afbb9d.jpg" alt="" /></div>
                                <div className='md:w-2/12 flex items-center'> <p className='text-xs truncate'>{add?.url}</p></div>
                                <div className='md:w-2/12 flex items-center'> <p className='text-xs'>{add?.district}</p></div>
                                <div className='md:w-2/12 flex items-center'> <p className='text-xs'>{add?.state}</p></div>
                                <div className='md:w-2/12 flex items-center'> <p className='text-xs'>{add?.country}</p></div>
                                <div className='md:flex justify-between border border-gray-300 rounded-md bg-gray-100'>
                                    {/* <div className=' border-gray-300 p-1 px-4 border-r'>
                    <img src="/edit.png" alt="" className='w-5' />
                </div> */}
                                    <div className='p-1 px-4 cursor-pointer flex justify-center'>
                                        <img src="/delete (3).png" alt="" onClick={() => DeleteAdd(add?.id)} className='w-5' />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}

                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default VendorAdd
