import { useState } from 'react';

export default function useTX() {
    const [items, setItems] = useState([])
    const [selectedItem, setSelectedItem] = useState({})
    const [isModalShowMoreOpen, setIsModalShowMoreOpen] = useState(false);
    const [isModalDoneOpen, setIsModalDoneOpen] = useState(false);
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
        isModalShowMoreOpen,
        setIsModalShowMoreOpen,
        isModalDoneOpen,
        setIsModalDoneOpen,
        selectedItem,
        setSelectedItem
    }
}
