import React, {ReactElement} from 'react';
import { User } from '@/types';
import {
    AppBar,
    Box,
    Container,
    createTheme, CssBaseline,
    PaletteColorOptions,
    Theme,
    ThemeProvider,
    Toolbar,
    useMediaQuery
} from "@mui/material";
import {SideMenu} from "@/Components/SideMenu/SideMenu";

interface Palette {
    accent?: PaletteColorOptions;
    highlight?: PaletteColorOptions;
    link?: PaletteColorOptions;
    text?: PaletteColorOptions;
    background?: PaletteColorOptions;
    blank?: PaletteColorOptions;
}

declare module '@mui/material/styles/createPalette' {
    interface PaletteOptions {
        accent?: PaletteColorOptions;
        highlight?: PaletteColorOptions;
        link?: PaletteColorOptions;
        blank?: PaletteColorOptions;
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        accent: true;
        highlight: true;
        link: true;
        blank: true;
    }
}

declare module '@mui/material/Checkbox' {
    interface CheckboxPropsColorOverrides {
        accent: true;
        highlight: true;
        link: true;
        blank: true;
    }
}

export default function Authenticated({ user, children, header }: React.PropsWithChildren<{ user: User, header: ReactElement }>) {
    const darkTheme: Theme = createTheme({
        typography: {
            fontFamily: user.font_name ? [
                user.font_name,
            ].join(',')
            : ['sans-serif',].join(','),
        },
        palette: {
            mode: 'dark',
            primary: {
                main: '#424242',
                contrastText: '#e0f1ff',
            },
            secondary: {
                main: '#7c7c7c',
                contrastText: '#deeeff',
            },
            success: {
                main: '#007008',
                contrastText: '#ffffff',
            },
            error: {
                main: '#c30000',
                contrastText: '#ffe4e4',
            },
            warning: {
                main: '#ec7900',
                contrastText: '#fff5dc',
            },
            info: {
                main: '#243bac',
                contrastText: '#ffffff',
            },
            accent: {
                main: '#c80276',
                contrastText: '#ffdcfc',
            },
            highlight: {
                main: '#e4b800',
                contrastText: '#fff1dc',
            },
            background: {
                default: '#000000',
                paper: '#171717',
            },
            text: {
                primary: '#ededed',
                secondary: '#bababa',
                disabled: '#9e9e9e',
            },
            link: {
                main: '#00459f',
                contrastText: '#e0f1ff',
            },
            blank: {
                main: '#ffffff',
                contrastText: '#000000',
            }
        },
    });

    const lightTheme: Theme = createTheme({
        typography: {
            fontFamily: user.font_name ? [
                    user.font_name,
                ].join(',')
                : ['sans-serif',].join(','),
        },
        palette: {
            mode: 'light',
            primary: {
                main: '#eaeaea',
                contrastText: '#000000',
            },
            secondary: {
                main: '#435467',
                contrastText: '#deeeff',
            },
            success: {
                main: '#119f1a',
                contrastText: '#ffffff',
            },
            error: {
                main: '#c61111',
                contrastText: '#ffe4e4',
            },
            warning: {
                main: '#ec7900',
                contrastText: '#fff5dc',
            },
            info: {
                main: '#0826cd',
                contrastText: '#ffffff',
            },
            accent: {
                main: '#ff7f00',
                contrastText: '#ffffff',
            },
            highlight: {
                main: '#ffcc00',
                contrastText: '#000000',
            },
            background: {
                default: '#ffffff',
                paper: '#f8f8f8',
            },
            text: {
                primary: '#000000',
                secondary: '#3e3e3e',
                disabled: '#757575',
            },
            link: {
                main: '#00459f',
                contrastText: '#e0f1ff',
            },
            blank: {
                main: '#ffffff',
                contrastText: '#000000',
            }
        },
    });

    return (
        <ThemeProvider theme={user.theme_mode === 'dark' ? darkTheme : lightTheme}>
            <CssBaseline />
            <Box className="flex flex-row w-full overflow-hidden">
                <SideMenu user={user}/>
                <Box className="flex flex-col w-full">
                    <AppBar position="static" color="transparent">
                        <Container maxWidth="xl">
                            <Toolbar disableGutters>
                                {header}
                            </Toolbar>
                        </Container>
                    </AppBar>
                    <Box>{children}</Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
