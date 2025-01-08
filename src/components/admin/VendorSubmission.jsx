import React, { useEffect, useState } from 'react'
import VendorSubmissionModal from './VendorSubmissionModal'
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { getErrorMessage } from '../../utils/Validation';
import { get_api } from '../../utils/api';
import { useSelector } from 'react-redux';

const VendorSubmission = () => {

  const [showModal, setShowModal] = useState(false);

  const user = useSelector(state => state.adminAuth.adminUser)

  const Navigate = useNavigate()

  const { id } = useParams();

  const handleModalOpen = () => {
    fetchData()
  };

  const fetchData = async () => {
    try {
      const response = await get_api(user?.token).post(`/shop/vendor/company/${id}/verify/`);
      if (response.status === 201) {
        setShowModal(true);
        setTimeout(() => {
          Navigate('/admin-home/add-Parnter');
        }, 3000);
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

  return (
    <div className='mt-5  p-10'>
      <div className='flex justify-center '>
        <img src="/email-removebg-preview.png" alt="" className='w-1/2' />
      </div>
      <div className='flex justify-center m-5'>
        <h1 className='text-2xl font-bold'>Register the company</h1>
      </div>
      <div className='flex justify-center m-5'>
        <h1 className=''>You've entered <span className='font-semibold'>user@domain.com</span> as the email address for your account</h1>
      </div>
     
      <div className='flex justify-center items-end  m-5'>
        <button className='bg-[#80509F] py-3 text-sm 3/12 text-white mb-2 px-12 rounded-md' onClick={handleModalOpen}>Verify Account</button>
      </div>
      {/* <div className='flex justify-end items-end mt-14 gap-5'>
        <button className='bg-[#80509F] py-2 text-sm 3/12 text-white mb-2 px-14 rounded-md'>Previous</button>
        <button className='bg-[#9F5080] py-2 text-sm 3/12 text-white mb-2 px-14 rounded-md'  >Submit</button>
      </div> */}
      {showModal && (
        <VendorSubmissionModal setShowModal={setShowModal} />
      )}
      <Toaster />
    </div>
  )
}

export default VendorSubmission
