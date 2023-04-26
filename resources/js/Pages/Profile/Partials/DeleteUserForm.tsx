import React from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import {Box, Typography} from "@mui/material";

type DeleteUserFormProps = {
    data: {
        password: string,
    }
    setData: any,
    delete: any,
    processing: boolean,
    reset: any,
    errors: any,
}

export const DeleteUserForm = () => {

    /**
     * ユーザー削除確認モーダル表示
     * @type {[boolean, any]}
     */
    const [confirmingUserDeletion, setConfirmingUserDeletion]: [boolean, any] = React.useState(false);

    /**
     * パスワード入力フォーム
     * @type {React.MutableRefObject<HTMLInputElement|undefined>}
     */
    const passwordInput: React.MutableRefObject<HTMLInputElement | undefined> = React.useRef<HTMLInputElement>();

    /**
     * パスワード入力フォームの値
     * @type {{password: string}}
     */
    const {data, setData, delete: destroy, processing, reset, errors,}: DeleteUserFormProps
        = useForm({
        password: '',
    });

    /**
     * パスワード入力フォームの値を変更
     */
    const confirmUserDeletion = (): void => {
        setConfirmingUserDeletion(true);
    };

    /**
     * ユーザー削除
     * @param e
     */
    const deleteUser: React.FormEventHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    /**
     * モーダルを閉じる
     */
    const closeModal = (): void => {
        setConfirmingUserDeletion(false);
        reset();
    };

    return (
        <Box className={`space-y-6`}>
            <Box className="mt-6">
                <Typography className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    アカウント削除
                </Typography>
                <Box className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    アカウントが削除されると、データは全て永久に削除されます。<br/>
                    アカウントを削除する前に保持したいデータまたは情報をダウンロードしてください。
                </Box>
            </Box>
            <DangerButton onClick={confirmUserDeletion}>
                アカウント削除
            </DangerButton>
            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <Typography className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        本当にアカウントを削除してもよろしいですか？
                    </Typography>
                    <Box className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        パスワードを入力してアカウントを削除してください。
                    </Box>
                    <Box className="mt-6">
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="パスワードを入力"
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </Box>
                    <Box className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            キャンセル
                        </SecondaryButton>
                        <DangerButton className="ml-3" disabled={processing}>
                            アカウント削除
                        </DangerButton>
                    </Box>
                </form>
            </Modal>
        </Box>
    );
};
