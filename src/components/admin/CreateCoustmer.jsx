import React, { useEffect, useRef, useState } from 'react'
import './Admin.css'
import Dropdown from './Dropdown'
import { useFormData, getCities, getStates, keralaDistricts } from '../../utils/FormData';
import toast, { Toaster } from 'react-hot-toast';
import { get_api, get_api_form } from '../../utils/api';
import { getErrorMessage } from '../../utils/Validation';
import { useSelector } from 'react-redux';
import { validateEmail, validatePincode, ValiatePhoneNumber } from '../../utils/Validation';
import CustmorPackageModal from './CustmorPackageModal';
import LoadingSpinners from './LoadingSpinners';


const CreateCoustmer = () => {

    const [states] = useState(getStates());
    const [packages, setpackages] = useState([])
    const [isOPen, setisOPen] = useState(false)
    const [packageDetail , setPackageDetail] = useState({
        packageName : "Not Selected"

    })
    const [emailError, setEmailError] = useState('');
    const [pincodeError, setPincodeError] = useState('');
    const [NumberError, setNumberError] = useState('');
    const [formData, setFormData] = useState({
        package: '',
        name: '',
        number: '',
        email_id: '',
        dob: '',
        district: '',
        address: '',
        pincode: '',
        state: '',
        country: '',
        image: null
    })
    const [isLoading, setIsLoading] = useState(false);

    const inputFile = useRef(null);
    const user = useSelector(state => state.adminAuth.adminUser)

    useEffect(() => {

        fetchPackages()

    }, [])


    const fetchPackages = async () => {
        try {
            const response = await get_api(user?.token).get('/shop/packages/options/');
            if (response.status === 200) {
                setpackages(response.data)
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData(prevState => ({
            ...prevState,
            image: file
        }));
    };

    const handleClickAddimg = () => {
        inputFile.current.click();
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

    const onCloseModal = () => {
        setisOPen(false)
    }

    const updatePackageInFormData = (packageId) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            package: packageId
        }));
    };

    const createCustmor = async (e) => {
        e.preventDefault()
        try {
            
            const emptyFields = Object.entries(formData)
                .filter(([key, value]) => key !== 'image' && value === '')
                .map(([key]) => key);

            if (emptyFields.length > 0) {
                const requiredFieldsMessage = `The following fields are required: ${emptyFields.join(', ')}`;
                toast.error(requiredFieldsMessage);
                return;
            }
            setIsLoading(true)
            const response = await get_api_form(user?.token).post('/shop/customer/create/', formData);
            if (response.status === 201) {
                setFormData({
                    package: '',
                    name: '',
                    number: '',
                    email_id: '',
                    dob: '',
                    district: '',
                    address: '',
                    pincode: '',
                    state: '',
                    country: '',
                    image: null
                })
                setIsLoading(false)
                setPackageDetail({
                    packageName : "Not Selected"
                })
                toast.success('Customer successfully created');
            }
        } catch (error) {
            console.error('Fetching createCustmor failed:', error);
            setIsLoading(false)
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
    }
    const handleRemoveImage = () => {
        setFormData({
            ...formData,
            image: null
        })
    }


    return (
        <div className='w-full rounded-md p-1 px-4 my-3 '>
            <form action='' className='flex gap-10'>
                <div className='w-6/12'>
                    <div>
                        <p className='text-xs text-gray-400'>Package Type</p>
                        <div className='py-2 '>
                            {/* <Dropdown text="Choose Package" p="3" textcolor="text-gray-400" font="font-thin" data={packages} onUpdate={updatePackage} /> */}
                            {/* <input type="text"  value={formData.package} className='border outline-[#80509F] text-sm border-gray-200 p-3 w-full rounded-sm bg-gray-100' placeholder="Enter package" /> */}
                            <button type='button' onClick={() => { setisOPen(true) }} className={`border border-gray-200 text-sm outline-[#688687] py-3 w-full bg-gray-100 text-start px-2 ${packageDetail.packageName=="Not Selected" ? "text-gray-400" : ""}`}><p >{packageDetail.packageName}</p></button>
                        </div>
                    </div>
                    <div>
                        <p className='text-xs text-gray-400'>Full Name</p>
                        <div className='py-2'>
                            <input type="text" name='name' value={formData.name} onChange={handleInputChange} required className='border outline-[#688687] text-sm border-gray-200 p-3 w-full rounded-sm bg-gray-100' placeholder="Enter name" />
                        </div>
                    </div>
                    <div>
                        <p className='text-xs text-gray-400'>Phone Number</p>
                        <div className='py-2'>
                            <input type="text" value={formData.number} onChange={handleInputChange} name='number' onBlur={(e) => ValiatePhoneNumber(e.target.value, setNumberError)} required className='border text-sm outline-[#688687] border-gray-200 p-3 w-full rounded-sm bg-gray-100' placeholder="Enter Number" />
                            {NumberError && (<p className='text-xs text-center text-red-500'>{NumberError}</p>)}
                        </div>
                    </div>
                    <div>
                        <p className='text-xs text-gray-400'>Email</p>
                        <div className='py-2'>
                            <input type="text" name='email_id' value={formData.email_id} onChange={handleInputChange} onBlur={(e) => validateEmail(e.target.value, setEmailError)} required className='border text-sm outline-[#688687] border-gray-200 p-3 w-full rounded-sm bg-gray-100' placeholder="Enter email" />
                            {emailError && (<p className='text-xs text-center text-red-500'>{emailError}</p>)}
                        </div>
                    </div>
                    <div>
                        <p className='text-xs  text-gray-400'>Date of Birth</p>
                        <div className='py-2'>
                            <input type="date" name='dob' value={formData.dob} onChange={handleInputChange} required className={`border text-sm outline-[#688687] ${formData.dob ? "" : "text-gray-400"}  border-gray-200 p-3 w-full rounded-sm bg-gray-100`} placeholder="Enter name" />
                        </div>
                    </div>

                </div>


                <div className='w-6/12'>
                   
                    <div>
                        <p className='text-xs text-gray-400'>Address</p>
                        <div className='py-2'>
                            <input type="text" name='address' value={formData.address} onChange={handleInputChange} required className='border text-sm outline-[#688687] border-gray-200 p-3 w-full rounded-sm bg-gray-100' placeholder="Enter Address" />
                        </div>
                    </div>
                   
                    <div className='flex gap-5 '>
                        
                        <div className='w-full'>
                            <p className='text-xs text-gray-400'>Country</p>
                            <div className='py-2 '>
                                <Dropdown text="Choose Country" p="3" textcolor={`${formData.country ? "text-dark" : "text-gray-400"}`} data={['India']} onUpdate={updateCountry} />
                            </div>
                        </div>
                        <div className='w-full'>
                            <p className='text-xs text-gray-400'>State</p>
                            <div className='py-2'>
                                <Dropdown text="Choose State" p="3" textcolor={`${formData.state ? "text-dark" : "text-gray-400"}`} data={['Kerela']} onUpdate={updateState} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className='text-xs text-gray-400'>District</p>
                        <div className='py-2'>
                            <Dropdown text="Choose District" p="3" textcolor={`${formData.district ? "text-dark" : "text-gray-400"}`} data={keralaDistricts} onUpdate={updateDistrict} />
                        </div>
                    </div>
                    <div>
                        <p className='text-xs text-gray-400'>Pin Code</p>
                        <div className='py-2'>
                            <input type="text" name='pincode' value={formData.pincode} onChange={handleInputChange} required onBlur={(e) => validatePincode(e.target.value, setPincodeError)} className='border text-sm outline-[#688687] border-gray-200 p-3 w-full rounded-sm bg-gray-100' placeholder="Enter Pincode" />
                            {pincodeError && (<p className='text-xs text-center text-red-500'>{pincodeError}</p>)}
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <div className='w-2/6  shadow-lg flex items-center justify-center border'>
                            <input
                                type="file"
                                className='hidden'
                                ref={inputFile}
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                            <div className='flex flex-col items-center justify-center h-[100px]'>
                                <div className='rounded-full w-10 h-10 bg-gray-200 flex justify-center items-center cursor-pointer'
                                    onClick={handleClickAddimg}
                                >
                                    <img src="/camera.png" alt="" className='w-4' />
                                </div>
                                <p className='text-[10px] font-bold pt-1 text-[#688687] font-poppins'>Add your photos</p>
                            </div>
                        </div>
                        <div>
                            {formData && formData.image && (
                                <div className=' w-[100px] h-[100px] shadow-lg  border'>
                                    <img className='w-full h-full object-cover' src={URL.createObjectURL(formData.image)} alt="" />
                                    <p className=' text-xs text-red-500 cursor-pointer' onClick={handleRemoveImage}>Remove</p>
                                </div>
                            )}

                        </div>
                    </div>
                    <div className='flex justify-between pt-8'>
                        <button className='text-white bg-[#688687] w-5/12 p-1 rounded-lg' onClick={createCustmor}>Save</button>
                        <button className='text-white bg-red-500 w-5/12 p-1 rounded-lg'>Cancel</button>
                    </div>
                </div>
            </form>
            {isLoading && <LoadingSpinners />}
            <CustmorPackageModal packages={packages} isOpen={isOPen} onClose={onCloseModal} setPackage={setPackageDetail} updatePackageInFormData={updatePackageInFormData} />
            <Toaster />
        </div>
    )
}

export default CreateCoustmer
