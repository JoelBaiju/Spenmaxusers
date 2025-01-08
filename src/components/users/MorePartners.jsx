import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import MorePartnersDetails from './MorePartnersDetails'
import { get_api } from '../../utils/api';
import { useSelector } from 'react-redux';
import ServiceProvider from './ServiceProvider';
import { getErrorMessage } from '../../utils/Validation';
import toast, { Toaster } from 'react-hot-toast';

const MorePartners = () => {

    const { id } = useParams();
    const user = useSelector(state => state.auth.user);

    const [branchDetails, setbranchDetails] = useState(null)

    const FetchPartnersData = async () => {
        try {
            const response = await get_api(user?.token).get(`/shop/vendor/branches/customer/${id}/`);
            if (response.status === 200) {
                setbranchDetails(response.data)
            }
        } catch (error) {
            console.log(error);
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

    useEffect(() => {
        FetchPartnersData()
    }, [])



    return (
        <div className='' >
            <div className='md:absolute md:top-0 md:right-0 md:mt-[12rem] '>
                <div className='m-2 p-2'>
                    <div className='flex bg-[#99FDD2] items-center pl-3 sm:w-6/12 md:w-full justify-center rounded-full '>
                        <div className=''>
                            <h1 className='text-xs'>Active</h1>
                        </div>
                        <div className='bg-black rounded-full h-full p-1 ml-3 w-full  '>
                            <h1 className='text-white text-xs p-1'>Kriyado Lifestyle + Services</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className='border-[1px] border-[#678B8D] rounded-lg m-6 p-6 shadow-lg md:flex  gap-3'>

                <div className='md:w-4/12 mt-11  order-1'>
                    {branchDetails && <ServiceProvider branchDetails={branchDetails} />}
                    {/* <div className='  rounded-sm'>
                        <img src="/ad-area@2x.png" alt="" />
                    </div> */}
                </div>
                <div className='md:w-10/12 md: '>

                    <div className='flex items-center'>
                        <div className='w-5/12 hidden  sm:block'>
                            <h1 className='font-bold'>Partners Details</h1>
                        </div>
                    </div>

                    <div className='mt-5'>
                        <MorePartnersDetails branchDetails={branchDetails} />
                    </div>

                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default MorePartners
