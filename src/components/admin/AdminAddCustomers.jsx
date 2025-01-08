import React, { useState } from 'react'
import Dropdown from './Dropdown'
import AdminPackageList from './AdminPackageList'
import CreateCoustmer from './CreateCoustmer'
import CustomersList from './CustomersList'

const AdminAddCustomers = () => {

    const [activeStatus, setActiveStatus] = useState('');
    const [verifiedStatus, setVerifiedStatus] = useState('');
    const [search, setsearch] = useState('')
    const [searchStatus, setsearchStatus] = useState(false)
    const [apiName, setapiName] = useState('')

    const handleActiveStatusChange = (e) => {
        setActiveStatus(e.target.value);
        setVerifiedStatus('')
        if (e.target.value === 'active') {
            setapiName('is_active')
            setsearch('True')
            setsearchStatus(true)
        } else if (e.target.value === 'inactive') {
            setapiName('is_active')
            setsearch('False')
            setsearchStatus(true)
        }
    };

    const handleVerifiedStatusChange = (e) => {
        setVerifiedStatus(e.target.value);
        setActiveStatus('')
        if (e.target.value === 'verified') {
            setapiName('verified')
            setsearch('true')
            setsearchStatus(true)
        } else if (e.target.value === 'not-verified') {
            setapiName('verified')
            setsearch('false')
            setsearchStatus(true)
        }
    };

    const resetFileters = () => {
        setActiveStatus('')
        setVerifiedStatus('')
        setsearchStatus(prevStatus => !prevStatus);
        setsearch('')
        setapiName('')
    }

    const refresh = () => {
        setsearchStatus(prevStatus => !prevStatus);
        setsearch('')
        setapiName('')
    }

    const handleSearchInputChange = (event) => {
        setsearch(event.target.value);
    };

    const SearchStatus = () => {
        setapiName('search')
        setActiveStatus('')
        setVerifiedStatus('')
        setsearchStatus(true);
    }

    return (
        <div className=' m-6 p-2 bg-[#C0DCDD] rounded-lg shadow-lg '>
            <div className='flex items-center justify-between'>
                <h1 className='font-bold p-3 m-2'>Add Customer</h1>
            </div>

            <div className='  flex justify-between'>
                <div className='m-2 p-3 border bg-white  border-gray-300 w-3/12  rounded-md flex flex-col '>
                    <div className=' pb-2'>
                        <h1 className='font-bold'>Customers</h1>

                        <div className='flex gap-5' >
                            <div className="relative w-8/12 ">
                                <input
                                    type="text"
                                    className="border rounded-full text-xs pl-10 pr-4 py-2 w-full outline-[#649597]"
                                    placeholder="Search Customer"
                                    value={search === 'true' || search === 'false' ? '' : search}
                                    onChange={handleSearchInputChange}
                                />
                                <svg
                                    className="absolute left-3 top-2 h-5 w-5 text-gray-500 "
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 11a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17.5 17.5l2.5 2.5"
                                    />
                                </svg>
                            </div>

                            <button className='bg-[#649597] w-4/12 text-white text-sm rounded-full p-1' onClick={SearchStatus}>Search</button>
                        </div>
                        <div className="mt-3  flex ">
                            <select className="mr-1 border rounded-lg outline-[#649597] w-full px-4 py-2 text-xs" value={activeStatus} onChange={handleActiveStatusChange}>
                                <option value="">Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>

                            <select className="mr-1 border rounded-lg outline-[#649597] px-4 py-2 w-full text-xs" value={verifiedStatus} onChange={handleVerifiedStatusChange}>
                                <option value="">Verify</option>
                                <option value="verified">Verified</option>
                                <option value="not-verified">Not Verified</option>
                            </select>

                            <button className=" text-xs text-white  bg-red-500 rounded-lg w-full " onClick={resetFileters}>Reset</button>
                        </div>
                    </div>
                    <CustomersList search={search} searchStatus={searchStatus} refresh={refresh} apiName={apiName} />
                </div>

                <div className='w-9/12 border m-2 p-2  border-gray-300   rounded-md bg-white'>

                    <div className=' '>
                        <div className='m-2 p-2'>
                            <h1 className='font-bold'>Add New</h1>
                        </div>

                    </div>
                    <div className=' '>
                        <CreateCoustmer />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AdminAddCustomers
