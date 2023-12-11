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

    const handleSubmit = (event) => {
        event.preventDefault();
        const { location, clinic, dentist, service } = formState;
        const formattedLocation = location.replace(/\s/g, '-');
        const formattedClinic = clinic.replace(/\s/g, '-');
        const formattedDentist = dentist.replace(/\s/g, '-');
        const formattedService = service.replace(/\s/g, '-');
        router.push(`/${formattedLocation}/${formattedClinic}/${formattedDentist}/${formattedService}`);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col max-w-md mx-auto">
            <label className="mb-2">
                Location:
                <input type="text" name="location" onChange={handleChange} className="w-full px-2 py-1 border rounded text-black" />
            </label>
            <label className="mb-2">
                Clinic:
                <input type="text" name="clinic" onChange={handleChange} className="w-full px-2 py-1 border rounded text-black" />
            </label>
            <label className="mb-2">
                Dentist:
                <input type="text" name="dentist" onChange={handleChange} className="w-full px-2 py-1 border rounded text-black" />
            </label>
            <label className="mb-2">
                Service:
                <input type="text" name="service" onChange={handleChange} className="w-full px-2 py-1 border rounded text-black" />
            </label>
            <button type="submit" className="px-4 py-2 mt-2 bg-blue-500 text-white rounded cursor-pointer">Submit</button>
        </form>
    );
};

export default FormPage;