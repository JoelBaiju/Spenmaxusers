import React from 'react'
import CreditCardSkeleton from './CardSkeltion'

const SkeltonLoading = () => {
    return (
        <div>
            <CreditCardSkeleton />
            <div className="animate-pulse bg-gray-200 rounded-lg m-6  p-2 shadow-lg">
                <div className="m-2 p-2">
                    <div className="flex bg-gray-300 items-center pl-3 sm:w-6/12 md:w-3/12 rounded-full">
                        <div className=""></div>
                        <div className="bg-gray-400 rounded-full h-5 w-full"></div>
                    </div>
                </div>

                <div className="m-2 p-2">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-400 h-8 w-full"></div>
                        <div className="bg-gray-400 h-8 w-full"></div>
                        <div className="bg-gray-400 h-8 w-full"></div>
                        <div className="bg-gray-400 h-8 w-full"></div>
                    </div>
                </div>
            </div>
            <div className="animate-pulse bg-gray-200 rounded-lg m-6 p-2 shadow-lg">
                <div className="m-2 p-2">
                    <div className="flex bg-gray-300 items-center pl-3 sm:w-6/12 md:w-3/12 rounded-full">
                        <div className=""></div>
                        <div className="bg-gray-400 rounded-full h-5 w-full"></div>
                    </div>
                </div>

                <div className="m-2 p-2">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-400 h-8 w-full"></div>
                        <div className="bg-gray-400 h-8 w-full"></div>
                        <div className="bg-gray-400 h-8 w-full"></div>
                        <div className="bg-gray-400 h-8 w-full"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SkeltonLoading
