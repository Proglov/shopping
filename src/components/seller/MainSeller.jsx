'use client'
import React, { useState } from 'react'
import { Box, Grid, Tab, Tabs, Typography } from '@mui/material'
import ProductsMain from '../admin-and-seller/product/ProductsMain';
import TXMain from './txs/TXMain';
import Info from './Info';
import MainSetting from './settings/MainSetting';
import Link from 'next/link';
import { IoMdHome } from 'react-icons/io';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function Main() {
    const [addSegmentsPage, setAddSegmentsPage] = useState(0)

    const handleChange = (_event, newAddSegmentsPage) => {
        setAddSegmentsPage(newAddSegmentsPage);
    };

    return (
        <Grid container direction={'row-reverse'}
            className='mt-5 p-3 text-black'
        // sx={{ flexGrow: 1 }}
        >
            <div className='w-full text-purple-600 mb-3 underline hover:text-red-500'>
                <Link href={'/'} className='flex'>
                    بازگشت به صفحه اصلی <IoMdHome className='mr-1 mt-1' />
                </Link>
            </div>
            <Grid item xs={12} sm={12} md={5} lg={4} xl={3}>
                <Info />
            </Grid>
            <Grid item xs={12} sm={12} md={7} lg={8} xl={9} className='lg:p-2 p-1'>
                <Tabs
                    orientation='horizontal'
                    value={addSegmentsPage}
                    onChange={handleChange}
                    aria-label="horizontal tabs example"
                    textColor='inherit'
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: "#D97D54"
                        }
                    }}
                >
                    <Tab label="محصولات" {...a11yProps(0)} />
                    <Tab label="تراکنش ها" {...a11yProps(1)} />
                    <Tab label="تنظیمات" {...a11yProps(2)} />
                </Tabs>
                <div style={{ width: '100%' }}>
                    <TabPanel value={addSegmentsPage} index={0} className='text-center'>
                        <ProductsMain which={"Seller"} />
                    </TabPanel>
                    <TabPanel value={addSegmentsPage} index={1} className='text-center'>
                        <TXMain />
                    </TabPanel>
                    <TabPanel value={addSegmentsPage} index={2} className='text-center'>
                        <MainSetting />
                    </TabPanel>
                </div>
            </Grid>
        </Grid>
    )
}
