'use client'
import { useCallback, useEffect, useRef, useState } from 'react';
import AdvertisementCropsComponent from './FestivalCropsComponent';
import { FcNext, FcPrevious } from "react-icons/fc";

const FestivalSlider = ({ slides }) => {
    const [array, setArray] = useState([]);
    const timeRef = useRef(null);

    useEffect(() => {
        const tempArr = [];
        for (let i = 0; i < slides.length; i++) {
            tempArr.push(slides[i])
        }
        setArray(tempArr)
    }, [])

    const handlePrevious = () => {
        setArray(prevArr => [...prevArr.slice(-1), ...prevArr.slice(0, -1)])
    };

    const handleNext = useCallback(() => {
        setArray(prevArr => [...prevArr.slice(1), prevArr[0]])
    }, [array]);

    useEffect(() => {
        if (timeRef.current) clearTimeout(timeRef.current)

        timeRef.current = setTimeout(() => {
            handleNext()
        }, 5000);

        return () => clearTimeout(timeRef.current)
    }, [handleNext])

    const handleMouseEnter = () => {
        clearTimeout(timeRef.current);
    };

    const handleMouseLeave = () => {
        timeRef.current = setTimeout(handleNext, 5000);
    };

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className='flex overflow-x-hidden'>
                {array.map((slide, index) => (
                    <div key={index}>
                        <AdvertisementCropsComponent {...slide} />
                    </div>
                ))}
            </div>

            <div className='flex justify-between mx-2'>
                <button onClick={handlePrevious}>
                    <FcNext style={{ fontSize: '30px' }} />
                </button>
                <button onClick={handleNext}>
                    <FcPrevious style={{ fontSize: '30px' }} />
                </button>
            </div>
        </div>
    );
};

export default FestivalSlider;