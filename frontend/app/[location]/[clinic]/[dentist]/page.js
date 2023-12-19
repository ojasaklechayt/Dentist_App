'use client'
import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

const DentistPage = ({ params }) => {
    const [data, setData] = useState([]);
    const [selectedDentist, setSelectedDentist] = useState(null);
    const location = decodeURIComponent(params.location).replace(/-/g, ' ');
    const clinic = decodeURIComponent(params.clinic);
    const dentist = decodeURIComponent(params.dentist);

    useEffect(() => {
        fetch(`${process.env.BACKEND_BASE_URL}/submissions?location=${location}&clinic=${clinic}&dentist=${dentist}`)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error:', error));
    }, [location, clinic, dentist]);

    const openAppointmentModal = (dentistData) => {
        setSelectedDentist(dentistData);
    };

    const closeAppointmentModal = () => {
        setSelectedDentist(null);
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Dentist Information</h1>
            {data.length > 0 ? (
                data.map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md mb-4 text-gray-800">
                        <h2 className="text-2xl font-semibold mb-2">{item.dentist.replace(/-/g, ' ')}</h2>
                        <p className="text-gray-600 mb-2">Location: {item.location.replace(/-/g, ' ')}</p>
                        <p className="text-gray-600 mb-2">Clinic: {item.clinic.replace(/-/g, ' ')}</p>
                        <p className="text-gray-600 mb-2">Service: {item.service.replace(/-/g, ' ')}</p>
                        <div className="flex justify-between items-center mt-4">
                            <p className="text-gray-500">Contact: 0123456789</p>
                            <div className="flex items-center">
                                <p className="text-gray-500 mr-2">Rating:</p>
                                {Array.from({ length: Math.floor(5) }, (_, i) => (
                                    <FaStar key={i} className="text-yellow-500" />
                                ))}
                            </div>
                        </div>
                        <div className="mt-4">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => openAppointmentModal(item)}
                            >
                                Book Appointment
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}

            {/* Appointment Booking Modal */}
            {selectedDentist && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 max-w-md rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4">Book an Appointment</h2>
                        <p className="text-gray-600 mb-4">
                            You are about to book an appointment with {selectedDentist.dentist.replace(/-/g, ' ')} at {selectedDentist.clinic.replace(/-/g, ' ')}.
                        </p>
                        {/* Add more appointment booking details and form here */}
                        <div className="flex justify-end">
                            <button
                                className="text-blue-500 hover:text-blue-700 font-semibold"
                                onClick={closeAppointmentModal}
                            >
                                Cancel
                            </button>
                            {/* Add a button to confirm and submit the appointment booking */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DentistPage;
