import React from 'react'
import AdminHeader from './AdminHeader'
import { Outlet } from 'react-router-dom'

const AdminHome = () => {
    return (
        <div>
            <AdminHeader />
            <div className=' m-6 p-2'>
                <h1 className='text-black font-bold text-2xl'>Welcome,</h1>
                <h1 className='text-black font-bold text-3xl'>Spenmax Admin</h1>
            </div>
            <Outlet /> 
        </div>
    )
}

export default AdminHome
