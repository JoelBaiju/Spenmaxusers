import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const CustmorPackageModal = ({ isOpen, onClose, packages, updatePackageInFormData , setPackage }) => {

    const [selectedType, setSelectedType] = useState({});

    const handleTypeSelect = (typeData , name) => {
        setSelectedType({
            ...typeData,
            name:name
        });
        
    };

    const handle_purchase = ()=>{
        if (!selectedType.id){
            toast.error("select a package")
            return
        }
        
        updatePackageInFormData(selectedType.id);

        if (setPackage){
            setPackage({
                packageName : `${selectedType.name} , ${selectedType.duration_days} days`
            })

            onClose()
        }


    }

    return (
        <div className={`fixed z-10 inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
            <div className="flex items-center justify-center min-h-screen">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full">
                    <div className="bg-[#649597] px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-medium leading-6 text-center text-white">CHOOSE PACKAGE</h3>
                    </div>
                    <div className="bg-white px-4 py-4 sm:px-6">
                        <div className="flex flex-col gap-4">
                            {packages.map((pkg, index) => (
                                <div key={index} className="p-4 border border-gray-200 rounded-md">
                                    <h4 className="text-lg font-semibold mb-2">{pkg.name}</h4>
                                    <div className="space-y-2">
                                        {pkg.type_p
                                            .filter((typeData) => typeData.is_active)
                                            .map((typeData) => (
                                                <div key={typeData.id} className="flex justify-between items-center p-2 border border-gray-200 rounded-md">
                                                    <div>
                                                        <p className="text-sm font-semibold">Actual Price: {typeData.actual_price}</p>
                                                        <p className="text-sm font-semibold">Discount Price: {typeData.discount_price}</p>
                                                        <p className="text-sm font-semibold">Duration Days: {typeData.duration_days}</p>
                                                    </div>
                                                    <input
                                                        type="radio"
                                                        name="packageType"
                                                        id={`type_${typeData.id}`}
                                                        value={typeData.id}
                                                        checked={selectedType && selectedType.id === typeData.id}
                                                        onChange={() => handleTypeSelect(typeData , pkg.name)}
                                                    />
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button onClick={onClose} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#649597] text-base font-medium text-white hover:bg-[#8eadae] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#649597] sm:ml-3 sm:w-auto sm:text-sm">
                            CLOSE
                        </button>
                        <button onClick={handle_purchase} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#649597] text-base font-medium text-white hover:bg-[#7c999a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#649597] sm:ml-3 sm:w-auto sm:text-sm">
                            PURCHASE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustmorPackageModal;
