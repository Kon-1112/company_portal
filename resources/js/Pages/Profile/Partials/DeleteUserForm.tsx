import {useRef, useState, FormEventHandler, useEffect} from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

export default function DeleteUserForm({ className = '' }: { className?: string }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        u_password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    /**
     * ユーザー削除
     * @param e
     */
    const deleteUser: FormEventHandler = (e) => {
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
    const closeModal = () => {
        setConfirmingUserDeletion(false);
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    アカウントを削除
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    アカウントが削除されると、データは全て永久に削除されます。<br/>
                    アカウントを削除する前に、保持したいデータまたは情報をダウンロードしてください。
                </p>
            </header>
            <DangerButton onClick={confirmUserDeletion}>
                アカウント削除
            </DangerButton>
            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        本当にアカウントを削除してもよろしいですか？
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        パスワードを入力してアカウントを削除してください。
                    </p>
                    <div className="mt-6">
                        <TextInput
                            id="u_password"
                            type="password"
                            name="u_password"
                            ref={passwordInput}
                            value={data.u_password}
                            onChange={(e) => setData('u_password', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="パスワードを入力"
                        />
                        <InputError message={errors.u_password} className="mt-2" />
                    </div>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            キャンセル
                        </SecondaryButton>
                        <DangerButton className="ml-3" disabled={processing}>
                            アカウント削除
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
