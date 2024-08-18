'use client'
import { Box, Tab, Tabs, Typography } from '@mui/material'
import { useRouter } from 'next/navigation';
import FestivalMain from './festivals/FestivalMain';
import MajorShoppingMain from './majorShopping/MajorShoppingMain';

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

export default function Discounts({ which, tabs }) {
    const router = useRouter()

    const handleChange = (_event, newPageIndex) => {
        router.push(`/${which}?tab=discounts&discountTab=${tabs[newPageIndex]}`)
    };

    return (
        <Box className='p-3 lg:p-2 text-black'>

            <Tabs
                orientation='horizontal'
                value={tabs.active}
                onChange={handleChange}
                aria-label="horizontal tabs example"
                textColor='inherit'
                TabIndicatorProps={{
                    style: {
                        backgroundColor: "#D97D54"
                    }
                }}
            >
                <Tab label="جشنواره" {...a11yProps(0)} />
                <Tab label="محصولات عمده" {...a11yProps(1)} />
                <Tab label="پرسنلی" {...a11yProps(2)} />
            </Tabs>

            <Box style={{ width: '100%' }}>
                <TabPanel value={tabs.active} index={0} className='text-center'>
                    <FestivalMain which={'Seller'} />
                </TabPanel>
                <TabPanel value={tabs.active} index={1} className='text-center'>
                    <MajorShoppingMain which={'Seller'} />
                </TabPanel>
                <TabPanel value={tabs.active} index={2} className='text-center'>
                    خرید پرسنلی
                </TabPanel>
            </Box>

        </Box>
    )
}
