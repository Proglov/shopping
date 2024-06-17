'use client'
import React, { useState } from 'react'
import { Box, Tab, Tabs, Typography } from '@mui/material'
import ProductsMain from '../admin-and-seller/products/ProductsMain';
import SellersMain from '../admin-and-seller/sellers/SellersMain';
import UsersMain from '../admin-and-seller/users/UsersMain';
import TXMain from '../admin-and-seller/txs/TXMain';
import CommentsMain from '../admin-and-seller/comments/CommentsMain';
import CategoriesMain from '../admin-and-seller/categories/CategoriesMain';
import Link from 'next/link';
import { TiArrowBackOutline } from "react-icons/ti";
import SubcategoriesMain from '../admin-and-seller/subcategories/SubcategoriesMain';
import { Provider } from "react-redux";
import { storeAdmin } from '@/components/admin-and-seller/redux/store';

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
        <Provider store={storeAdmin}>
            <Box
                className='mt-5 p-3 flex flex-col text-black'
                sx={{ flexGrow: 1 }}
            >
                <Link href={'/'} className='flex text-red-500'>
                    بازگشت
                    <TiArrowBackOutline className='mr-1 mt-1' />
                </Link>
                <Tabs
                    orientation='horizontal'
                    value={addSegmentsPage}
                    onChange={handleChange}
                    variant="scrollable"
                    visibleScrollbar
                    aria-label="horizontal tabs example"
                    textColor='inherit'
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: "#D97D54"
                        }
                    }}
                >
                    <Tab label="محصولات" {...a11yProps(0)} />
                    <Tab label="کاربران" {...a11yProps(1)} />
                    <Tab label="فروشندگان" {...a11yProps(2)} />
                    <Tab label="دسته بندی ها" {...a11yProps(3)} />
                    <Tab label="زیر دسته بندی ها" {...a11yProps(4)} />
                    <Tab label="تراکنش ها" {...a11yProps(5)} />
                    <Tab label="کامنت ها" {...a11yProps(6)} />
                </Tabs>
                <div style={{ width: '100%' }}>
                    <TabPanel value={addSegmentsPage} index={0} className='text-center'>
                        <ProductsMain which={"ADMIN"} />
                    </TabPanel>
                    <TabPanel value={addSegmentsPage} index={1} className='text-center'>
                        <UsersMain />
                    </TabPanel>
                    <TabPanel value={addSegmentsPage} index={2} className='text-center'>
                        <SellersMain />
                    </TabPanel>
                    <TabPanel value={addSegmentsPage} index={3} className='text-center'>
                        <CategoriesMain />
                    </TabPanel>
                    <TabPanel value={addSegmentsPage} index={4} className='text-center'>
                        <SubcategoriesMain />
                    </TabPanel>
                    <TabPanel value={addSegmentsPage} index={5} className='text-center'>
                        <TXMain which={"ADMIN"} />
                    </TabPanel>
                    <TabPanel value={addSegmentsPage} index={6} className='text-center'>
                        <CommentsMain />
                    </TabPanel>
                </div>
            </Box>
        </Provider>
    )
}
