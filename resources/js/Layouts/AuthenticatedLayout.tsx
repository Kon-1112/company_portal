import React, {ReactElement} from 'react';
import { User } from '@/types';
import {AppBar, Box, Container, Toolbar} from "@mui/material";
import {SideMenu} from "@/Components/SideMenu/SideMenu";

/**
 * 認証済みレイアウト
 * @param user
 * @param children
 * @param header
 * @constructor
 */
export default function Authenticated({ user, children, header }: React.PropsWithChildren<{ user: User, header: ReactElement }>) {
    return (
        <Box className="bg-white dark:bg-gray-800 text-black dark:text-white flex flex-row w-full overflow-hidden">
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
    );
}
