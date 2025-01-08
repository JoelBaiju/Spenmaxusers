import React from 'react';

const smallCardSkelton = () => {

    return (
        <div className="animate-pulse bg-gray-200 rounded-lg m-6  p-2 shadow-lg flex flex-col gap-10">

            <div className="m-2 p-2 ">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-400 h-8 w-full"></div>
                    <div className="bg-gray-400 h-8 w-full"></div>
                    <div className="bg-gray-400 h-8 w-full"></div>
                    <div className="bg-gray-400 h-8 w-full"></div>
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
            <div className="m-2 p-2">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-400 h-8 w-full"></div>
                    <div className="bg-gray-400 h-8 w-full"></div>
                    <div className="bg-gray-400 h-8 w-full"></div>
                    <div className="bg-gray-400 h-8 w-full"></div>
                </div>
            </div>

        </div>
    );
};

export default smallCardSkelton;
