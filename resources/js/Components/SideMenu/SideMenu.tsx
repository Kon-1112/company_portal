import {User} from "@/types";
import React from "react";
import {Box, List, ListItemButton, Typography} from "@mui/material";
import {UserProfile} from "@/Components/SideMenu/UserProfile";
import {MenuListType, SideMenuList} from "@/Const/SideMenuList";
import {CompanyLogo} from "@/Components/SideMenu/CompanyLogo";

/**
 * サイドメニューの型
 */
export type SideMenuProps = {
    user: User;
    handleListItemClick: (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number
    ) => void;
};

/**
 * サイドメニュー
 * @param user {User}
 */
export const SideMenu :React.NamedExoticComponent<SideMenuProps> = React.memo(function ({
    user,
    handleListItemClick,
}: SideMenuProps) {
    return (
        <Box className="flex flex-col w-[320px] h-full border-r dark:border-gray-600">
            <CompanyLogo />
            <UserProfile {...user} />
            {SideMenuList.map((genre: MenuListType, genreIndex: number) => (
                <Box className="flex flex-col ml-4" key={genreIndex}>
                    {genre.showTitle && ( <Typography variant="body2" fontWeight={800} mt={2} mb={1}>{genre.title}</Typography> )}
                    {genre.menuList.map((menu, menuIndex) => (
                        <List key={menuIndex}>
                            <ListItemButton onClick={(event: React.MouseEvent<HTMLDivElement>) => handleListItemClick(event, menu.index)}>
                                <Box className="flex items-center">{menu.icon}&nbsp;{menu.text}</Box>
                            </ListItemButton>
                        </List>
                    ))}
                </Box>
            ))}
        </Box>
    );
});
