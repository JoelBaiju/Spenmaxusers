import React from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

const VentorResgistration = () => {


    const location = useLocation()
    const Navigate = useNavigate()

    const basePath = '/vendors/add-Branch';
    const basePath2 = '/vendors/add-Branch/Discount-Entry/';
    const basePath3 = '/vendors/add-Branch/Vendor-Declaration/';
    const basePath4 = '/vendors/add-Branch/Vendor-EmailSubmission/';
    const isBranchDetailsPage = location.pathname.startsWith(basePath);
    const isBranchDetailsPage2 = location.pathname.startsWith(basePath2);
    const isBranchDetailsPage3 = location.pathname.startsWith(basePath3);
    const isBranchDetailsPage4 = location.pathname.startsWith(basePath4);
    return (
        <div className='w-full rounded-md p-1 px-4 my-3 '>
            <div className='flex md:justify-around'>
                <div
                    id="div2"
                    className={`md:w-3/12 p-3  flex items-center border-b-2 cursor-pointer ${isBranchDetailsPage && !isBranchDetailsPage2 && !isBranchDetailsPage2 && !isBranchDetailsPage3 && !isBranchDetailsPage4 ? 'border-[#80509F] ' : ''}`}
                >
                    <p className='font-bold text-xs text-gray-500 font-poppins' >Branch Details</p>
                </div>
                <div
                    id="div2"
                    className={`md:w-3/12 p-3 flex items-center border-b-2 cursor-pointer ${isBranchDetailsPage2 ? 'border-[#80509F] ' : ''}`}
                >
                    <p className='font-bold text-xs text-gray-500 font-poppins' >Discount Entry</p>
                </div>
            </div>
            <hr className="border-0 border-t border-gray-300 h-0.5 "></hr>
            <Outlet />
        </div>
    )
}

export default VentorResgistration
