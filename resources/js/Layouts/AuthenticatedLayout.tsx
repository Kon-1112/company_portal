import React from 'react';
import {Link} from "@inertiajs/react";
import { User } from '@/types';
import {
    Avatar,
    Box,
    Collapse,
    List,
    ListItemButton,
    Typography
} from "@mui/material";
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ElevatorRoundedIcon from '@mui/icons-material/ElevatorRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import FeedbackRoundedIcon from '@mui/icons-material/FeedbackRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import InterestsRoundedIcon from '@mui/icons-material/InterestsRounded';
import CameraOutdoorRoundedIcon from '@mui/icons-material/CameraOutdoorRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import {ExpandLess, ExpandMore} from "@mui/icons-material";

export default function Authenticated({ user, header, children }: React.PropsWithChildren<{ user: User, header?: React.ReactNode }>) {

    /**
     * ナビゲーションメニューの選択状態
     * @type {React.MutableRefObject<boolean>}
     */
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    /**
     * ナビゲーションメニューの選択状態を変更する
     * @type {React.MutableRefObject<boolean>}
     */
    const [applicationOpen, setApplicationOpen] = React.useState(false);

    /**
     * アカウント設定メニューの選択状態
     * @type {React.MutableRefObject<boolean>}
     */
    const [accountSettingOpen, setAccountSettingOpen] = React.useState(false);

    return (
        <Box className="flex flex-row w-full overflow-hidden">
            <Box className="flex flex-col w-80 h-full border-r dark:border-gray-600">
                {/* ログイン社員情報 */}
                <Box className="mt-12 mb-12">
                    <Box className="flex justify-center items-center mb-2">
                        <Avatar
                            alt="社員画像"
                            src={user.profile_image_url}
                            sx={{ width: 100, height: 100 }}
                        />
                    </Box>
                    <Box className="flex justify-center items-center flex-col">
                        <Typography variant="h6" fontWeight={600}>
                            <ruby>
                                {user.first_name}
                                <rt>{user.first_name_kana}</rt>
                            </ruby>
                            &nbsp;
                            <ruby>
                                {user.last_name}
                                <rt>{user.last_name_kana}</rt>
                            </ruby>
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                            {user.email}
                        </Typography>
                    </Box>
                </Box>

                <Box className="flex flex-col">
                    <List>
                        <ListItemButton
                            selected={selectedIndex === 0}
                            onClick={() => setSelectedIndex(0)}
                        >
                            <Link method="get" href={route('dashboard')} as="button">
                                <Box className="flex items-center">
                                    <DashboardRoundedIcon />&nbsp;ダッシュボード
                                </Box>
                            </Link>
                        </ListItemButton>
                    </List>
                </Box>

                <Box className="flex flex-col ml-4 mt-4">
                    <Typography variant="body2" fontWeight={600}>お知らせ</Typography>
                </Box>

                <List className="flex flex-col ml-4 mt-4">
                    <ListItemButton
                        selected={selectedIndex === 1}
                        onClick={() => setSelectedIndex(1)}
                    >
                        <Link method="get" href={route('dashboard')} as="button">
                            <Box className="flex items-center">
                                <FeedbackRoundedIcon />&nbsp;重要連絡
                            </Box>
                        </Link>
                    </ListItemButton>
                    <ListItemButton
                        selected={selectedIndex === 2}
                        onClick={() => setSelectedIndex(2)}
                    >
                        <Link method="get" href={route('dashboard')} as="button">
                            <Box className="flex items-center">
                                <InfoRoundedIcon />&nbsp;社内連絡
                            </Box>
                        </Link>
                    </ListItemButton>
                </List>

                <Box className="flex flex-col ml-4 mt-4">
                    <Typography variant="body2" fontWeight={600}>メニュー</Typography>
                </Box>

                <List className="flex flex-col ml-4 mt-4">
                    <ListItemButton
                        selected={selectedIndex === 3}
                        onClick={() => setSelectedIndex(3)}
                    >
                        <Link method="get" href={route('employee.view')} as="button">
                            <Box className="flex items-center">
                                <BadgeRoundedIcon />&nbsp;社員名簿
                            </Box>
                        </Link>
                    </ListItemButton>
                    <ListItemButton
                        selected={selectedIndex === 4}
                        onClick={() => setSelectedIndex(4)}
                    >
                        <Link method="get" href={route('dashboard')} as="button">
                            <Box className="flex items-center">
                                <AccountTreeRoundedIcon />&nbsp;プロジェクト一覧
                            </Box>
                        </Link>
                    </ListItemButton>
                    <ListItemButton
                        selected={selectedIndex === 5}
                        onClick={() => setSelectedIndex(5)}
                    >
                        <Link method="get" href={route('seat.view')} as="button">
                            <Box className="flex items-center">
                                <MapRoundedIcon />&nbsp;フロアマップ
                            </Box>
                        </Link>
                    </ListItemButton>
                    <ListItemButton
                        selected={selectedIndex === 6}
                        onClick={() => setSelectedIndex(6)}
                    >
                        <Link method="get" href={route('evaluation.view')} as="button">
                            <Box className="flex items-center">
                                <ElevatorRoundedIcon />&nbsp;人事評価
                            </Box>
                        </Link>
                    </ListItemButton>
                    <ListItemButton
                        selected={selectedIndex === 7}
                        onClick={() => setSelectedIndex(7)}
                    >
                        <Link method="get" href={route('dashboard')} as="button">
                            <Box className="flex items-center">
                                <EmojiEventsRoundedIcon />&nbsp;リワード
                            </Box>
                        </Link>
                    </ListItemButton>
                </List>

                <ListItemButton onClick={() => setApplicationOpen(!applicationOpen)}>
                    <Typography variant="body2" fontWeight={600}>各種申請</Typography>
                    {applicationOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={applicationOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton
                            selected={selectedIndex === 8}
                            onClick={() => {
                                setSelectedIndex(8);
                                setApplicationOpen(true);
                            }}
                        >
                            <Link method="get" href={route('dashboard')} as="button">
                                <Box className="flex items-center">
                                    <CameraOutdoorRoundedIcon />&nbsp;リモートワーク申請
                                </Box>
                            </Link>
                        </ListItemButton>
                        <ListItemButton
                            selected={selectedIndex === 8}
                            onClick={() => {
                                setSelectedIndex(8);
                                setApplicationOpen(true);
                            }}
                        >
                            <Link method="get" href={route('dashboard')} as="button">
                                <Box className="flex items-center">
                                    <InterestsRoundedIcon />&nbsp;有給休暇申請
                                </Box>
                            </Link>
                        </ListItemButton>
                    </List>
                </Collapse>

                {/*アカウント設定*/}
                <Box className="mt-2">
                    <ListItemButton onClick={() => setAccountSettingOpen(!accountSettingOpen)}>
                        <Typography variant="body2" fontWeight={600}>
                            アカウント設定
                        </Typography>
                        {accountSettingOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={accountSettingOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton>
                                <Link method="get" href={route('profile.edit')} as="button">
                                    <PersonRoundedIcon />&nbsp;
                                    プロフィール設定
                                </Link>
                            </ListItemButton>
                            <ListItemButton>
                                <Link method="post" href={route('logout')} as="button">
                                    <LogoutRoundedIcon />&nbsp;
                                    ログアウト
                                </Link>
                            </ListItemButton>
                        </List>
                    </Collapse>
                </Box>
            </Box>
            <Box className="flex flex-col w-full">
                <main>{children}</main>
            </Box>
        </Box>
    );
}
