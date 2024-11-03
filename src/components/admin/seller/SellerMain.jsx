'use client'
import { useEffect, useState } from "react";
import Api from "@/services/withAuthActivities/seller";
import { Box, Paper, Tab, Table, TableBody, TableContainer, TableRow, Tabs, Typography } from "@mui/material";
import { StyledTableCell } from "@/components/admin-and-seller/products/ProductsTable";
import { GradientCircularProgress } from "@/app/loading";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import UserComments from "../user/UserComments";
import SellerProducts from "./SellerProducts";
import SellerTX from "./SellerTX";

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

export default function SellerMain({ id, tabs }) {
    const router = useRouter()
    const { getOneSeller } = Api;
    const [seller, setSeller] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (_event, newPageIndex) => {
        router.push(`/ADMIN/sellers/${id}?tab=${tabs[newPageIndex]}`)
    };


    useEffect(() => {
        const getSeller = async () => {
            try {
                const sellerData = await getOneSeller({ id });
                setSeller(sellerData?.seller);
            } catch (error) {
                setError(error);
                console.log(error);
            }
        };
        getSeller();
    }, [id]);

    if (error) {
        return <div className="w-full text-center mt-5 text-red-500">خطایی رخ داد: {error?.message.toString()}</div>;
    }

    if (!seller) {
        return (
            <div className="flex justify-center mt-10 overflow-y-hidden">
                <GradientCircularProgress />
            </div>
        )
    }

    return (
        <div className="mt-5">
            <Link href={'/'} className='max-w-xl flex mx-auto text-red-500 '>
                بازگشت به خانه
                <AiOutlineHome className='mr-1 mt-1' />
            </Link>

            <TableContainer component={Paper} className="max-w-xl mx-auto">
                <Table aria-label="customized table">
                    <TableBody>
                        <TableRow>
                            <StyledTableCell className="border-l border-gray-300" align='center'>نام</StyledTableCell>
                            <StyledTableCell align='center'>{seller?.name}</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell className="border-l border-gray-300" align='center'>نام کاربری</StyledTableCell>
                            <StyledTableCell align='center'>{seller?.username}</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell className="border-l border-gray-300" align='center'>ایمیل</StyledTableCell>
                            <StyledTableCell align='center'>{seller?.email}</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell className="border-l border-gray-300" align='center'>شماه همراه</StyledTableCell>
                            <StyledTableCell align='center'>{seller?.phone}</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell className="border-l border-gray-300" align='center'>تلفن محل کار</StyledTableCell>
                            <StyledTableCell align='center'>{seller?.workingPhone}</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell className="border-l border-gray-300" align='center'>بیوگرافی</StyledTableCell>
                            <StyledTableCell align='center'>{seller?.bio}</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell className="border-l border-gray-300" align='center'>آدرس محل کار</StyledTableCell>
                            <StyledTableCell align='center'>  {seller?.officeAddress?.completeAddress}  </StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell className="border-l border-gray-300" align='center'>وضعیت</StyledTableCell>
                            <StyledTableCell align='center'>
                                <span className={seller?.validated ? 'text-green-400' : 'text-red-500'}>
                                    {
                                        !seller?.validated &&
                                        'غیر'
                                    }
                                    فعال
                                </span>
                            </StyledTableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <Box
                className='mt-5 p-3 mx-auto flex flex-col max-w-4xl text-black'
                sx={{ flexGrow: 1 }}
            >
                <Tabs
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
                    <Tab label="محصولات" {...a11yProps(0)} />
                    <Tab label="سفارشات" {...a11yProps(1)} />
                    <Tab label="کامنت ها" {...a11yProps(2)} />
                </Tabs>
                <div style={{ width: '100%' }}>
                    <TabPanel value={tabs.active} index={0} className='text-center'>
                        <SellerProducts id={id} />
                    </TabPanel>
                    <TabPanel value={tabs.active} index={1} className='text-center'>
                        <SellerTX id={id} />
                    </TabPanel>
                    <TabPanel value={tabs.active} index={2} className='text-center'>
                        <UserComments id={id} />
                    </TabPanel>
                </div>
            </Box>
        </div>
    );
}