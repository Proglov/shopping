"use client"
import { Button, Stack } from '@mui/material';
import { useEffect, useState, createContext, useContext } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { RxCross2 } from 'react-icons/rx';
import { FcCheckmark } from 'react-icons/fc';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function ProductsTable() {
    const [imagesToDelete, setImagesToDelete] = useState([]);
    const [fileStates, setFileStates] = useState([]);
    const [uploadRes, setUploadRes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(false);
    const [operatingID, setOperatingID] = useState('');
    const [operatingError, setOperatingError] = useState('');
    const [selectedItem, setSelectedItem] = useState({
        id: '',
        title: '',
        description: '',
        imagesURL: [],
        tags: [],
        createdBy: '',
        telegram: false
    });

    // useEffect(() => {
    //     setLoading(true);
    //     //get the count

    //     //get the products
    // }, [currentInfoPage]);
    return (
        <Stack spacing={2} className='mt-10'>
            {isError ? (
                <div>
                    مشکلی رخ داد! لطفا دوباره تلاش کنید ...
                    <br />
                    {error.toString()}
                </div>
            ) : loading ? (
                <div>درحال دریافت اطلاعات ...</div>
            ) : (
                infoItems?.length !== 0 ?
                    <div>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 1000 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align='center'>ردیف</StyledTableCell>
                                        <StyledTableCell align='center'>عنوان</StyledTableCell>
                                        <StyledTableCell align='center'>ارسال کننده</StyledTableCell>
                                        <StyledTableCell align='center'>بازدیدها</StyledTableCell>
                                        <StyledTableCell align='center'>برچسب ها</StyledTableCell>
                                        <StyledTableCell align='center'>وضعیت</StyledTableCell>
                                        <StyledTableCell align='center'>تاریخ</StyledTableCell>
                                        <StyledTableCell align='center'>شبکه های اجتماعی</StyledTableCell>
                                        <StyledTableCell align='center'>عملیات</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {infoItems.map((item, index) => (
                                        <StyledTableRow key={item.id}
                                            className='align-middle'>
                                            <StyledTableCell align='center'>{index + 1 + infoItemsPerPage * (currentInfoPage - 1)}</StyledTableCell>
                                            <StyledTableCell align='center'>{item.title}</StyledTableCell>
                                            <StyledTableCell align='center'>{item.createdBy}</StyledTableCell>
                                            <StyledTableCell align='center'>{item.views}</StyledTableCell>
                                            <StyledTableCell className='flex flex-col justify-center'>
                                                <ul className='flex flex-col justify-center align-middle'>
                                                    {item.tags.map((tag, i) => {
                                                        return <li key={i} className='rtl text-center m-1' style={{ fontSize: '12px', minWidth: '80px' }}>{tag}</li>;
                                                    })}
                                                </ul>
                                            </StyledTableCell>
                                            <StyledTableCell align='center'>
                                                <div
                                                    className='mx-auto'
                                                    style={{
                                                        width: '8px',
                                                        height: '8px',
                                                        backgroundColor: item.status ? 'green' : 'orange',
                                                        borderRadius: '50%',
                                                    }}
                                                ></div>
                                            </StyledTableCell>
                                            <StyledTableCell align='center'>{new Intl.DateTimeFormat('fa-IR').format(new Date(item.createdAt))}</StyledTableCell>
                                            <StyledTableCell align='center'>
                                                {item.telegram ? <FcCheckmark className='mx-auto' /> : <RxCross2 color='red' className='mx-auto' />}
                                            </StyledTableCell>
                                            <StyledTableCell className='flex flex-col justify-center border-b-0 align-middle'>
                                                {operatingID === item.id ? (
                                                    <div className='text-center mt-2 text-xs'>درحال انجام عملیات</div>
                                                ) : (
                                                    <>
                                                        {!item.status && (
                                                            <Button onClick={() => {
                                                                setIsModalConfirmOpen(true);
                                                                setSelectedItem({
                                                                    ...item
                                                                })
                                                            }}
                                                                variant='outlined'
                                                                className='p-0 m-1'
                                                                sx={{ color: 'green', borderColor: 'green' }}>
                                                                تایید
                                                            </Button>
                                                        )}
                                                        <Button
                                                            variant='outlined'
                                                            className='p-0 m-1'
                                                            sx={{ color: 'primary', borderColor: 'primary' }}
                                                            onClick={() => {
                                                                setIsModalEditOpen(true);
                                                                setSelectedItem({
                                                                    ...item
                                                                });
                                                            }}
                                                        >
                                                            ویرایش
                                                        </Button>
                                                        <Button
                                                            variant='outlined'
                                                            sx={{ color: 'red', borderColor: 'red' }}
                                                            className='p-0 m-1'
                                                            onClick={() => {
                                                                setIsModalDeleteOpen(true);
                                                                setSelectedItem({
                                                                    id: item.id,
                                                                    description: item.description,
                                                                    title: item.title,
                                                                    imagesURL: item.imagesURL,
                                                                    createdBy: item.createdBy,
                                                                    tags: item.tags,
                                                                    telegram: item.telegram
                                                                })
                                                            }}
                                                        >
                                                            حذف
                                                        </Button>
                                                    </>
                                                )}
                                                {operatingID === item.id && operatingError !== '' ? (
                                                    <div>مشکلی پیش امده است. لطفا اتصال اینترنت را بررسی کنید</div>
                                                ) : ''}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {/* <div className='flex justify-center' style={{ marginTop: '25px' }}>
                            <NewsContext.Provider value={{ currentInfoPage, setCurrentInfoPage }}>
                                <Pagination lastPage={lastInfoTablePageNumber} />
                            </NewsContext.Provider>
                        </div> */}
                    </div>
                    : <div>
                        اطلاعاتی جهت نمایش وجود ندارد
                    </div>
            )}
            {/* 
            <ModalConfirmContext.Provider value={{ isModalConfirmOpen, setIsModalConfirmOpen, confirmItem }}>
                <ModalConfirm type={type} id={selectedItem.id} title={selectedItem.title} description={selectedItem.description} imagesURL={selectedItem.imagesURL} tags={selectedItem.tags} createdBy={selectedItem.createdBy} eventAt={null || selectedItem.eventAt} />
            </ModalConfirmContext.Provider>
            <ModalDeleteContext.Provider value={{ isModalDeleteOpen, setIsModalDeleteOpen, deleteItem }}>
                <ModalDelete id={selectedItem.id} type={type} />
            </ModalDeleteContext.Provider>
            <ModalEditContext.Provider value={{
                isModalEditOpen,
                setIsModalEditOpen,
                setSelectedItem,
                selectedItem,
                fileStates,
                setFileStates,
                setUploadRes,
                updateFileProgress,
                editItem,
                type,
                setImagesToDelete
            }}>
                <ModalEdit />
            </ModalEditContext.Provider> */}

        </Stack>
    );
}
