import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import {
    Alert,
    AlertTitle,
    AppBar, Box,
    Container,
    Toolbar,
    Typography
} from "@mui/material";
import React from "react";

/**
 * ダッシュボード画面
 * @param auth
 * @constructor
 */
export default function Dashboard({ auth }: PageProps) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <Toolbar
                    disableGutters>
                    <Typography variant="h6" className="text-2xl font-bold">ダッシュボード</Typography>
                </Toolbar>
            }>
            <Head title="ダッシュボード" />
            <Box sx={{ flexGrow: 1 }}>
                <Alert severity="info">
                    <AlertTitle>テスト</AlertTitle>
                    This is an error alert — <strong>check it out!</strong>
                </Alert>
            </Box>
        </AuthenticatedLayout>
    );
}
