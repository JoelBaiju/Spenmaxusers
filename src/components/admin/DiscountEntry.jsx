import React, { useEffect, useState ,useRef} from 'react'
import Dropdown from './Dropdown'
import CoustomInput from './CoustomInput'
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { getErrorMessage } from '../../utils/Validation';
import { get_api } from '../../utils/api';
import { useSelector } from 'react-redux';
import DiscountEntrySkelton from '../ResuableComponents/DiscountEntrySkelton';

const DiscountEntry = () => {

    const input1 = useRef()
    const input2 = useRef()

    const input3 = useRef()

    const input4 = useRef()

    const [BranchData, setBranchData] = useState([])
    const [DiscountsData, setDiscountsData] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0);
    const [branch, setbranch] = useState({
        discount_type: "",
        branch: '',
        offer_type: "",
        offer: "",
        category: ""
    })
    const [buttonStatus, setbuttonStatus] = useState([])
    const [radioButton, setradioButton] = useState('button')
    const [nextChecker, setnextChecker] = useState(0)

    const local = BranchData[currentIndex]?.Locality;

    const { id } = useParams();

    const navigate = useNavigate()

    const user = useSelector(state => state.adminAuth.adminUser)

    useEffect(() => {
        fetchBranchData()
    }, [])

    const fetchBranchData = async () => {
        try {
            const response = await get_api(user?.token).get(`/shop/vendor/company/${id}/branches/`);
            if (response.status === 200) {
                setBranchData(response.data);
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
    const handleNextClick = () => {
        if (DiscountsData.length === 0) {
            toast.error('please add atleast a offer1')
            return
        } else if (nextChecker === DiscountsData.length && nextChecker != 0) {
            toast.error('please add atleast a offer')
        }
        input1.current.value =""
        input2.current.value =""
        input3.current.value =""
        input4.current.value =""

        setbuttonStatus([])
        setCurrentIndex(prevIndex => prevIndex + 1);
        setnextChecker(DiscountsData.length)
    };
    const handleInputOffers = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        setbranch(prevBranch => ({
            ...prevBranch,
            [name]: value,
            ['offer_type']: 'NORMAL',
            ['branch']: BranchData[currentIndex].id
        }));
    };
    const handleAdd = async (status) => {
        const hasEmptyOffer = branch.offer === '';
        if (hasEmptyOffer) {
            toast.error('Please fill the field.')
            return
        }
        console.log(branch);
        if ((status === 'add1' && (radioButton === 'flat1' || radioButton === 'percentage1')) ||
            (status === 'add2' && (radioButton === 'flat2' || radioButton === 'percentage2'))) {
                console.log("entered");
            setbuttonStatus(prevData => [...prevData, status]);
            setDiscountsData(prevData => [...prevData, branch]);
            setbranch({
                discount_type: "",
                branch: '',
                offer_type: "",
                offer: "",
                category: ""
            });
            setradioButton('');
        } else if (status === 'add3') {
            setbuttonStatus(prevData => [...prevData, status]);
            setDiscountsData(prevData => [...prevData, branch]);
            setbranch({
                discount_type: "",
                branch: '',
                offer_type: "",
                offer: "",
                category: ""
            });
            setradioButton('');
        } else {
            toast.error('Please select a discount type');
        }


    }
    const radioValue = (value) => {
        setradioButton(value)
    }
    const handleSpecialOffers = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        setbranch(prevBranch => ({
            ...prevBranch,
            [name]: value,
            ['offer_type']: 'SPECIAL',
            ['branch']: BranchData[currentIndex].id,
            ['discount_type']: 'special'
        }));
    };
    const handleApiCall = async () => {
        console.log(DiscountsData);
        // const hasEmptyOffer = branch.offer === '';
        // if (hasEmptyOffer) {
        //     toast.error('Please fill the field.')
        //     return
        // }
        if (nextChecker === DiscountsData.length && nextChecker != 0 || DiscountsData.length === 0) {
            toast.error('please add atleast a offer')
            return
        }
        setbranch({
            discount_type: "",
            branch: '',
            offer_type: "",
            offer: "",
            category: ""
        })
        setradioButton('')
        setbuttonStatus([])
        try {
            const response = await get_api(user?.token).post(`/shop/branches/offers/create/`, DiscountsData);
            if (response.status === 201) {
                navigate(`/admin-home/add-Parnter/Declaration-Confirmation/${id}`)
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
    return BranchData.length === 0 ?
        <div>
            <DiscountEntrySkelton />
            <DiscountEntrySkelton />
            <DiscountEntrySkelton />
        </div>
        :
        (
            <div className='mt-5 mb-4'>
                < div className=' flex flex-col gap-3 bg-white border p-5 rounded-lg mb-7 shadow-sm'>
                    <div className='flex justify-center'>
                        <p className='text-gray-600 font-semibold'>{`${local} branch`}</p>
                    </div>
                    <div className='my-4 '>
                        <p className='text-xs font-medium py-1 text-gray-800'>Total Discounts</p>
                        <hr className='broder  border-gray-300' />
                    </div>
                    {buttonStatus.indexOf('add1') !== -1 && (
                        <div className='flex justify-end '>
                            <p className='text-xs text-green-500 font-poppins border border-green-500 rounded-md px-2 py-1 font-bold'>Offer added</p>
                        </div>
                    )}
                    <div className='my-5 flex gap-7 '>
                        <div className='w-4/12 py-2'>
                            <p className='text-xs text-gray-400'>Discount Type</p>
                            <div className=' flex py-2 mt-2'>
                                <div className='flex w-1/4 gap-3'>
                                    <input type="radio" value='flat' onClick={() => { radioValue('flat1') }} checked={radioButton === 'flat1'} name='discount_type' onChange={handleInputOffers} />
                                    <p className='text-sm'>Flat</p>
                                </div>
                                <div className='flex w-3/4 gap-3'>
                                    <input type="radio" name='discount_type' onClick={() => { radioValue('percentage1') }} value='percentage' onChange={handleInputOffers} checked={radioButton === 'percentage1'} />
                                    <p className='text-sm'>Percentage</p>
                                </div>
                            </div>
                        </div>
                        <div className='w-4/12 '>
                            <CoustomInput required={true} headder='Total bill discount' ref={input1} name='offer' onChange={handleInputOffers} Placeholder='enter' type='text' />
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        {buttonStatus.indexOf('add1') == -1 && (
                            <button className='bg-[#80509F] text-white px-4 py-1 rounded-md' onClick={() => { handleAdd('add1') }}>Add</button>
                        )}
                    </div>
                    <div className='my-4'>
                        <p className='text-xs font-medium py-1 text-gray-800'>Category Based Discount</p>
                        <hr className='broder  border-gray-300' />
                    </div>
                    {buttonStatus.indexOf('add2') !== -1 && (
                        <div className='flex justify-end '>
                            <p className='text-xs text-green-500 font-poppins border border-green-500 rounded-md px-2 py-1 font-bold'>Offer added</p>
                        </div>
                    )}
                    <div className='my-5 flex gap-7 '>
                        <div className='w-4/12  '>
                            <div className=' flex '>
                                <CoustomInput headder='Category' name='category' ref={input2} onChange={handleInputOffers} Placeholder='enter' type='text' />
                            </div>
                        </div>
                        <div className='w-4/12 py-2 '>
                            <p className='text-xs text-gray-400'>Discount Type</p>
                            <div className=' flex py-2 items-center mt-2'>
                                <div className='flex w-1/4 gap-3 '>
                                    <input type="radio" value='flat' name='discount_type' onClick={() => { radioValue('flat2') }} checked={radioButton === 'flat2'} onChange={handleInputOffers} />
                                    <p className='text-sm'>Flat</p>
                                </div>
                                <div className='flex w-3/4 gap-3'>
                                    <input type="radio" name='discount_type' value='percentage' onClick={() => { radioValue('percentage2') }} checked={radioButton === 'percentage2'} onChange={handleInputOffers} />
                                    <p className='text-sm'>Percentage</p>
                                </div>
                            </div>
                        </div>

                        <div className='w-4/12 '>
                            <CoustomInput headder='Value' ref={input3} onChange={handleInputOffers} name='offer' Placeholder='Choose' type='text' />
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        {buttonStatus.indexOf('add2') == -1 && (
                            <button className='bg-[#80509F] text-white px-4 py-1 rounded-md' onClick={() => { handleAdd('add2') }}>Add</button>
                        )}
                    </div>
                    <div className='my-4'>
                        <p className='text-xs font-medium py-1 text-gray-800'>Special Offers</p>
                        <hr className='broder  border-gray-300' />
                    </div>
                    {buttonStatus.indexOf('add3') !== -1 && (
                        <div className='flex justify-end '>
                            <p className='text-xs text-green-500 font-poppins border border-green-500 rounded-md px-2 py-1 font-bold'>Offer added</p>
                        </div>
                    )}
                    <div className='my-5'>
                        <div className='w-8/12 '>
                            <CoustomInput headder='Offers' ref={input4} onChange={handleSpecialOffers} name='offer' Placeholder='Enter offers' type='text' />
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        {buttonStatus.indexOf('add3') == -1 && (
                            <button className='bg-[#80509F] text-white px-4 py-1 rounded-md' onClick={() => { handleAdd('add3') }}>Add</button>
                        )}
                    </div>

                </div>
                <div className='flex justify-end '>
                    {currentIndex < BranchData.length - 1 ? (
                        <button className='bg-[#9F5080] py-2 text-sm 3/12 text-white mb-2 px-14 rounded-md' onClick={handleNextClick}>Next</button>
                    )
                        :
                        (<button className='bg-[#9F5080] py-2 text-sm 3/12 text-white mb-2 px-14 rounded-md' onClick={handleApiCall}>Next</button>)
                    }
                </div>
                <Toaster />
            </div >
        )
}

export default DiscountEntry
