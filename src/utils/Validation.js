

export const validateEmail = (email, setEmailError) => {
    if (email.trim() === '') {
        setEmailError('');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        setEmailError('Invalid email format');
    } else {
        setEmailError('');
    }
};


export const validatePassword = (password, setPasswordError) => {
    if (password.trim() === '') {
        setPasswordError('Password is required');
    } else if (password.length < 6) {
        setPasswordError('Password must be at least 6 characters long');
    } else {
        setPasswordError('');
    }
};


export const validatePincode = (pincode, setPincodeError) => {
    const regex = /^[1-9]\d{5}$/;
    if (pincode.trim() === '') {
        setPincodeError('')
    } else if (regex.test(pincode)) {
        setPincodeError('');
    } else {
        setPincodeError('Invalid pincode. Please enter a  6-digit pincode.');
    }
}


export const ValiatePhoneNumber = (number, setNumberError) => {
    const regex = /^\d{10}$/;
    if (number.trim() === '') {
        setNumberError('');
    } else if (regex.test(number)) {
        setNumberError('');
    } else {
        setNumberError('Please enter a  10-digit number.');
    }
}


export const getErrorMessage = (error) => {
    if (error.response) {
        const responseDataErrors = error.response.data.errors;
        if (responseDataErrors && responseDataErrors.length >= 0) {
            return responseDataErrors.map((error) => ({
                field: error.attr,
                message: error.detail,
            }));
        }
    }
    return [{ field: 'general', message: 'An error occurred. Please try again later.' }];
};


export const checkDate = (expiryDate) => {
    const currentDate = new Date();
    if (expiryDate) {
        if (expiryDate < currentDate) {
            return true
        } else {
            return false
        }
    }

}

