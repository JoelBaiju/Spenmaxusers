import React from 'react';

const DiscountEntrySkelton = () => {
    return (
        <div className='mt-5 mb-4'>
            <div className='my-4'>
                <p className='text-xs font-medium py-1 text-gray-800'>Total Discounts</p>
                <hr className='border border-gray-300' />
            </div>

            <div className='my-5 flex gap-7'>
                <div className='w-4/12'>
                    <p className='text-xs text-gray-400'>Discount Type</p>
                    <div className='flex py-2'>
                        <div className='flex w-1/4 gap-3'>
                            <div className='h-4 w-4 bg-gray-300 rounded-full'></div>
                            <div className='h-4 w-16 bg-gray-300 rounded-full'></div>
                        </div>
                        <div className='flex w-3/4 gap-3'>
                            <div className='h-4 w-4 bg-gray-300 rounded-full'></div>
                            <div className='h-4 w-16 bg-gray-300 rounded-full'></div>
                        </div>
                    </div>
                </div>

                <div className='w-4/12'>
                    <p className='text-xs text-gray-400'>Total bill discount</p>
                    <div className='flex py-2'>
                        <div className='h-4 w-full bg-gray-300 rounded'></div>
                    </div>
                </div>
            </div>

            {/* Additional skeleton elements for other sections */}

            <div className='flex justify-end items-end mt-14 gap-5'>
                <div className='h-10 w-24 bg-gray-300 rounded-md'></div>
                <div className='h-10 w-24 bg-gray-300 rounded-md'></div>
            </div>
        </div>
    );
};

export default DiscountEntrySkelton;
