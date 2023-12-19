'use client'
import { useState, useEffect } from 'react';

const Page = ({ params }) => {
    const [data, setData] = useState([]);
    const location = decodeURIComponent(params.location).replace(/-/g, ' ');

    useEffect(() => {
        fetch(`${process.env.BACKEND_BASE_URL}/submissions?location=${location}`)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error:', error));
    }, [location]);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-8 text-center">Explore Clinics in {location}</h1>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-self-center text-black">
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <div key={index} className="bg-white rounded-md shadow-lg overflow-hidden transition duration-300 transform hover:scale-105">
                            <div className="p-6">
                                <p className="text-2xl font-semibold mb-2">Clinic: {item.clinic.replace(/-/g, ' ')}</p>
                                <p className="text-lg">Dentist: {item.dentist.replace(/-/g, ' ')}</p>
                                <p className="text-lg">Service: {item.service.replace(/-/g, ' ')}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center h-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 border-t-blue-500"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
