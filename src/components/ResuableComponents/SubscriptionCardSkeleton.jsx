import React from 'react';

const SubscriptionCardSkeleton = () => {
    return (
        <div className="bg-gray-200 rounded-md p-6 shadow-md mb-5 animate-pulse md:w-[400px] ">
            <div className="mb-4">
                <div className="h-6  bg-gray-300 mb-2"></div>
                <div className="h-4  bg-gray-300"></div>
            </div>
            <div className="md:flex justify-between items-center mb-4">
                <div>
                    <div className="h-4  bg-gray-300 mb-1"></div>
                    <div className="h-3  bg-gray-300"></div>
                </div>
            </div>
            <div>
                <div className="h-4  bg-gray-300 mb-2"></div>
                <ul className="list-disc pl-4">
                    <li className="h-4  bg-gray-300 mb-1"></li>
                    <li className="h-4  bg-gray-300 mb-1"></li>
                    <li className="h-4  bg-gray-300 mb-1"></li>
                    <li className="h-4  bg-gray-300"></li>
                </ul>
            </div>
            <div className="flex pt-6">
                <div className="h-10 w-20 bg-gray-300"></div>
            </div>
        </div>
    );
}

export default SubscriptionCardSkeleton;
