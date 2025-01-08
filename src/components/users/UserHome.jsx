import React from 'react'
import UserHeadder from './UserHeadder'
import UserProfile from './UserProfile'
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import AdCarousel from '../ResuableComponents/AdCarousel';

const UserHome = () => {

    const user = useSelector(state => state.auth.user);
    console.log(user)
    
    return (
        <div>
            <UserHeadder />
            <div className=' m-6 p-2 md:flex justify-between items-center md:mt-20  '>
                <div>
                    <h1 className='text-black font-bold text-2xl'>Welcome,</h1>
                    <h1 className='text-black font-bold text-3xl'>{user?.name}</h1>
                </div>
            </div>
            <Outlet />
            {/* <div className='m-6 px-10 py-16 rounded-md bg-white '>
                <AdCarousel />
            </div> */}
        </div>
    )
}

export default UserHome
