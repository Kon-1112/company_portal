import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import React, {FormEventHandler, useEffect} from 'react';
import {PageProps, User} from '@/types';
import SelectInput from "@/Components/SelectInput";
import DateInput from "@/Components/DateInput";

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }: { mustVerifyEmail: boolean, status?: string, className?: string }) {
    const user: User = usePage<PageProps>().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        u_first_name: user.u_first_name,
        u_last_name: user.u_last_name,
        u_first_name_kana: user.u_first_name_kana,
        u_last_name_kana: user.u_last_name_kana,
        u_nick_name: user.u_nick_name,
        u_email: user.u_email,
        u_blood_type_id: user.u_blood_type_id,
        u_password: user.u_password,
        u_initial_password_flag: user.u_initial_password_flag,
        u_gender_id: user.u_gender_id,
        u_birthday: user.u_birthday,
        u_profile_image_url: user.u_profile_image_url,
        u_image_data: File,
    });

    useEffect(() => {
        // パスワードの初期化フラグが立っている場合はパスワードを空にする
        if (data.u_initial_password_flag) {
            data.u_password = "";
        }
    },[]);

    const submit: FormEventHandler = (e): void => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">基本設定</h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">ユーザー名とメールアドレスを変更できます。</p>
            </header>
            <form onSubmit={submit} className="flex flex-row justify-between">
                <div className="mt-6 space-y-6">
                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        <div>
                            <InputLabel htmlFor="u_first_name" value="苗字" />
                            <TextInput
                                id="u_first_name"
                                className="mt-1 block w-full"
                                value={data.u_first_name}
                                onChange={(e) => setData('u_first_name', e.target.value)}
                                autoComplete="family-name"
                                placeholder="山田"
                                required
                            />
                            <InputError className="mt-2" message={errors.u_first_name} />
                        </div>
                        <div>
                            <InputLabel htmlFor="name" value="名前" />
                            <TextInput
                                id="name"
                                className="mt-1 block w-full"
                                value={data.u_last_name}
                                onChange={(e) => setData('u_last_name', e.target.value)}
                                autoComplete="given-name"
                                placeholder="太郎"
                                required
                            />
                            <InputError className="mt-2" message={errors.u_last_name} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        <div>
                            <InputLabel htmlFor="u_first_name_kana" value="苗字(カナ)" />
                            <TextInput
                                id="u_first_name_kana"
                                className="mt-1 block w-full"
                                value={data.u_first_name_kana || ''}
                                onChange={(e) => setData('u_first_name_kana', e.target.value)}
                                placeholder="ヤマダ"
                                required
                            />
                            <InputError className="mt-2" message={errors.u_first_name_kana} />
                        </div>
                        <div>
                            <InputLabel htmlFor="name" value="名前(カナ)" />
                            <TextInput
                                id="u_last_name_kana"
                                className="mt-1 block w-full"
                                value={data.u_last_name_kana || ''}
                                onChange={(e) => setData('u_last_name_kana', e.target.value)}
                                placeholder="タロウ"
                                required
                            />
                            <InputError className="mt-2" message={errors.u_last_name_kana} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        <div>
                            <InputLabel htmlFor="name" value="ニックネーム" />
                            <TextInput
                                id="u_nick_name"
                                className="mt-1 block w-full"
                                value={data.u_nick_name || ''}
                                onChange={(e) => setData('u_nick_name', e.target.value)}
                                placeholder="タロ"
                            />
                            <InputError className="mt-2" message={errors.u_nick_name} />
                        </div>
                        <div>
                            <InputLabel htmlFor="u_gender_id" value="性別" />
                            <SelectInput
                                id="u_gender_id"
                                className="mt-1 block w-full"
                                value={data.u_gender_id ?? 0}
                                options={[
                                    {id: 0, label: '選択してください'},
                                    {id: 1, label: '男性'},
                                    {id: 2, label: '女性'},
                                    {id: 3, label: 'その他'},
                                ]}
                                onChange={(e: any) => setData('u_gender_id', e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        <div>
                            <InputLabel htmlFor="u_birthday" value="生年月日" />
                            <DateInput
                                id="u_birthday"
                                className="mt-1 block w-full"
                                value={data.u_birthday ?? ''}
                                onChange={(e) => setData('u_birthday', e.target.value)}
                                required
                            />
                            <InputError className="mt-2" message={errors.u_birthday} />
                        </div>
                        <div>
                            <InputLabel htmlFor="email" value="血液型" />
                            <SelectInput
                                id="u_blood_type"
                                className="mt-1 block w-full"
                                value={data.u_blood_type_id ?? 0}
                                options={[
                                    {id: 0, label: '選択してください'},
                                    {id: 1, label: 'A型'},
                                    {id: 2, label: 'B型'},
                                    {id: 3, label: 'O型'},
                                    {id: 4, label: 'AB型'},
                                    {id: 5, label: '不明'},
                                ]}
                                onChange={(e: any) => setData('u_blood_type_id', e.target.value)}
                                required
                            />
                            <InputError className="mt-2" message={errors.u_blood_type_id} />
                        </div>
                    </div>
                    <div>
                        <InputLabel htmlFor="email" value="メールアドレス" />
                        <TextInput
                            id="email"
                            type="email"
                            className="mt-1 block w-full"
                            value={data.u_email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('u_email', e.target.value)}
                            required
                            autoComplete="email"
                        />
                        <InputError className="mt-2" message={errors.u_email} />
                    </div>
                    {data.u_initial_password_flag && (
                        <div>
                            <InputLabel htmlFor="u_password" value="パスワード" />
                            <TextInput
                                id="u_password"
                                type="password"
                                className="mt-1 block w-full"
                                value={data.u_password}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('u_password', e.target.value)}
                                required
                                autoComplete="new-password"
                                placeholder="初回に限りパスワードを設定してください"
                            />
                            <InputError className="mt-2" message={errors.u_password} />
                            <p className="text-sm mt-2 text-gray-800 dark:text-gray-200">
                                ※パスワードは8文字以上で<b>半角英数字をそれぞれ1文字以上</b>含めてください。
                            </p>
                        </div>
                    )}

                    {mustVerifyEmail && user.u_email_verified_at === null && (
                        <div>
                            <p className="text-sm mt-2 text-gray-800 dark:text-gray-200">
                                Your email address is unverified.
                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                >
                                    確認メールを送信するにはこちらをクリックしてください
                                </Link>
                            </p>
                            {status === 'verification-link-sent' && (
                                <div className="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                                    確認メールが送信されました。メールを確認してください。
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="mx-auto">

                    {/*ユーザーの画像アイコンを表示する*/}
                    <div className="text-center my-auto">
                        <img src={data.u_profile_image_url} alt={"アカウント画像"}/>
                    </div>

                    {/*ユーザーの画像設定*/}
                    <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            <div className="flex text-sm text-gray-50">
                                <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                >
                                    <span className="pt-6 pb-6 pl-3 pr-3">画像をアップロード</span>
                                    <input
                                        id="file-upload"
                                        name="file-upload"
                                        type="file"
                                        accept="image/jpeg, image/png, image/gif"
                                        className="sr-only"
                                        onChange={(e) => {
                                            const file: File|undefined = e.target.files?.[0];
                                            if (file) {
                                                // @ts-ignore
                                                setData('u_image_data', file);
                                            }
                                        }
                                    }
                                    />
                                    <p className="pl-1">{data.u_image_data?.name}</p>
                                </label>
                                <p className="pl-1"> or ドラッグアンドドロップ</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF まで</p>
                        </div>
                    </div>

                    <div>
                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                        <button
                            type="submit"
                            className="inline-flex justify-center px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 sm:text-sm sm:leading-5"
                        >
                            保存
                        </button>
                    </span>
                        <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                        <Link
                            href={route('dashboard')}
                            className="inline-flex justify-center px-4 py-2 text-base font-medium leading-6 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 sm:text-sm sm:leading-5"
                        >
                            キャンセル
                        </Link>
                    </span>
                    </div>
                </div>
            </form>
        </section>
    );
}
