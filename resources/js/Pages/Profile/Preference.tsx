import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import {PageProps} from '@/types';
import {Box, Snackbar, Typography} from "@mui/material";
import {UpdateAvatarForm} from "@/Pages/Profile/Partials/UpdateAvatarForm";
import {UpdateUserProfileForm} from "@/Pages/Profile/Partials/UpdateUserProfileForm";
import {Loading} from "@/Components/Loading";
import {UpdatePasswordForm} from "@/Pages/Profile/Partials/UpdatePasswordForm";
import {DeleteUserForm} from "@/Pages/Profile/Partials/DeleteUserForm";

export default function Preference({ auth }: PageProps<{ mustVerifyEmail: boolean, status?: string }>) {

    type Props = {
        data: any,
        setData: any,
        patch: any,
        post: any,
        reset: any,
        errors: {
            first_name?: string,
            last_name?: string,
            first_name_kana?: string,
            last_name_kana?: string,
            nick_name?: string,
            birthday?: string,
            gender_id?: string,
            blood_type_id?: string,
            email?: string,
            introduction?: string,
            password?: string,
            current_password?: string,
            password_confirmation?: string,
        },
        processing: boolean,
        recentlySuccessful: boolean,
    }

    /**
     * フォームの状態を管理する
     */
    const { data, setData, patch, post, reset, errors, processing, recentlySuccessful,}: Props = useForm({
        first_name: auth.user.first_name,
        last_name: auth.user.last_name,
        first_name_kana: auth.user.first_name_kana,
        last_name_kana: auth.user.last_name_kana,
        nick_name: auth.user.nick_name,
        email: auth.user.email,
        blood_type_id: auth.user.blood_type_id,
        password: auth.user.password,
        initial_password_flag: auth.user.initial_password_flag,
        gender_id: auth.user.gender_id,
        birthday: auth.user.birthday,
        avatar_url: auth.user.avatar_url,
        introduction: auth.user.introduction,
        image_data: File,
    });

    /**
     * フォームの値を変更
     */
    React.useEffect((): void => {
        setData(auth.user);
    }, [auth]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <Typography variant="h6" className="text-2xl font-bold">
                    アカウント設定
                </Typography>
            }
        >
            <Head title="アカウント設定" />
            <Box className="flex flex-col justify-center w-[800px] mx-auto">
                <UpdateUserProfileForm
                    auth={auth}
                    data={data}
                    setData={setData}
                    patch={patch}
                    reset={reset}
                    errors={errors}
                    processing={processing}
                />
                <UpdateAvatarForm
                    setData={setData}
                    post={post}
                    reset={reset}
                    errors={errors}
                    processing={processing}
                />
                <UpdatePasswordForm />
                <DeleteUserForm />
            </Box>

            <Loading show={processing} />
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={recentlySuccessful}
                autoHideDuration={10000}
                message=" アカウントの設定を更新しました"
            />
        </AuthenticatedLayout>
    );
}
