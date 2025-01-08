import React, { useState } from 'react'
import './Admin.css'
import PackageEditModal from './PackageViewModal';
import PackageViewModal from './PackageViewModal';
import { getErrorMessage } from '../../utils/Validation';
import { get_api } from '../../utils/api';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import CustomModal from './CustomModal';
import DeletePackageModal from './DeletePackageModal';
const AdminPackageList = ({ packages, reRender }) => {

    const [openModal, setOpenmodal] = useState(false)
    const [openModal2, setOpenmodal2] = useState(false)
    const [modalPackageData, setmodalPackageData] = useState({});
    const [Data, setData] = useState('');

    const user = useSelector(state => state.adminAuth.adminUser)

    const closemodal = () => {
        setOpenmodal(false)
        reRender()
    }
    const openmodal = (data) => {
        setmodalPackageData(data)
        setOpenmodal(true)
        reRender()
    }
    const deletePackage = async (id) => {
        try {
            const response = await get_api(user?.token).delete(`/shop/packages/${id}/delete/`);
            console.log('response', response);
            if (response.status === 204) {
                toast.success('Package deleted successfuly')
                reRender()
            }
        } catch (error) {
            console.error('Fetching deletePackage failed:', error);
            const errorMessages = getErrorMessage(error)
            const generalErrors = errorMessages.filter((error) => error.field === 'general' || error.field === 'non_field_errors' || error.field === 'name');
            if (generalErrors.length >= 0) {
                const newErrors = generalErrors.map(error => error.message);
                console.log('', newErrors);
                newErrors.forEach(error => toast.error(error));
                return newErrors;
            }
            else if (error.message) {
                toast.error(`${error.message || 'Somthing went wrong'}`)
            }
        }
    }
    const onclose2 = () => {
        setOpenmodal2(false)
    }
    const OpenModal2 = (data) => {
        setData(data)
        setOpenmodal2(true)
    }
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openDeleteModal = () => setIsModalOpen(true);
    const closeDeleteModal = () => setIsModalOpen(false);

    return (
        <div className='w-full bg-white border border-gray-300 rounded-md p-1 px-4 my-3'>

            <div className='flex items-center justify-between p-2'>
                <p className='text-sm  w-3/12 font-bold '>Package Name</p>
                <p className='text-sm  w-3/12 font-bold '>Created at</p>
                <p className='text-sm  w-3/12 font-bold '>Status</p>
                <p className='text-sm  w-3/12 font-bold '>Discription</p>
                <p className='text-sm font-bold   pr-[50px]'>Action</p>
            </div>
            <hr className='bg-gray-600 m-1' />
            <div className='overflow-x-auto overflow-y-scroll h-[400px] customscrollbar'>

                {packages.map((pack, index) => (
                    <div className='flex items-center px-2 py-3  border-gray-300  border-b' key={pack.id}>
                        <p className='text-sm w-3/12 cursor-pointer' onClick={() => { openmodal(pack) }}>{pack.name}</p>
                        <p className='text-sm w-3/12  '>{pack.created_date}</p>
                        <div className='flex w-3/12'>
                            {pack.is_active ? (<p className='text-sm bg-green-500 px-3 rounded-md py-1 text-white'>Active</p>) : (<p className='text-sm bg-red-500 px-2 rounded-md py-1 text-white'>inActive</p>)}
                        </div>
                        <p className='text-sm w-3/12'>
                            {pack.discription.length > 50 ? pack.discription.slice(0, 20) + '...' : pack.discription}
                        </p>
                        <div className='flex justify-between  border border-gray-300   rounded-md bg-gray-100'>

                            {pack.is_active ?
                                (<div className=' border-gray-300 p-1 px-4 border-r cursor-pointer' onClick={() => { OpenModal2(pack) }} >
                                    <img src="/edit.png" alt="" className='w-5 ' />
                                </div>)
                                :
                                (<div className=' border-gray-300 p-1 px-4 border-r cursor-pointer' onClick={() => { toast.error('This action is temporarily disabled. Please try again later.') }} >
                                    <img src="/edit.png" alt="" className='w-5 ' />
                                </div>)
                            }
                            {pack.is_active ?
                                (<div className='p-1 px-4 cursor-pointer' >
                                    <button onClick={openDeleteModal}><img src="/delete (3).png" alt="" className='w-5 ' /></button>
                                    {isModalOpen && (

                                    <DeletePackageModal id={pack.id} closeDeleteModal={closeDeleteModal} deletePackage={deletePackage}/>
                                    )}
                                </div>)
                                :
                                (<div className='p-1 px-4 cursor-pointer' onClick={() => { toast.error('already deleted') }}>
                                    <img src="/recycle-bin.png" alt="" className='w-5 ' />
                                </div>)
                            }

                        </div>

                    </div>
                ))}

                
            </div>
            <Toaster />
            {openModal && Object.keys(modalPackageData).length > 0 && (
                <PackageViewModal packageData={modalPackageData} onClose={closemodal} reRender={reRender} />
            )}
            {!Data ? null : <CustomModal isOpen={openModal2} onClose={onclose2} data={Data} reRender={reRender} />}
        </div>
    )
}

export default AdminPackageList
