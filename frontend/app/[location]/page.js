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
        <div>
            <h1 className="text-2xl font-bold mb-4">Page: {location}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <div key={index} className="bg-white p-6 rounded-md shadow-md text-black">
                            <p className="text-xl font-semibold mb-2">Clinic: {item.clinic.replace(/-/g, ' ')}</p>
                            <p className="text-md">Dentist: {item.dentist.replace(/-/g, ' ')}</p>
                            <p className="text-md">Service: {item.service.replace(/-/g, ' ')}</p>
                        </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Page;
