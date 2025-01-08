import React, { useState } from 'react'
import './Admin.css'
import EditCategoryModal from './EditCategoryModal'
import toast, { Toaster } from 'react-hot-toast'
import { getErrorMessage } from '../../utils/Validation'
import { get_api } from '../../utils/api'
import { useSelector } from 'react-redux'
const AdminCatogryList = ({ Categories, deleteCategory, render }) => {


    const [openModal, setopenModal] = useState(false)
    const [categoryInfo, setCategoryInfo] = useState({ name: '', id: '' });
    const [LoginError, setLoginError] = useState([]);

    const user = useSelector(state => state.adminAuth.adminUser)

    const handleOpenModal = (name, id) => {
        setCategoryInfo({ name, id });
        setopenModal(true);
    };


    const handleCloseModal = () => {
        setopenModal(false);
    };

    const editCategory = async (categoryInfo) => {
        try {
            console.log(categoryInfo);
            setopenModal(false);
            const response = await get_api(user?.token).put(`/shop/categories/${categoryInfo.id}/update/`, { name: categoryInfo.name })
            if (response.status === 200) {
                toast.success('Category Edited successfully.', {
                    position: "bottom-center"
                })
                render();
            }
        } catch (error) {
            console.log('deleteCategory', error);
            const errorMessages = getErrorMessage(error)
            const generalErrors = errorMessages.filter((error) => error.field === 'general' || error.field === 'non_field_errors' || error.field === 'name');
            if (generalErrors.length > 0) {
                setLoginError(generalErrors.map(error => error.message));
                LoginError.map((error, index) => (
                    toast.error(`${error}`)
                ))
            } else if (error.message) {
                toast.error(`${error.message || 'Somthing went wrong'}`)
            }
        }
    }


    return (
        <div className='w-full bg-white border border-gray-300 rounded-md p-1 px-4 my-3'>
            <div className='flex items-center justify-between py-2'>
                <div>
                    <p className='text-sm  font-bold '>Category</p>
                </div>
                <div className='flex w-6/12 justify-end'>
                    <p className='text-sm font-bold   pr-[50px]'>Status</p>
                    <p className='text-sm font-bold   pr-[50px]'>Action</p>
                </div>
            </div>
            <hr className='bg-gray-600 m-1' />
            <div className='overflow-x-auto overflow-y-scroll h-[400px] customscrollbar'>

                {Categories.length == 0 && <p className='p-2 bg-yellow-500 text-center'>no category added till now ...</p>}

                {Categories.map((Category) => (
                    <div className='flex items-center  px-2 py-3  border-gray-300  border-b' key={Category?.id}>
                        <p className='text-sm w-6/12  '>{Category?.name}</p>
                        <div className='flex justify-end w-6/12 gap-7'>
                            <div>
                                {Category.is_active ? (<p className='text-sm bg-green-500 px-3 rounded-md py-1 text-white'>Active</p>) : (<p className='text-sm bg-red-500 px-2 rounded-md py-1 text-white'>inActive</p>)}
                            </div>

                            <div className='flex justify-between  border border-gray-300   rounded-md bg-gray-100'>
                                {Category.is_active ?
                                    (<div className=' border-gray-300 p-1 px-4 border-r cursor-pointer' onClick={() => handleOpenModal(Category?.name, Category.id)}>
                                        <img src="/edit.png" alt="" className='w-5 ' />
                                    </div>)
                                    :
                                    (<div className=' border-gray-300 p-1 px-4 border-r cursor-pointer' onClick={() => {
                                        toast(
                                            "You can't edit a temporarily deleted category.",
                                            {
                                                duration: 6000,
                                            }
                                        );
                                    }}
                                    >
                                        <img src="/edit.png" alt="" className='w-5 ' />
                                    </div>)
                                }
                                {Category.is_active ? (
                                    <div className='p-1 px-4 cursor-pointer' onClick={() => { deleteCategory(Category.id) }}>
                                        <img src="/delete (3).png" alt="" className='w-5 ' />
                                    </div>
                                ) : (
                                    <div className='p-1 px-4 cursor-pointer' onClick={() => {
                                        toast("You can't delete a temporarily deleted category.", {
                                            duration: 6000,
                                        });
                                    }}>
                                        <img src="/delete (3).png" alt="" className='w-5 ' />
                                    </div>
                                )}

                            </div>
                        </div>

                    </div>
                ))}

            </div>
            {openModal && categoryInfo && <EditCategoryModal editCategory={editCategory} CategoryInfo={categoryInfo} onCancel={handleCloseModal} setCategoryInfo={setCategoryInfo} />}
            <Toaster />
        </div >
    )
}

export default AdminCatogryList
