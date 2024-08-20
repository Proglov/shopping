'use client'
import { useEffect, useState } from 'react';
import Api from '@/services/withAuthActivities/discounts/companyCouponForSomeProducts'
import { Box, Button, TextField, Typography } from '@mui/material'
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import { getOffCodeBody, setOffCodeToken } from '@/store/Storage/Storage';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DiscountCode() {
    const { GetTokenFromBodyCompanyCouponForSomeProducts } = Api
    const [body, setBody] = useState('')
    const [loading, setLoading] = useState(false)

    const sendBody = async () => {
        try {
            setLoading(true)
            if (body.length < 8) throw new Error('کد وارد شده صحیح نمیباشد')
            const res = await GetTokenFromBodyCompanyCouponForSomeProducts({ body })
            setOffCodeToken(res?.token, body)
            toast.success('کد تخفیف اعمال شد و تا پنج دقیقه آینده فرصت ثبت نهایی دارید', {
                position: toast.POSITION.TOP_RIGHT,
            });
        } catch (error) {
            const message = error?.response?.data?.message
            let farsiMessage;
            switch (message) {
                case 'Body is Not Valid!':
                    farsiMessage = 'توکن صحیح نیست یا منقضی شده است!'
                    break;
                default:
                    farsiMessage = 'کد وارد شده صحیح نمیباشد'
                    break;
            }
            toast.error(farsiMessage, {
                position: toast.POSITION.TOP_RIGHT,
            });
        } finally { setLoading(false) }
    }

    useEffect(() => {
        const { body } = getOffCodeBody()
        setBody(body)
    }, [])

    return (
        <Box className="mt-2" alignItems='center'>

            <Typography className='flex'>
                <ConfirmationNumberOutlinedIcon className="ml-1 mb-2 text-emerald-500" />
                افزودن کد تخفیف
            </Typography>

            <Typography className='flex justify-around items-baseline'>
                <TextField
                    disabled={loading}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="mt-2"
                    size="small"
                    label="کد تخفیف"
                    variant="outlined"
                    color="success"
                    sx={{
                        " & .MuiInputLabel-root": {
                            left: "inherit !important",
                            right: "1.75rem !important",
                            transformOrigin: "right !important",
                        }
                    }}
                />

                <Button variant='outlined' onClick={sendBody} disabled={loading}>
                    اعمال کد
                </Button>
            </Typography>

        </Box>
    )
}
