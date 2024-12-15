"use client";
import { useContext, useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { ModalContext } from './CitiesFilter';
import { MdExpandMore } from 'react-icons/md';
import Api from '@/services/withoutAuthActivities/city';
import { GradientCircularProgress } from '@/app/loading';
import { getCookie, setCookie } from 'cookies-next';
import { GlobalContext } from '@/app/GlobalContext';

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
    const { isModalOpen, setIsModalOpen } = useContext(ModalContext);
    const cookie = getCookie('cityIds');
    const preSelectedCities = !!cookie ? JSON.parse(cookie) : [];
    const ctx = useContext(GlobalContext)
    const host = (new URL(ctx?.backend)).host || ""
    const domain = host.includes("localhost") ? null : host

    const [provinces, setProvinces] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModified, setIsModified] = useState(false);


    useEffect(() => {
        if (isModalOpen) {
            fetchProvinces();
        }
    }, [isModalOpen]);

    const fetchProvinces = async () => {
        const { getAllCities } = Api;
        const response = await getAllCities();
        const allProvinces = response.cities.reduce((acc, curr) => {
            const existingProvince = acc.find(item => item.provinceId === curr.provinceId._id);

            if (existingProvince) {
                existingProvince.cities.push({
                    cityId: curr._id,
                    cityName: curr.name,
                    isSelected: preSelectedCities.includes(curr._id),
                });
            } else {
                acc.push({
                    provinceId: curr.provinceId._id,
                    provinceName: curr.provinceId.name,
                    cities: [{
                        cityId: curr._id,
                        cityName: curr.name,
                        isSelected: preSelectedCities.includes(curr._id),
                    }],
                });
            }

            return acc;
        }, []);
        setProvinces(allProvinces);
    };

    const handleClose = () => setIsModalOpen(false);

    const handleConfirm = () => {
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

            setCookie('cityIds', cityIds, { maxAge: 3600, path: '/', sameSite: 'none', secure: true, domain });
            setIsLoading(false);
            location.reload();
        }

        setIsModalOpen(false);
    };

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
                                <Button onClick={handleConfirm} variant='outlined'
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