'use client'
import { useEffect, useState } from "react";
import Api from "@/services/withoutAuthActivities/product";
import { Box, Paper, Tab, Table, TableBody, TableContainer, TableRow, Tabs, Typography } from "@mui/material";
import { StyledTableCell } from "@/components/admin-and-seller/products/ProductsTable";
import { GradientCircularProgress } from "@/app/loading";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { convertToFarsiNumbers, formatPrice, iranianCalendar } from "@/utils/funcs";
import DOMPurify from "dompurify";
import ProductTX from "./ProductTX";
import ProductComments from "./ProductComments";

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

export default function ProductMain({ id, tabs, which }) {
    const router = useRouter()
    const { getOneProduct } = Api;
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (_event, newPageIndex) => {
        router.push(`${(which === 'Seller' ? '/Seller' : '/ADMIN')}/products/${id}?tab=${tabs[newPageIndex]}`)
    };


    useEffect(() => {
        const getProduct = async () => {
            try {
                const productData = await getOneProduct({ id });
                setProduct(productData?.product);
            } catch (error) {
                setError(error);
                console.log(error);
            }
        };
        getProduct();
    }, [id]);

    if (error) {
        return <div className="w-full text-center mt-5 text-red-500">خطایی رخ داد: {error?.message.toString()}</div>;
    }

    if (!product) {
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

            <Typography className="text-center">
                محصول من
            </Typography>

            <TableContainer component={Paper} className="max-w-xl mx-auto">
                <Table aria-label="customized table">
                    <TableBody>
                        <TableRow>
                            <StyledTableCell className="border-l border-gray-300" align='center'>نام</StyledTableCell>
                            <StyledTableCell align='center'>{product?.name}</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell className="border-l border-gray-300" align='center'>دسته بندی</StyledTableCell>
                            <StyledTableCell align='center'>{product?.categoryName}</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell className="border-l border-gray-300" align='center'>زیر دسته بندی</StyledTableCell>
                            <StyledTableCell align='center'>{product?.subcategoryName}</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell className="border-l border-gray-300" align='center'>توضیحات</StyledTableCell>
                            <StyledTableCell align='center'>
                                <div dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(product?.desc)
                                }} />
                            </StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell className="border-l border-gray-300" align='center'>قیمت</StyledTableCell>
                            <StyledTableCell align='center'>{formatPrice(product?.price)} تومان</StyledTableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            {
                product?.which === 'festival' &&
                <Box className='text-center mt-3'>
                    <div className="text-emerald-600">
                        این محصول در جشنواره شگفت انگیز، تا تاریخ
                        {' '}
                        {
                            iranianCalendar(product?.until)
                        }
                        {' '}
                        ،
                        {' '}
                        {
                            convertToFarsiNumbers(product?.festivalOffPercentage)
                        }
                        {' '}
                        درصد تخفیف خورده است!
                    </div>
                    <div className="text-orange-500">
                        برای غیرفعال کردن طرح، به بخش طرح های ویژه در پنل مدیریت مراجعه بفرمایید
                    </div>
                </Box>
            }
            {
                product?.which === 'major' &&
                <Box className='text-center mt-3'>
                    <div className="text-emerald-600">
                        در طرح محصولات عمده، کاربران با خرید حداقل
                        {' '}
                        {
                            convertToFarsiNumbers(product?.quantity)
                        }
                        عدد،
                        {' '}
                        این محصول را با تخفیف
                        {' '}
                        {
                            convertToFarsiNumbers(product?.majorOffPercentage)
                        }
                        {' '}
                        درصد میتوانند تهیه کنند!
                    </div>
                    <div className="text-orange-500">
                        برای غیرفعال کردن طرح، به بخش طرح های ویژه در پنل مدیریت مراجعه بفرمایید
                    </div>
                </Box>
            }

            <Box
                className='mt-5 p-3 max-w-xl mx-auto flex flex-col text-black'
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
                        <Typography className="text-center pb-5">
                            تراکنش هایی که این محصول در آنها حضور دارد
                        </Typography>
                        <ProductTX id={id} which={which} />
                    </TabPanel>
                    <TabPanel value={tabs.active} index={1} className='text-center'>
                        <ProductComments id={id} />
                    </TabPanel>
                </div>
            </Box>
        </div>
    );
}