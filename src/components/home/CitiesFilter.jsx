'use client'
import { createContext, useState, useEffect } from 'react'
import { IoLocationOutline } from 'react-icons/io5'
import CitiesModal from './CitiesModal'
import { getCookie } from 'cookies-next'

export const ModalContext = createContext(null)

export default function CitiesFilter() {
    const [isSelected, setIsSelected] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(true) // Assume modal should open if no city selected

    useEffect(() => {
        const cookieValue = getCookie('cityIds');
        let cityIds = [];

        try {
            cityIds = cookieValue ? JSON.parse(cookieValue) : [];
        } catch {
            cityIds = [];
        }

        const hasCities = cityIds.length > 0;
        setIsSelected(hasCities);
        setIsModalOpen(!hasCities);
    }, []);

    const clickHandler = () => {
        setIsModalOpen(true)
    }

    return (
        <>
            <div className="flex items-center justify-center text-lime-300 hover:cursor-pointer" onClick={clickHandler}>
                <span className='text-[10px] sm:text-2xl min-w-14 text-center underline'>
                    {isSelected ? 'تغییر شهر' : 'انتخاب شهر'}
                </span>
                <IoLocationOutline className='text-3xl text-red-600' />
            </div>
            <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
                <CitiesModal />
            </ModalContext.Provider>
        </>
    )
}
