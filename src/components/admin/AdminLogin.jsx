import React, { useState } from 'react';
import backgroundImage from '../../assets/images/kriyado_profile_bg[1].png';
import { validateEmail, validatePassword } from '../../utils/Validation';


const AdminLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        validateEmail(email, setEmailError);
        validatePassword(password, setPasswordError);

        if (!emailError && !passwordError) {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

        }
    };


    return (
        <div
            className="bg-cover bg-center w-full h-screen md:flex"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className='w-full md:w-4/12 '>
            </div>
            <div className=' w-full md:w-7/12 flex flex-col justify-center  items-center h-full md:gap-5 md:flex-row  '>
                <div className='w-3/12'>
                    <img src="/Kriyado Black Logo.png" alt="" />
                </div>
                <div className='w-9/12  md:w-6/12 lg:w-5/12'>
                    <div className='flex justify-center items-center'>
                        <h1 className='font-bold text-2xl font-sans p-2 '>Admin Login</h1>
                    </div>
                    <form onSubmit={handleSubmit} >
                        <div className='bg-gray-100 rounded-lg p-5 md:py-20'>
                            <input
                                type="text"
                                className={`bg-white m-2 rounded-sm p-3 text-xs w-full ${emailError ? 'border-red-500' : ''}`}
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={() => validateEmail(email, setEmailError)}
                            />
                            {emailError && <p className='text-red-500 text-xs'>{emailError}</p>}
                            <input
                                type="password"
                                className={`bg-white m-2 rounded-sm p-3 text-xs w-full ${passwordError ? 'border-red-500' : ''}`}
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={() => validatePassword(password, setPasswordError)}
                            />
                            {passwordError && <p className='text-red-500 text-xs'>{passwordError}</p>}
                            <div className='flex justify-end'>
                                <p className='font-bold text-xs m-1'>Forgot your password?</p>
                            </div>
                            <div className='flex justify-center m-4'>
                                <button className='text-white bg-[#80509F] w-full rounded-full p-2 border text-xs shadow-xl'>LOGIN</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
