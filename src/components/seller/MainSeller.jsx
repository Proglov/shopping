'use client'
import { Box, Tab, Tabs, Typography } from '@mui/material'
import ProductsMain from '../admin-and-seller/products/ProductsMain';
import TXMain from '../admin-and-seller/txs/TXMain';
import Info from './Info';
import Link from 'next/link';
import { IoMdHome } from 'react-icons/io';
import { Provider } from "react-redux";
import { storeAdmin } from '@/components/admin-and-seller/redux/store';
import { useRouter } from 'next/navigation';
import ChangeProfile from './ChangeProfile';
import Discounts from '../admin-and-seller/disconts/Discounts';

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

export default function Main({ tabs, discountTabs }) {
    const router = useRouter()

    const handleChange = (_event, newPageIndex) => {
        router.push(`/Seller?tab=${tabs[newPageIndex]}`)
    };


    return (
        <Provider store={storeAdmin}>
            <Box className='mt-5 p-3 text-black'>

                <Typography className='w-full text-purple-600 mb-3 underline hover:text-red-500'>
                    <Link href={'/'} className='flex'>
                        بازگشت به صفحه اصلی <IoMdHome className='mr-1 mt-1' />
                    </Link>
                </Typography>

                <Box className='max-w-xl mx-auto'>
                    <Info />
                </Box>

                <Box className='max-w-6xl mx-auto shadow-lg lg:p-2 p-1'>
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
                        <Tab label="محصولات" {...a11yProps(0)} />
                        <Tab label="تراکنش ها" {...a11yProps(1)} />
                        <Tab label="تنظیمات" {...a11yProps(2)} />
                        <Tab label="طرح های ویژه" {...a11yProps(3)} />
                    </Tabs>
                    <Box style={{ width: '100%' }}>
                        <TabPanel value={tabs.active} index={0} className='text-center'>
                            <ProductsMain which={"Seller"} />
                        </TabPanel>
                        <TabPanel value={tabs.active} index={1} className='text-center'>
                            <TXMain which={"Seller"} />
                        </TabPanel>
                        <TabPanel value={tabs.active} index={2} className='text-center'>
                            <ChangeProfile />
                        </TabPanel>
                        <TabPanel value={tabs.active} index={3} className='text-center'>
                            <Discounts which={"Seller"} tabs={discountTabs} />
                        </TabPanel>
                    </Box>
                </Box>
            </Box>
        </Provider>
    )
}
