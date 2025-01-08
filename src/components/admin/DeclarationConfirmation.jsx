import React, { useState } from 'react'
import CoustomInput from './CoustomInput'
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const DeclarationConfirmation = () => {

  const [firstCheckboxChecked, setFirstCheckboxChecked] = useState(false);
  const [secondCheckboxChecked, setSecondCheckboxChecked] = useState(false);

  const Navigate = useNavigate()
  const { id } = useParams();

  const handleFirstCheckboxChange = (event) => {
    setFirstCheckboxChecked(event.target.checked);
  };

  const handleSecondCheckboxChange = (event) => {
    setSecondCheckboxChecked(event.target.checked);
  };

  const handleNextClick = () => {
    if (firstCheckboxChecked && secondCheckboxChecked) {
      Navigate(`/admin-home/add-Parnter/Vendor-Submission/${id}`)
    } else {
      toast(
        "Kindly ensure that you have agreed to the terms and conditions before proceeding.",
        {
          duration: 6000,
        }
      );
    }
  }
  return (
    <div className='mt-5 mb-4 '>
      <h1 className='font-bold'>DeclarationConfirmation</h1>
      <div className='border h-[800px] my-5 border-gray-300 p-3 rounded-lg shadow-sm bg-white'>

        <ul >
          <li >
            <p className='text-sm leading-6'>Spenmax Empanelment Terms and Conditions</p>
            <p className='text-sm leading-6'>Welcome to the Spenmax Card Empanelment Program! We appreciate your interest in joining our network of healthcare providers
              to offer exclusive discounts to our cardholders. Before you proceed with the empanelment process, please carefully read and
              understand the terms and conditions outlined below:
            </p>
          </li>
          <li className='mt-3'>
            <h2 className=" font-semibold mb-2  text-sm">1. Eligibility</h2>
            <p>Hospitals, clinics, and pharmacies interested in participating must meet the eligibility criteria set by Spenmax Card. Only entities with a valid license and compliant with local healthcare regulations are eligible to empanel.</p>
          </li>
          <li>
            <h2 className="text-sm mt-5 font-semibold mb-2">2. Empanelment Process</h2>
            <p className='text-sm'>Submission of the empanelment form does not guarantee automatic inclusion in the Spenmax Card network. Our team will review the information provided, and successful applicants will be notified.</p>
          </li>
          <li>
            <h2 className="text-sm mt-5 font-semibold mb-2">3. Discount Offer</h2>
            <p className='text-sm'>By submitting the empanelment form, you agree to offer a specified percentage (%) discount on outpatient consultations, medicine purchases, and diagnostic tests to Spenmax Card cardholders. The entered percentage should be transparent, consistent, and applicable across all services mentioned.</p>
          </li>
          <li>
            <h2 className="text-sm mt-5 font-semibold mb-2">4. Contract Period</h2>
            <p className='text-sm'>Upon successful empanelment, the agreement is valid for a specified contract period. Renewal terms will be communicated at the end of each contract period.</p>
          </li>
          <li>
            <h2 className="text-sm mt-5 font-semibold mb-2">5. Privacy and Confidentiality</h2>
            <p className='text-sm'>Privilege Health Card respects the privacy and confidentiality of the information provided in the empanelment form. We will not disclose any sensitive information without your explicit consent.</p>
          </li>
          <li>
            <h2 className="text-sm mt-5 font-semibold mb-2">6. Termination of Empanelment</h2>
            <p className='text-sm'>Spenmax Card reserves the right to terminate empanelment with any healthcare provider at any time due to violation of terms,
              unethical practices, or any other reasons deemed necessary.</p>
          </li>
          <li>
            <h2 className="text-sm mt-5 font-semibold mb-2">7. Termination of Empanelment</h2>
            <p className='text-sm'>Empaneled healthcare providers may be featured on Spenmax Card marketing materials, including the website and promotional
              content, to highlight the available discounts.</p>
          </li>
        </ul>
      </div>

      <div className='bg-white p-5 rounded-lg border shadow-sm'>
        <div className='md:flex gap-6'>
          <div className='md:w-6/12'>
            <CoustomInput headder='Name' Placeholder='Enter' />
          </div>
          <div className='w-6/12'>
            <CoustomInput headder='Designation' Placeholder='Enter' />
          </div>
        </div>

        <div className='flex gap-3 mt-4'>
          <div>
            <input type="checkbox" checked={firstCheckboxChecked} onChange={handleFirstCheckboxChange} />
          </div>
          <div>
            <p className='text-sm'>I hereby affirm that we have agreed to extend the specified discount rate for Spenmax Card holders, as outlined in the terms of the agreement with Spenmax Card Management. We hereby agree to provide mentioned exclusive discounts on mentioned categories to the customers of Spenmax Card with effective from the date of submission</p>
          </div>
        </div>

        <div className='flex gap-3 mt-4'>
          <div>
            <input type="checkbox" checked={secondCheckboxChecked} onChange={handleSecondCheckboxChange} />
          </div>
          <div>
            <p className='text-sm'> I confirm that I am duly authorized to make this commitment on behalf of our institution and that the terms of this agreement are understood and accepted by our organization. This declaration is made in good faith and signifies our commitment to honor the agreed-upon discount rate for Spenmax Card holders.</p>
          </div>
        </div>
      </div>

      <div className='flex justify-end items-end mt-14 gap-5'>
        <button className='bg-[#9F5080] py-2 text-sm 3/12 text-white mb-2 px-14 rounded-md' onClick={handleNextClick}>Next</button>
      </div>
      <Toaster />
    </div>
  )
}

export default DeclarationConfirmation
