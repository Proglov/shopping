'use client'
import { createContext, useState, useEffect } from 'react'
import { IoLocationOutline } from 'react-icons/io5'
import CitiesModal from './CitiesModal'
import Api from '@/services/withoutAuthActivities/city'

export const ModalContext = createContext(null)

export default function CitiesFilter() {
    const { getAllCitiesForNavbar, setCityIds } = Api;
    const [provinces, setProvinces] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSelected, setIsSelected] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)


    useEffect(() => {
        const fetchProvinces = async () => {
            const response = await getAllCitiesForNavbar();
            const allProvinces = response.cities.reduce((acc, curr) => {
                const existingProvince = acc.find(item => item.provinceId === curr.provinceId._id);

                if (existingProvince) {
                    existingProvince.cities.push({
                        cityId: curr._id,
                        cityName: curr.name,
                        isSelected: response?.preSelectedCities?.includes(curr._id) || false,
                    });
                } else {
                    acc.push({
                        provinceId: curr.provinceId._id,
                        provinceName: curr.provinceId.name,
                        cities: [{
                            cityId: curr._id,
                            cityName: curr.name,
                            isSelected: response?.preSelectedCities?.includes(curr._id) || false,
                        }],
                    });
                }

                return acc;
            }, []);
            setProvinces(allProvinces);
            const hasCities = response?.preSelectedCities.length > 0;
            setIsSelected(hasCities);
            setIsModalOpen(!hasCities);
        };
        fetchProvinces();
    }, []);



    const handleConfirm = async (isModified) => {
        if (isModified) {
            setIsLoading(true);
            const cityIds = [];

            provinces.forEach(province => {
                province.cities.forEach(city => {
                    if (city.isSelected) {
                        cityIds.push(city.cityId);
                    }
                });
            });


            try {
                await setCityIds({ cityIds })
            } catch (error) {
                toast.error('کوکی ست نشد!')
            }

            setIsLoading(false);
            location.reload();
        }

        setIsModalOpen(false);
    };

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
            <ModalContext.Provider value={{ isModalOpen, setIsModalOpen, provinces, setProvinces, handleConfirm, isLoading }}>
                <CitiesModal />
            </ModalContext.Provider>
        </>
    )
}
