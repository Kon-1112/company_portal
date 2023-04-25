import React from "react";
import {Typography} from "@mui/material";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {PageProps} from "@/types";
import {Head} from "@inertiajs/react";

const Home: React.FC<PageProps> = ({ auth }) => {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <Typography variant="h6" className="text-2xl font-bold">重要連絡</Typography>
            }
        >
            <Head title="重要連絡" />
            <div className="flex flex-col items-center justify-center">
                <Typography variant="h6" className="text-2xl font-bold">重要連絡</Typography>
            </div>


        </AuthenticatedLayout>
    );
}

export default Home;
