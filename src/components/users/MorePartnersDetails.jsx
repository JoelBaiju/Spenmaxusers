import React from 'react'
import MorePartnersSkelton from '../ResuableComponents/MorePartnersSkelton';
import ServicesCard from './ServicesCard';
import LocationMap from '../ResuableComponents/LocationMap ';

const MorePartnersDetails = ({ branchDetails }) => {


    return branchDetails === null ?
        <div>
            <div className='pb-9'>
                <MorePartnersSkelton />
            </div>
            <div className='pb-9'>
                <MorePartnersSkelton />
            </div>
        </div>
        : (
            <div className=''>

                <div className='flex flex-col gap-8'>
                    <ServicesCard branchDetails={branchDetails} />
                </div>

                {/* <div className='mt-10'>
                    <LocationMap />
                </div>
 */}

                <div className='shadow-sm mt-20'>
                    <div className='flex px-4'>
                        <div className='w-6/12'><p className='text-xs text-gray-400'>Name</p></div>
                        <div><p className='text-xs text-gray-400'>Designation</p></div>
                    </div>
                    <div className='flex px-4 py-1'>
                        <div className='w-6/12'><p className='text-xs font-medium '>ABC Shop</p></div>
                        <div><p className='text-xs font-medium '>Manager</p></div>
                    </div>
                </div>

            </div>
        )
}

export default MorePartnersDetails
