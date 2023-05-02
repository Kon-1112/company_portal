import React from "react";
import {Avatar, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Pagination, Typography} from "@mui/material";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {User} from "@/types";
import {Head, router} from "@inertiajs/react";
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

    /**
     * ページネーション
     * @param page ページ番号
     */
    const handlePageChange = (page: number): void => {
        router.visit(`/important-communication?page=${page}`);
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
                        items && (
                            <Pagination
                                count={items.last_page}
                                page={items.current_page}
                                onChange={(event, page) => handlePageChange(page)}
                            />
                        )
                    }
                </Box>
            </Box>
            <Loading show={!items} />
        </AuthenticatedLayout>
    );
}

export default ImportantCommunication;
