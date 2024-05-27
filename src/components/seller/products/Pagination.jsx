'use client'
import { useContext } from 'react'
import { PaginationContext } from './ProductsTable'
import { BiSolidChevronsLeft, BiSolidChevronsRight, BiSolidChevronLeft, BiSolidChevronRight } from 'react-icons/bi'

export default function Pagination() {
    const { currentPage, setCurrentPage, lastPage } = useContext(PaginationContext)

    const handleFirstPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(1)
        }
    }

    const handleLastPage = () => {
        if (currentPage !== lastPage) {
            setCurrentPage(lastPage)
        }
    }

    const handleNextPage = () => {
        if (currentPage !== lastPage) {
            setCurrentPage((prev) => prev + 1)
        }
    }

    const handlePreviousPage = () => {
        if (currentPage !== 1) {
            setCurrentPage((prev) => prev - 1)
        }
    }

    const handlePageClick = (page) => {
        if (currentPage !== page) {
            setCurrentPage(page)
        }
    }

    const getPageButtons = () => {
        const range = 2
        const start = Math.max(currentPage - range, 1)
        const end = Math.min(currentPage + range, lastPage)

        const pageButtons = []

        for (let page = start; page <= end; page++) {

            pageButtons.push(
                <button
                    key={page}
                    className={`p-1 me-1 hover:bg-sky-500`}
                    style={{
                        borderRadius: '50%',
                        border: `${page === currentPage ? '1px solid yellowgreen' : ''}`,
                        fontSize: '10px',
                        width: '30px',
                        height: '30px',
                        lineHeight: '23px'
                    }}
                    onClick={() => handlePageClick(page)}
                >
                    {page}
                </button>
            )
        }

        return pageButtons
    }

    return (
        <div className='flex' dir='ltr'>
            <BiSolidChevronsLeft
                className={`p-1 me-1 hover:bg-sky-500 hover:text-white ${currentPage === 1 ? 'text-gray-400' : ''}`}
                style={{ borderRadius: '50%', fontSize: '30px' }}
                onClick={handleFirstPage}
            />

            <BiSolidChevronLeft
                className={`p-1  me-1 hover:bg-sky-500 hover:text-white ${currentPage === 1 ? 'text-gray-400' : ''}`}
                style={{ borderRadius: '50%', fontSize: '30px' }}
                onClick={handlePreviousPage}
            />

            {
                currentPage > 3 ?
                    <div style={{
                        width: '30px',
                        height: '30px',
                        cursor: 'default'
                    }}>...</div>
                    : ' '
            }

            {getPageButtons()}

            {
                currentPage < lastPage - 2 ?
                    <div style={{
                        width: '30px',
                        height: '30px',
                        cursor: 'default'
                    }}>...</div>
                    : ' '
            }


            <BiSolidChevronRight
                className={`p-1  me-1 hover:bg-sky-500 hover:text-white ${currentPage === lastPage ? 'text-gray-400' : ''}`}
                style={{ borderRadius: '50%', fontSize: '30px' }}
                onClick={handleNextPage}
            />

            <BiSolidChevronsRight
                className={`p-1 me-1 hover:bg-sky-500 hover:text-white ${currentPage === lastPage ? 'text-gray-400' : ''}`}
                style={{ borderRadius: '50%', fontSize: '30px' }}
                onClick={handleLastPage}
            />
        </div>
    )
}
