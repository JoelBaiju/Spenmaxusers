import React, { useEffect, useState } from 'react'
import Graph from './Graph'
import { getErrorMessage } from '../../utils/Validation';
import toast, { Toaster } from 'react-hot-toast';
import { get_api } from '../../utils/api';
import { useSelector } from 'react-redux';

const AdminGraph = () => {

    const [analytics, setAnalytics] = useState({})
    const [partnerAnalytics, setPartnerAnalytics] = useState({})

    const user = useSelector(state => state.adminAuth.adminUser)

    useEffect(() => {
        fetchCustomerAnalytics()
        fetchPartnerAnalytics()
    }, [])

    // const basicUtilities = analytics?.packageCounts.find(item => item.type === 'BASIC' && item.name === 'Kriyado Utilities');

    const fetchCustomerAnalytics = async () => {
        try {
            const response = await get_api(user?.token).get('/shop/analytics/partner/');
            if (response.status === 200) {
                setPartnerAnalytics(response.data)
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
    const fetchPartnerAnalytics = async () => {
        try {
            const response = await get_api(user?.token).get('/shop/analytics/customer/');
            if (response.status === 200) {
                setAnalytics(response.data)
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



    console.log('analytics', partnerAnalytics);
    return (
        <div className=' m-6 p-4 bg-[#C0DCDD] rounded-lg shadow-lg'>
            <h1 className='font-bold'>DashBoard</h1>

            <div className='flex gap-5 mt-5'>

                <div className='bg-white w-6/12 p-3 rounded-md'>
                    <p className='text-gray-400 text-sm'>Total Partners</p>
                    <div className='py-2 font-medium'>
                        <p>{partnerAnalytics?.total_patners}</p>
                    </div>
                    <div className='flex justify-between '>
                        {partnerAnalytics?.package_counts?.map((d, index) => (
                            <div key={index} className='bg-gray-100 w-3/12 p-3 rounded-sm'>
                                <div className='flex gap-3'>
                                    <img src="/gift (1).png" alt="Gift Icon" className='w-4' />
                                    <p className='text-xs text-[#80509F]'>{d.name}</p>
                                </div>
                                <div className='mt-2'>
                                    {d.branch_count}
                                </div>
                            </div>
                        ))}



                    </div>

                    <div className='flex mt-3 gap-5'>
                        <div className='bg-gray-50 rounded-sm w-6/12 p-2'>
                            <p className='text-xs text-gray-400'>New Members</p>
                            <div className='bg-white flex p-2 rounded-md justify-between'>
                                <div>
                                    <div className='p-1 bg-gray-100 px-2 rounded-md'><p className='text-xs '>Today</p></div>
                                    <p className='font-medium'>{partnerAnalytics?.count_analytics?.today ?? 'N/A'}</p>
                                </div>

                                <div>
                                    <div className='p-1 bg-gray-100 px-2 rounded-md'><p className='text-xs '>This Week</p></div>
                                    <p className='font-medium'>{partnerAnalytics?.count_analytics?.this_week ?? 'N/A'}</p>
                                </div>

                                <div>
                                    <div className='p-1 bg-gray-100 px-2 rounded-md'><p className='text-xs '>This Month</p></div>
                                    <p className='font-medium'>{partnerAnalytics?.count_analytics?.this_month ?? 'N/A'}</p>
                                </div>


                            </div>
                           
                            <div className='p-2'>
                                <p className='text-xs'><span className='text-green-500'>8.5%</span> Up From Yesterday</p>
                            </div>
                        </div>
                        <div className='bg-gray-50 rounded-sm w-6/12 p-2'>
                            <p className='text-xs text-gray-400'>Sales Analytics</p>
                        </div>
                    </div>
                    <div className='p-2 flex justify-end items-center mt-2'>
                        <p className='text-xs'><span className='text-green-500'>8.5%</span> Up From Yesterday</p>
                    </div>
                </div>

                <div className='w-6/12'>
                    <div className='bg-white  p-3 rounded-md'>
                        <p className='text-gray-400 text-sm '>Total Coustomers</p>
                        <div className='py-2 font-medium'>
                            <p>{analytics?.total_customers}</p>
                            <div className='flex justify-between '>
                                <div className='bg-gray-100 w-3/12 p-3 rounded-sm'>
                                    <div className='flex  gap-3'>
                                        <img src="/gift (1).png" alt="" className='w-4' />
                                        <p className='text-xs text-[#80509F]'>Utilitie</p>
                                    </div>
                                    <div className='mt-2'>
                                        <p className='font-medium'>
                                            {analytics?.package_counts?.["Spenmax Utilities"].customer_count ?? 'N/A'}
                                        </p>

                                    </div>
                                </div>
                                <div className='bg-gray-100 p-3 w-3/12 rounded-sm'>
                                    <div className='flex  gap-3'>
                                        <img src="/gift (1).png" alt="" className='w-4' />
                                        <p className='text-xs text-[#00B69B]'>Services</p>
                                    </div>
                                    <div className='mt-2'>
                                        {analytics?.package_counts?.["Spenmax Services"].customer_count ?? 'N/A'}
                                    </div>
                                </div>
                                <div className='bg-gray-100 p-3 w-3/12 rounded-sm'>
                                    <div className='flex  gap-3'>
                                        <img src="/gift (1).png" alt="" className='w-4' />
                                        <p className='text-xs text-[#00B69B]'>Lifestyle</p>
                                    </div>
                                    <div className='mt-2'>
                                        <p className='font-medium'>
                                            {analytics?.package_counts?.["Spenmax Lifestyle"].customer_count ?? 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='p-2 flex justify-start items-center mt-2'>
                            <p className='text-xs'><span className='text-green-500'>{analytics?.sales_percentage}%</span> Up From Yesterday</p>
                        </div>
                    </div>

                    <div className='bg-white mt-2  p-3 rounded-md'>
                        <div className='flex gap-5'>
                            <div className='bg-gray-100 p-3 w-3/12 rounded-sm'>
                                <div className='flex  gap-3'>
                                    <img src="/gift (1).png" alt="" className='w-4' />
                                    <p className='text-xs font-medium'>Grand Users</p>
                                </div>
                                <div className='mt-2'>
                                    <p className='font-medium'>
                                        {analytics?.package_counts?.["Spenmax The Grand Package"].customer_count ?? 'N/A'}
                                    </p>
                                </div>
                            </div>

                            <div className='bg-gray-100 p-3 w-9/12 rounded-sm'>
                                <div className='flex  gap-3'>
                                    <img src="/gift (1).png" alt="" className='w-4' />
                                    <p className='text-xs font-medium'>Combo Users</p>
                                </div>
                                <div className='mt-2'>
                                    <div className='flex justify-between mt-2'>
                                        <p className='font-medium text-xs'>Utilities + Services</p>
                                        {analytics?.package_counts?.["Spenmax Utilities + Services"].customer_count ?? 'N/A'}
                                    </div>
                                    <div className='flex justify-between mt-2'>
                                        <p className='font-medium text-xs'>Utilities + Lifestyle</p>
                                        {analytics?.package_counts?.["Spenmax Utilities + Lifestyle"].customer_count ?? 'N/A'}
                                    </div>
                                    <div className='flex justify-between mt-2'>
                                        <p className='font-medium text-xs'>Lifestyle + Services</p>
                                        {analytics?.package_counts?.["Spenmax Lifestyle + Services"].customer_count ?? 'N/A'}
                                    </div>
                                </div>
                            </div>


                        </div>

                        <div className='p-2 flex justify-start items-center mt-2'>
                            <p className='text-xs'><span className='text-green-500'>{analytics?.sales_percentage}%</span> Up From Yesterday</p>
                        </div>
                    </div>

                </div>
            </div>
            {/* <div className='bg-white mt-5 p-3'>
                <p className='font-medium text-sm'>Sales Details</p>
                <Graph />
            </div> */}
            <Toaster />
        </div>
    )
}

export default AdminGraph
