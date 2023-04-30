import React from "react";
import {Box, Typography} from "@mui/material";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import DateInput from "@/Components/DateInput";
import PrimaryButton from "@/Components/PrimaryButton";
import MarkdownEditor from "@uiw/react-markdown-editor";
import {formatDate} from "@/Common/Date";

type Props = {
    auth: any,
    data: {
        first_name: string,
        last_name: string,
        first_name_kana: string,
        last_name_kana: string,
        nick_name: string,
        birthday: string,
        gender_id: number,
        blood_type_id: number,
        email: string,
        introduction: string,
    },
    setData: any,
    patch: any,
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
    },
    processing: boolean,
}

export const UpdateUserProfileForm: React.FC<Props> = React.memo(({ data, setData, patch, reset, errors, processing }: Props) => {

    /**
     * 自己紹介の編集モード
     * @type {boolean}
     */
    const [isIntroductionEditMode, setIsIntroductionEditMode]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = React.useState(!data.introduction || false);

    /**
     * 自己紹介の編集モードを切り替える
     * @returns void
     */
    const handleIntroductionEditMode = (): void => {
        setIsIntroductionEditMode(!isIntroductionEditMode);
    }

    return (
        <React.Fragment>
            <Box className="mt-6">
                <Typography variant="h6" className="text-2xl font-bold">
                    基本設定
                </Typography>
            </Box>
            <Box className="flex flex-row justify-between">
                <Box className="mt-6 space-y-6 w-2/3">
                    <Box className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        <Box>
                            <InputLabel htmlFor="first_name" value="苗字" />
                            <TextInput
                                id="first_name"
                                className="mt-1 block w-full"
                                value={data.first_name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('first_name', e.target.value)}
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
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('last_name', e.target.value)}
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
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('first_name_kana', e.target.value)}
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
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('last_name_kana', e.target.value)}
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
                                value={data.nick_name ?? ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('nick_name', e.target.value)}
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
                            <InputError className="mt-2" message={errors.gender_id} />
                        </Box>
                    </Box>
                    <Box className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        <Box>
                            <InputLabel htmlFor="birthday" value="生年月日" />
                            <DateInput
                                id="birthday"
                                className="mt-1 block w-full"
                                value={data.birthday ?  formatDate(data.birthday) : ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('birthday', e.target.value)}
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
                </Box>
            </Box>
            {/*横並び*/}
            <Box className="mt-6 flex justify-between">
                <Typography variant="h6">
                    自己紹介
                </Typography>
                {
                    isIntroductionEditMode ?
                        <PrimaryButton
                            onClick={() => handleIntroductionEditMode()}>
                            編集を終了
                        </PrimaryButton>
                        :
                        <PrimaryButton
                            onClick={() => handleIntroductionEditMode()}>
                            編集
                        </PrimaryButton>
                }
            </Box>
            <Box className="mt-2">
                {
                    isIntroductionEditMode ?
                        <MarkdownEditor
                            className="mt-2"
                            minHeight='200px'
                            maxHeight='500px'
                            placeholder="マークダウン形式で入力できます。"
                            value={data.introduction ?? ''}
                            onChange={(value: string): void => {
                                setData('introduction', value);
                            }}
                        />
                        :
                        <MarkdownEditor.Markdown
                            className="mt-2 p-4"
                            source={data.introduction ?? ''} />
                }
            </Box>
            <InputError className="mt-2" message={errors.introduction} />
            <Box className="mt-6 flex justify-start">
                <PrimaryButton
                    onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
                        e.preventDefault();
                        patch(route('profile.update'), {
                            preserveScroll: true,
                            onSuccess: (): void => {
                                reset();
                            },
                            onError: (err: ErrorEvent): void => {
                                console.log(err);
                            }
                        });
                    }}
                    disabled={processing}>
                    情報を更新
                </PrimaryButton>
            </Box>
        </React.Fragment>
    )
});
