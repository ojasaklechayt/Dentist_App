const Page = ({ params }) => {
    return (
        <div>
            location: {decodeURIComponent(params.location).replace(/-/g, ' ')}
            <br />
            clinic: {decodeURIComponent(params.clinic).replace(/-/g, ' ')}
            <br />
            dentist: {decodeURIComponent(params.dentist).replace(/-/g, ' ')}
            <br />
            services: {decodeURIComponent(params.services).replace(/-/g, ' ')}
            <br />
        </div>
    )
}

export default Page;