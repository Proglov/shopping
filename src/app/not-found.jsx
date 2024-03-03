import Link from 'next/link'
import { AiOutlineHome } from "react-icons/ai";

export default function NotFound() {
    return (
        <div className='bg-black w-full text-white text-center relative' style={{ height: '100vh' }}>
            <div className='w-full absolute top-1/3'>
                <h2 className='m-3'>متاسفم :(</h2>
                <p className='m-3'>صفحه ی مورد نظر شما یافت نشد</p>
                <div>
                    <Link href="/" className='text-red-400 flex justify-center'>
                        برگرد به خونه اول
                        <span className='p-1'>
                            <AiOutlineHome />
                        </span>
                    </Link>
                </div>
            </div>

        </div>
    )
}