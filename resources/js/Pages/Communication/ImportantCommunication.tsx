import React from "react";
import {Avatar, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {User} from "@/types";
import {Head, router} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import {PostForm} from "@/Pages/Communication/Partials/PostForm";
// import CheckIcon from '@mui/icons-material/Check';
// import ErrorIcon from '@mui/icons-material/Error';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {Loading} from "@/Components/Loading";
import { Errors, ErrorBag } from '@inertiajs/inertia/types/types';

type ItemProps = {
    last_page: number;
    current_page: number;
    data: {
        id: number;
        ic_title: string;
        first_name: string;
        first_name_kana: string;
        last_name: string;
        last_name_kana: string;
        avatar_url: string;
    },
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

type ImportantCommunicationProps = {
    auth: {
        user: User;
    },
    items?: ItemProps;
    errors?: Errors & ErrorBag;
}

const ImportantCommunication: React.FC<ImportantCommunicationProps> = ({ auth, items }: ImportantCommunicationProps) => {
    const handlePageChange = (url: string | null): void => {
        url && router.visit(url);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <Box className="flex justify-between">
                    <Typography variant="h6" className="text-2xl font-bold">重要連絡</Typography>
                    <PostForm />
                </Box>
            }
        >
            <Head title="重要連絡" />
            <Box className="w-[1200px] mx-auto flex flex-col items-center justify-center">
                <List className="w-full">
                    {items && items.data && Array.isArray(items.data) && items.data.map((item, index) => (
                        <ListItem disablePadding key={index}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <CheckBoxIcon className="text-green-500" />
                                </ListItemIcon>
                                <ListItemText primary={item.ic_title} />
                                <Typography variant="body1">
                                    <ruby>{item.first_name}<rp>(</rp><rt>{item.first_name_kana}</rt><rp>)</rp></ruby>
                                    &nbsp;
                                    <ruby>{item.last_name}<rp>(</rp><rt>{item.last_name_kana}</rt><rp>)</rp></ruby>
                                </Typography>&nbsp;
                                <Avatar src={item.avatar_url} className="mr-2" />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

                <Box className="flex flex-col items-center">
                    {
                        items ? (
                            <span className="text-sm text-gray-700 dark:text-gray-400">
                            <span className="font-semibold text-gray-900 dark:text-white">{items.last_page}</span>
                                    &nbsp;ページ中&nbsp;
                                    <span className="font-semibold text-gray-900 dark:text-white">{items.current_page}</span>
                                    &nbsp;ページを表示中&nbsp;
                            </span>
                        ) : (
                            <></>
                        )
                    }
                    <Box className="inline-flex mt-2 xs:mt-0">
                        {items && items.links.map((link, index) => (
                            <PrimaryButton
                                key={index}
                                onClick={() => handlePageChange(link.url)}
                                disabled={!link.url || link.active}
                            >
                                &nbsp;{link.label}&nbsp;
                            </PrimaryButton>
                        ))}
                    </Box>
                </Box>
            </Box>
            <Loading show={!items} />
        </AuthenticatedLayout>
    );
}

export default ImportantCommunication;
