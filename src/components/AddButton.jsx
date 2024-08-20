'use client'
import { convertToFarsiNumbers } from '@/utils/funcs'
import { Button } from '@mui/material'
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddIcon from "@mui/icons-material/Add";
import { GiShoppingCart } from "react-icons/gi";
import { red } from "@mui/material/colors";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { AddCart, DecrementCart, IncrementCart } from '@/store/CartProductsSlice';


export default function AddButton({ productId, isMajorBuy, quantity, profit }) {
    const dispatch = useDispatch();
    const cartProducts = useSelector((state) => state.CartProducts);
    const login = useSelector((state) => state.Login);

    const [number, setNumber] = useState(0);

    useEffect(() => {
        const item = cartProducts.find((item) => item._id === productId)
        setNumber(item?.number?.toString());
    }, [setNumber, cartProducts, productId]);

    if (login === 'seller') return (
        <>
        </>
    )

    if (number > 0) return (
        <>
            <div className="border border-red-400 rounded-lg w-fit inline-block">
                <Button
                    sx={{ color: red[400] }}
                    onClick={() => dispatch(IncrementCart(productId))}
                >
                    <AddIcon />
                </Button>
                <span className="text-red-500">
                    {convertToFarsiNumbers(number)}
                </span>
                <Button
                    className="mx-0"
                    sx={{ color: red[400] }}
                    onClick={() => dispatch(DecrementCart(productId))}
                >
                    {number == 1 ? (
                        <DeleteOutlineOutlinedIcon />
                    ) : (
                        <RemoveOutlinedIcon />
                    )}
                </Button>
            </div>
            {
                isMajorBuy &&
                <div className='sm:text-sm text-xs text-teal-600'>
                    {
                        quantity > number ?
                            <>
                                {convertToFarsiNumbers(quantity - number)}
                                {" "}
                                عدد تا تخفیف!
                            </>
                            :
                            <>
                                {convertToFarsiNumbers(profit * number)}
                                {" "}
                                تومان
                                سود!
                            </>
                    }
                </div>
            }
        </>
    )

    return (<Button
        variant="outlined"
        color="primary"
        className="sm:w-fit sm:text-base text-xs"
        onClick={() => dispatch(AddCart(productId))}
    >
        افزودن به سبد
        <GiShoppingCart />
    </Button>)
}
