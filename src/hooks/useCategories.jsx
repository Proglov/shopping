import { useState } from 'react';

export default function useCategories() {
    const [items, setItems] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');
    const [operatingError, setOperatingError] = useState('');
    const [itemsCount, setItemsCount] = useState(0)


    return {
        items,
        setItems,
        currentPage,
        setCurrentPage,
        lastPage,
        setLastPage,
        loading,
        setLoading,
        isError,
        setIsError,
        error,
        setError,
        operatingError,
        setOperatingError,
        itemsCount,
        setItemsCount,
    }
}
