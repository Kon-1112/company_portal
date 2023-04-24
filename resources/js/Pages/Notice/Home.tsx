import React, {useEffect} from "react";
import {Typography} from "@mui/material";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {PageProps} from "@/types";
import {Head, usePage} from "@inertiajs/react";

const Home: React.FC<PageProps> = ({ auth, menuItem, menuCategory, ziggy, flash }) => {

    useEffect(() => {
        console.log(menuItem);
        console.log(menuCategory);
        console.log(ziggy);
        console.log(flash);
    }, []);

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
