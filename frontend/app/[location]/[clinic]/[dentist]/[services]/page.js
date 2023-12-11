'use client'
import { useState, useEffect } from 'react';

const Page = ({ params }) => {
    const [data, setData] = useState([]);
    const location = decodeURIComponent(params.location).replace(/-/g, ' ');
    const clinic = decodeURIComponent(params.clinic);
    const dentist = decodeURIComponent(params.dentist);
    const services = decodeURIComponent(params.services);

    useEffect(() => {
        fetch(`${process.env.BACKEND_BASE_URL}/submissions?location=${location}&clinic=${clinic}&dentist=${dentist}&service=${services}`)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error:', error));
    }, [location, clinic, dentist, services]);

    return (
        <div>
            <h1>Page: {clinic}</h1>
            {data.length > 0 ? (
                data.map((item, index) => (
                    <div key={index} className="card">
                        <p>Location: {item.location.replace(/-/g, ' ')}</p>
                        <p>Clinic: {item.clinic.replace(/-/g, ' ')}</p>
                        <p>Dentist: {item.dentist.replace(/-/g, ' ')}</p>
                        <p>Services: {item.service.replace(/-/g, ' ')}</p>
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Page;