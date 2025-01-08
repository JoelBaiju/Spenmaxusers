import React, { useEffect, useState } from 'react'
import SubscriptionCard from './SubscriptionCard'
import AnimatedText from '../ResuableComponents/AnimatedText'
import api, { get_api } from '../../utils/api';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { getErrorMessage } from '../../utils/Validation';
import SubscriptionCardSkeleton from '../ResuableComponents/SubscriptionCardSkeleton';

const Pricing = () => {

    const [packageType, setPackageType] = useState('BASIC')
    const [packages, setpackages] = useState([])
    const [Data, setData] = useState({
        name: '',
        number: '',
        district: '',
        state: '',
        address: '',
        dob: '',
        email_id: '',
        pincode: '',
        country: ''
    });

    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        fetchPackages()
        fetchUserData()
    }, [packageType])

    const fetchUserData = async () => {
        try {
            const response = await get_api(user?.token).get('/shop/customer/detail_update/user/');
            if (response.status === 200) {
                setData(response.data)
            }
        } catch (error) {
            console.error('Login failed:', error);
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

    const fetchPackages = async () => {
        try {
            const response = await get_api(user?.token).get(`/shop/package_option/user/?type=${packageType}`);
            if (response.status === 200) {
                if (response.data.length === 0) {
                    toast.error(`There is no packages in ${packageType}`)
                    setPackageType('BASIC')
                } else {
                    setpackages(response.data)
                }
            }
        } catch (error) {
            console.error('Fetching data failed:', error);
            const errorMessages = getErrorMessage(error)
            setPackageType('BASIC')
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

    function loadRazorpayScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    const displayRazorpayPaymentSdk = async (id) => {
        try {
            if (Data?.is_expired === false) {
                toast.error("You can't purchase a new package until your current one expires.");
                return
            }
            const res = await loadRazorpayScript(
                "https://checkout.razorpay.com/v1/checkout.js"
            );

            if (!res) {
                toast.error("Razorpay SDK failed to load. Please check your internet connection.");
                return;
            }

            try {
                const result = await get_api(user?.token).post("payment/razorpay_order/", {
                    "po_id": id
                });

                if (!result) {
                    toast.error("Server error. Please check your internet connection.");
                    return;
                }

                const { merchantId = null, amount = null, currency = null, orderId = null } = result.data;


                const options = {
                    key: merchantId,
                    amount: amount.toString(),
                    currency: currency,
                    name: "Kriyado",
                    description: "Test Transaction",
                    order_id: orderId,
                    handler: async function (Response) {
                        try {
                            const response = await get_api(user?.token).post('/payment/razorpay_callback/', { Response })
                            console.log('/payment/razorpay_callback/', response);
                            if (response.status === 200) {
                                toast.success('Successfully toasted!')
                            }
                        } catch (error) {
                            console.log('handler', error);
                        }
                    },
                    prefill: {
                        name: "Swapnil Pawar",
                        email: "swapnil@example.com",
                        contact: "9999999999",
                    },
                    notes: {
                        address: "None",
                    },
                    theme: {
                        color: "#61dafb",
                    },
                    data_payment_options: "upi",
                };

                const paymentObject = new window.Razorpay(options);


                paymentObject.open();
                paymentObject.on('payment.failed', async function (response) {
                    toast.error("Payment failed. Please try again.")
                    console.log("Payment Failed", response.error);
                    try {
                        const responseFromServer = await api.post('/payment/razorpay_callback/', { error: response.error });
                        console.log('/payment/razorpay_callback/', responseFromServer);
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
                });

            } catch (error) {
                console.error("Error:", error);
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

            return (
                <div className="App">
                    <header className="App-header">
                        {/* <img src={logo} className="App-logo" alt="logo" /> */}
                        <p>Razorpay Payments! Try it Once</p>
                        <button className="App-link" onClick={displayRazorpayPaymentSdk}>
                            Pay Now To Test
                        </button>
                    </header>
                </div>
            );


        } catch (error) {
            console.error('Error creating Razorpay order:', error);
        }
    };

    return (
        <div className='bg-[#c6dfe0] rounded-lg m-6 p-6 shadow-lg md:flex  gap-3'>
            <div className=''>

                <div className=''>
                    <div className='flex justify-center py-8'>
                        <AnimatedText text='The packages for your needs' className='font-bold text-4xl font-poppins text-[#668d8f] ' />
                    </div>

                    <div className='flex justify-center '>
                        <div className="flex border-2 bg-gray-100 border-[#a0c9cb] rounded-lg px-2 py-2">
                            <div
                                className={`cursor-pointer rounded-md px-2 py-2 md:w-[150px] flex items-center justify-center ${packageType === 'BASIC' ? 'bg-[#678b8d] text-white' : ''
                                    }`}
                                onClick={() => setPackageType('BASIC')}
                            >
                                <p className='font-bold font-poppins text-center'>Basic</p>
                            </div>
                            <div
                                className={`cursor-pointer rounded-md px-2 py-2 md:w-[150px] flex items-center justify-center ${packageType === 'COMBO' ? 'bg-[#678b8d] text-white' : ''
                                    }`}
                                onClick={() => setPackageType('COMBO')}
                            >
                                <p className='font-bold font-poppins text-center'>Combo</p>
                            </div>
                            <div
                                className={`cursor-pointer rounded-md px-2 py-2 md:w-[150px] flex items-center justify-center ${packageType === 'ALL' ? 'bg-[#678b8d] text-white' : ''
                                    }`}
                                onClick={() => setPackageType('ALL')}
                            >
                                <p className='font-bold font-poppins text-center'>Grand</p>
                            </div>
                        </div>

                    </div>
                </div>
                {packages.length === 0 ?
                    (<div className='md:flex py-8 gap-4'>
                        <SubscriptionCardSkeleton />
                        <SubscriptionCardSkeleton />
                        <SubscriptionCardSkeleton />
                    </div>)
                    :
                    (<div className='md:grid md:grid-cols-3 md:gap-8 py-8 '>
                        {packages?.map((pkg, index) => (
                            <div key={pkg?.id}>
                                <SubscriptionCard data={pkg} displayRazorpayPaymentSdk={displayRazorpayPaymentSdk} />
                            </div>
                        ))}
                    </div>)
                }

            </div>
            <Toaster />
        </div>
    )
}

export default Pricing
