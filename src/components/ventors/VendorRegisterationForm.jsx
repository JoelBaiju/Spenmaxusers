import React, { useEffect, useRef, useState } from 'react'
import { useFormData, getCities, getStates, keralaDistricts } from '../../utils/FormData';
import { validateEmail, validatePincode, ValiatePhoneNumber, getErrorMessage } from '../../utils/Validation';
import toast, { Toaster } from 'react-hot-toast';
import { get_api, get_api_form, get_api_form_register } from '../../utils/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../admin/Dropdown';


const VendorRegisterationForm = () => {

    const [checkedOption, setCheckedOption] = useState(null);
    const [cities] = useState(getCities());
    const [states] = useState(getStates());
    const [districts] = useState(keralaDistricts);
    const [formData, setFormData] = useFormData()
    const [emailError, setEmailError] = useState('');
    const [pincodeError, setPincodeError] = useState('');
    const [NumberError, setNumberError] = useState('');
    const [imageError, setimageError] = useState('');
    const [checkedOption2, setCheckedOption2] = useState('Both');
    const [Categories, setCategories] = useState([]);

    const inputFile = useRef(null);
    const addImage = useRef(null);
    const user = useSelector(state => state.adminAuth.adminUser)

    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories()
    }, [])


    const handleClick = () => {
        inputFile.current.click();
    };

    const handleClickAddimg = () => {
        addImage.current.click();
    };

    const handleChangeFirstimage = (event) => {
        setFormData({
            ...formData,
            logo: event.target.files[0],
        });
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length > 2) {
            setimageError('You can only select up to  2 images.');
            return;
        }
        const selectedImages = Array.from(event.target.files).map((file) => file);
        setFormData({
            ...formData,
            image: selectedImages,
        });
        setimageError('')
    };

    const handleSubmitForForm = async (event) => {
        event.preventDefault();
        if (emailError || pincodeError || NumberError || imageError) {
            return;
        }
        try {
            const response = await get_api_form_register().post('/shop/vendor/company/create/', formData);
            if (response.status === 201) {
                setFormData({
                    organization: '',
                    owner: '',
                    PinCode: '',
                    Locality: '',
                    Town: '',
                    District: '',
                    State: '',
                    country: '',
                    KeyPersonName: '',
                    KeyPersonContact: '',
                    Landphone: '',
                    RegisteredAddress: '',
                    category: '',
                    email_id: '',
                    website: '',
                    google_map_link: '',
                    facebook_link: '',
                    instagram_link: '',
                    youtube_link: '',
                    NormalWorkingHoursFrom: '',
                    NormalWorkingHoursTo: '',
                    image: [],
                    logo: [],
                    head_office_address: '',
                    mobile_number: '',
                    HomeDelivery: '',
                    sales_type: '',
                })
                toast.success('Company created successfuly')
                navigate(`/Vendor-register/Discount-Entry/${response.data.id}`);
            }
        } catch (error) {
            console.log(error);
            const errorMessages = getErrorMessage(error)
            const generalErrors = errorMessages.filter((error) => error.field === 'general' || error.field === error.field || error.field === 'name');
            if (generalErrors.length >= 0) {
                const newErrors = generalErrors.map(error => error.message);
                newErrors.forEach(error => toast.error(error));
            }
            else if (error.message) {
                toast.error(`${error.message || 'Somthing went wrong'}`)
            }
        }
    }

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        setCheckedOption(value);
        setFormData(prevState => ({
            ...prevState,
            HomeDelivery: value,
        }));
    };

    const updateDistrict = (newDistrict) => {
        setFormData(prevState => ({
            ...prevState,
            District: newDistrict,
        }));
    };

    const updateState = (State) => {
        setFormData(prevState => ({
            ...prevState,
            State: State,
        }));
    };

    const updateCountry = (Country) => {
        setFormData(prevState => ({
            ...prevState,
            country: Country,
        }));
    };

    const updateCategory = (Category) => {
        const category = Categories.find(category => category.name === Category);
        setFormData(prevState => ({
            ...prevState,
            category: category.id,
        }));
    };

    const handleRemoveImage = (index) => {
        setFormData((prevState) => ({
            ...prevState,
            image: prevState.image.filter((_, i) => i !== index),
        }));
    };

    const handleCheckboxChange2 = (event) => {
        const value = event.target.value;
        setCheckedOption2(value);
        setFormData(prevState => ({
            ...prevState,
            sales_type: value,
        }));
    };

    const fetchCategories = async () => {
        try {
            const response = await get_api_form_register().get('/shop/categories/');
            if (response.status === 200) {
                setCategories(response?.data)
            }
        } catch (error) {
            console.error('Fetching data failed:', error);
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

    return (
        <div className='mt-5 mb-4'>
            <form onSubmit={handleSubmitForForm}>
                <h1 className='font-bold '>Registration</h1>
                <div className='flex justify-center items-center p-5'>
                    <input
                        type="file"
                        className='hidden'
                        ref={inputFile}
                        onChange={handleChangeFirstimage}
                        accept="image/*"
                    />
                    <div>
                        <div className="w-20 h-20 bg-black rounded-full flex justify-center items-center" onClick={handleClick}>
                            <img src="/camera.png" alt="" className='w-6' />
                        </div>
                        <p className='text-xs font-bold pt-3 text-[#649597] font-poppins'>Upload Logo</p>
                    </div>
                </div>
                <div className='md:flex md:flex-col gap-6'>
                    <div className='w-full gap-5 md:flex'>
                        <div className='w-full py-2'>
                            <p className='text-xs text-gray-400'>Name of Organization</p>
                            <div className='py-2'>
                                <input type="text" name='organization' value={formData.organization} required onChange={handleInputChange} className='border outline-0 text-sm  border-gray-200 p-3 w-full rounded-sm bg-gray-100' placeholder="Enter name" />
                            </div>
                        </div>
                        <div className='w-full py-2'>
                            <p className='text-xs text-gray-400'>Name of Owner</p>
                            <div className='py-2'>
                                <input type="text" name='owner' value={formData.owner} required onChange={handleInputChange} className='border text-sm text-gray-400 outline-0  border-gray-200 p-3 w-full rounded-sm bg-gray-100' placeholder="Enter name" />
                            </div>
                        </div>

                        <div className='w-full py-2'>
                            <p className='text-xs text-gray-400'>Key person name / Manager name</p>
                            <div className='py-2'>
                                <input type="text" value={formData.KeyPersonName} required name='KeyPersonName' onChange={handleInputChange} className='border text-sm outline-0 text-gray-400  border-gray-200 p-3 w-full rounded-sm bg-gray-100' placeholder="Enter name" />
                            </div>
                        </div>
                    </div>

                    <div className='md:flex md:flex-row w-full gap-5'>
                        <div className='w-full py-2'>
                            <p className='text-xs text-gray-400'>Key Person Contact (Manager) Number</p>
                            <div className='py-2'>
                                <input type="text" name='KeyPersonContact' value={formData.KeyPersonContact} required onChange={handleInputChange} className='border text-sm text-gray-400 outline-0  border-gray-200 p-3 w-full rounded-sm bg-gray-100' placeholder="Enter number" />
                            </div>
                        </div>

                        <div className='w-full py-2'>
                            <p className='text-xs text-gray-400'>Select country</p>
                            <div className='py-2'>
                                <Dropdown text="Choose Country" p='3' font="font-normal" textcolor={`${formData.country ? "text-dark" : "text-gray-400"}`} data={["India"]} onUpdate={updateCountry} />
                            </div>
                        </div>
                        <div className='w-full py-2'>
                            <p className='text-xs text-gray-400'>Select State</p>
                            <div className='py-2'>
                                <Dropdown text="Choose State" p='3' font="font-normal" textcolor={`${formData.State ? "text-dark" : "text-gray-400"}`} data={["Kerela"]} onUpdate={updateState} />
                            </div>
                        </div>




                    </div>

                    <div className='w-full gap-5 md:flex md:flex-row'>
                        <div className='w-full py-2'>
                            <p className='text-xs text-gray-400 '>Select District</p>
                            <div className='py-2'>
                                <Dropdown text="Choose District" p='3' font="font-normal" textcolor={`${formData.District ? "text-dark" : "text-gray-400"}`} data={districts} onUpdate={updateDistrict} />
                            </div>
                        </div>
                        <div className='w-full py-2'>
                            <p className='text-xs text-gray-400'>Town</p>
                            <div className='py-2'>
                                <input type="text" name='Town' value={formData.Town} required onChange={handleInputChange} className='border text-sm text-gray-400 outline-0  border-gray-200 p-3 w-full rounded-sm bg-gray-100' placeholder="Enter Town " />
                            </div>
                        </div>
                        <div className='w-full py-2'>
                            <p className='text-xs text-gray-400'>Locality</p>
                            <div className='py-2'>
                                <input type="text" name='Locality' value={formData.Locality} required onChange={handleInputChange} className='border text-sm text-gray-400 outline-0  border-gray-200 p-3 w-full rounded-sm bg-gray-100' placeholder="Enter locality" />
                            </div>
                        </div>

                    </div>
                    <div className='w-full gap-5 md:flex md:flex-row'>
                        <div className='w-full py-2'>
                            <p className='text-xs text-gray-400'>Pin Code</p>
                            <div className='py-2'>
                                <input type="text" required name='PinCode'
                                    onChange={handleInputChange}
                                    className='border text-sm text-gray-400 outline-0  border-gray-200 p-3 w-full rounded-sm bg-gray-100'
                                    placeholder="Enter Pin Code"
                                    value={formData.PinCode}
                                    onBlur={(e) => validatePincode(e.target.value, setPincodeError)} />
                                {pincodeError && (<p className='text-xs text-center text-red-500'>{pincodeError}</p>)}
                            </div>
                        </div>
                        <div className='w-full py-2'>
                            <p className='text-xs text-gray-400'>Mobile Number</p>
                            <div className='py-2'>
                                <input type="text" name='mobile_number'
                                    required onChange={handleInputChange}
                                    className='border text-sm text-gray-400  outline-0 border-gray-200 p-3 w-full rounded-sm bg-gray-100'
                                    placeholder="Enter number"
                                    value={formData.mobile_number}
                                    onBlur={(e) => ValiatePhoneNumber(e.target.value, setNumberError)} />
                                {NumberError && (<p className='text-xs text-center text-red-500'>{NumberError}</p>)}
                            </div>
                        </div>


                        <div className='w-full py-2'>
                            <p className='text-xs text-gray-400'>Land phone</p>
                            <div className='py-2'>
                                <input type="text" name='Landphone' value={formData.Landphone} onChange={handleInputChange} className='border text-sm text-gray-400 outline-0  border-gray-200 p-3 w-full rounded-sm bg-gray-100' placeholder="Enter number" />
                            </div>
                        </div>



                    </div>
                </div>

                <div className='md:flex gap-6'>
                    <div className='md:w-4/12'>
                        <div className='w-full py-2'>
                            <p className='text-xs text-gray-400'>Registered Address</p>
                            <div className='py-2'>
                                <input type="text" name='RegisteredAddress' value={formData.RegisteredAddress} required onChange={handleInputChange} className='border text-sm text-gray-400  outline-0 border-gray-200 p-3 w-full rounded-sm bg-gray-100' placeholder="Address" />
                            </div>
                        </div>
                    </div>
                    <div className='md:w-4/12'>
                        <p className='text-xs text-gray-400'>Business Type</p>
                        <div className='flex pt-6 w-full gap-5'>
                            <div className='flex  gap-3'>
                                <input
                                    type="radio"
                                    id="wholesaler"
                                    name="sales_type"
                                    value="wholesale"
                                    checked={checkedOption2 === 'wholesale'}
                                    onChange={handleCheckboxChange2}
                                />
                                <label htmlFor="wholesaler" className='text-sm text-gray-400'>Wholesaler</label>
                            </div>
                            <div className='flex  gap-3'>
                                <input
                                    type="radio"
                                    id="retail"
                                    name="sales_type"
                                    value="retail"
                                    checked={checkedOption2 === 'retail'}
                                    onChange={handleCheckboxChange2}
                                />
                                <label htmlFor="retail" className='text-sm text-gray-400'>Retail</label>
                            </div>
                            <div className='flex  gap-3'>
                                <input
                                    type="radio"
                                    id="both"
                                    name="sales_type"
                                    value="both"
                                    checked={checkedOption2 === 'both'}
                                    onChange={handleCheckboxChange2}
                                />
                                <label htmlFor="retail" className='text-sm text-gray-400'>Both</label>
                            </div>
                        </div>
                    </div>

                    <div className='md:w-4/12'>
                        <div className='w-full py-2'>
                            <p className='text-xs text-gray-400'>Select Category</p>
                            <div className='py-2'>
                                <Dropdown text="Choose Category" p='3' onUpdate={updateCategory} textcolor={`${formData.category ? "text-dark" : "text-gray-400"}`} data={Categories.filter(category => category.is_active).map(category => category.name)}
                                    font="font-normal" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='md:flex gap-6'>
                    <div className='md:w-4/12'>
                        <div className='w-full py-2'>
                            <p className='text-xs text-gray-400'>Email id</p>
                            <div className='py-2'>
                                <input type="email" name='email_id'
                                    required onChange={handleInputChange}
                                    className='border text-sm  outline-0  border-gray-200 p-3 w-full rounded-sm bg-gray-100'
                                    placeholder="Enter email"
                                    value={formData.email_id}
                                    onBlur={(e) => validateEmail(e.target.value, setEmailError)} />
                                {emailError && (<p className='text-xs text-center text-red-500'>{emailError}</p>)}
                            </div>
                        </div>
                        <div className='w-full py-2'>
                            <p className='text-xs text-gray-400'>Facebook link</p>
                            <div className='py-2'>
                                <input type="text" value={formData.facebook_link} name='facebook_link' onChange={handleInputChange} className='border text-sm   outline-0 border-gray-200 p-3 w-full rounded-sm bg-gray-100' placeholder="Enter" />
                            </div>
                        </div>
                        <div className='md:w-full md:flex gap-2 items-end'>
                            <div className='w-full py-2'>
                                <p className='text-xs text-gray-400'>Normal Working hours [from time, to time]</p>
                                <div className='py-2'>
                                    <input type="time" value={formData.NormalWorkingHoursFrom} name='NormalWorkingHoursFrom' required onChange={handleInputChange} className="border border-gray-300 outline-0 rounded-md px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                                </div>
                            </div>
                            <div className='w-full py-2'>
                                <p className='text-xs  text-gray-400'>To</p>
                                <div className='py-2'>
                                    <input type="time" name='NormalWorkingHoursTo' value={formData.NormalWorkingHoursTo} required onChange={handleInputChange} className="border border-gray-300 outline-0 rounded-md px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='md:w-4/12'>
                        <div className='w-full py-2'>
                            <p className='text-xs text-gray-400'>Website</p>
                            <div className='py-2'>
                                <input type="text" name='website' value={formData.website} onChange={handleInputChange} className='border text-sm outline-0  border-gray-200 p-3 w-full rounded-sm bg-gray-100' placeholder="Enter" />
                            </div>
                        </div>
                        <div className='w-full py-2'>
                            <p className='text-xs text-gray-400'>Instagram link</p>
                            <div className='py-2'>
                                <input type="text" name='instagram_link' value={formData.instagram_link} onChange={handleInputChange} className='border text-sm outline-0 border-gray-200 p-3 w-full rounded-sm bg-gray-100' placeholder="Enter" />
                            </div>
                        </div>

                    </div>


                    <div className='md:w-4/12'>

                        <div className='w-full py-2'>
                            <p className='text-xs text-gray-400'>Google Map link</p>
                            <div className='py-2'>
                                <input type="text" name='google_map_link' value={formData.google_map_link} onChange={handleInputChange} className='border text-sm outline-0 border-gray-200 p-3 w-full rounded-sm bg-gray-100' placeholder="Enter" />
                            </div>
                        </div>
                        <div className='w-full py-2'>
                            <p className='text-xs text-gray-400'>Youtube link</p>
                            <div className='py-2'>
                                <input type="text" name='youtube_link' value={formData.youtube_link} onChange={handleInputChange} className='border text-sm outline-0 border-gray-200 p-3 w-full rounded-sm bg-gray-100' placeholder="Enter" />
                            </div>
                        </div>
                        <div className='w-full py-2 flex '>

                            <p className='text-xs text-gray-400'>Home delivery/home service [Y/N]</p>
                            <div className='py-2 flex'>
                                <div className='flex items-center p-3 gap-5'>
                                    <input
                                        type="checkbox"
                                        value="yes"
                                        checked={checkedOption === 'yes'}
                                        onChange={handleCheckboxChange}
                                        className='border text-sm text-gray-400  border-gray-200  rounded-sm bg-gray-100'
                                        placeholder="Enter"
                                    />
                                    <p className='text-xs'>Yes</p>
                                </div>
                                <div className='flex items-center p-3 gap-5'>
                                    <input
                                        type="checkbox"
                                        value="no"
                                        checked={checkedOption === 'no'}
                                        onChange={handleCheckboxChange}
                                        className='border text-sm text-gray-400  border-gray-200  rounded-sm bg-gray-100'
                                        placeholder="Enter"
                                    />
                                    <p className='text-xs'>No</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='md:flex gap-6'>
                    {/* <div className='md:w-4/12 md:flex gap-2 items-end'>
                        <div className='w-full py-2'>
                            <p className='text-xs text-gray-400'>Normal Working hours [from time, to time]</p>
                            <div className='py-2'>
                                <input type="time" value={formData.NormalWorkingHoursFrom} name='NormalWorkingHoursFrom' required onChange={handleInputChange} className="border border-gray-300 outline-0 rounded-md px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                            </div>
                        </div>
                        <div className='w-full py-2'>
                            <p className='text-xs  text-white'>to</p>
                            <div className='py-2'>
                                <input type="time" name='NormalWorkingHoursTo' value={formData.NormalWorkingHoursTo} required onChange={handleInputChange} className="border border-gray-300 outline-0 rounded-md px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                            </div>
                        </div>
                    </div> */}



                </div>
                <div className='md:flex gap-6 mt-2 '>
                    <div className='md:w-6/12'>
                        <div className='flex gap-6'>
                            {formData && (formData?.image.map((img, index) => (
                                <div className='w-2/6 h-[100px] shadow-lg  border' key={index}>
                                    <img className='w-full h-full object-cover' src={URL.createObjectURL(img)} alt="" />
                                    <p className=' text-xs text-red-500 cursor-pointer' onClick={() => handleRemoveImage(index)}>Remove</p>
                                </div>
                            )))}
                            <div className='w-2/6  shadow-lg flex items-center justify-center'>
                                <input
                                    type="file"
                                    className='hidden'
                                    ref={addImage}
                                    onChange={handleChangeImage}
                                    accept="image/*"
                                    multiple
                                />
                                <div className='flex flex-col items-center justify-center h-[100px]'>
                                    <div className='rounded-full w-10 h-10 bg-gray-200 flex justify-center items-center cursor-pointer'
                                        onClick={handleClickAddimg}
                                    >
                                        <img src="/camera.png" alt="" className='w-4' />
                                    </div>
                                    <p className='text-[10px] font-bold pt-1 text-[#649597] font-poppins'>Add your photos</p>
                                </div>
                            </div>
                            {imageError && (<p className='text-xs text-center text-red-500'>{imageError}</p>)}
                        </div>

                    </div>
                    <div className='md:w-6/12 '>
                        <div className=''>
                            <label htmlFor="address" className='text-xs text-gray-400'>Office Address</label>
                            <input id='address' type="text" name='head_office_address' value={formData.head_office_address} onChange={handleInputChange} className='border outline-0 h-[100px] text-sm text-gray-400  border-gray-200 p-3 w-full rounded-sm bg-gray-100' placeholder="Enter" />
                        </div>
                        <div className='flex  mt-4'>
                            <button className='py-1 px-2 mx-4 bg-[#649597] rounded-lg text-white w-3/6 '>Previous</button>
                            <button type='submit' className='py-1 px-2 mx-4 bg-[#9F5080] rounded-lg text-white w-3/6 '>Next</button>
                        </div>
                    </div>
                </div>
            </form>
            <Toaster />
        </div>
    )
}

export default VendorRegisterationForm
