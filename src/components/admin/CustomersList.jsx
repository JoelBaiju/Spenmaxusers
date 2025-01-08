import React, { useEffect, useState } from 'react'
import { getErrorMessage } from '../../utils/Validation';
import toast, { Toaster } from 'react-hot-toast';
import { get_api } from '../../utils/api';
import { useSelector } from 'react-redux';
import CustomerDetailsModal from './CustomerDetailsModal';
import CustmorPackageModal from './CustmorPackageModal';
import CustomerEditModal from './CustomerEditModal';

const CustomersList = ({ search, searchStatus, refresh, apiName }) => {

  const [customers, setcustomers] = useState([])
  const [customerDetail, setcustomerDetail] = useState('')
  const [openModal, setopenModal] = useState(false)
  const [effect, seteffect] = useState(false)

  const user = useSelector(state => state.adminAuth.adminUser)

  useEffect(() => {
    fetchCustomer()
  }, [effect])

  useEffect(() => {
    if (searchStatus) {
      fetchSeach()
    }
  }, [searchStatus])

  const fetchCustomer = async () => {
    try {
      const response = await get_api(user?.token).get(`/shop/customer/`);
      if (response.status === 200) {
        setcustomers(response.data)
      }
    } catch (error) {
      console.error('Fetching fetchCustomer failed:', error);
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

  const fetchCustomersDetails = async (id,edit) => {
    try {
      const response = await get_api(user?.token).get(`/shop/customer/${id}/`);
      if (response.status === 200) {
        if (edit===true){
          setShowModal(true)
        }
        else{
          setopenModal(true)
        }
        setcustomerDetail(response.data)
      }
    } catch (error) {
      console.error('fetch Customers Details failed:', error);
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

  const onClose = () => {
    setopenModal(false)
  }

  const render = () => {
    seteffect(prev => !prev);
  }

  const addPackage = (pkg) => {
    const updatedCustomerDetail = { ...customerDetail, isActive: true };
    updatedCustomerDetail.package_c = [...updatedCustomerDetail.package_c, pkg];
    setcustomerDetail(updatedCustomerDetail);
  }

  const fetchSeach = async () => {
    try {
      const response = await get_api(user?.token).get(`/shop/customer/?${apiName}=${search}`);
      if (response.status === 200) {
        setcustomers(response.data)
        refresh()
      }
    } catch (error) {
      console.error('fetch Seach failed:', error);
      const errorMessages = getErrorMessage(error)
      const generalErrors = errorMessages.filter((error) => error.field === 'general' || error.field === error.field || error.field === 'name');
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




  const [showModal, setShowModal] = useState(false);
  const closeEditModal = () => setShowModal(false);





  return (
    <div className='overflow-x-scroll h-[400px] customscrollbar'>
      {customers.length === 0 ? (
        <div className='flex justify-center pt-10 font-medium'>
          <p>No result found</p>
        </div>
      ) :
        (customers.map((Customer, index) => (
          <div className='bg-white border border-gray-300 rounded-md mt-3 p-3' key={Customer.id}>
            <p className='font-bold text-sm font-sans'>{Customer.name}</p>
            <div className='flex items-center justify-between mt-3'>
              <div className='flex gap-3 '>
                <div className='w-auto'>
                  <img src="/gift.png" alt="" className='w-3' />
                </div>
                <p className='text-xs'>{Customer.isActive ? Customer.package : 'currently no package'}</p>
              </div>
              <button className={`px-2 rounded-full text-xs ${Customer.isActive ? 'bg-[#99FDD2]' : 'bg-[#99FDD2]'}`}>
                {Customer.isActive ? 'Active' : 'Inactive'}
              </button>
            </div>
            <div className='my-3 flex items-center gap-3'>
              <img src="/envelope.png" alt="" className='w-3' />
              <p className='text-xs'>{Customer.email_id}</p>
            </div>
            <div>
              <button className='text-sm text-gray-500 border border-gray-400 rounded-full px-3 ' onClick={() => { fetchCustomersDetails(Customer.id,false) }}>Details</button>
              <button onClick={() => { fetchCustomersDetails(Customer.id,true) }} className='text-sm text-gray-500 border ml-5 border-gray-400 rounded-full px-3 '>Edit</button>
            </div>
          </div>
        )))}

      {customerDetail && <CustomerDetailsModal data={customerDetail} isOpen={openModal} onClose={onClose} render={render} addPackage={addPackage} />}
      
      <CustomerEditModal show={showModal} closeModal={closeEditModal} data={customerDetail} />



      <Toaster />
    </div>
  )
}

export default CustomersList
