import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="メールアドレス認証 " />
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    メールアドレス認証
                </h2>
                <p className="mt-1">
                    ご登録頂いたメールアドレスの認証を行う必要がございます。<br/>
                    メールをご確認いただき、認証してください。<br/>
                </p>
            </div>
            {status === 'verification-link-sent' && (
                <div className="mb-4 text-sm text-green-500 font-bold">
                    認証メールを再送信しました。
                </div>
            )}
            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <PrimaryButton disabled={processing}>
                        認証メールを再送信
                    </PrimaryButton>
                    <div className="flex items-center">
                        <Link
                            href={route('dashboard')}
                            method="get"
                            as="button"
                            className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 mr-4"
                        >
                            再読み込み
                        </Link>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                        >
                            ログアウト
                        </Link>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
