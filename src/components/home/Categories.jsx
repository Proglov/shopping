import { Grid, Typography } from "@mui/material"
import CategoryComponent from "./CategoryComponent"
import { TbCategory } from "react-icons/tb"

export default function Categories() {
    return (
        <div className="m-4">

            <div className='border border-gray-300 top-3 relative' style={{ transform: 'translateY(15px)' }}></div>

            <div>
                <Typography
                    sx={{
                        zIndex: '100',
                        position: 'relative',
                        width: {
                            sm: '20%',
                            md: '22%',
                            lg: '20%',
                            xl: '15%'
                        },
                        fontSize: {
                            xs: '20px',
                            sm: '16px',
                            md: '20px',
                            lg: '24px',
                            xl: '30px'
                        }
                    }}
                    className='bg-white m-2 flex justify-center mx-auto'>
                    <TbCategory className='mt-1 text-cyan-500' />
                    <span className='mx-2'>دسته بندی</span>
                </Typography>
            </div>


            <Grid container gap={2} justifyContent={"center"}>
                <Grid item xs={3} lg={2}>
                    <CategoryComponent href='/#' caption='لبنیات' src='/img/home/category-labaniat.jpg' charachtersLengthLevel={0} />
                </Grid>
                <Grid item xs={3} lg={2}>
                    <CategoryComponent href='/#' caption='تنقلات' src='/img/home/tanagholat.jpg' charachtersLengthLevel={0} />
                </Grid>
                <Grid item xs={3} lg={2}>
                    <CategoryComponent href='/#' caption='نوشیدنی' src='/img/home/category-labaniat.jpg' charachtersLengthLevel={0} />
                </Grid>
                <Grid item xs={3} lg={2}>
                    <CategoryComponent href='/#' caption='صبحانه' src='/img/home/tanagholat.jpg' charachtersLengthLevel={0} />
                </Grid>
                <Grid item xs={3} lg={2}>
                    <CategoryComponent href='/#' caption='چاشنی و افزودنی' src='/img/home/category-labaniat.jpg' charachtersLengthLevel={1} />
                </Grid>
                <Grid item xs={3} lg={2}>
                    <CategoryComponent href='/#' caption='خواربار' src='/img/home/tanagholat.jpg' charachtersLengthLevel={0} />
                </Grid>
                <Grid item xs={3} lg={2}>
                    <CategoryComponent href='/#' caption='آرایشی بهداشتی' src='/img/home/category-labaniat.jpg' charachtersLengthLevel={1} />
                </Grid>
                <Grid item xs={3} lg={2}>
                    <CategoryComponent href='/#' caption='شوینده و دستمال' src='/img/home/tanagholat.jpg' charachtersLengthLevel={2} />
                </Grid>
            </Grid>

        </div>
    )
}
