import React, { useState , useEffect } from 'react';
import { useLocation , useNavigate , Link } from 'react-router-dom';
import backgroundImage from '../../assets/images/kriyado_profile_bg[1].png';
import api from "../../utils/api";


const Account_Verify = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const [error , setError] = useState({
        verify:false,
        error:false
    })

    useEffect(()=>{
        const queryParams = new URLSearchParams(location.search);
        const id = queryParams.get('id');
        if(!id){
            navigate("/login")
        }

        else{
            verify(id)
        }

    },[])

    const verify = async (id)=>{

        try {
            const response = await api.post(`/user/verify_account/?id=${id}`);
            if (response.status === 201) {
                setError({
                    error:false,
                    verify:true
                })
            }
        } catch (error) {
            
            setError(
                {
                    error:true,
                    verify:false
                }
            )
            
        }
    }


    return (
        <>
        <div 
            className="bg-cover bg-center w-full h-screen overflow-y-scroll custom-nonescroll md:flex justify-center items-center  px-5 py-10 md:p-0"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >

            <div className='w-full md:h-full md:w-4/12 lg:w-6/12'>

                <div className='w-full h-full flex justify-center md:justify-end items-start md:items-center'>
                        <img src="/Kriyado Black Logo.png" alt="logo" className='w-[250px] block' />
                </div>
            </div>
            
            <div className='w-full md:w-8/12 md:px-8 md:py-8 mb-[50px] lg:w-6/12 flex justify-center items-center'>
                <div className='w-full h-[400px]  rounded-lg-md bg-gray-100 p-1 p-4 my-3 lg:w-8/12 flex justify-center items-center flex-col'>
                    
                        {

                            error.error  ? 
                            <>
                            
                            <p className='mb-5'>Link has expired, Try again.</p>
                            <Link to="/login" className='text-white bg-[#80509F] w-full text-center p-1  rounded-lg'>Login</Link>
                            </>

                            :
                        
                        (
                            !error.verify ?

                            <button type="button" className="bg-indigo-400 h-max w-max rounded-lg text-white font-bold hover:bg-indigo-300 hover:cursor-not-allowed duration-[500ms,800ms]" disabled>
                                <div className="flex items-center justify-center m-[10px]"> 
                                    <div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div>
                                    <div className="ml-2"> Verify... </div>
                                </div>
                            </button>

                            :

                            <>
                                <p className='mb-5'>Your account has been verified successfully and click the login to login to your account . </p>
                                <Link to="/login" className='text-white bg-[#80509F] w-full text-center p-1  rounded-lg'>Login</Link>

                            </>
                        )
                    }

                    


                        
                </div>
                

            </div>

        </div>
        </>
    )

};

export default Account_Verify;
