import React from "react";
import {Head, router} from "@inertiajs/react";
import {User} from "@/types";
import {Avatar, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Pagination, Typography} from "@mui/material";
import {AddFrom} from "@/Pages/Communication/Partials/AddFrom";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

type ItemProps = {
    last_page: number;
    current_page: number;
    data: {
        id: number;
        cc_title: string;
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

type CompanyCommunicationProps = {
    auth: {
        user: User;
    },
    items?: ItemProps;
}

const CompanyCommunication: React.FC<CompanyCommunicationProps> = ({ auth, items }: CompanyCommunicationProps) => {

    /**
     * ページネーション
     * @param page ページ番号
     */
    const handlePageChange = (page: number): void => {
        router.visit(`/company-communication?page=${page}`);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <Box className="flex justify-between">
                    <Typography variant="h6" className="text-2xl font-bold">重要連絡</Typography>
                    <AddFrom />
                </Box>
            }
        >
            <Head title="社内連絡" />
            <Box className="w-[1200px] mx-auto flex flex-col items-center justify-center">
                <Box className="flex flex-col items-center mt-6 mb-6">
                    {
                        items && (
                            <Pagination
                                count={items.last_page}
                                page={items.current_page}
                                onChange={(_: React.ChangeEvent<unknown>, page: number): void => handlePageChange(page)}
                            />
                        )
                    }
                </Box>
                <List className="w-full">
                    {items && items.data && Array.isArray(items.data) && items.data.map((item, index: number): JSX.Element => (
                        <ListItem disablePadding key={index}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <CheckBoxIcon className="text-green-500" />
                                </ListItemIcon>
                                <ListItemText primary={item.cc_title} />
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
            </Box>
        </AuthenticatedLayout>
    );
}

export default CompanyCommunication;
