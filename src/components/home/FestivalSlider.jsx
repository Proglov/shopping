'use client'
import { useCallback, useEffect, useRef, useState } from 'react';
import FestivalCropsComponent from './FestivalCropsComponent';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const FestivalSlider = ({ slides }) => {
    const [position, setPosition] = useState(0);
    const [firstTouchPosition, setfirstTouchPosition] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [currentIndex, setcurrentIndex] = useState(0);
    const [autoplayIsLeft, setAutoplayIsLeft] = useState(true);
    const timeRef = useRef(null);
    const divRef = useRef(null);

    const eachSlideWidth = 264; //width + padding + margin
    const slidesLength = slides.length;

    const handleNext = useCallback(() => {
        setAutoplayIsLeft(true)
        if (currentIndex < slidesLength - 1)
            setcurrentIndex(prev => prev + 1)
        else setcurrentIndex(0)
    }, [currentIndex]);

    const handlePrevious = useCallback(() => {
        setAutoplayIsLeft(false)
        if (currentIndex > 0)
            setcurrentIndex(prev => prev - 1)
        else setcurrentIndex(slidesLength - 1)
    }, [currentIndex]);

    const nTimesNext = n => {
        for (let i = 0; i < n; i++) handleNext()
    }

    const nTimesPrev = n => {
        for (let i = 0; i < n; i++) handlePrevious()
    }

    //autoplay
    useEffect(() => {
        if (timeRef.current) clearTimeout(timeRef.current)

        timeRef.current = setTimeout(() => {
            if (autoplayIsLeft)
                handleNext()
            else handlePrevious()
        }, 5000);

        return () => clearTimeout(timeRef.current)
    }, [handleNext, handlePrevious])

    //stop autoplay
    useEffect(() => {
        if (isDragging) clearTimeout(timeRef.current)
    }, [isDragging])

    //stop autoplay
    const handleMouseEnter = () => {
        clearTimeout(timeRef.current);
    };

    //resume autoplay
    const handleMouseLeave = () => {
        timeRef.current = setTimeout(handleNext, 5000);
    };

    const mouseMove = e => {
        if (isDragging) {
            setPosition(prevState => (prevState + e.movementX));
        }
    }

    const mouseUp = () => {
        setIsDragging(false);
        const n = position / eachSlideWidth;
        if (n > 0) {
            nTimesNext(Math.floor(n));
        } else {
            nTimesPrev(Math.floor(Math.abs(n)));
        }
        setPosition(0);
    }

    const touchStartHandler = e => {
        setfirstTouchPosition(e.touches[0].clientX)
        clearTimeout(timeRef.current);
    }

    const onTouchMoveHandler = (e) => {
        const currentPosition = e.touches[0].clientX;
        const delta = currentPosition - firstTouchPosition;
        setPosition(delta);
    }

    const sliderStyle = x => ({
        transform: `translateX(${position + (currentIndex < slidesLength - x ? currentIndex : slidesLength - x) * eachSlideWidth}px)`,
        transition: `${isDragging ? null : 'all ease 0.5s'}`
    })


    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className='overflow-x-hidden relative w-full'>

            {/* sm */}
            <div
                onMouseDown={() => { setIsDragging(true); clearTimeout(timeRef.current); }}
                onMouseMove={(e) => mouseMove(e)}
                onMouseUp={mouseUp}
                onTouchStart={(e) => touchStartHandler(e)}
                onTouchMove={(e) => onTouchMoveHandler(e)}
                onTouchEnd={mouseUp}
                ref={divRef}
                style={sliderStyle(2)}
                className='sm:flex md:hidden hidden'>
                {slides.map((slide, i) => (
                    <div key={i}>
                        <FestivalCropsComponent {...slide} isSelected={i === currentIndex} />
                    </div>
                ))}
            </div>

            {/* md */}
            <div
                onMouseDown={() => { setIsDragging(true); clearTimeout(timeRef.current); }}
                onMouseMove={(e) => mouseMove(e)}
                onMouseUp={mouseUp}
                onTouchStart={(e) => touchStartHandler(e)}
                onTouchMove={(e) => onTouchMoveHandler(e)}
                onTouchEnd={mouseUp}
                ref={divRef}
                style={sliderStyle(2)}
                className='md:flex lg:hidden hidden'>
                {slides.map((slide, i) => (
                    <div key={i}>
                        <FestivalCropsComponent {...slide} isSelected={i === currentIndex} />
                    </div>
                ))}
            </div>

            {/* lg */}
            <div
                onMouseDown={() => { setIsDragging(true); clearTimeout(timeRef.current); }}
                onMouseMove={(e) => mouseMove(e)}
                onMouseUp={mouseUp}
                onTouchStart={(e) => touchStartHandler(e)}
                onTouchMove={(e) => onTouchMoveHandler(e)}
                onTouchEnd={mouseUp}
                ref={divRef}
                style={sliderStyle(4)}
                className='lg:flex xl:hidden hidden'>
                {slides.map((slide, i) => (
                    <div key={i}>
                        <FestivalCropsComponent {...slide} isSelected={i === currentIndex} />
                    </div>
                ))}
            </div>

            {/* xl */}
            <div
                onMouseDown={() => { setIsDragging(true); clearTimeout(timeRef.current); }}
                onMouseMove={(e) => mouseMove(e)}
                onMouseUp={mouseUp}
                onTouchStart={(e) => touchStartHandler(e)}
                onTouchMove={(e) => onTouchMoveHandler(e)}
                onTouchEnd={mouseUp}
                ref={divRef}
                style={sliderStyle(4)}
                className='xl:flex hidden'>
                {slides.map((slide, i) => (
                    <div key={i}>
                        <FestivalCropsComponent {...slide} isSelected={i === currentIndex} />
                    </div>
                ))}
            </div>

            <div className='flex justify-between mx-2 absolute w-full' style={{ top: '40%' }}>
                <button onClick={handlePrevious}>
                    <GrFormNext className='text-white bg-green-400 rounded-full' style={{ fontSize: '40px' }} />
                </button>
                <button onClick={handleNext}>
                    <GrFormPrevious className='text-white bg-green-400 rounded-full me-4' style={{ fontSize: '40px' }} />
                </button>
            </div>
        </div>
    );
};

export default FestivalSlider;