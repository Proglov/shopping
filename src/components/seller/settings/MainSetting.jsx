'use client'
import React, { useState } from 'react'
import { Box, Grid, Tab, Tabs, Typography } from '@mui/material'
import ChangeProfile from './ChangeProfile';
import Discounts from './Discounts';

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

export default function MainSetting() {
    const [addSegmentsPage, setAddSegmentsPage] = useState(0)

    const handleChange = (_event, newAddSegmentsPage) => {
        setAddSegmentsPage(newAddSegmentsPage);
    };

    return (
        <Grid container direction={'row-reverse'}
            className='text-black'
        // sx={{ flexGrow: 1 }}
        >
            <Grid item xs={12}>
                <Tabs
                    orientation='horizontal'
                    value={addSegmentsPage}
                    onChange={handleChange}
                    aria-label="horizontal tabs example"
                    textColor='inherit'
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: "#D97D54",
                        },
                    }}
                >
                    <Tab label="پروفایل" {...a11yProps(0)} />
                    <Tab label="تخفیف ها و جشنواره" {...a11yProps(1)} />
                </Tabs>
                <div style={{ width: '100%' }}>
                    <TabPanel value={addSegmentsPage} index={0} className='text-center'>
                        <ChangeProfile />
                    </TabPanel>
                    <TabPanel value={addSegmentsPage} index={1} className='text-center'>
                        <Discounts />
                    </TabPanel>
                </div>
            </Grid>
        </Grid>
    )
}
