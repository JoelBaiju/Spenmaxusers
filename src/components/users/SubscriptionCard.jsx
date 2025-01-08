import React from 'react';
import './SubscriptionCard.css';

const SubscriptionCard = ({ data, displayRazorpayPaymentSdk }) => {

    const activeCategories = data?.package_detail?.categories.filter(category => category.is_active);

    const redirectToWhatsApp = (id) => {
        const phoneNumber = '9037975042';

        const whatsappUrl = `https://wa.me/${phoneNumber}`;

        window.open(whatsappUrl, '_blank');
    }

    return (
        <div className="subscription-card-container ">
            <div className="subscription-card bg-[#ffffff] rounded-md p-6 shadow-md mb-5 md:w-[390px] cursor-pointer border border-gray-300">
                <div className="mb-4">
                    <h2 className="text-xl font-bold mb-2 text-[#506f70] ">{data?.package_detail?.name}</h2>
                    <p className="text-sm text-gray-700 font-poppins">{data?.package_detail.discription}</p>
                </div>
                <div className="md:flex justify-between items-center mb-4">
                    <div>
                        <div className='md:flex items-center gap-1'>
                            <p className="text-sm line-through text-gray-500"><span className='text-[#99a5d0]'>₹ {data.actual_price}</span> </p>
                            <p className="text-[#64657e]"><span className='text-[#426667] text-2xl font-bold'>₹ {parseInt(data.discount_price).toFixed(0)}</span> for {data.duration_days} days</p>
                        </div>
                        <p className="text-xs text-gray-500 mb-1">for limited period *</p>
                    </div>
                </div>
                <div>
                    <h4 className="text-lg font-bold mb-2">Features</h4>
                    <ul className="list-disc pl-4 h-[100px] overflow-y-auto customscrollbar">
                        {activeCategories.map(category => (
                            <li key={category.name} className='text-sm'>{category.name}</li>
                        ))}
                    </ul>
                </div>
                <div className='flex pt-6'>
                    {/* <button className="bg-[#9F5080] text-white px-4 py-2 rounded-md font-semibold" onClick={() => { displayRazorpayPaymentSdk(data.id) }}>Subscribe Now</button> */}
                    <button className="bg-[#506f70] text-white px-4 py-2 rounded-md font-semibold" onClick={() => { redirectToWhatsApp() }}>Subscribe Now</button>
                </div>
            </div>
        </div>
    );
}

export default SubscriptionCard;
