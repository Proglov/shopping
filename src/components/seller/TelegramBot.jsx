'use client'
import { useEffect, useState } from 'react';
import Api from '@/services/withAuthActivities/telegramBot';
import { GradientCircularProgress } from '@/app/loading';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';

const makeRed = str => (
    <span className='text-red-500'>{str}</span>
)
const numberFormatter = num => num.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
})

const LoggedIn = () => (
    <div className='text-cyan-600'>
        در حال حاضر شما عضو ربات ما هستید
        {makeRed('!')}
        <br />
        هرگونه خرید از فروشگاه شما{makeRed('،')} به شما اطلاع رسانی میگردد

        <ul className='list-disc  text-start text-green-600'>
            <li>
                برای لغو ارسال اطلاع رسانی به حساب تلگرام{makeRed('،')} وارد حساب تلگرامتان شده و logout{makeRed('/')} را در ربات فروشگاه وارد کنید
            </li>
            <li>
                برای ارسال اطلاع رسانی به حساب دیگرتان در تلگرام{makeRed('،')} ابتدا باید ارسال اطلاع رسانی به حساب قبلیتان را طبق مراحل گفته شده لغو کنید و دوباره جهت ارسال اطلاع رسانی اقدام نمایید
            </li>
        </ul>
    </div>
)
const GetCode = () => {
    const { GetTimeLeft, GetCodeForTelegram } = Api

    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        const getTime = async () => {
            const response = await GetTimeLeft()
            setTimeLeft(response?.timeLeft || 0)
        }
        getTime()
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(interval);
                setCode('')
            }
            else setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);

    }, [timeLeft]);

    const getCode = async () => {
        setLoading(true)

        try {
            const response = await GetCodeForTelegram()
            setCode(response?.code || '')
            setTimeLeft(180)
        } catch (error) {
            toast.error("کد برای شما ارسال شده است", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
        finally { setLoading(false) }
    }

    return (
        <div className='mt-4 flex justify-center items-center gap-1'>

            <Button variant='contained' color='info' disabled={loading || timeLeft > 0} onClick={getCode}>
                {
                    loading ?
                        <GradientCircularProgress />
                        :
                        timeLeft > 0 ?
                            <div dir='ltr'>
                                {numberFormatter(Math.floor(timeLeft / 60))} {makeRed(':')} {numberFormatter(timeLeft % 60)}
                            </div>
                            :
                            <>
                                دریافت کد
                            </>
                }
            </Button>

            {
                !!code &&
                <div className='border rounded-lg p-2'>
                    {code}
                </div>
            }
        </div >
    )
}
const LoggedOut = () => (
    <div className='text-cyan-600'>
        در حال حاضر شما عضو ربات ما {makeRed('نیستید')}{makeRed('!')}
        <br />
        با عضویت در ربات تلگرام فروشگاه{makeRed('،')} هرگونه خرید از فروشگاه شما{makeRed('،')} به شما اطلاع رسانی میگردد

        <br />

        مراحل عضویت در ربات{makeRed(':')}

        <ul className='list-disc  text-start text-green-600'>
            <li>
                ابتدا وارد حساب کاربری خود در تلگرام شوید
            </li>
            <li>
                سپس در قسمت جست و جو{makeRed('،')} آیدی {makeRed('Online_Shop_Iranian_Bot@')} را جست و جو کرده و ربات را استارت کنید
            </li>
            <li>
                سپس در ربات {makeRed('login/')} را وارد کرده و کدی که به شما داده میشود را وارد کنید
            </li>
        </ul>
        <GetCode />

    </div>
)

const TelegramBot = () => {
    const { CheckTelegramStatus } = Api;
    const [isLogged, setIsLogged] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await CheckTelegramStatus();
                setIsLogged(response?.isLogged);
            } catch (error) {
                toast.error(error);
                setIsLogged(false);
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
    }, [CheckTelegramStatus]);

    if (loading) {
        return <GradientCircularProgress />
    }

    if (isLogged) {
        return <LoggedIn />
    }

    return <LoggedOut />
}

export default TelegramBot;
