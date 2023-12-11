'use client'
import { useState, useEffect } from 'react';

const Page = ({ params }) => {
    const [data, setData] = useState([]);
    const location = decodeURIComponent(params.location).replace(/-/g, ' ');
    const clinic = decodeURIComponent(params.clinic);

    useEffect(() => {
        fetch(`${process.env.BACKEND_BASE_URL}/submissions?location=${location}&clinic=${clinic}`)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error:', error));
    }, [location]);

    return (
        <div>
            <h1>Page: {clinic}</h1>
            {data.length > 0 ? (
                data.map((item, index) => (
                    <div key={index} className="card">
                        <p>Dentist: {item.dentist.replace(/-/g, ' ')}</p>
                        <p>Service: {item.service.replace(/-/g, ' ')}</p>
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Page;