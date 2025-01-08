import React, { useEffect, useState } from 'react';
import { getErrorMessage } from '../../utils/Validation';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { get_api } from '../../utils/api';

const CustomModal = ({ isOpen, onClose, data, reRender }) => {
    const [isEditMode, setisEditMode] = useState(false)
    const [formData, setFormData] = useState({});
    const [isUpdate , setIsUpdate] = useState(false)
    const [Categories, setCategories] = useState({
        categories: ''
    });
    const [formDataOptions, setFormDataOptions] = useState({
       
        actual_price: '',
        discount_price: '',
        duration_days: '',
        package_detail:data.id
        
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const isValidInteger = /^[0-9]*$/.test(value);
        if (!isValidInteger) {
            toast.error("Please enter a valid integer.");
            return;
        }
        setFormDataOptions({
            ...formDataOptions,
            [name]: value
        });
    };
    

    const [effect, seteffect] = useState(false);
    const user = useSelector(state => state.adminAuth.adminUser)

    useEffect(() => {
        setFormData(data)
        const updateCategories = () => {
            const formattedCategoryIds = data.categories.map(category => category.id);
            setFormData(prevState => ({
                ...prevState,
                categories: formattedCategoryIds,
            }));
        };
        updateCategories()
    }, [effect])

    const closing = () => {
        
        setIsUpdate(false)
        setFormDataOptions({
            actual_price: '',
            discount_price: '',
            duration_days: '',
            package_detail:data.id
        })
        setisEditMode(false)
        onClose()
    }

    const saving = () => {
        setisEditMode(false)
        UpdatePackage()
        console.log('Saved data:', formData);

    }

    const handleInputChange = (e) => {
        const { name, value, options } = e.target;
        if (name === 'categories') {
            const selectedCategories = Array.from(options)
                .filter(option => option.selected)
                .map(option => option.value);
            setFormData({ ...formData, [name]: selectedCategories });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const setEdit = async () => {
        await fetchCategories()
        setisEditMode(true)
        seteffect(prevEffect => !prevEffect);
    }

    const fetchCategories = async () => {
        try {
            const response = await get_api(user?.token).get(`/shop/categories/?is_active=true`);
            if (response.status === 200) {
                const formattedCategories = response.data.map(category => ({
                    id: category.id,
                    name: category.name
                }));
                // setFormData({ ...formData, categories: formattedCategories });
                setCategories({ ...Categories, categories: formattedCategories });
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

    const UpdatePackage = async () => {
        try {
            const response = await get_api(user?.token).put(`/shop/packages/${formData.id}/update/`, formData);
            if (response.status === 200) {
                toast.success('package updaated successfuly')
                reRender()
                onClose()
            }
        } catch (error) {
            console.error('Fetching handleAddType failed:', error);
            const errorMessages = getErrorMessage(error)
            const generalErrors = errorMessages.filter((error) => error.field === 'general' || error.field === 'non_field_errors' || error.field === 'name');
            if (generalErrors.length >= 0) {
                const newErrors = generalErrors.map(error => error.message);
                newErrors.forEach(error => toast.error(error));
                return newErrors;
            }
            else if (error.message) {
                toast.error(`${error.message || 'Somthing went wrong'}`)
            }
        }
    }

    const handleSubmit = async () =>{
        try {
            const requiredFields = ['actual_price', 'discount_price', 'duration_days'];
            const emptyFields = requiredFields.filter(field => !formDataOptions[field]);

            if (emptyFields.length > 0) {
                emptyFields.forEach(field => {
                    toast.error(`${field.charAt(0).toUpperCase() + field.slice(1)} field is required.`);
                });
                return;
            }

            Object.entries(formDataOptions).forEach(([key, value]) => {
                if (parseInt(value) <= 0) {
                    toast.error(`${key} must be greater than zero`);
                }
            });
            

            if (parseInt(formDataOptions.actual_price) < parseInt(formDataOptions.discount_price)){
                toast.error("discount price should be less than actual price")
                return
            }

            let response;


            if (isUpdate){
                response = await get_api(user?.token).put(`/shop/package_option/${formDataOptions.option_id}/update/`, formDataOptions);
            }
            else{
                response = await get_api(user?.token).post('/shop/package_option/create/', formDataOptions);
            }
            if (response.status === 201 || response.status === 200) {
                setFormDataOptions({
       
                    actual_price: '',
                    discount_price: '',
                    duration_days: '',
                    package_detail:data.id,
                });
                if(isUpdate){
                    data.type_p.forEach((obj, index) => {
                        if (obj.id === response.data.id) {
                            data.type_p[index] = response.data;
                        }
                    });
                    setIsUpdate(false)
                    toast.success("Package updated successfully.");
                    seteffect(!effect)

                }
                else{

                    data.type_p.push(response.data)
                    toast.success("Package created successfully.");

                }

            }
        } catch (error) {
            console.error('Fetching categories handleSubmit failed:', error);
            const errorMessages = getErrorMessage(error)
            const generalErrors = errorMessages.filter((error) => error.field === 'general' || error.field === 'non_field_errors' || error.field === 'name');
            if (generalErrors.length >= 0) {
                const newErrors = generalErrors.map(error => error.message);
                console.log('', newErrors);
                newErrors.forEach(error => toast.error(error));
                return newErrors;
            }
            else if (error.message) {
                console.log('here');
                toast.error(`${error.message || 'Somthing went wrong'}`)
            }
        }
    }



    const handle_update_option = (datas)=>{
        setFormDataOptions({
            actual_price: parseInt(datas.actual_price),
            discount_price: parseInt(datas.discount_price),
            duration_days: parseInt(datas.duration_days),
            package_detail:data.id,
            option_id :  datas.id

        })
        setIsUpdate(true)
    }

    const handle_cancel = ()=>{
        setIsUpdate(false)
        setFormDataOptions({
            actual_price: '',
            discount_price: '',
            duration_days: '',
            package_detail:data.id,
        })
    }

    const handle_delete = async(id)=>{
        try {

            const response = await get_api(user?.token).delete(`/shop/package_option/${id}/delete/`);
            if (response.status === 204) {
                data.type_p.forEach(obj => {
                    if (obj.id === id) {
                        obj.is_active = false;
                    }
                });
                console.log("successful" , data.type_p);
        seteffect(!effect)

                toast.success("Package deleted successfully.");    

            }
        } catch (error) {
            console.error( error);
            const errorMessages = getErrorMessage(error)
            const generalErrors = errorMessages.filter((error) => error.field === 'general' || error.field === 'non_field_errors' || error.field === 'name');
            if (generalErrors.length >= 0) {
                const newErrors = generalErrors.map(error => error.message);
                console.log('', newErrors);
                newErrors.forEach(error => toast.error(error));
                return newErrors;
            }
            else if (error.message) {
                console.log('here');
                toast.error(`${error.message || 'Somthing went wrong'}`)
            }
        }
    }

    return (
        <div className={`fixed z-10 inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
            <div className="flex items-center justify-center min-h-screen">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className="bg-white rounded-lg overflow-y-scroll shadow-xl transform transition-all sm:w-1/2 w-full p-2 max-h-[800px]">
                    <div className="bg-white px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">{isEditMode ? 'Edit Package' : 'Package'}</h3>
                        {/* {isEditMode && <p className="mt-1 text-sm text-gray-500">Enter your details:</p>} */}
                    </div>
                    <div className="bg-gray-50 px-4 py-4 sm:px-6">
                        <div >
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-semibold ">Name:</label>
                                {isEditMode ? (
                                    <input defaultValue={data.name} onChange={handleInputChange} type="text" id="name" name="name" autoComplete="name" className="border outline-[#80509F] text-sm border-gray-300 pl-5 pr-4 py-1 w-full rounded-sm bg-gray-100" />
                                ) : (
                                    <p className="text-sm  text-gray-700">{data.name}</p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-semibold ">Description:</label>
                                {isEditMode ? (
                                    <textarea defaultValue={data.discription} onChange={handleInputChange} id="description" name="discription" autoComplete="description" className="border outline-[#80509F] text-sm border-gray-300 pl-5 pr-4 py-1 w-full rounded-sm bg-gray-100"></textarea>
                                ) : (
                                    <p className="text-sm text-gray-700 ">{data.discription}</p>
                                )}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="type" className="block text-sm font-semibold ">Type:</label>
                            {isEditMode ? (
                                <select
                                    defaultValue={data.type}
                                    id="type"
                                    onChange={handleInputChange}
                                    name="type"
                                    autoComplete="type"
                                    className="border outline-[#80509F] text-sm border-gray-300 pl-5 pr-4 py-1 w-full rounded-sm bg-gray-100"
                                >
                                    <option value="BASIC">BASIC</option>
                                    <option value="COMBO">COMBO</option>
                                    <option value="ALL">ALL</option>
                                </select>

                            ) : (
                                <p className="text-sm  text-gray-700">{data.type}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="categories" className="block text-sm font-medium ">Categories:</label>
                            {isEditMode ? (
                                <select
                                    onChange={handleInputChange}
                                    id="categories"
                                    name="categories"
                                    autoComplete="categories"
                                    className="border outline-[#80509F] text-sm border-gray-300 pl-5 pr-4 py-1 w-full rounded-sm bg-gray-100"
                                    multiple
                                >
                                    {data.categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                            selected
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                    {Categories.categories.filter((category) => !data.categories.some((c) => c.id === category.id)).map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                            multiple
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <div>
                                    {data.categories.map((category, index) => (
                                        <p key={index} className="text-sm  text-gray-700">{category.name}</p>
                                    ))}
                                </div>
                            )}

                        </div>
                        <div className='flex justify-end'>
                            <button className='bg-[#80509F] px-5 py-1 text-white rounded-md' onClick={isEditMode ? () => setisEditMode(false) : () => setEdit()}>
                                {isEditMode ? `Back` : 'Edit'}
                            </button>
                        </div>
                    </div>
                    <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    {isEditMode ? 
                        <button onClick={saving} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#80509F] text-base font-medium text-white hover:bg-[#674081] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#80509F] sm:ml-3 sm:w-auto sm:text-sm">
                            Save
                        </button>
                         : <></>}
                        <button onClick={closing} type="button" className="mt-3 w-full inline-flex justify-center text-white rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-[#9F5080] text-base font-medium  hover: focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            Cancel
                        </button>
                    </div>
                    <div className='w-full flex  items-end bg-gray-200 my-5 rounded-md '>
                        <div className='m-3'>
                            <p className='text-sm text-gray-400 p-1'>Actual Price</p>
                            <input
                                value={formDataOptions.actual_price}
                                onChange={handleChange}
                                type="text"
                                className='border text-sm outline-[#80509F] border-gray-300 pl-5 pr-4 py-1 w-full rounded-sm bg-gray-100'
                                placeholder="Enter name"
                                name="actual_price"
                            />                        
                        </div>
                        <div className='m-3'>
                            <p className='text-sm text-gray-400 p-1'>Discount Price</p>
                            <input
                                value={formDataOptions.discount_price}
                                onChange={handleChange}
                                type="text"
                                className='border text-sm outline-[#80509F] border-gray-300 pl-5 pr-4 py-1 w-full rounded-sm bg-gray-100'
                                placeholder="Enter name"
                                name="discount_price"
                            />                        
                        </div>
                        <div className='m-3'>
                            <p className='text-sm text-gray-400 p-1'>Duration</p>
                            <input
                                value={formDataOptions.duration_days}
                                onChange={handleChange}
                                type="text"
                                className='border text-sm outline-[#80509F] border-gray-300 pl-5 pr-4 py-1 w-full rounded-sm bg-gray-100'
                                placeholder="Enter name"
                                name="duration_days"
                            />                        
                        </div>
                       
                    </div>
                    <div className='flex'>
                        <div className='m-3 w-1/2'>
                                {isUpdate ? 
                                
                            
                                <button onClick={handleSubmit} className='bg-[#80509F] w-full px-5 py-1 text-white rounded-md'>UPDATE</button>
                                :
                                <button onClick={handleSubmit} className='bg-[#80509F] w-full px-5 py-1 text-white rounded-md'>ADD</button>
                                
                            }
                        </div>

                        {isUpdate &&
                        <div className='m-3 w-1/2'>
                                
                            
                                <button onClick={handle_cancel} className='bg-[#80509F] w-full px-5 py-1 text-white rounded-md'>CANCEL</button>
                                
                        </div>
                        
                        }
                    </div>
                    <div className='w-full bg-white border border-gray-300 rounded-md p-1 px-4 my-3'>
                        <div className='flex items-center justify-between p-2 '>
                            <p className='text-sm  w-3/12 font-bold '>Duration</p>
                            <p className='text-sm  w-3/12 font-bold '>Actual Price</p>
                            <p className='text-sm  w-3/12 font-bold '>Discount Price</p>
                            <p className='text-sm  w-3/12 font-bold '>Status</p>
                            <p className='text-sm font-bold'>Action</p>
                        </div>
                        <hr className='bg-gray-600 m-1' />
                        <div className='overflow-x-auto overflow-y-scroll customscrollbar'>

                            {data.type_p.map((pack, index) => (
                                <div className='flex items-center px-2 py-3  border-gray-300  border-b' key={pack.id}>
                                    <p className='text-sm w-3/12 cursor-pointer'>{pack.duration_days}</p>
                                    <p className='text-sm w-3/12  '>{pack.actual_price}</p>
                                    <p className='text-sm w-3/12  '>{pack.discount_price}</p>
                                    <div className='flex w-3/12'>
                                        {pack.is_active ? (<p className='text-sm bg-green-500 px-3 rounded-md py-1 text-white'>Active</p>) : (<p className='text-sm bg-red-500 px-2 rounded-md py-1 text-white'>inActive</p>)}
                                    </div>
                                    <div className='flex justify-between  border border-gray-300   rounded-md bg-gray-100'>
                                        {pack.is_active ?
                                            (<div className=' border-gray-300 p-1 px-4 border-r cursor-pointer' onClick={() => { handle_update_option(pack) }} >
                                                <img src="/edit.png" alt="" className='w-5 ' />
                                            </div>)
                                            :
                                            (<div className=' border-gray-300 p-1 px-4 border-r cursor-pointer' onClick={() => { toast.error('This action is temporarily disabled. Please try again later.') }} >
                                                <img src="/edit.png" alt="" className='w-5 ' />
                                            </div>)
                                        }
                                        {pack.is_active ?
                                            (<div className='p-1 px-4 cursor-pointer' onClick={() => { handle_delete(pack.id)}}>
                                                <img src="/delete (3).png" alt="" className='w-5 ' />
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
                        {/* <Toaster />
                        {openModal && Object.keys(modalPackageData).length > 0 && (
                            <PackageViewModal packageData={modalPackageData} onClose={closemodal} reRender={reRender} />
                        )} */}
                        {/* {!Data ? null : <CustomModal isOpen={openModal2} onClose={onclose2} data={Data} reRender={reRender} />} */}
                    </div>
                </div>

            </div>
            <Toaster />
        </div>
    );
};

export default CustomModal;
