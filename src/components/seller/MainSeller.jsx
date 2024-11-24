'use client'
import { Box, styled, Tab, Tabs, Typography } from '@mui/material'
import ProductsMain from '../admin-and-seller/products/ProductsMain';
import TXMain from '../admin-and-seller/txs/TXMain';
import Info from './Info';
import Link from 'next/link';
import { IoMdHome } from 'react-icons/io';
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation';
import ChangeProfile from './ChangeProfile';
import Discounts from '../admin-and-seller/disconts/Discounts';
import { resetToInitialState } from '../admin-and-seller/redux/reducers/global';
import UserInPersonsMain from '../admin-and-seller/userInPersons/UserInPersonsMain';
import TransactionInPersonsMain from '../admin-and-seller/transactionInPersons/TransactionInPersonsMain';
import WarehousesMain from '../admin-and-seller/warehouses/WarehouseMain';
import TelegramBot from './TelegramBot';

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
const StyledTabs = styled(Tabs)(() => ({
    '.MuiTabs-scrollButtons': {
        display: 'none'
    }
}));
const CustomTabs = ({ array, handleChange, tabs, discountTabs }) => (
    <Box className='max-w-6xl mx-auto shadow-lg lg:p-2 p-1'>
        <StyledTabs
            orientation='horizontal'
            value={tabs.active}
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
            {array.map((obj, index) => (<Tab key={index + 100} label={obj.name} {...a11yProps(index)} />))}
        </StyledTabs>
        <Box style={{ width: '100%' }}>
            {
                array.map(({ Component }, index) => {
                    const props = {
                        which: "Seller"
                    }
                    props.tabs = discountTabs
                    return (
                        <TabPanel key={index + 200} value={tabs.active} index={index} className='text-center'>
                            {<Component {...props} />}
                        </TabPanel>
                    )
                })
            }
        </Box>
    </Box>
)

export default function Main({ tabs, discountTabs }) {
    const router = useRouter()
    const dispatch = useDispatch()

    const handleChange = (_event, newPageIndex) => {
        // reset the global state
        dispatch(resetToInitialState())

        router.push(`/Seller?tab=${tabs[newPageIndex]}`)
    };

    const array = [
        { name: 'محصولات', Component: ProductsMain },
        { name: 'ربات تلگرام', Component: TelegramBot },
        { name: 'انبارها', Component: WarehousesMain },
        { name: 'مشتریان حضوری', Component: UserInPersonsMain },
        { name: 'سفارشات حضوری', Component: TransactionInPersonsMain },
        { name: 'تراکنش ها', Component: TXMain },
        { name: 'طرح های ویژه', Component: Discounts },
        { name: 'تنظیمات', Component: ChangeProfile }
    ]

    return (
        <>
            <Box className='mt-5 p-3 text-black'>

                <Typography className='w-full text-purple-600 underline hover:text-red-500'>
                    <Link href={'/'} className='flex max-w-5xl mx-auto'>
                        بازگشت به صفحه اصلی <IoMdHome className='mr-1 mt-1' />
                    </Link>
                </Typography>

                <br />

                <Box className='max-w-xl mx-auto'>
                    <Info />
                </Box>

                <CustomTabs array={array} handleChange={handleChange} tabs={tabs} discountTabs={discountTabs} />
            </Box>
        </>
    )
}
