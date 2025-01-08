import React, { useEffect, useState ,useRef} from 'react'
import Dropdown from './Dropdown'
import CoustomInput from './CoustomInput'
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { getErrorMessage } from '../../utils/Validation';
import { get_api } from '../../utils/api';
import { useSelector } from 'react-redux';
import DiscountEntrySkelton from '../ResuableComponents/DiscountEntrySkelton';

const DiscountEntry1 = () => {

    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [branchData , setBranchData] = useState([]);
    const [DiscountsData, setDiscountsData] = useState([])
    const user = useSelector(state => state.adminAuth.adminUser)
    const { id } = useParams();
    const navigate = useNavigate()
    const [branch, setbranch] = useState({
        discount1:{
            discount_type: "flat",
            offer_type: "NORMAL",
            offer: "",
             },
                
        
        discount2:{
            discount_type: "flat",
            offer_type: "NORMAL",
            offer: "",
            category:""
        }
        ,
        discount3:{
            discount_type: "special",
            offer_type: "SPECIAL",
            offer: "",
        }
    
        
    }
)


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

    const handleValue = (discountKey, fieldKey, value) => {
        setbranch(prevState => ({
            ...prevState,
            [discountKey]: {
                ...prevState[discountKey],
                [fieldKey]: value
            }
        }));
    };

    const handleOffer = async()=>{

        if ((branch.discount2.offer && !branch.discount2.category) || (!branch.discount2.offer && branch.discount2.category)){
            toast.error("Enter both category and offer")
            return
        }

        const branchId = branchData[currentIndex].id;

        // Function to check if all fields except branch ID are filled
        const isFilled = (obj) => {
            const { ...rest } = obj;
            return Object.values(rest).every(value => value && value.trim() !== '');
        };
    
        // Filter and map branch objects to include branch ID
        const filteredBranches = Object.entries(branch).map(([key, value]) => {
            if (isFilled(value)) {
                return { ...value, branch: branchId };
            }
            return null;
        }).filter(item => item !== null);

        if (filteredBranches.length == 0){
            toast.error("Add atleast one offer to a branch")
            return
        }

        

        if (currentIndex < branchData.length-1){
            setbranch({
                discount1:{
                    discount_type: "flat",
                    offer_type: "NORMAL",
                    offer: "",
                     },
                        
                
                discount2:{
                    discount_type: "flat",
                    offer_type: "NORMAL",
                    offer: "",
                    category:""
                }
                ,
                discount3:{
                    discount_type: "special",
                    offer_type: "SPECIAL",
                    offer: "",
                }
            
                
            })

            setCurrentIndex(currentIndex+1)
            setDiscountsData(

                [
                    ...DiscountsData,
                    ...filteredBranches
                ]
            )

        }
        else{
            try {
                const response = await get_api(user?.token).post(`/shop/branches/offers/create/`, [
                    ...DiscountsData,
                    ...filteredBranches
                ]);
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


    }
    
    
    return branchData.length === 0 ?
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
                        <p className='text-gray-600 font-semibold p-2 bg-green-100 rounded'>{`Branch ${currentIndex+1} in ${branchData[currentIndex].Locality} locality`}</p>
                    </div>
                    <div className='my-4'>
                        <p className='text-xs font-medium py-1 text-gray-800'>Total Discounts</p>
                        <hr className='broder  border-gray-300' />
                    </div>
                    <div className='my-5 flex gap-7 '>
                        <div className='w-4/12'>
                            <p className='text-xs text-gray-400'>Discount Type</p>
                            <div className=' flex py-2 mt-2'>
                                <div className='flex w-1/4 gap-3'>
                                    <input type="radio" value='flat' onChange={(e) => { handleValue("discount1","discount_type" , e.target.value) }} checked={branch.discount1.discount_type === 'flat'} name='discount_type_discount1' />
                                    <p className='text-sm'>Flat</p>
                                </div>
                                <div className='flex w-3/4 gap-3'>
                                    <input type="radio" name='discount_type_discount1' value="percentage" onChange={(e) => { handleValue("discount1","discount_type" , e.target.value) }}  checked={branch.discount1.discount_type === 'percentage'} />
                                    <p className='text-sm'>Percentage</p>
                                </div>
                            </div>
                        </div>
                        <div className='w-8/12'>
                            <p className='text-xs text-gray-400 mb-1'>Offer</p>

                            <input type="text" name='discount1_offer' value={branch.discount1.offer} onChange={(e) => { handleValue("discount1","offer" , e.target.value) }} className='border text-sm outline-[#80509F] border-gray-200 p-3 w-full rounded-sm bg-gray-100' placeholder="Offer" />

                            {/* <CoustomInput required={true} headder='Total bill discount' name='offer' onChange={handleInputOffers} Placeholder='enter' type='text' /> */}
                        </div>
                    </div>
                   
                    <div className='my-4'>
                        <p className='text-xs font-medium py-1 text-gray-800'>Category Based Discount</p>
                        <hr className='broder  border-gray-300' />
                    </div>
                    <div className='my-5 flex gap-7 '>
                        <div className='w-4/12  '>
                            <p className='text-xs text-gray-400 mb-1'>Category</p>

                            <input type="text" name='discount2_category' value={branch.discount2.category} onChange={(e) => { handleValue("discount2","category" , e.target.value) }} className='border text-sm outline-[#80509F] border-gray-200 p-3 w-full rounded-sm bg-gray-100' placeholder="Category" />
                        </div>
                        <div className='w-4/12 '>
                            <p className='text-xs text-gray-400'>Discount Type</p>
                            <div className=' flex py-2 items-center mt-2'>
                                <div className='flex w-1/4 gap-3'>
                                    <input type="radio" value='flat' onChange={(e) => { handleValue("discount2","discount_type" , e.target.value) }} checked={branch.discount2.discount_type === 'flat'} name='discount_type_discount2' />
                                    <p className='text-sm'>Flat</p>
                                </div>
                                <div className='flex w-3/4 gap-3'>
                                    <input type="radio" name='discount_type_discount2' value="percentage" onChange={(e) => { handleValue("discount2","discount_type" , e.target.value) }}  checked={branch.discount2.discount_type === 'percentage'} />
                                    <p className='text-sm'>Percentage</p>
                                </div>
                            </div>
                        </div>

                        <div className='w-4/12'>
                            <p className='text-xs text-gray-400 mb-1'>Offer</p>
                             <input type="text" name='discount2_offer' value={branch.discount2.offer} onChange={(e) => { handleValue("discount2","offer" , e.target.value) } }className='border text-sm outline-[#80509F] border-gray-200 p-3 w-full rounded-sm bg-gray-100' placeholder="Offer" />

                        </div>
                    </div>
                    
                    <div className='my-4'>
                        <p className='text-xs font-medium py-1 text-gray-800'>Special Offers</p>
                        <hr className='broder  border-gray-300' />
                    </div>
                    
                    <div className='my-5'>
                        <div className='w-12/12 '>
                            <input type="text" name='discount3_offer' value={branch.discount3.offer} onChange={(e) => { handleValue("discount3","offer" , e.target.value) } }className='border text-sm outline-[#80509F] border-gray-200 p-3 w-full rounded-sm bg-gray-100' placeholder="Special Offer" />
                        </div>
                    </div>
                    

                </div>
                <div className='flex justify-end '>
                   
                        <button className='bg-[#9F5080] py-2 text-sm 3/12 text-white mb-2 px-14 rounded-md'onClick={handleOffer} >Next</button>
                </div>
                <Toaster />
            </div >
        )
}

export default DiscountEntry1
