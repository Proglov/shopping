'use client'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
        },
    },
    palette: {
        primary: {
            main: '#090072',
        },
        secondary: {
            main: '#7d7d7d',
        }
    },
    typography: {
        fontFamily: "Shabnam"
    },
    components: {
        MuiMenu: {
            styleOverrides: {
                list: {
                    '&[role="menu"]': {
                        backgroundColor: '#b8e9ff'
                    },
                },
            },
        },
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba( 169, 175, 206 ,.1)'
                }
            }
        }
    },
});

const CustomTheme = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
}

export default CustomTheme;
