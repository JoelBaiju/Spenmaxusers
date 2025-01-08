import React from 'react';

const ErrorComponent = ({ errors, fieldName }) => {
    return (
        <>
            {errors.map((error, index) => (
                error.field === fieldName && (
                    <div key={index} className="text-red-500 text-sm">
                        {error.message}
                    </div>
                )
            ))}
        </>
    );
};

export default ErrorComponent;
