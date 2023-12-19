'use client'
import React, { useState, useEffect } from 'react';

const ServicesPage = ({ params }) => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedService, setSelectedService] = useState('');
    const location = decodeURIComponent(params.location).replace(/-/g, ' ');
    const clinic = decodeURIComponent(params.clinic);
    const dentist = decodeURIComponent(params.dentist);
    const services = decodeURIComponent(params.services);

    useEffect(() => {
        fetch(`${process.env.BACKEND_BASE_URL}/submissions?location=${location}&clinic=${clinic}&dentist=${dentist}&service=${services}`)
            .then(response => response.json())
            .then(data => {
                setData(data);
                setFilteredData(data);
            })
            .catch(error => console.error('Error:', error));
    }, [location, clinic, dentist, services]);

    const handleServiceFilter = (selectedService) => {
        setSelectedService(selectedService);

        if (selectedService === '') {
            setFilteredData(data);
        } else {
            const formattedInput = selectedService.toLowerCase().replace(/\s/g, '');

            const filtered = data.filter(item => {
                const formattedService = item.service.toLowerCase().replace(/-/g, '').replace(/\s/g, '');
                return formattedService.includes(formattedInput);
            });

            setFilteredData(filtered);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{clinic.replace(/-/g, ' ')} Services</h1>

            {/* Service Filter */}
            <div className="mb-4">
                <label className="text-gray-400">Filter by Service:</label>
                <input
                    type="text"
                    value={selectedService}
                    onChange={(e) => handleServiceFilter(e.target.value)}
                    className="border rounded-md p-2 ml-2 text-black"
                    placeholder="Enter service name"
                />
            </div>

            {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md mb-4 text-gray-800">
                        <p className="text-lg font-semibold mb-2">Dentist: {item.dentist.replace(/-/g, ' ')}</p>
                        <p className="text-gray-600 mb-2">Location: {item.location.replace(/-/g, ' ')}</p>
                        <p className="text-gray-600 mb-2">Clinic: {item.clinic.replace(/-/g, ' ')}</p>
                        <p className="text-gray-600 mb-2">Services: {item.service.replace(/-/g, ' ')}</p>
                    </div>
                ))
            ) : (
                <p>No matching services found...</p>
            )}
        </div>
    );
};

export default ServicesPage;