'use client'
const { Button } = require("@mui/material");
const { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } = require("react-icons/md");

function Arrow(props) {
    return (
        <Button
            sx={{ zIndex: 1000 }}
            onClick={props.onClick}
            className={`arrow ${props.left ? "arrow--left" : "arrow--right"}`}
        >
            {!!props.left && (
                <MdOutlineKeyboardArrowLeft className='text-6xl text-blue-500' />
            )}
            {!!props.right && (
                <MdOutlineKeyboardArrowRight className='text-6xl text-blue-500' />
            )}
        </Button>
    )
}


export default function SliderWrapper({ breakPoints, array, Component, componentProps, loaded, instanceRef, currentSlide, sliderRef, isLoading = false, Plate, extraProps = {}, plateExtraProps = {} }) {


    const getClassName = (str1, str2) => Object.keys(breakPoints).reduce((acc, curr) => {
        if (curr === 'xs')
            return acc + (breakPoints[curr] ? str1 : str2) + ' '
        return acc += curr + ':' + (breakPoints[curr] ? str1 : str2) + ' '
    }, '')


    return (
        <>
            <Plate {...plateExtraProps} classNameProp={getClassName('hidden', 'block') + ' w-fit mx-auto'} isLoading={isLoading} >
                <div className={`${getClassName('hidden', 'flex')} justify-center overflow-x-hidden w-full mb-3`}>
                    {array.map(item => (
                        <Component {...{ ...componentProps(item), ...extraProps }} key={item?._id} margin={1} />
                    ))}
                </div>
            </Plate>

            <Plate {...plateExtraProps} classNameProp={getClassName('block', 'hidden')} isLoading={isLoading}>
                <div className={getClassName('block', 'hidden')}>
                    <div className="navigation-wrapper">
                        {loaded && instanceRef.current && (
                            <Arrow
                                right={true}
                                onClick={(e) =>
                                    e.stopPropagation() || instanceRef.current?.next()
                                }
                            />
                        )}
                        <div ref={sliderRef} className="keen-slider">
                            {array.map(item => (
                                <div className="keen-slider__slide sm:min-w-64 min-w-52" key={item?._id}>
                                    <Component {...componentProps(item)} />
                                </div>
                            ))}
                        </div>
                        {loaded && instanceRef.current && (
                            <Arrow
                                left={true}
                                onClick={(e) =>
                                    e.stopPropagation() || instanceRef.current?.prev()
                                }
                            />
                        )}
                    </div>

                    {loaded && instanceRef.current && (
                        <div className="dots" dir="ltr">
                            {[
                                ...Array(instanceRef.current.track.details.slides.length).keys(),
                            ].map((idx) => {
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            instanceRef.current?.moveToIdx(idx)
                                        }}
                                        className={"dot" + (currentSlide === idx ? " active" : "")}
                                    ></button>
                                )
                            })}
                        </div>
                    )}
                </div>
            </Plate>
        </>
    );
};
