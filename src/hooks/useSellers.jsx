import { useState } from 'react';

export default function useSellers() {
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');
    const [operatingError, setOperatingError] = useState('');
    const [items, setItems] = useState([])
    const [itemsCount, setItemsCount] = useState(0)
    const [selectedId, setSelectedId] = useState('');

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
        selectedId,
        setSelectedId,
        isModalConfirmOpen,
        setIsModalConfirmOpen,
        isModalDeleteOpen,
        setIsModalDeleteOpen,
    }
}
