import {MenuCategoryList, MenuItem, MenuItemList, User, Ziggy} from "@/types";
import React from "react";
import {Box, List, ListItemButton, Typography} from "@mui/material";
import {UserProfile} from "@/Components/SideMenu/UserProfile";
import {CompanyLogo} from "@/Components/SideMenu/CompanyLogo";
import {router, usePage} from "@inertiajs/react";

/**
 * サイドメニューの型
 * @type {SideMenuProps}
 */
export type SideMenuProps = {
    user: User;
};

/**
 * ページのプロパティの型
 * @type {PageProps}
 */
type PageProps = {
    menuCategoryList: MenuCategoryList;
    menuItemList: MenuItemList;
    ziggy: Ziggy
    flash: {
        [key: string]: string;
    }
}

/**
 * サイドメニュー
 * @param user {User}
 */
export const SideMenu :React.NamedExoticComponent<SideMenuProps> = React.memo(function ({ user }: SideMenuProps) {

    /**
     * リストアイテムクリック時の処理
     * @param event {React.MouseEvent<HTMLDivElement, MouseEvent>}
     * @param itemValue {MenuItem}
     * @returns {void}
     */
    const handleListItemClick = React.useMemo(() => (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        itemValue?: MenuItem,
        fixedValue?: string,
    ) => {
        if (fixedValue) {
            router.get(route(fixedValue));
            return;
        } else if (!itemValue) {
            router.get(route('dashboard'));
            return;
        } else if (itemValue.mi_route) {
            router.get(route(itemValue.mi_route));
            return;
        } else if (itemValue.mi_url) {
            window.open(itemValue.mi_url, '_blank');
        }
    }, []);

    /**
     * ページのプロパティ
     * @type {PageProps}
     */
    const {
        menuCategoryList,
        menuItemList,
        ziggy,
        flash
    } = usePage<PageProps>().props;

    return (
        <Box className="flex flex-col w-[320px] h-full border-r dark:border-gray-600">
            <CompanyLogo />
            <UserProfile {...user} />

            {/* 常時固定表示 */}
            <List>
                <ListItemButton
                    onClick={(event): void => handleListItemClick(event, undefined, 'dashboard')}
                    className="flex items-center px-4 py-2 text-sm font-medium"
                >
                    <Typography>ダッシュボード</Typography>
                </ListItemButton>
            </List>

            {/* 動的制御表示 */}
            {Object.keys(menuCategoryList).map((categoryKey: string): JSX.Element => {
                return (
                    <List key={categoryKey}>
                        <Typography variant="body2" className="px-4 py-2 text-sm font-semibold">
                            {menuCategoryList[categoryKey].mc_name}
                        </Typography>
                        {Object.values(menuItemList).map((itemValue: MenuItem, itemIndex: number): JSX.Element => {
                            if (itemValue.mi_mc_id == menuCategoryList[categoryKey].mc_id) {
                                return (
                                    <ListItemButton
                                        key={`${itemValue.mi_id}-${categoryKey}`}
                                        onClick={(event): void => handleListItemClick(event, itemValue)}
                                        className="flex items-center px-4 py-2 text-sm font-medium"
                                    >
                                        <Typography>{itemValue.mi_name}</Typography>
                                    </ListItemButton>
                                );
                            } else {
                                return <React.Fragment key={`empty-${itemIndex}`} />;
                            }
                        })}
                    </List>
                );
            })}

            {/* 常時固定表示 */}
            <List>
                <Typography variant="body2" className="px-4 py-2 text-sm font-semibold">
                    アカウント
                </Typography>
                <ListItemButton
                    onClick={(event): void => handleListItemClick(event, undefined, 'profile.edit')}
                    className="flex items-center px-4 py-2 text-sm font-medium"
                >
                    <Typography>アカウント設定</Typography>
                </ListItemButton>
                <ListItemButton
                    onClick={(event): void => handleListItemClick(event, undefined, 'logout')}
                    className="flex items-center px-4 py-2 text-sm font-medium"
                >
                    <Typography>ログアウト</Typography>
                </ListItemButton>
            </List>
            <Box className="flex flex-col items-center justify-center w-full h-20 mt-auto">
                <Typography variant="body2" className="text-gray-500 dark:text-gray-400">© 2021 Company Name</Typography>
            </Box>
        </Box>
    );
});
