const Page = ({ params }) => {
    return (
        <div>page: {decodeURIComponent(params.location).replace(/-/g, ' ')}</div>
    )
}

export default Page;