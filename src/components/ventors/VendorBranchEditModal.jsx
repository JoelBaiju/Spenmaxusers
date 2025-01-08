import React, { useState } from 'react';
import { get_api } from '../../utils/api';
import { getErrorMessage } from '../../utils/Validation';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

const VendorBranchEditModal = ({ vendorData, onSave, onClose }) => {
  const [editedData, setEditedData] = useState({ ...vendorData });

  const vendor = useSelector(state => state.vendorAuth.vendor);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const response = await get_api(vendor?.token).put(`/shop/vendor/branches/${editedData.id}/update/`, editedData);
      if (response.status === 200) {
        onClose()
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
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-800 bg-opacity-50 ">
      <div className="bg-white rounded-lg w-full max-w-md p-8">
        <span className="absolute top-0 right-0 m-4 text-gray-600 cursor-pointer" onClick={onClose}>&times;</span>
        <h2 className="text-2xl font-bold mb-4">Edit Vendor Details</h2>
        <form className='space-y-4'>
          {/* Input fields */}
          {Object.entries(editedData)
            .filter(([fieldName]) => !['HomeDelivery', 'head_office', 'is_active', 'company', 'category', 'sales_type'].includes(fieldName))
            .map(([fieldName, fieldValue]) => (
              <div key={fieldName}>
                <label className="block text-sm font-bold mb-1" htmlFor={fieldName}>{fieldName}:</label>
                <input
                  type="text"
                  id={fieldName}
                  name={fieldName}
                  value={fieldValue}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            ))}

          <div className='flex gap-5'>
            <button
              type="button"
              onClick={handleSave}
              className="bg-[#9F5080] hover:bg-[#8d4771] w-6/12 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save
            </button>
            <button
              className="bg-[#80509F] w-6/12 hover:bg-[#694284] text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => onClose()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default VendorBranchEditModal;