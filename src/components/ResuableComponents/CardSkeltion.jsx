import React, { useState, useEffect } from 'react';

const CreditCardSkeleton = () => {
    return (
        <div className="animate-pulse bg-gray-200 rounded-lg m-6 p-2 shadow-lg w-3/12 h-[200px] md:absolute top-20 z-10 right-10">
            <div className="relative">
                <div className="bg-gray-300 w-full h-52 rounded-t-lg"></div>
                <div className="absolute top-3/4 left-9 mb-1 text-xs text-white">Kriyado User</div>
                <div className="absolute top-3/4 left-44 mb-1 text-xs text-white">02/25</div>
            </div>
        </div>
    );
};

export default CreditCardSkeleton;
