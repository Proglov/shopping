import { useState } from 'react';

export default function useComment() {
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');
    const [operatingID, setOperatingID] = useState('');
    const [operatingError, setOperatingError] = useState('');
    const [items, setItems] = useState([])
    const [itemsCount, setItemsCount] = useState(0)
    const [selectedId, setSelectedId] = useState('');

    return {
        items,
        setItems,
        currentPage,
        setCurrentPage,
        loading,
        setLoading,
        isError,
        setIsError,
        error,
        setError,
        operatingID,
        setOperatingID,
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
