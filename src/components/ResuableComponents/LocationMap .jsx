import React from 'react';

const LocationMap = ({ location }) => {
    const dummyLocation = {
        latitude: 40.7128,
        longitude: -74.0060,
        zoom: 12
    };

    const { latitude, longitude, zoom } = location || dummyLocation;

    return (
        <div className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden">
            <iframe
                title="Location Map"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${latitude},${longitude}&zoom=${zoom}`}
                allowFullScreen
            ></iframe>
        </div>
    );
}

export default LocationMap;
