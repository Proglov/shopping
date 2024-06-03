import { useState } from 'react';

export default function useUsers() {
    const [items, setItems] = useState([])
    const [selectedItem, setSelectedItem] = useState({})
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');
    const [operatingID, setOperatingID] = useState('');
    const [operatingError, setOperatingError] = useState('');
    const [itemsCount, setItemsCount] = useState(0)


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
        isModalDeleteOpen,
        setIsModalDeleteOpen,
        isModalEditOpen,
        setIsModalEditOpen,
        selectedItem,
        setSelectedItem
    }
}
