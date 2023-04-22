import React, {ReactElement} from 'react';
import {router} from "@inertiajs/react";
import { User } from '@/types';
import {AppBar, Box, Container, Toolbar} from "@mui/material";
import {MenuListType, SideMenuList} from "@/Const/SideMenuList";
import {SideMenu} from "@/Components/SideMenu/SideMenu";

/**
 * 認証済みレイアウト
 * @param user
 * @param children
 * @param header
 * @constructor
 */
export default function Authenticated({ user, children, header }: React.PropsWithChildren<{ user: User, header: ReactElement }>) {

    /**
     * ナビゲーションメニューの選択状態を変更する
     * @param event {React.MouseEvent<HTMLDivElement, MouseEvent>}
     * @param index {number}
     */
    const handleListItemClick = React.useMemo(() => (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        const link: (string | undefined)[] = SideMenuList.map(
            (menu: MenuListType) => menu.menuList.find((menu) => menu.index === index)?.link
        );
        const linkUrl: string | undefined = link.filter((value: string | undefined) => value)[0];
        if (linkUrl) router.get(linkUrl);
    }, []);

    return (
        <Box className="flex flex-row w-full overflow-hidden">
            <SideMenu
                user={user}
                handleListItemClick={handleListItemClick}
            />
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
