'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const FormPage = () => {
    const router = useRouter();

    const [formState, setFormState] = useState({
        location: '',
        clinic: '',
        dentist: '',
        service: '',
    });

    const handleChange = (event) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { location, clinic, dentist, service } = formState;

        // Add your formatting logic here
        const formattedLocation = location.trim().replace(/\s+/g, '-').toLowerCase();
        const formattedClinic = clinic.trim().replace(/\s+/g, '-').toLowerCase();
        const formattedDentist = dentist.trim().replace(/\s+/g, '-').toLowerCase();
        const formattedService = service.trim().replace(/\s+/g, '-').toLowerCase();

        const response = await fetch(`${process.env.BACKEND_BASE_URL}/submissions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                location: formattedLocation,
                clinic: formattedClinic,
                dentist: formattedDentist,
                service: formattedService,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            console.error('Error:', response.statusText);
        }

        router.push(`/${formattedLocation}/${formattedClinic}/${formattedDentist}/${formattedService}`);
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-200">
            <form onSubmit={handleSubmit} className="max-w-md w-full p-8 bg-white shadow-md rounded-md text-black">
                <label className="block mb-4">
                    <span className="text-gray-700">Location:</span>
                    <input
                        type="text"
                        name="location"
                        placeholder="Enter your location"
                        onChange={handleChange}
                        className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                </label>
                <label className="block mb-4">
                    <span className="text-gray-700">Clinic:</span>
                    <input
                        type="text"
                        name="clinic"
                        placeholder="Enter clinic name"
                        onChange={handleChange}
                        className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                </label>
                <label className="block mb-4">
                    <span className="text-gray-700">Dentist:</span>
                    <input
                        type="text"
                        name="dentist"
                        placeholder="Enter dentist name"
                        onChange={handleChange}
                        className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                </label>
                <label className="block mb-4">
                    <span className="text-gray-700">Service:</span>
                    <input
                        type="text"
                        name="service"
                        placeholder="Enter service"
                        onChange={handleChange}
                        className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                </label>
                <button
                    type="submit"
                    className="w-full px-4 py-2 mt-4 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default FormPage;