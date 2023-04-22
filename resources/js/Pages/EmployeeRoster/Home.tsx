import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head} from "@inertiajs/react";
import {PageProps} from "@/types";
import {AppBar, Container, Toolbar, Typography} from "@mui/material";

/**
 * 社員名簿ホーム画面
 * @param auth
 * @constructor
 */
export default function Home({ auth }: PageProps): JSX.Element {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="社員名簿" />
            <AppBar position="static" color="transparent">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography variant="h6" className="text-2xl font-bold">社員名簿</Typography>
                    </Toolbar>
                </Container>
            </AppBar>
        </AuthenticatedLayout>
    );
}
