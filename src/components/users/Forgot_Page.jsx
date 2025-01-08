import React, { useState } from 'react';
import backgroundImage from '../../assets/images/kriyado_profile_bg[1].png';
import { getErrorMessage, validateEmail, validatePassword } from '../../utils/Validation';
import { login as loginAction } from "../../Reducer/authReducer";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate , Link } from 'react-router-dom';
import api from "../../utils/api";
import { FaCheck } from 'react-icons/fa';
import { adminLogin } from '../../Reducer/adminAuthReducer';
import VerificationModal from './VerificationModal';
import toast, { Toaster } from 'react-hot-toast';
import { vendorlogin } from '../../Reducer/vendorAuthReducer';


const Forgot_Page = () => {

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [ForgotError, setForgotError] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setForgotError([])
        validateEmail(email, setEmailError);

        if (!emailError ) {
            try {
                const response = await api.post('/user/forgot/', { email_id: email });
                if (response?.status === 201) {
                    toast.success("Verification link has send to you account")
                }
            } catch (error) {
                console.log(error);
                
                const errorMessages = getErrorMessage(error)
                const generalErrors = errorMessages.filter((error) => error.field === 'general' || error.field === 'non_field_errors' || error.field === error.field);
                if (generalErrors) {
                    setForgotError(generalErrors.map(error => error.message));
                }
                
            }
        }

    };

    


    return (
        <div 
            className="bg-cover bg-center w-full h-screen md:flex fixed"
        >
            <div className='w-full md:w-4/12 '>
            </div>
            <div className=' w-full md:w-7/12 flex flex-col justify-center  items-center h-full md:gap-28 md:flex-row  '>
               
                <div className='w-9/12 border-[1px] rounded-xl border-[#619b9e]  md:w-6/12 lg:w-6/12'>
                    <div className='bg-gray-100 pt-6 flex justify-center items-center'>
                        <h1 className='font-bold text-2xl font-sans p-2 '>Forgot</h1>
                    </div>
                    <form onSubmit={handleSubmit} >
                        <div className='bg-gray-100 rounded-lg  py-10 px-5'>

                            {ForgotError && (
                                <div className='flex justify-center '>
                                    {ForgotError.map((error, index) => (
                                        <p key={index} className='text-xs bg-red-500 p-2 w-full rounded-md font-medium text-center text-white'>{error}</p>
                                    ))}
                                </div>
                            )}

                            <p className='mx-4 my-5 mb-[50px] text-center'>Enter you Email , So that we can verify . we will send a verification mail to your account.</p>

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
                            
                           
                            <div className='flex justify-center m-4'>
                                <button className='text-white bg-[#619b9e] w-full rounded-full p-2 border text-xs shadow-xl'>ENTER</button>
                            </div>
                            <p className='text-center'>or</p>

                            <div className='flex justify-center m-4'>
                            <Link to="/login" className='text-white bg-[#619b9e] w-full text-center rounded-full p-2 border text-xs shadow-xl'>LOGIN</Link>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default Forgot_Page;
