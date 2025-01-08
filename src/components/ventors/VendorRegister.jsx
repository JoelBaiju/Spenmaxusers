import React, { useRef, useState } from 'react'
import backgroundImage from '../../assets/images/kriyado_profile_bg[1].png';

import { Outlet } from 'react-router-dom';

const VendorRegister = () => {

    const [formData, setFormData] = useState({})
    const [imageError, setimageError] = useState('');

    const addImage = useRef(null);


    return (
        <div
            className="bg-cover bg-center w-full  md:flex  "
        >
            <div className=' w-full  flex flex-col justify-center  items-center h-full md:flex-row  '>
              
                <div className=' w-10/12 md:w-max mx-5 p-5 overflow-y-scroll h-full   customscrollbar bg-white border-2 border-[#387478]   '>
                    <div className='flex justify-center items-center'>
                        <h1 className='font-bold text-2xl font-sans '>Vendor Register</h1>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default VendorRegister
