import React, { useState } from 'react'
import UserProfileDetails from './UserProfileDetails'
import { useEffect } from 'react';
import SkeltonLoading from '../ResuableComponents/SkeltonLoading';
import api, { get_api } from '../../utils/api';
import { useSelector } from 'react-redux';
import EditProfileModal from './EditProfileModal ';
import { checkDate, getErrorMessage } from '../../utils/Validation';
import ExpiryModal from './ExpiryModal';
import toast, { Toaster } from 'react-hot-toast';
import ProfileImageModal from './ProfileImageModal';
import UsersCard from './UsersCard';
import Cookies from 'js-cookie';
import { data } from 'autoprefixer';


const UserProfile = () => {

    const [loading, setLoading] = useState(true);
    const [Data, setData] = useState({
        name: '',
        number: '',
        district: '',
        state: '',
        address: '',
        dob: '',
        email_id: '',
        pincode: '',
        country: ''
    });
    const [formateddata, setFormatedDate] = useState('')
    const [PurchaseDate, setPurchaseDate] = useState('')
    const [isOpen, setisOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageUpload, setImageUpload] = useState(true)
    const [effect, seteffect] = useState(true);
    const [packageExpired, setpackageExpired] = useState(false);

    const user = useSelector(state => state.auth.user);
    const isDataEmpty = Object.values(Data).every(value => value === '');

    useEffect(() => {
        const loginUser = async () => {
            try {
                console.log(user.token)
                const response = await get_api(user?.token).get('/shop/customer/detail_update/user/');
                if (response.status === 200) {
                    console.log(Data)
                    setData(response.data)
                }
            } catch (error) {
                console.error('Login failed:', error);
                if (error.response.status === 403) {
                    setpackageExpired(true)
                    return
                }
                const errorMessages = getErrorMessage(error)
                const generalErrors = errorMessages.filter((error) => error.field === 'general' || error.field === error.field || error.field === 'name');
                if (generalErrors.length >= 0) {
                    const newErrors = generalErrors.map(error => error.message);
                    newErrors.forEach(error => toast.error(error));
                    return newErrors;
                }
                else if (error.message) {
                    toast.error(`${error.message || 'Somthing went wrong'}`)
                }
            }
        };

        const packageData = Data?.package_c?.find(pkg => pkg.is_active === true);
        if (packageData) {
            const { purchase_date, expiry_date } = packageData;
            const dateObject3 = new Date(expiry_date);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            setFormatedDate(dateObject3.toLocaleDateString('en-US', options))
        }

        loginUser();
    }, [isDataEmpty, effect])

    const onClose = () => {
        setisOpen(false)

    }


const updateCookie = () => {
    console.log('gosihs')
    console.log( Cookies.get('uploadWarningShowed'))
    Cookies.set('uploadWarningShowed','true', { expires: 7 });

    const msIn7Days = 7 * 24 * 60 * 60 * 1000;
    setTimeout(() => {
        Cookies.set('uploadWarningShowed', 'true', { expires: 7 });
        console.log('Cookie value refreshed!');
    }, msIn7Days - 60000); 
};

    const onOpen = () => {
        setisOpen(true)
    }


    const didUpload = () => {
        seteffect(!effect);
    };



    const handleImageUploadModal = () => {
        setImageUpload(!imageUpload)
        updateCookie()
    }

    console.log(Data.id)


    return isDataEmpty ?
        <div>
            <SkeltonLoading />
            {packageExpired && <ExpiryModal />}
        </div>
        : (
            <div>
                <div className='md:absolute md:top-0 md:right-14 md:mt-28 mx-6'>
                    <div className='relative'>
                        {/* <img src="/card.svg" className='md:w-4/5' alt="" /> */}
                        {/* <p className='absolute top-3/4 left-9 mb-1 text-xs text-white '>{Data?.name}</p>
                        <p className='absolute top-3/4 left-44 mb-1 text-xs text-white '>{formateddata}</p> */}
                        <UsersCard data={Data} formateddata={formateddata} />
                    </div>
                </div>
                <div className='bg-[#C0DCDD] rounded-lg m-6 p-2 shadow-lg'>

                    <div className='m-2 p-2'>
                        <div className='flex bg-[#99FDD2] items-center pl-3 w-full md:w-3/12 rounded-full '>
                            <div className=''>
                                <h1 className='text-xs'>Active</h1>
                            </div>
                            <div className='bg-black rounded-full h-full p-1 ml-3 w-full  '>
                                <h1 className='text-white/75 tracking-wide text-xs p-1'>{Data.package_c.length!=0? Data.package_c[0].package_name:"Package Expired"}</h1>
                            </div>
                        </div>
                    </div>

                    <UserProfileDetails data={Data} onOpen={onOpen} />
                </div>
                
                <EditProfileModal isOpen={isOpen} onClose={onClose} data={Data} setData={setData} />

                <Toaster />
                {Data.image === null && Cookies.get('uploadWarningShowed')==null && imageUpload && <ProfileImageModal didUpload={didUpload} close={handleImageUploadModal} id={Data.id} />}
                {packageExpired && <ExpiryModal />}
            </div>
        )
}

export default UserProfile
