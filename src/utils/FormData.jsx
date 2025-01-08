import { useState } from "react";
import { Country, State, City } from 'country-state-city';


export const useFormData = () => {
    const [formData, setFormData] = useState({
        organization: '',
        owner: '',
        PinCode: '',
        Locality: '',
        Town: '',
        District: '',
        State: '',
        country: '',
        KeyPersonName: '',
        KeyPersonContact: '',
        Landphone: '',
        RegisteredAddress: '',
        category: '',
        email_id: '',
        website: '',
        google_map_link: '',
        facebook_link: '',
        instagram_link: '',
        youtube_link: '',
        NormalWorkingHoursFrom: '',
        NormalWorkingHoursTo: '',
        image: [],
        logo: [],
        head_office_address: '',
        mobile_number: '',
        HomeDelivery: '',
        sales_type: '',
    });

    return [formData, setFormData];
};


export const getCities = () => {

    const cities = City.getCitiesOfState("IN", "KL").map(c => c.name)
    return cities
}

export const getStates = () => {
    const countries = Country.getAllCountries();

    const india = countries.find(country => country.isoCode === 'IN');

    const states = State.getStatesOfCountry(india.isoCode);

    return states
}


export const keralaDistricts = [
    "Alappuzha",
    "Ernakulam",
    "Idukki",
    "Kannur",
    "Kasaragod",
    "Kollam",
    "Kottayam",
    "Kozhikode",
    "Malappuram",
    "Palakkad",
    "Pathanamthitta",
    "Thiruvananthapuram",
    "Thrissur",
    "Wayanad"
];

export const useFormData2 = () => {
    const [formData2, setFormData2] = useState({
        PinCode: '',
        Locality: '',
        Town: '',
        District: '',
        State: '',
        country: '',
        KeyPersonName: '',
        KeyPersonContact: '',
        Landphone: '',
        RegisteredAddress: '',
        website: '',
        google_map_link: '',
        NormalWorkingHoursFrom: '',
        NormalWorkingHoursTo: '',
        image: [],
        head_office_address: '',
        HomeDelivery: '',
        sales_type: '',
        company: '',
    });

    return [formData2, setFormData2];
};


function ProfileEditForm() {
    const [formData, setFormData] = useState({
        name: '',
        number: '',
        district: '',
        state: '',
        address: '',
        dob: '',
        email_id: '',
        pincode: '',
        country: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return { formData, handleChange, setFormData };
}

export default ProfileEditForm;
