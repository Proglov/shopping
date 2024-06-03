'use client'
import React, { useState } from 'react'
import { Box, Tab, Tabs, Typography } from '@mui/material'
import ProductsMain from '../admin-and-seller/product/ProductsMain';
import UsersMain from '../admin-and-seller/users/UsersMain';
import TXMain from '../admin-and-seller/txs/TXMain';
import CommentsMain from '../admin-and-seller/comments/CommentsMain';

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
        <Box
            className='mt-5 p-3 flex flex-col text-black'
            sx={{ flexGrow: 1 }}
        >
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
                <Tab label="کاربران" {...a11yProps(1)} />
                <Tab label="تراکنش ها" {...a11yProps(2)} />
                <Tab label="کامنت ها" {...a11yProps(2)} />
            </Tabs>
            <div style={{ width: '100%' }}>
                <TabPanel value={addSegmentsPage} index={0} className='text-center'>
                    <ProductsMain which={"ADMIN"} />
                </TabPanel>
                <TabPanel value={addSegmentsPage} index={1} className='text-center'>
                    <UsersMain />
                </TabPanel>
                <TabPanel value={addSegmentsPage} index={2} className='text-center'>
                    <TXMain which={"ADMIN"} />
                </TabPanel>
                <TabPanel value={addSegmentsPage} index={3} className='text-center'>
                    <CommentsMain />
                </TabPanel>
            </div>
        </Box>
    )
}
