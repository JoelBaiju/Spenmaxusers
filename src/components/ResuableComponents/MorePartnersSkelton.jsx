import React from 'react'

const MorePartnersSkelton = () => {
    return (
        <div className="animate-pulse space-y-4">
            {/* Skeleton loading for each section */}
            <div className="bg-gray-300 h-4 rounded"></div>
            <div className="bg-gray-300 h-4 rounded"></div>
            <div className="bg-gray-300 h-4 rounded"></div>
            <div className="bg-gray-300 h-4 rounded"></div>
            <div className="bg-gray-300 h-4 rounded"></div>
        </div>
    )
}

export default MorePartnersSkelton
