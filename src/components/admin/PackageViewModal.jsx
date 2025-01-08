import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { getErrorMessage } from '../../utils/Validation';
import { get_api } from '../../utils/api';

const PackageViewModal = ({ packageData, onClose, reRender }) => {
   
    const { categories, created_date, discription, id, is_active, name, type, type_p } = packageData;
    const [isEditMode, setIsEditMode] = useState(false);
    const [newType, setNewType] = useState({
        actual_price: '',
        discount_price: '',
        duration_days: '',
        package_detail: id,
        option_id: '',
    });
    const [packageWithTypes, setPackageWithTypes] = useState(packageData);
    const user = useSelector(state => state.adminAuth.adminUser)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (validateInput(value)) {
            setNewType({ ...newType, [name]: value });
        } else {
            toast.error('Please enter a valid integer.')
        }
    };

    const validateInput = (value) => {
        return /^\d*$/.test(value);
    };

    const handleAddType = async () => {

        try {
            const response = await get_api(user?.token).post('/shop/package_option/create/', newType);
            if (response.status === 201) {
                toast.success('Created package type')
                const updatedTypes = [...packageWithTypes.type_p, response.data];
                setPackageWithTypes({
                    ...packageWithTypes,
                    type_p: updatedTypes
                });
                reRender()
            }
            setNewType({
                actual_price: '',
                discount_price: '',
                duration_days: '',
                option_id: ''
            });
            setIsEditMode(false);
        } catch (error) {
            console.error('Fetching handleAddType failed:', error);
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
    };

    const handleEditType = (index) => {
        const clickedType = packageWithTypes.type_p[index];
        setNewType({
            actual_price: clickedType.actual_price,
            discount_price: clickedType.discount_price,
            duration_days: clickedType.duration_days,
            package_detail: id,
            option_id: clickedType.id
        });
        setIsEditMode(true);
    };

    const handleUpdateType = async () => {
        try {
            const response = await get_api(user?.token).put(`/shop/package_option/${newType.option_id}/update/`, newType);
            if (response.status === 200) {
                toast.success('updated package successfuly')
                const updatedTypes = [...packageWithTypes.type_p, newType];
                setPackageWithTypes({
                    ...packageWithTypes,
                    type_p: updatedTypes
                });
                reRender()
            }
            setNewType({
                actual_price: '',
                discount_price: '',
                duration_days: '',
                option_id: ''
            });
            setIsEditMode(false);
        } catch (error) {
            console.error('Fetching handleAddType failed:', error);
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

    const deleteType = async (id) => {
        try {
            const response = await get_api(user?.token).delete(`/shop/package_option/${id}/delete/`);
            console.log('response', response);
            if (response.status === 204) {
                toast.success('Package deleted successfuly')
                // const updatedTypes = [...packageWithTypes.type_p, newType];
                // setPackageWithTypes({
                //     ...packageWithTypes,
                //     type_p: updatedTypes
                // });
                reRender()
            }
        } catch (error) {
            console.error('Fetching handleAddType failed:', error);
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


     if (!packageData || Object.keys(packageData).length === 0) {
        return null; 
    }

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h2 className="text-2xl font-bold mb-4">View Package</h2>
                         <div className="bg-white shadow-md border mb-5 rounded-lg overflow-hidden">
                            <div className="px-6 py-4">
                                <h3 className="text-lg font-semibold mb-2">Package Details</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">ID:</p>
                                        <p className="text-sm font-medium">{id}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Name:</p>
                                        <p className="text-sm font-medium">{name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Description:</p>
                                        <p className="text-sm font-medium">{discription}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Type:</p>
                                        <p className="text-sm font-medium">{type}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Created Date:</p>
                                        <p className="text-sm font-medium">{created_date}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Is Active:</p>
                                        <p className="text-sm font-medium">{is_active ? 'Yes' : 'No'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Add Package Type:</h3>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="actual_price"
                                    value={newType.actual_price}
                                    onChange={handleInputChange}
                                    placeholder="Actual Price"
                                    className="block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-2"
                                />
                                <input
                                    type="text"
                                    name="discount_price"
                                    value={newType.discount_price}
                                    onChange={handleInputChange}
                                    placeholder="Discount Price"
                                    className="block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-2"
                                />
                                <input
                                    type="text"
                                    name="duration_days"
                                    value={newType.duration_days}
                                    onChange={handleInputChange}
                                    placeholder="Duration Days"
                                    className="block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-4"
                                />
                                <div className='flex justify-center'>
                                    <button onClick={isEditMode ? handleUpdateType : handleAddType} className="bg-[#9F5080] text-white hover:bg-[#834269] font-bold py-2 px-8 rounded">{isEditMode ? 'Update' : 'Add'}</button>
                                </div>
                            </div>
                        </div>
                        <div >
                            <div className="mb-4">
                                <h3 className="text-xl font-bold mb-2">Package Types:</h3>
                                <div className="flex justify-between items-center bg-gray-100 text-gray-600 text-sm font-semibold p-2 rounded-t-lg">
                                    <div className='w-3/12 flex justify-center'>Actual Price</div>
                                    <div className='w-3/12 flex justify-center'>Discount Price</div>
                                    <div className='w-3/12 flex justify-center'>Duration Days</div>
                                    <div className='w-3/12 flex justify-center'>Actions</div>
                                </div>
                                <div>
                                    {packageWithTypes && packageWithTypes.type_p.map((typeData, index) => (
                                        <div key={index} className='flex justify-between items-center border border-gray-300 border-b p-2'>
                                            <div className='w-3/12 flex justify-center'>{typeData.actual_price}</div>
                                            <div className='w-3/12 flex justify-center'>{typeData.discount_price}</div>
                                            <div className='w-3/12 flex justify-center'>{typeData.duration_days}</div>
                                            <div className="flex space-x-2 bg-gray-100 rounded-md">
                                                <div className=' border-gray-300 p-1 px-4 border-r cursor-pointer ' onClick={() => { handleEditType(index) }}>
                                                    <img src="/edit.png" alt="" className='w-3 ' />
                                                </div>
                                                {typeData.is_active ?
                                                    (<div className='p-1 px-4 cursor-pointer' onClick={() => { deleteType(typeData.id) }}>
                                                        <img src="/delete (3).png" alt="pic-del" className='w-3 ' />
                                                    </div>)
                                                    :
                                                    (<div className='p-1 px-4 cursor-pointer' onClick={() => { toast.error('already deleted') }}>
                                                        <img src="/recycle-bin.png" alt="pic-del" className='w-3 ' />
                                                    </div>)
                                                }
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                        <div className='flex justify-center'>
                            <button onClick={onClose} className="bg-[#80509F] text-white hover:bg-[#6c4387] font-bold py-2 px-8 rounded">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default PackageViewModal;
