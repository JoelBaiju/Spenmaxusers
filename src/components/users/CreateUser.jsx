import React, { useEffect, useRef, useState } from 'react'
import '../admin/Admin.css'
import Dropdown from '../admin/Dropdown'
import { useFormData, getCities, getStates, keralaDistricts } from '../../utils/FormData';
import toast, { Toaster } from 'react-hot-toast';
import { get_api, get_api_form, get_api_form_register } from '../../utils/api';
import { getErrorMessage, validatePassword } from '../../utils/Validation';
import { useSelector } from 'react-redux';
import { validateEmail, validatePincode, ValiatePhoneNumber } from '../../utils/Validation';
import CustmorPackageModal from '../admin/CustmorPackageModal';
import LoadingSpinners from '../admin/LoadingSpinners';
import { Link } from 'react-router-dom';

const CreateUser = () => {

    const [states] = useState(getStates());
    const [isOPen, setisOPen] = useState(false)
    const [emailError, setEmailError] = useState('');
    const [pincodeError, setPincodeError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setconfirmPasswordError] = useState('');
    const [NumberError, setNumberError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        number: '',
        username: '',
        dob: '',
        district: '',
        address: '',
        pincode: '',
        state: '',
        country: '',
        image: null,
        password: '',
    })
    const [isLoading, setIsLoading] = useState(false);
    const [firstPassword, setFirstPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');

    const inputFile = useRef(null);

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
                .filter(([key, value]) => value === '')
                .map(([key]) => key);

            if (emptyFields.length > 0) {
                const requiredFieldsMessage = `The following fields are required: ${emptyFields.join(', ')}`;
                toast.error(requiredFieldsMessage);
                return;
            }
            setIsLoading(true)
            const response = await get_api_form_register().post('/user/register/', formData);
            if (response.status === 201) {
                setFormData({
                    name: '',
                    number: '',
                    username: '',
                    dob: '',
                    district: '',
                    address: '',
                    pincode: '',
                    state: '',
                    country: '',
                    image: null,
                    password: '',
                })
                setIsLoading(false)
                setFirstPassword('')
                setconfirmPassword('')
                toast.success('Registered successfully');
            }
        } catch (error) {
            console.error('Fetching createCustmor failed:', error);
            setIsLoading(false)
            const errorMessages = getErrorMessage(error)
            console.log(errorMessages);
            const generalErrors = errorMessages.filter((error) => error.field === 'general' || error.field === 'non_field_errors' || error.field === 'name');
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

    const handleRemoveImage = () => {
        setFormData({
            ...formData,
            image: null
        })
    }

    const setfirstPassword = (event) => {
        setFirstPassword(event.target.value)
    }

    const checkConfirPassword = () => {
        if (firstPassword !== confirmPassword) {
            setconfirmPasswordError('wrong password')
        } else {
            setconfirmPasswordError('')
            setFormData(prevState => ({
                ...prevState,
                password: confirmPassword,
            }));
        }
    }

    return (
        <div className='w-full  rounded-lg-md bg-gray-100 p-1 p-4 my-3 lg:w-8/12'>
            <div className='flex justify-center items-center'>
                <h1 className='font-bold text-2xl font-sans p-2 '>Register</h1>
            </div>
            <form action='' className='flex flex-col custom-scroll gap-3    rounded-lg p-5'>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name='name' value={formData.name} onChange={handleInputChange} required className='border outline-[#387478] text-sm p-3 w-full  rounded-lg' />
                </div>
                <div >
                    <label htmlFor="username">Email</label>
                    <input type="text" name='username' value={formData.username} onChange={handleInputChange} onBlur={(e) => validateEmail(e.target.value, setEmailError)} required className='border  rounded-lg text-sm outline-[#387478]  p-3 w-full   ' />
                    {emailError && (<p className='text-xs text-center text-red-500'>{emailError}</p>)}
                </div>

                <div className='md:flex gap-5 '>
                    <div className='w-full mb-3 md:mb-0' >
                        <label htmlFor="number" >Phone</label>
                        <input type="text" value={formData.number} onChange={handleInputChange} name='number' onBlur={(e) => ValiatePhoneNumber(e.target.value, setNumberError)} required className='border  rounded-lg text-sm outline-[#387478]  p-3 w-full   ' />
                        {NumberError && (<p className='text-xs text-center text-red-500'>{NumberError}</p>)}
                    </div>
                    <div className='w-full'>
                        <label htmlFor="dob">DOB</label>
                        <input type="date" name='dob' value={formData.dob} onChange={handleInputChange} required className='border  rounded-lg text-sm outline-[#387478] text-gray-400   p-3 w-full   ' />

                    </div>
                </div>

                <div className='md:flex gap-5 '>
                    <div className='w-full mb-3 md:mb-0' >
                        <label htmlFor="password">Password</label>
                        <input type="password" name='password' value={firstPassword} onBlur={() => validatePassword(firstPassword, setPasswordError)} onChange={setfirstPassword} required className='border  rounded-lg text-sm outline-[#387478]  p-3 w-full   ' />
                        {passwordError && (<p className='text-xs text-center text-red-500'>{passwordError}</p>)}
                    </div>
                    <div className='w-full '>
                        <label htmlFor="password">Confirm Password</label>
                        <input type="password" name='password' value={confirmPassword} onChange={(e) => { setconfirmPassword(e.target.value) }} onBlur={checkConfirPassword} required className='border  rounded-lg text-sm outline-[#387478]  p-3 w-full   ' />
                        {confirmPasswordError && (<p className='text-xs text-center text-red-500'>{confirmPasswordError}</p>)}
                    </div>
                </div>

                <div>
                    <label htmlFor="address">Address</label>
                    <input type="text" name='address' value={formData.address} onChange={handleInputChange} required className='border text-sm outline-[#387478]   rounded-lg p-3 w-full   ' />
                </div>

                <div className='md:flex gap-5 '>
                    <div className='w-full'>
                        <div>
                            <label htmlFor="">Country</label>
                            <Dropdown p="3" bg="bg-white" textcolor="text-gray-400" data={['India']} onUpdate={updateCountry} />
                        </div>
                    </div>
                    <div className='w-full mb-3 md:mb-0'>
                        <div>
                            <label htmlFor="">State</label>
                            <Dropdown text="" p="3" bg="bg-white" textcolor="text-gray-400" data={["Kerala"]} onUpdate={updateState} />
                        </div>
                    </div>

                </div>
                <div className='md:flex gap-5 '>
                    <div className='w-full mb-3 md:mb-0' >
                        <label htmlFor="">District</label>
                        <Dropdown p="3" bg="bg-white" textcolor="text-gray-400" data={keralaDistricts} onUpdate={updateDistrict} />

                    </div>
                    <div className='w-full'>
                        <label htmlFor="pincode"> Pincode</label>
                        <input type="text" name='pincode' value={formData.pincode} onChange={handleInputChange} required onBlur={(e) => validatePincode(e.target.value, setPincodeError)} className='border  rounded-lg text-sm outline-[#387478]  p-3 w-full   ' />
                        {pincodeError && (<p className='text-xs text-center text-red-500'>{pincodeError}</p>)}
                    </div>
                </div>



                <div className='flex md:flex-row flex-col gap-4'>
                    <div className='md:w-2/6 bg-white  shadow-lg flex items-center justify-center border'>
                        <input
                            type="file"
                            className='hidden'
                            ref={inputFile}
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                        <div className='flex flex-col items-center justify-center h-[100px]'>
                            <div className=' rounded-full w-10 h-10 flex justify-center items-center cursor-pointer'
                                onClick={handleClickAddimg}
                            >
                                <img src="/camera.png" alt="" className='w-4' />
                            </div>
                            <p className='text-[10px] font-bold pt-1 text-[#387478] font-poppins'>Add your photos</p>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        {formData && formData.image && (
                            <div className=' w-[100px] h-[100px] shadow-lg border'>
                                <img className='w-full h-full object-cover ' src={URL.createObjectURL(formData.image)} alt="" />
                                <p className=' text-xs text-red-500 cursor-pointer' onClick={handleRemoveImage}>Remove</p>
                            </div>
                        )}

                    </div>
                </div>
                <div className='flex justify-between pt-8'>
                    <button className='text-white bg-[#387478] w-full p-1  rounded-lg' onClick={createCustmor}>Register</button>
                </div>

                <p className='text-center'>or</p>

                <Link to="/login" className='text-white bg-[#387478] w-full text-center p-1  rounded-lg'>Login</Link>
            </form>
            {isLoading && <LoadingSpinners />}
            <Toaster />
        </div>
    )
}

export default CreateUser
