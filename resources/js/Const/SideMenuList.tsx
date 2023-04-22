import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import FeedbackRoundedIcon from "@mui/icons-material/FeedbackRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";

import React from "react";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import ElevatorRoundedIcon from "@mui/icons-material/ElevatorRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import InterestsRoundedIcon from "@mui/icons-material/InterestsRounded";
import CameraOutdoorRoundedIcon from "@mui/icons-material/CameraOutdoorRounded";

/**
 * サイドメニューのリストの型
 * @type {MenuListType}
 */
export type MenuListType = {
    title: string;
    showTitle: boolean;
    menuList: {
        index: number;
        icon: React.ReactNode;
        text: string;
        link: string;
    }[];
}

/**
 * サイドメニューのリスト
 * @type {MenuListType[]}
 */
export const SideMenuList: MenuListType[] = [
    {
        title: 'ダッシュボード',
        showTitle: false,
        menuList: [
            {
                index: 0,
                icon: <DashboardRoundedIcon />,
                text: 'ダッシュボード',
                link: route('dashboard'),
            },
        ],
    },
    {
        title: 'お知らせ',
        showTitle: true,
        menuList: [
            {
                index: 1,
                icon: <FeedbackRoundedIcon />,
                text: '重要連絡',
                link: route('dashboard'),
            },
            {
                index: 2,
                icon: <InfoRoundedIcon />,
                text: '社内連絡',
                link: route('dashboard'),
            },
        ],
    },
    {
        title: 'メニュー',
        showTitle: true,
        menuList: [
            {
                index: 3,
                icon: <BadgeRoundedIcon />,
                text: '社員名簿',
                link: route('dashboard'),
            },
            {
                index: 4,
                icon: <BadgeRoundedIcon />,
                text: 'プロジェクト一覧',
                link: route('dashboard'),
            },
            {
                index: 5,
                icon: <MapRoundedIcon />,
                text: 'フロアマップ',
                link: route('seat.view'),
            },
            {
                index: 6,
                icon: <ElevatorRoundedIcon />,
                text: '人事評価',
                link: route('evaluation.view'),
            },
            {
                index: 7,
                icon: <EmojiEventsRoundedIcon />,
                text: 'リワード',
                link: route('evaluation.view'),
            },
            {
                index: 8,
                icon: <EmojiEventsRoundedIcon />,
                text: '社内図書',
                link: route('evaluation.view'),
            },
        ],
    },
    {
        title: '各種申請',
        showTitle: true,
        menuList: [
            {
                index: 9,
                icon: <CameraOutdoorRoundedIcon />,
                text: 'リモートワーク申請',
                link: route('dashboard'),
            },
            {
                index: 10,
                icon: <InterestsRoundedIcon />,
                text: '有給休暇申請',
                link: route('dashboard'),
            },
        ]
    },
    {
        title: 'アカウント',
        showTitle: true,
        menuList: [
            {
                index: 11,
                icon: <PersonRoundedIcon />,
                text: 'プロフィール設定',
                link: route('profile.edit'),
            },
            {
                index: 12,
                icon: <LogoutRoundedIcon />,
                text: 'ログアウト',
                link: route('logout'),
            },
        ]
    }
];
