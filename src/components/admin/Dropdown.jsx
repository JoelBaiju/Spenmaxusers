import React, { useState } from 'react';

const Dropdown = ({ text, p, textcolor, font, data, onUpdate, textsize, bg }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null); 

    const toggleDropdown = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative w-full">
            <button
                onClick={toggleDropdown}
                className={`${bg ? bg : 'bg-gray-100 border'}  outline-[#678B8D] w-full font-bold ${p ? `p-${p}` : 'py-2 px-4'} rounded inline-flex items-center`}
            >
                <div className='flex items-center justify-between w-full'>
                    <p className={`${font ? `${font}` : 'font-normal'} ${textcolor ? `${textcolor}` : 'text-gray-400'} ${textsize ? `${textsize}` : 'text-sm '}`}>
                        {selectedValue || text} {/* Display selected value or default text */}
                    </p>
                    <svg
                        className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 12a1 1 0 01-.707-.293l-5-5a1 1 0 111.414-1.414L10 9.586l4.293-4.293a1 1 0 111.414 1.414l-5 5A1 1 0 0110 12z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </button>
            {isOpen && (
                <div className={`absolute z-10 right-0 mt-2 w-48 bg-white rounded-md shadow-lg ${data?.length !== 1 ? 'h-[150px]' : ''} overflow-scroll overflow-x-hidden `}>
                    {data && data.map((d) => (
                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100" key={d.name ? d.name : d}
                            onClick={() => {
                                setSelectedValue(d.name ? d.name : d); // Update selected value
                                onUpdate(d.name ? d.name : d);
                                setIsOpen(false);
                            }}>
                            {d.name ? d.name : d}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
