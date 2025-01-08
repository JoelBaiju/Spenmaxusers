import React from 'react'
import ParnteRegesterPage from './ParnteRegesterPage';
import { Link, Outlet, useLocation } from 'react-router-dom';

const PartnersRegistration = () => {


    const location = useLocation()
    const basePath = '/admin-home/add-Parnter/branch-details/';
    const basePath2 = '/admin-home/add-Parnter/Discount-Entry/';
    const basePath3 = '/admin-home/add-Parnter/Declaration-Confirmation/';
    const basePath4 = '/admin-home/add-Parnter/Vendor-Submission/';
    const isBranchDetailsPage = location.pathname.startsWith(basePath);
    const isBranchDetailsPage2 = location.pathname.startsWith(basePath2);
    const isBranchDetailsPage3 = location.pathname.startsWith(basePath3);
    const isBranchDetailsPage4 = location.pathname.startsWith(basePath4);


    return (
        <div className='w-full rounded-md p-1 px-4 my-3 '>
            <div className='flex justify-between'>
                <div
                    id="div1"
                    className={`w-2/12 p-3 flex items-center border-b-2 cursor-pointer ${location.pathname === '/admin-home/add-Parnter' ? 'border-[#699496] ' : ''}`}
                >
                    
                        <p className='font-bold text-xs text-gray-500  font-poppins'>Registration</p>
                   
                </div>
                <div
                    id="div2"
                    className={`w-2/12 p-3 flex items-center border-b-2 cursor-pointer ${isBranchDetailsPage || location.pathname === '/admin-home/add-Parnter/branch-details/:id' ? 'border-[#699496] ' : ''}`}
                >
                   
                        <p className='font-bold text-xs text-gray-500 font-poppins'>Branch Details</p>
                   
                </div>
                <div
                    id="div3"
                    className={`w-2/12 p-3 flex items-center border-b-2 cursor-pointer ${isBranchDetailsPage2 || location.pathname === '/admin-home/add-Parnter/Discount-Entry/:id' ? 'border-[#699496] ' : ''}`}
                >
                    
                        <p className='font-bold text-xs text-gray-500 font-poppins'>Discount Entry</p>
                   
                </div>
                <div
                    id="div4"
                    className={`w-3/12 p-3 flex items-center border-b-2 cursor-pointer ${isBranchDetailsPage3 || location.pathname === '/admin-home/add-Parnter/Declaration-Confirmation/:id' ? 'border-[#699496] ' : ''}`}
                >
                    <p className='font-bold text-xs text-gray-500  font-poppins'>Declaration Confirmation</p>
                </div>
                <div
                    id="div5"
                    className={`w-3/12 p-3 flex items-center border-b-2 cursor-pointer ${isBranchDetailsPage4 || location.pathname === '/admin-home/add-Parnter/Vendor-Submission/:id' ? 'border-[#699496] ' : ''}`}
                >
                    
                        <p className='font-bold text-xs text-gray-500  font-poppins'>Vendor Submission</p>
                   
                </div>
            </div>
            <hr className="border-0 border-t border-gray-300 h-0.5 "></hr>
            <Outlet />
        </div>
    )
}

export default PartnersRegistration
