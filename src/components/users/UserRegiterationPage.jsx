import React from 'react'
import CreateUser from './CreateUser'
import AnimatedText from '../ResuableComponents/AnimatedText'
import backgroundImage from '../../assets/images/kriyado_profile_bg[1].png';

const UserRegiterationPage = () => { 
    return (
        <div 
            className="bg-cover bg-center w-full h-screen overflow-y-scroll custom-nonescroll md:flex justify-center items-center  px-5 py-10 md:p-0"
        >
           
            <div className='w-full mt-40 md:w-8/12 md:px-8 md:py-8 mb-[50px] lg:w-6/12 flex justify-center items-center'>
                <CreateUser />
            </div>
        </div>
    )
}

export default UserRegiterationPage
