'use client'
import { BiSolidChevronsLeft, BiSolidChevronsRight, BiSolidChevronLeft, BiSolidChevronRight } from 'react-icons/bi'
import { useDispatch } from 'react-redux';

export default function Pagination({ currentPage, setCurrentPage, lastPage }) {
    const dispatch = useDispatch();

    const handleFirstPage = () => {
        if (currentPage !== 1) {
            dispatch(setCurrentPage(1))
        }
    }

    const handleLastPage = () => {
        if (currentPage !== lastPage) {
            setCurrentPage(lastPage)
            dispatch(setCurrentPage(lastPage))
        }
    }

    const handleNextPage = () => {
        if (currentPage !== lastPage) {
            dispatch(setCurrentPage("INC"))
        }
    }

    const handlePreviousPage = () => {
        if (currentPage !== 1) {
            dispatch(setCurrentPage("DEC"))
        }
    }

    const handlePageClick = (page) => {
        if (currentPage !== page) {
            dispatch(setCurrentPage(page))
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
                    className={`p-1 me-1 hover:bg-sky-500 hover:text-white`}
                    style={{
                        borderRadius: '40%',
                        border: `${page === currentPage ? '1px solid yellowgreen' : ''}`,
                        fontSize: '12px',
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
