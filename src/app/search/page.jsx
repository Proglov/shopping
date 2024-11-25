import Products from "@/components/categorization/Products"


function page({ searchParams }) {
    const str = searchParams?.str || ''

    return (
        <>
            <div className="max-w-3xl mx-auto">
                جست و جو برای
                {' "'}
                {str}
                {'"'}
            </div>
            <Products str={str} which={'search'} />
        </>
    )
}

export default page