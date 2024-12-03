'use client'
import { Box, styled, Tab, Tabs, Typography } from '@mui/material'
import ProductsMain from '../admin-and-seller/products/ProductsMain';
import SellersMain from '../admin-and-seller/sellers/SellersMain';
import UsersMain from '../admin-and-seller/users/UsersMain';
import TXMain from '../admin-and-seller/txs/TXMain';
import CommentsMain from '../admin-and-seller/comments/CommentsMain';
import CategoriesMain from '../admin-and-seller/categories/CategoriesMain';
import Link from 'next/link';
import { TiArrowBackOutline } from "react-icons/ti";
import SubcategoriesMain from '../admin-and-seller/subcategories/SubcategoriesMain';
import { useDispatch } from "react-redux";
import { resetToInitialState } from '../admin-and-seller/redux/reducers/global';
import { useRouter } from 'next/navigation';
import Discounts from '../admin-and-seller/disconts/Discounts';
import TransactionInPersonsMain from '../admin-and-seller/transactionInPersons/TransactionInPersonsMain';
import UserInPersonsMain from '../admin-and-seller/userInPersons/UserInPersonsMain';
import WarehousesMain from '../admin-and-seller/warehouses/WarehouseMain';
import ProvincesMain from '../admin-and-seller/provinces/ProvincesMain';
import CitiesMain from '../admin-and-seller/cities/CitiesMain';

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
    <Box>
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
                        which: "ADMIN"
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
    const dispatch = useDispatch()
    const router = useRouter()

    const handleChange = (_event, newPageIndex) => {
        // reset the global state
        dispatch(resetToInitialState())

        router.push(`/ADMIN?tab=${tabs[newPageIndex]}`)
    };


    const array = [
        { name: 'محصولات', Component: ProductsMain },
        { name: 'انبارها', Component: WarehousesMain },
        { name: 'کاربران', Component: UsersMain },
        { name: 'مشتریان حضوری', Component: UserInPersonsMain },
        { name: 'سفارشات حضوری', Component: TransactionInPersonsMain },
        { name: 'فروشندگان', Component: SellersMain },
        { name: 'دسته بندی ها', Component: CategoriesMain },
        { name: 'زیر دسته بندی ها', Component: SubcategoriesMain },
        { name: 'استان ها', Component: ProvincesMain },
        { name: 'شهر ها', Component: CitiesMain },
        { name: 'تراکنش ها', Component: TXMain },
        { name: 'کامنت ها', Component: CommentsMain },
        { name: 'طرح های ویژه', Component: Discounts }
    ]

    return (
        <>
            <Box
                className='mt-5 p-3 flex flex-col text-black mx-auto max-w-5xl'
                sx={{ flexGrow: 1 }}
            >
                <Link href={'/'} className='flex text-red-500'>
                    بازگشت
                    <TiArrowBackOutline className='mr-1 mt-1' />
                </Link>


                <CustomTabs array={array} handleChange={handleChange} tabs={tabs} discountTabs={discountTabs} />

            </Box>
        </>
    )
}