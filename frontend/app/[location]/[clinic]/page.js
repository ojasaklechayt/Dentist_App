'use client'
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Page = ({ params }) => {
    const [data, setData] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const location = decodeURIComponent(params.location).replace(/-/g, ' ');
    const clinic = decodeURIComponent(params.clinic);

    useEffect(() => {
        fetch(`${process.env.BACKEND_BASE_URL}/submissions?location=${location}&clinic=${clinic}`)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error:', error));
    }, [location]);

    const openModal = (appointment) => {
        setSelectedAppointment(appointment);
    };

    const closeModal = () => {
        setSelectedAppointment(null);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className="p-6 min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Clinic: {clinic.replace(/-/g, ' ')}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
                            <p className="text-xl font-semibold text-gray-800 mb-2">Dentist: {item.dentist.replace(/-/g, ' ')}</p>
                            <p className="text-gray-600 mb-4">Service: {item.service.replace(/-/g, ' ')}</p>
                            <div className="flex justify-between items-center">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => openModal(item)}>
                                    Book Appointment
                                </button>
                                <span className="text-gray-500">{item.date}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-lg text-gray-600">Loading...</p>
                )}
            </div>

            {/* Modal for displaying more details */}
            {selectedAppointment && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center text-black">
                    <div className="bg-white p-8 max-w-md rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4">Appointment Details</h2>
                        <p><strong>Dentist:</strong> {selectedAppointment.dentist.replace(/-/g, ' ')}</p>
                        <p><strong>Service:</strong> {selectedAppointment.service.replace(/-/g, ' ')}</p>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="datepicker">
                                Select Date:
                            </label>
                            <DatePicker
                                id="datepicker"
                                selected={selectedDate}
                                onChange={handleDateChange}
                                minDate={new Date()}
                                maxDate={new Date().setDate(new Date().getDate() + 10)}
                                dateFormat="MMMM d, yyyy"
                                className="p-2 border rounded"
                            />
                        </div>
                        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={closeModal}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
