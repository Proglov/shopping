"use client";
import { useContext, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { ModalContext } from './CitiesFilter';
import { MdExpandMore } from 'react-icons/md';
import { GradientCircularProgress } from '@/app/loading';

const ModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid red',
    boxShadow: '0px 0px 10px 1px red',
    p: 4,
    maxHeight: '80vh',
    overflowY: 'auto'
};

export default function CitiesModal() {
    const { isModalOpen, setIsModalOpen, provinces, setProvinces, handleConfirm, isLoading } = useContext(ModalContext);

    const [isModified, setIsModified] = useState(false);



    const handleClose = () => setIsModalOpen(false);


    const handleCheckboxChange = (provinceId, cityId) => {
        setIsModified(true)
        setProvinces(prev => {
            const newState = JSON.parse(JSON.stringify(prev));
            const provinceIndex = newState.findIndex(province => province.provinceId === provinceId);
            const cityIndex = newState[provinceIndex].cities.findIndex(city => city.cityId === cityId);
            newState[provinceIndex].cities[cityIndex].isSelected = !newState[provinceIndex].cities[cityIndex].isSelected;
            return newState;
        });
    };

    const isAllCitiesSelected = cities => cities.every(city => city.isSelected);

    const handleAllCitiesCheckboxChange = provinceId => {
        setIsModified(true)
        setProvinces(prev => {
            const newState = JSON.parse(JSON.stringify(prev));
            const provinceIndex = newState.findIndex(province => province.provinceId === provinceId);
            const bool = !isAllCitiesSelected(newState[provinceIndex].cities);
            newState[provinceIndex].cities.forEach(city => (city.isSelected = bool));
            return newState;
        });
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isModalOpen}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={isModalOpen}>
                <Box sx={ModalStyle} className='rounded-3xl'>
                    <div className='text-center w-full mb-3 text-cyan-700'>
                        شهرهای مورد نظرتان را انتخاب کنید
                    </div>
                    {provinces.map((provinceObj, i) => (
                        <Accordion key={i * 223 + 5}>
                            <AccordionSummary
                                expandIcon={<MdExpandMore />}
                                aria-controls="panel1-content"
                                id={"panel-header" + i}
                            >
                                <Typography>{provinceObj.provinceName}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className='flex justify-center'>
                                    <FormControlLabel
                                        dir='ltr'
                                        control={<Checkbox
                                            color='info'
                                            checked={isAllCitiesSelected(provinceObj.cities)}
                                            onChange={() => handleAllCitiesCheckboxChange(provinceObj.provinceId)}
                                        />}
                                        label={'همه ی ' + provinceObj.provinceName}
                                    />
                                </Typography>
                                <Typography className='flex flex-col items-center'>
                                    {provinceObj.cities.map(cityObj => (
                                        <FormControlLabel
                                            key={cityObj.cityId}
                                            dir='ltr'
                                            control={<Checkbox
                                                checked={cityObj.isSelected}
                                                onChange={() => handleCheckboxChange(provinceObj.provinceId, cityObj.cityId)}
                                            />}
                                            label={cityObj.cityName}
                                        />
                                    ))}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                    <div className='mt-6 flex justify-between'>
                        {isLoading ?
                            <div className='w-full text-center'>
                                <GradientCircularProgress />
                            </div>
                            :
                            <>
                                <Button onClick={() => handleConfirm(isModified)} variant='outlined'
                                    className='p-0 m-1'
                                    sx={{ color: 'green', borderColor: 'green' }}>
                                    تایید
                                </Button>
                                <Button onClick={handleClose} variant='outlined'
                                    className='p-0 m-1'
                                    sx={{ color: 'red', borderColor: 'red' }}>
                                    برگشت
                                </Button>
                            </>
                        }
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
}