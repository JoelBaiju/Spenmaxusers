import React, { useState , useEffect } from 'react';
import backgroundImage from '../../assets/images/kriyado_profile_bg[1].png';
import { getErrorMessage, validateEmail, validatePassword } from '../../utils/Validation';
import { login as loginAction } from "../../Reducer/authReducer";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate ,useLocation, Link } from 'react-router-dom';
import api from "../../utils/api";
import { FaCheck } from 'react-icons/fa';
import { adminLogin } from '../../Reducer/adminAuthReducer';
import VerificationModal from './VerificationModal';
import toast, { Toaster } from 'react-hot-toast';
import { vendorlogin } from '../../Reducer/vendorAuthReducer';


const Reset_Password = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [ResetError, setResetError] = useState([]);
    const [ password , setPassword] = useState("")
    const [ perror , setperror] = useState("")
    const [c_password , setC_password] = useState("")
    const [cperror , setcperror] = useState("")
    const [id , setid] = useState("")


    useEffect(()=>{
        const queryParams = new URLSearchParams(location.search);
        const id = queryParams.get('id');
        if(!id){
            navigate("/login")
        }

        else{
            setid(id)
        }

    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResetError([])
        validatePassword(password, setperror);
        handleConfrimPassword()

        if (!perror && !cperror && id) {
            try {
                const response = await api.post(`/user/reset_password/?id=${id}`, { password: password , confirm_password:c_password });
                if (response?.status === 200) {
                    toast.success("Successful")
                }
            } catch (error) {
                console.log(error);
                
                const errorMessages = getErrorMessage(error)
                const generalErrors = errorMessages.filter((error) => error.field === 'general' || error.field === 'non_field_errors' || error.field === error.field);
                if (generalErrors) {
                    setResetError(generalErrors.map(error => error.message));
                }
                
            }
        }

    };


    const handleConfrimPassword = ()=>{

        if (password != c_password){
            setcperror("confrim password should be same as password")
        }
        else{
            setcperror("")
        }

    }

    


    return (
        <div 
            className="bg-cover bg-center w-full h-screen md:flex fixed"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className='w-full md:w-4/12 '>
            </div>
            <div className=' w-full md:w-7/12 flex flex-col justify-center  items-center h-full md:gap-28 md:flex-row  '>
                <div className='w-3/12'>
                    <img src="/Kriyado Black Logo.png" alt="" />
                </div>
                <div className='w-9/12  md:w-6/12 lg:w-6/12'>
                    <div className='flex justify-center items-center'>
                        <h1 className='font-bold text-2xl font-sans p-2 '>Reset Password</h1>
                    </div>
                    <form onSubmit={handleSubmit} >
                        <div className='bg-gray-100 rounded-lg  py-10 px-5'>

                            {ResetError && (
                                <div className='flex justify-center '>
                                    {ResetError.map((error, index) => (
                                        <p key={index} className='text-xs bg-red-500 p-2 w-full rounded-md font-medium text-center text-white'>{error}</p>
                                    ))}
                                </div>
                            )}


                            <div className='mx-4 my-2'>
                                <input
                                    type="password" required
                                    className={`bg-white  rounded-md p-4 text-xs w-full ${perror ? 'border-red-500' : ''} outline-[#80509F]`}
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onBlur={() => validatePassword(password, setperror)}
                                />
                            </div>
                            <div className='pl-2 '>
                                {perror && <p className='text-red-500 text-xs font-medium'>{perror}</p>}
                            </div>

                            <div className='mx-4 my-2'>
                                <input
                                    type="password" required
                                    className={`bg-white  rounded-md p-4 text-xs w-full ${cperror ? 'border-red-500' : ''} outline-[#80509F]`}
                                    placeholder='Confrim Password'
                                    value={c_password}
                                    onChange={(e) => setC_password(e.target.value)}
                                    onBlur={() => handleConfrimPassword()}
                                />
                            </div>
                            <div className='pl-2 '>
                                {cperror && <p className='text-red-500 text-xs font-medium'>{cperror}</p>}
                            </div>
                            
                           
                            <div className='flex justify-center m-4'>
                                <button className='text-white bg-[#80509F] w-full rounded-full p-2 border text-xs shadow-xl'>ENTER</button>
                            </div>
                            <div className='flex justify-end items-center '>
                                <Link to="/login" className='font-bold text-xs  m-1 hover:underline'>create account</Link>

                                <img className='w-6 h-5' src="/arrow.png" alt="" />
                            </div>
                            <p className='text-center'>or</p>

                            <div className='flex justify-center m-2'>
                            <Link to="/login" className='text-white bg-[#80509F] w-full text-center rounded-full p-2 border text-xs shadow-xl'>LOGIN</Link>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default Reset_Password;
