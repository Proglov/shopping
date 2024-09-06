'use client'
import { useEffect, useState } from "react";
import Api from "@/services/withAuthActivities/user";
import { Box, Paper, Tab, Table, TableBody, TableContainer, TableRow, Tabs, Typography } from "@mui/material";
import { StyledTableCell } from "@/components/admin-and-seller/products/ProductsTable";
import { GradientCircularProgress } from "@/app/loading";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import UserTX from "./UserTX";
import UserComments from "./UserComments";

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

export default function UserMain({ id, tabs }) {
    const router = useRouter()
    const { getOneUser } = Api;
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (_event, newPageIndex) => {
        router.push(`/ADMIN/users/${id}?tab=${tabs[newPageIndex]}`)
    };


    useEffect(() => {
        const getUser = async () => {
            try {
                const userData = await getOneUser({ id });
                setUser(userData?.user);
            } catch (error) {
                setError(error);
                console.log(error);
            }
        };
        getUser();
    }, [id]);

    if (error) {
        return <div className="w-full text-center mt-5 text-red-500">خطایی رخ داد: {error?.message.toString()}</div>;
    }

    if (!user) {
        return (
            <div className="flex justify-center mt-10 overflow-y-hidden">
                <GradientCircularProgress />
            </div>
        )
    }

    return (
        <div className="mt-5">
            <Link href={'/'} className='flex justify-center text-red-500 underline my-4'>
                بازگشت به خانه
                <AiOutlineHome className='mr-1 mt-1' />
            </Link>

            <TableContainer component={Paper} className="max-w-xl mx-auto">
                <Table aria-label="customized table">
                    <TableBody>
                        <TableRow>
                            <StyledTableCell className="border-l border-gray-300" align='center'>نام</StyledTableCell>
                            <StyledTableCell align='center'>{user?.name}</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell className="border-l border-gray-300" align='center'>نام کاربری</StyledTableCell>
                            <StyledTableCell align='center'>{user?.username}</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell className="border-l border-gray-300" align='center'>ایمیل</StyledTableCell>
                            <StyledTableCell align='center'>{user?.email}</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell className="border-l border-gray-300" align='center'>شماره</StyledTableCell>
                            <StyledTableCell align='center'>{user?.phone}</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell className="border-l border-gray-300" align='center'>آدرس ها</StyledTableCell>
                            <StyledTableCell align='center'>
                                {user?.address.map((address, i) => (
                                    <div key={i} className="border-b border-gray-300 py-2">
                                        {address}
                                    </div>
                                ))}
                            </StyledTableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <Box
                className='mt-5 p-3 flex flex-col text-black'
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
                    <Tab label="تراکنش ها" {...a11yProps(0)} />
                    <Tab label="کامنت ها" {...a11yProps(1)} />
                </Tabs>
                <div style={{ width: '100%' }}>
                    <TabPanel value={tabs.active} index={0} className='text-center'>
                        <UserTX id={id} />
                    </TabPanel>
                    <TabPanel value={tabs.active} index={1} className='text-center'>
                        <UserComments id={id} />
                    </TabPanel>
                </div>
            </Box>
        </div>
    );
}