'use client'
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';


function GradientCircularProgress() {
    return (
        <React.Fragment>
            <svg width={0} height={0}>
                <defs>
                    <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#e01cd5" />
                        <stop offset="100%" stopColor="#1CB5E0" />
                    </linearGradient>
                </defs>
            </svg>
            <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
        </React.Fragment>
    );
}


export default function Loading() {
    return (
        <div className='bg-black w-full text-white text-center relative' style={{ height: '100vh' }}>
            <div className='w-full absolute top-1/3 flex justify-center'>
                <p className='m-3'>لطفا منتظر بمانید</p>
                <GradientCircularProgress />
            </div>
        </div>
    )
}