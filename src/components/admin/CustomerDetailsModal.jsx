import React, { useEffect, useState } from 'react';
import CustmorPackageModal from './CustmorPackageModal';
import { get_api } from '../../utils/api';
import { getErrorMessage } from '../../utils/Validation';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

const CustomerDetailsModal = ({ isOpen, onClose, data, render, addPackage }) => {

    const [packages, setpackages] = useState([])
    const [isOPen, setisOPen] = useState(false)
    const [rerender , setRender] = useState(false)

    const user = useSelector(state => state.adminAuth.adminUser)

    useEffect(() => {
        fetchPackages()
    }, [rerender])

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

    const updatePackageInFormData = async (packageId) => {
        try {
            const response = await get_api(user?.token).post('/shop/customer/package/update/', { package: packageId, user: data.id });
            if (response.status === 201) {
                addPackage(response.data)
                render()
                onCloseModal()
                toast.success('package added')
            }
        } catch (error) {
            console.error('Fetching categories failed:', error);
            const errorMessages = getErrorMessage(error)
            const generalErrors = errorMessages.filter((error) => error.field === 'general' || error.field === error.field || error.field === 'name');
            if (generalErrors.length >= 0) {
                const newErrors = generalErrors.map(error => error.message);
                console.log(newErrors);
                newErrors.forEach(error => toast.error(error));
                return newErrors;
            }
            else if (error.message) {
                toast.error(`${error.message || 'Somthing went wrong'}`)
            }
        }
    };

    const onCloseModal = () => {
        setisOPen(false)
    }

    const handle_force_verify = async (id)=>{
        try {
            const response = await get_api(user?.token).post(`/user/force_verify/${id}/`);
            if (response.status === 201) {
                toast.success('verified successfully')
                data.is_active = true
                setRender(!rerender)
            }
        } catch (error) {
            console.error('Fetching categories failed:', error);
            const errorMessages = getErrorMessage(error)
            const generalErrors = errorMessages.filter((error) => error.field === 'general' || error.field === error.field || error.field === 'name');
            if (generalErrors.length >= 0) {
                const newErrors = generalErrors.map(error => error.message);
                console.log(newErrors);
                newErrors.forEach(error => toast.error(error));
                return newErrors;
            }
            else if (error.message) {
                toast.error(`${error.message || 'Somthing went wrong'}`)
            }
        }

    }

    const handle_resend_verification = async (id)=>{
        try {
            const response = await get_api(user?.token).post(`/user/re_verify/${id}/`);
            if (response.status === 201) {
                toast.success('verification mail send successfully')
            }
        } catch (error) {
            console.error('Fetching categories failed:', error);
            const errorMessages = getErrorMessage(error)
            const generalErrors = errorMessages.filter((error) => error.field === 'general' || error.field === error.field || error.field === 'name');
            if (generalErrors.length >= 0) {
                const newErrors = generalErrors.map(error => error.message);
                console.log(newErrors);
                newErrors.forEach(error => toast.error(error));
                return newErrors;
            }
            else if (error.message) {
                toast.error(`${error.message || 'Somthing went wrong'}`)
            }
        }

    }


    return (
        <div className={` fixed z-10 inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
            <div className="  flex items-center justify-center min-h-screen">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className=" rounded-lg   overflow-hidden shadow-xl transform transition-all w-5/6 ">
                    <div className=" w-full bg-[#688687] px-4 py-5 sm:px-6">
                        <h3 className="text-lg text-center font-medium leading-6 text-white">CUSTOMER DETAILS</h3>
                    </div>
                    
                    <div className="bg-white w-full px-4 py-4 sm:px-6 ">
                        <div className="w-full space-y-4">
                            <div>
                                <div className='flex flex-col gap-5 items-center justify-center'>

                                    <div className='border p-2 hover:border-[#678B8D]'>
                                        {data.image ? <img src={data.image} alt="Customer" className="w-full h-32" /> : <img src="/man.png" alt="Customer" className="w-[100px] h-[100px] image-cover" />}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-2xl">{data.name}</p>
                                        <p>{data.email_id}</p>
                                    </div>
                                </div>

                                <div className='flex gap-5 my-5'>
                                    {!data.is_active && 
                                    <>
                                    <button className='bg-[#678B8D] text-white px-5 py-2 text-sm rounded-md' onClick={()=>handle_force_verify(data.user)}>Force Verify</button>
                                    <button className='bg-[#678B8D] text-white px-5 py-2 text-sm rounded-md' onClick={()=>handle_resend_verification(data.user)}>Resend Verification</button>
                                    
                                    </>
                                    
                                    }
                                </div>

                                <div className='grid grid-cols-3 gap-4 my-5'>
                                    <div>
                                        <p className='font-bold mb-2'>Email</p>
                                        <p className='border p-2 hover:border-[#678B8D]'> {data.email_id}</p>
                                    </div>
                                    <div>
                                        <p className='font-bold mb-2'>Number</p>
                                        <p className='border p-2 hover:border-[#678B8D]'> {data.number}</p>
                                    </div>
                                    <div>
                                        <p className='font-bold mb-2'>Date of Birth</p>
                                        <p className='border p-2 hover:border-[#678B8D]'> {data.dob}</p>
                                    </div>
                                    <div className='col-span-2'>
                                        <p className='font-bold mb-2'>Address</p>
                                        <p className='border p-2 hover:border-[#678B8D]'> {data.number}</p>
                                    </div>
                                    <div>
                                        <p className='font-bold mb-2'>District</p>
                                        <p className='border p-2 hover:border-[#678B8D]'> {data.district}</p>
                                    </div>
                                    <div>
                                        <p className='font-bold mb-2'>Pincode</p>
                                        <p className='border p-2 hover:border-[#678B8D]'> {data.pincode}</p>
                                    </div>
                                    <div>
                                        <p className='font-bold mb-2'>State</p>
                                        <p className='border p-2 hover:border-[#678B8D]'> {data.state}</p>
                                    </div>
                                    
                                    <div>
                                        <p className='font-bold mb-2'>Country</p>
                                        <p className='border p-2 hover:border-[#678B8D]'> {data.country}</p>
                                    </div>
                                    
                                   
                                </div>
                               
                            </div>
                            
                                <div className='w-full'>
                                    <div className='flex justify-between items-center mb-3'>
                                        <h4 className="font-semibold">PACKAGES</h4>
                                        {!data.isActive && data.is_active && 
                                        
                                        < div className='flex justify-center' >
                                            <button className='bg-[#678B8D] text-white px-5 py-2 text-sm rounded-md' onClick={() => { setisOPen(true) }}><p >Add Package</p></button>
                                        </div>
                                        
                                        }
                                    </div>
                                    <table className="w-full overflow-x-scroll divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package Name</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration (days)</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Date</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>

                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y  divide-gray-200">
                                            {data.package_c.map((pkg) => (
                                                <tr key={pkg.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">{pkg.package_name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{pkg.package_price}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{pkg.package_duration}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{pkg.purchase_date}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{pkg.expiry_date}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{pkg.is_active ? <p className='bg-green-500 text-white p-2'>Active</p> : <p className='bg-red-500 p-2 text-white'>Expired</p>}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                
                            
                            
                        </div>
                    </div>
                    <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button onClick={onClose} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#80509F] text-base font-medium text-white hover:bg-[#674081] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#80509F] sm:ml-3 sm:w-auto sm:text-sm">
                            Close
                        </button>
                    </div>
                </div>
            </div>
            <CustmorPackageModal packages={packages} isOpen={isOPen} onClose={onCloseModal} updatePackageInFormData={updatePackageInFormData} />
            <Toaster />
        </div >
    );
};

export default CustomerDetailsModal;
