import React , { useState , useEffect}from 'react';
import { getErrorMessage } from '../../utils/Validation';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { get_api } from '../../utils/api';




const CompanyModal = ({ isOpen, onClose, data }) => {

    const [rerender , setRender] = useState(false)
    useEffect(() => {
        
    }, [rerender])

    const formatTime = (timeString) => {
        const date = new Date(`2000-01-01T${timeString}`);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const user = useSelector(state => state.adminAuth.adminUser)

    const handle_force_verify = async (id)=>{
        try {
            const response = await get_api(user?.token).post(`/user/force_verify/${id}/`);
            if (response.status === 201) {
                toast.success('verified successfully')
                data.is_registered = true
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
        <div className={`fixed z-10 inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
            <div className="flex items-center justify-center min-h-screen p-5">
                <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
                <div className="z-20 bg-white rounded-lg overflow-hidden shadow-xl w-full">
                    <div className="p-6">
                        <div className='flex justify-between items-center'>
                            <h3 className="text-lg font-bold mb-4">COMPANY DETAILS</h3>
                            <button onClick={onClose} className="px-4 py-2 bg-[#80509F] text-white rounded-md hover:bg-[#5c3973] focus:outline-none focus:bg-[#80509F]">Close</button>

                        </div>
                        <div className='flex gap-5 items-center justify-center'>

                                    <div className='border p-2 hover:border-[#9F5080]'>
                                        <img src="/man.png" alt="Customer" className="w-[100px] h-[100px] image-cover" />
                                        {/* {data.logo ? <img src={data.image} alt="Customer" className="w-full h-auto" /> : <img src="/man.png" alt="Customer" className="w-[100px] h-[100px] image-cover" />} */}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-2xl">{data.owner}</p>
                                        <p>{data.email_id}</p>
                                    </div>
                                </div>

                                <div className='flex gap-5 my-5'>
                                    {!data.is_registered && 
                                    <>
                                    <button className='bg-[#9F5080] text-white px-5 py-2 text-sm rounded-md' onClick={()=>handle_force_verify(data.user)}>Force Verify</button>
                                    <button className='bg-[#9F5080] text-white px-5 py-2 text-sm rounded-md' onClick={()=>handle_resend_verification(data.user)}>Resend Verification</button>
                                    
                                    </>
                                    
                                    }
                        </div>
                        <div className='grid grid-cols-3 gap-4 my-5'>
                            <div>
                                <p className='font-bold mb-2'>Owner</p>
                                <p className='border p-2 hover:border-[#9F5080]'> {data.owner}</p>
                            </div>
                            <div>
                                <p className='font-bold mb-2'>Organization</p>
                                <p className='border p-2 hover:border-[#9F5080]'> {data.organization}</p>
                            </div>
                            <div>
                                <p className='font-bold mb-2'>Email ID</p>
                                <p className='border p-2 hover:border-[#9F5080]'> {data.email_id}</p>
                            </div>
                            <div className='col-span-2'>
                                <p className='font-bold mb-2'>Mobile Number</p>
                                <p className='border p-2 hover:border-[#9F5080]'> {data.mobile_number}</p>
                            </div>
                            <div>
                                <p className='font-bold mb-2'>Is Registered</p>
                                <p className='border p-2 hover:border-[#9F5080]'> {data.is_registered ? 'Yes' : 'No'}</p>
                            </div>
                            <div>
                                <p className='font-bold mb-2'>Website</p>
                                <p className='border p-2 hover:border-[#9F5080]'> {data.website || 'N/A'}</p>
                            </div>
                            <div>
                                <p className='font-bold mb-2'>Face Book</p>
                                <p className='border p-2 hover:border-[#9F5080]'> {data.facebook_link || 'N/A'}</p>
                            </div>
                            <div>
                                <p className='font-bold mb-2'>Instagram</p>
                                <p className='border p-2 hover:border-[#9F5080]'> {data.instagram_link || 'N/A'}</p>
                            </div>
                            <div>
                                <p className='font-bold mb-2'>You Tube</p>
                                <p className='border p-2 hover:border-[#9F5080]'> {data.youtube_link || 'N/A'}</p>
                            </div>
                            <div className='col-span-2'>
                                <p className='font-bold mb-2'>Head Office Address</p>
                                <p className='border p-2 hover:border-[#9F5080]'> {data.head_office_address}</p>
                            </div>
                                    
                                   
                        </div>
                        <div className="mt-6">
                            <h4 className="text-lg font-bold mb-4">BRANCHES</h4>

                            {/* <div className="w-full flex border p-2 h-[220px]">
                                <div className="w-4/12 flex flex-col gap-3">
                                        <p className="font-semibold text-gray-400">Location : <small className=' text-black'>abdc</small></p>
                                        <p><span className="font-semibold text-gray-400">Key Person:</span></p>
                                        <p><span className="font-semibold text-gray-400">Contact:</span> </p>
                                        <p><span className="font-semibold text-gray-400">Working Hours:</span> </p>
                                        <p><span className="font-semibold text-gray-400">Pin Code:</span> </p>
                                        <p><span className="font-semibold text-gray-400">Registered Address:</span></p>
                                </div>
                                <div className="w-8/12 h-full overflow-scroll">
                                <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Offer</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount Type (days)</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>

                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
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
                                            <tr>
                                                    <td className="px-6 py-4 whitespace-nowrap">one</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">one</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">one</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">one</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div> */}
                            <div className="grid grid-cols-1 gap-4">
                                {data?.branches?.map((branch, index) => (
                                     <div className="w-full flex border p-2 h-[220px] mb-10" key={branch.id}>
                                        <div className="w-4/12 flex flex-col gap-3">
                                                <p className="font-semibold text-gray-400">Location : <small className=' text-black'>{branch.District}, {branch.Locality}, {branch.State}</small></p>
                                                <p className="font-semibold text-gray-400">Key Person : <small className=' text-black'>{branch.KeyPersonName}</small></p>
                                                <p className="font-semibold text-gray-400">Contact : <small className=' text-black'>{branch.KeyPersonContact}</small></p>
                                                <p className="font-semibold text-gray-400">Working Hours : <small className=' text-black'>{formatTime(branch.NormalWorkingHoursFrom)} - {formatTime(branch.NormalWorkingHoursTo)}</small></p>
                                                <p className="font-semibold text-gray-400">Pin Cod : <small className=' text-black'> {branch.PinCode}</small></p>
                                                <p className="font-semibold text-gray-400">Registered Address : <small className=' text-black'> {branch.RegisteredAddress}</small></p>

                                        </div>
                                        <div className="w-8/12 h-full overflow-y-scroll custom-scroll">
                                        <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-[#80509F]">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Offer</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Type</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Discount Type (days)</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Category</th>
        
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {branch.offers?.map((offer) => (
                                                        <tr key={offer.id}>
                                                            <td className="px-6 py-4 whitespace-nowrap">{offer.offer}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap">{offer.discount_type}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap">{offer.offer_type=="NORMAL" ? <small className='bg-green-400 p-2'>NORMAL</small> : <small className='bg-red-400 p-2'>SPECIAL</small>}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap">{offer.category ? <small>{offer.category}</small> : <small>N/A</small>}</td>
                                                        </tr>
                                                       
                                                    ))}
                                                    
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    
                                ))}
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default CompanyModal;
