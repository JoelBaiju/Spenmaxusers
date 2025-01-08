import React, { useState } from 'react';
import backgroundImage from '../../assets/images/kriyado_profile_bg[1].png';
import { getErrorMessage, validateEmail, validatePassword } from '../../utils/Validation';
import { login as loginAction } from "../../Reducer/authReducer";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from "../../utils/api";
import { FaCheck } from 'react-icons/fa';
import { adminLogin } from '../../Reducer/adminAuthReducer';
import VerificationModal from './VerificationModal';
import toast, { Toaster } from 'react-hot-toast';
import { vendorlogin } from '../../Reducer/vendorAuthReducer';


const UserLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [LoginError, setLoginError] = useState([]);
    const [opemodal, setopemodal] = useState(false);
    const [verify, setverify] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError([])
        validateEmail(email, setEmailError);
        validatePassword(password, setPasswordError);

        if (!emailError && !passwordError) {
            try {
                const response = await api.post('/user/login/', { username: email, password });
                if (response?.status === 200) {
                    if (response.data.type === 'user') {
                        dispatch(loginAction(response.data));
                        navigate('/')
                    } else if (response.data.type === 'admin') {
                        dispatch(adminLogin(response.data));
                        navigate('/admin-home')
                    } else if (response.data.type === 'vendor') {
                        dispatch(vendorlogin(response.data));
                        navigate('/vendors')
                    }
                }
            } catch (error) {
                console.log(error);
                if (error?.response?.status === 307) {
                    setverify(error.response.data.user)
                    setopemodal(true)
                } else {
                    const errorMessages = getErrorMessage(error)
                    const generalErrors = errorMessages.filter((error) => error.field === 'general' || error.field === 'non_field_errors' || error.field === error.field);
                    if (generalErrors) {
                        setLoginError(generalErrors.map(error => error.message));
                    }
                }
            }
        }

    };

    const closeModal = () => {
        setopemodal(false)
    }

    const verifyApi = async () => {
        try {
            const response = await api.post(`/user/re_verify/${verify}/`);
            if (response.status === 201) {
                toast.success('Successfuly verified')
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

    const onFogot = () => {
        navigate('/forgot')
    }

    const onSigup = () => {
        navigate('/user-register')
    }

    const handleVisibility=()=>{
        console.log('oi')
        console.log(isPasswordVisible)
        setIsPasswordVisible(!isPasswordVisible)
        document.getElementById('pass')

        
    }

    return (
        <div
            className="bg-cover bg-center w-full h-screen md:flex flex flex-row justify-center items-center fixed bg-gray-200"
        // style={{ backgroundImage: `url(${backgroundImage})` }}
        >

            <div className='border-2 pt-10 rounded-xl border-[#5d9395] w-full md:w-4/12 flex flex-col justify-center  items-center  mt-3  md:gap-28 md:flex-row  '>

                <div className='w-9/12  md:w-9/12 lg:w-9/12'>
                    <div className='flex flex-col-reverse justify-center items-center'>
                        <h1 className='font-semibold text-xl font-sans p-2 '>Login</h1>
                        <img className='h-10' src="/Spenmax transparent 1.png" alt="" />

                    </div>
                    <form onSubmit={handleSubmit} >
                        <div className='backdrop-blur-xl bg-gray-100/30 rounded-lg  md:py-10 py-5'>
                            {LoginError && (
                                <div className='flex justify-center  ml-2  '>
                                    {LoginError.map((error, index) => (
                                        <p key={index} className='text-xs bg-red-500 p-2 w-full rounded-md font-medium text-center text-white'>{error}</p>
                                    ))}
                                </div>
                            )}
                            <div className='mx-4 my-2'>
                                <input
                                    type="text" required
                                    className={`bg-white  rounded-md p-4 text-xs w-full ${emailError ? 'border-red-500' : ''} outline-[#619b9e]`}
                                    placeholder='Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onBlur={() => validateEmail(email, setEmailError)}
                                />
                            </div>
                            <div className='pl-2 '>
                                {emailError && <p className='text-red-500 text-xs font-medium'>{emailError}</p>}
                            </div>
                            <div className='mx-4 my-2'>
                                <div className='w-full h-full relative flex items-center'>
                                    <input
                                        type={isPasswordVisible?'text' : 'password'}
                                        className={`bg-white rounded-md p-4 text-xs w-full ${passwordError ? 'border-red-500' : ''} outline-[#619b9e]`}
                                        placeholder='Password'
                                        value={password}
                                        id='pass'
                                        onChange={(e) => setPassword(e.target.value)}
                                        onBlur={() => validatePassword(password, setPasswordError)}
                                    />
                                    <div onClick={()=>handleVisibility()} className='absolute right-4 text-gray-500'>
                                        <i className="fa-regular fa-eye"></i>
                                    </div>
                                </div>
                            </div>

                            <div className='pl-2'>
                                {passwordError && <p className='text-red-500 text-xs font-medium'>{passwordError}</p>}
                            </div>
                            <div className='flex justify-end items-center cursor-pointer'>
                                <p className='font-bold text-xs  m-1' onClick={onFogot}>Forgot your password?</p>
                                <img className='w-6 h-5' src="/arrow.png" alt="" />
                            </div>
                            <div className='flex justify-center m-4'>
                                <button className='text-white bg-[#619b9e] outline-[#619b9e] w-full rounded-full p-2 border text-xs shadow-xl'>LOGIN</button>
                            </div>
                            <div className='flex justify-center items-center m-2 mt-10 p-1'>
                                <p className='text-xs font-bold'>Doesn't have a account yet? <span className='text-[#619b9e] cursor-pointer' onClick={onSigup}>Sign Up</span></p>
                            </div>
                            {/* <div className='flex justify-center items-center m-2 p-1'>
                                <div className='flex justify-between w-6/12'>
                                    <div className='bg-white p-2 px-4 rounded-lg '>
                                        <img className='w-4' src="/google (1).png" alt="" />
                                    </div>
                                    <div className='bg-white p-2 px-4 rounded-lg '>
                                        <img className='w-4' src="/facebook.png" alt="" />
                                    </div>    
                                </div>
                            </div> */}
                        </div>
                    </form>
                </div>
            </div>
            <Toaster />
            {opemodal && <VerificationModal close={closeModal} verifyApi={verifyApi} />}
        </div>
    );
};

export default UserLogin;
