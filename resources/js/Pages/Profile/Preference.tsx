import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm} from '@inertiajs/react';
import { PageProps } from '@/types';
import {Alert, AlertTitle, Box, Button, Typography} from "@mui/material";
import React, {FormEventHandler, useEffect} from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import DateInput from "@/Components/DateInput";
import {DeleteUserForm} from "@/Pages/Profile/Partials/DeleteUserForm";
import {UpdatePasswordForm} from "@/Pages/Profile/Partials/UpdatePasswordForm";
import CropImg from "@/Components/Crop/CropImg";

export default function Preference({ auth, mustVerifyEmail, status }: PageProps<{ mustVerifyEmail: boolean, status?: string }>) {

    /**
     * フォームの状態を管理する
     */
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
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
        profile_image_url: auth.user.profile_image_url,
        image_data: File,
    });

    /**
     * パスワード初期化フラグがtrueの場合、パスワードを空にする
     */
    useEffect((): void => {
        if (data.initial_password_flag) {
            data.password = "";
        }
    },[]);

    /**
     * フォームの送信処理
     * @param e
     */
    const submit: FormEventHandler = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        console.log(data);
        // patch(route('profile.update'));
    };

    /**
     * メールアドレス認証アラート
     * @param props
     */
    const EmailVerifiedAlert = React.useCallback(() => {
        return (
            <Alert severity="error">
                <AlertTitle>メールアドレスの認証を行ってください</AlertTitle>
                <Typography variant="body2">メールアドレスの存在を確認できていません。</Typography>
                {status === 'verification-link-sent' ? (
                    <Box className="mt-2 font-medium text-sm text-red-500">
                        <Typography variant="body2">確認メールが送信されました。メールを確認してください。</Typography>
                    </Box>
                ) : <Link
                    href={route('verification.send')}
                    method="post"
                    as="button"
                    className="mt-2 underline text-sm text-red-500 hover:text-red-700"
                >
                    確認メールを送信するにはこちらをクリックしてください
                </Link>}
            </Alert>
        );
    },[status, auth.user.initial_password_flag]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <Typography variant="h6" className="text-2xl font-bold">
                    {auth.user.initial_password_flag ?
                        <span>アカウント作成</span>:<span>アカウント設定</span>
                    }
                </Typography>
            }
        >
            <Head title="アカウント設定" />

            {/*　レスポンシブにAppBarのように表示　*/}
            <Box className="flex flex-col justify-center w-[900px] mx-auto">
                {mustVerifyEmail && !auth.user.email_verified_at &&
                    <EmailVerifiedAlert />
                }
                <Box className="mt-6">
                    <Typography variant="h6" className="text-2xl font-bold">
                        基本設定
                    </Typography>
                </Box>
                <form onSubmit={submit} className="flex flex-row justify-between">
                    <Box className="mt-6 space-y-6 w-2/3">
                        <Box className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                            <Box>
                                <InputLabel htmlFor="first_name" value="苗字" />
                                <TextInput
                                    id="first_name"
                                    className="mt-1 block w-full"
                                    value={data.first_name}
                                    onChange={(e) => setData('first_name', e.target.value)}
                                    autoComplete="family-name"
                                    placeholder="山田"
                                />
                                <InputError className="mt-2" message={errors.first_name} />
                            </Box>
                            <Box>
                                <InputLabel htmlFor="name" value="名前" />
                                <TextInput
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.last_name}
                                    onChange={(e) => setData('last_name', e.target.value)}
                                    autoComplete="given-name"
                                    placeholder="太郎"
                                />
                                <InputError className="mt-2" message={errors.last_name} />
                            </Box>
                        </Box>
                        <Box className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                            <Box>
                                <InputLabel htmlFor="first_name_kana" value="苗字(カナ)" />
                                <TextInput
                                    id="first_name_kana"
                                    className="mt-1 block w-full"
                                    value={data.first_name_kana || ''}
                                    onChange={(e) => setData('first_name_kana', e.target.value)}
                                    placeholder="ヤマダ"
                                />
                                <InputError className="mt-2" message={errors.first_name_kana} />
                            </Box>
                            <Box>
                                <InputLabel htmlFor="name" value="名前(カナ)" />
                                <TextInput
                                    id="last_name_kana"
                                    className="mt-1 block w-full"
                                    value={data.last_name_kana || ''}
                                    onChange={(e) => setData('last_name_kana', e.target.value)}
                                    placeholder="タロウ"
                                />
                                <InputError className="mt-2" message={errors.last_name_kana} />
                            </Box>
                        </Box>
                        <Box className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                            <Box>
                                <InputLabel htmlFor="name" value="ニックネーム" />
                                <TextInput
                                    id="nick_name"
                                    className="mt-1 block w-full"
                                    value={data.nick_name || ''}
                                    onChange={(e) => setData('nick_name', e.target.value)}
                                    placeholder="タロ"
                                />
                                <InputError className="mt-2" message={errors.nick_name} />
                            </Box>
                            <Box>
                                <InputLabel htmlFor="gender_id" value="性別" />
                                <SelectInput
                                    id="gender_id"
                                    className="mt-1 block w-full"
                                    value={data.gender_id ?? 0}
                                    options={[
                                        {id: 0, label: '選択してください'},
                                        {id: 1, label: '男性'},
                                        {id: 2, label: '女性'},
                                        {id: 3, label: 'その他'},
                                    ]}
                                    onChange={(e: any) => setData('gender_id', e.target.value)}
                                    required
                                />
                            </Box>
                        </Box>
                        <Box className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                            <Box>
                                <InputLabel htmlFor="birthday" value="生年月日" />
                                <DateInput
                                    id="birthday"
                                    className="mt-1 block w-full"
                                    value={data.birthday ?? ''}
                                    onChange={(e) => setData('birthday', e.target.value)}
                                    required
                                />
                                <InputError className="mt-2" message={errors.birthday} />
                            </Box>
                            <Box>
                                <InputLabel htmlFor="email" value="血液型" />
                                <SelectInput
                                    id="blood_type"
                                    className="mt-1 block w-full"
                                    value={data.blood_type_id ?? 0}
                                    options={[
                                        {id: 0, label: '選択してください'},
                                        {id: 1, label: 'A型'},
                                        {id: 2, label: 'B型'},
                                        {id: 3, label: 'O型'},
                                        {id: 4, label: 'AB型'},
                                        {id: 5, label: '不明'},
                                    ]}
                                    onChange={(e: any) => setData('blood_type_id', e.target.value)}
                                    required
                                />
                                <InputError className="mt-2" message={errors.blood_type_id} />
                            </Box>
                        </Box>
                        <Box>
                            <InputLabel htmlFor="email" value="メールアドレス" />
                            <TextInput
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('email', e.target.value)}
                                required
                                autoComplete="email"
                            />
                            <InputError className="mt-2" message={errors.email} />
                        </Box>
                        {data.initial_password_flag && (
                            <Box>
                                <InputLabel htmlFor="password" value="パスワード" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    className="mt-1 block w-full"
                                    value={data.password}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('password', e.target.value)}
                                    required
                                    autoComplete="new-password"
                                    placeholder="初回に限りパスワードを設定してください"
                                />
                                <InputError className="mt-2" message={errors.password} />
                            </Box>
                        )}
                    </Box>
                    <Box className="mt-28 space-y-6 w-1/3 flex justify-center">
                        <Box className="space-y-1 text-center">
                            <Box className="flex justify-center items-center">
                                <img
                                    className="inline-block h-32 w-32 rounded-full ring-2 ring-white"
                                    src={data.profile_image_url ? data.profile_image_url : '/images/no_image.png'}
                                    alt=""
                                />
                            </Box>

                            {/*　画像のサイズを表示　*/}
                            <p className="text-xs text-gray-500">推奨サイズ: 128 x 128</p>
                            {/*　画像の形式を表示　*/}
                            <p className="text-xs text-gray-500">PNG, JPG, GIF 10MBまで</p>
                            {/*　画面右下に固定で表示　*/}
                            <Box className="fixed bottom-0 right-0">
                                {/*　丸くて大きな保存ボタン　*/}
                                <Box className="flex justify-center items-center">
                                    <Button
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none"
                                    >
                                        保存
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </form>
                <UpdatePasswordForm />
                <DeleteUserForm />

                <CropImg />

            </Box>

        </AuthenticatedLayout>
    );
}
