import React, {useRef, FormEventHandler, useEffect} from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import {Box, Typography} from "@mui/material";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";

type UpdatePasswordFormProps = {
    data: {
        current_password: string,
        password: string,
        password_confirmation: string,
    }
    setData: any,
    put: any,
    reset: any,
    errors: any,
    processing: boolean,
    recentlySuccessful: boolean,
}

export const UpdatePasswordForm = () => {

    const [confirmingUpdatePassword, setConfirmingUpdatePassword]: [boolean, any] = React.useState(false);

    const passwordInput: React.MutableRefObject<HTMLInputElement | undefined> = useRef<HTMLInputElement>();

    const currentPasswordInput = useRef<HTMLInputElement>();

    const { data, setData, errors, put, reset, processing, recentlySuccessful }: UpdatePasswordFormProps
        = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    /**
     * パスワード入力フォームの値を変更
     */
    const confirmUserDeletion = (): void => {
        setConfirmingUpdatePassword(true);
    }

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: () => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    useEffect(() => {
        if (recentlySuccessful) {
            setTimeout(() => {
                closeModal();
            }, 1000);
        }
    }, [recentlySuccessful]);

    /**
     * モーダルを閉じる
     */
    const closeModal = (): void => {
        setConfirmingUpdatePassword(false);
        reset();
    };

    return (
        <Box className={`space-y-6`}>
            <Box className="mt-6">
                <Typography className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    パスワード変更
                </Typography>
                <Box className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    アカウントの安全性を保つために、8文字以上かつ半角英数をそれぞれ1文字以上含むパスワードである必要があります。
                </Box>
            </Box>
            <PrimaryButton onClick={confirmUserDeletion}>
                パスワード変更
            </PrimaryButton>
            <Modal show={confirmingUpdatePassword} onClose={closeModal}>
                <form onSubmit={updatePassword} className="p-6">
                    <Typography className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        パスワードの変更
                    </Typography>
                    <Box className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        現在のパスワードと新しいパスワードを入力してください。
                    </Box>
                    <Box className="mt-6 space-y-6">
                        <Box>
                            <InputLabel htmlFor="current_password" value="現在のパスワード" />
                            <TextInput
                                id="current_password"
                                ref={currentPasswordInput}
                                value={data.current_password}
                                onChange={(e) => setData('current_password', e.target.value)}
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                            />
                            <InputError message={errors.current_password} className="mt-2" />
                        </Box>
                        <Box>
                            <InputLabel htmlFor="password" value="新しいパスワード" />
                            <TextInput
                                id="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </Box>
                        <Box>
                            <InputLabel htmlFor="password_confirmation" value="新しいパスワード(確認)" />
                            <TextInput
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                            />
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </Box>
                        <Box className="flex justify-end">
                            <SecondaryButton onClick={closeModal}>
                                キャンセル
                            </SecondaryButton>
                            <PrimaryButton className="ml-3" disabled={processing}>
                                パスワードを更新
                            </PrimaryButton>
                        </Box>
                        <Transition
                            show={recentlySuccessful}
                            enterFrom="opacity-0"
                            leaveTo="opacity-0"
                            className="transition ease-in-out"
                        >
                            <Box className="text-sm text-gray-600 dark:text-gray-400">パスワードを更新しました</Box>
                        </Transition>
                    </Box>
                </form>
            </Modal>
        </Box>
    );
}
