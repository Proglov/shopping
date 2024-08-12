import GetParams from '@/components/products/GetParams';

export default function Product({ params }) {

    return (
        <GetParams id={params.id} />
    )
}
