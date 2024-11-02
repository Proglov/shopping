'use client'
import { createContext, useState } from 'react'
import { BiFilterAlt } from 'react-icons/bi'
import CitiesModal from './CitiesModal'


export const ModalContext = createContext(null)

export default function CitiesFilter() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <div className="flex items-center justify-center text-orange-400 hover:cursor-pointer" onClick={() => setIsModalOpen(true)}>
                <span className='sm:text-2xl text-lg underline'>فیلتر</span>
                <BiFilterAlt className='text-3xl text-red-700' />
            </div>
            <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
                <CitiesModal />
            </ModalContext.Provider>
        </>
    )
}