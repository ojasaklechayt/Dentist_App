const Page = ({ params }) => {
    return (
        <div>
            location: {decodeURIComponent(params.location).replace(/-/g, ' ')}
            <br />
            clinic: {decodeURIComponent(params.clinic).replace(/-/g, ' ')}
        </div>
    )
}

export default Page;