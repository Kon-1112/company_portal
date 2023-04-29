import React from "react";
import "react-image-crop/dist/ReactCrop.css";
import {Box, Button, Typography} from "@mui/material";
import PrimaryButton from "@/Components/PrimaryButton";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import {useDropzone} from "react-dropzone";
import {useForm} from "@inertiajs/react";
import Loading from "@/Components/Loading";
import {CropperRef, Cropper, CircleStencil} from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css'

type UpdateAvatarFormProps = {
    data: {
        avatar_file_data: File | undefined,
    }
    setData: any,
    post: any,
    reset: any,
    processing: boolean,
}

export const UpdateAvatarForm  = () => {

    /**
     * 画像のファイルデータ
     * @type {File | undefined}
     */
    const [fileData, setFileData]: [File | undefined, any] = React.useState<File | undefined>();

    /**
     * 画像のObjectUrl
     * @type {string | undefined}
     */
    const [objectUrl, setObjectUrl]: [string | undefined, any] = React.useState<string | undefined>();

    /**
     * プロフィールイメージ
     * @type {string}
     */
    const [image, setImage]: [string, any] = React.useState<string>("");

    /**
     * 画像更新モーダルの表示
     * @type {boolean}
     */
    const [isOpenUpdateAvatarModal, setIsOpenUpdateAvatarModal]: [boolean, any] = React.useState(false);

    /**
     * CropperのRef
     * @type {React.RefObject<CropperRef>}
     */
    const cropperRef: React.RefObject<CropperRef> = React.useRef<CropperRef>(null);

    /**
     * ドロップされたファイルを保存する
     * @param acceptedFiles
     */
    const onDrop = React.useCallback((acceptedFiles: File[]): void => {
        setFileData(acceptedFiles[0]);
    }, []);

    /**
     * ドロップゾーンの設定
     * @returns {JSX.Element}
     */
    const { getRootProps, isDragActive }: { getRootProps: any, isDragActive: boolean }  = useDropzone({ onDrop });

    /**
     * フォームの値を変更
     * @type {UpdateAvatarFormProps}
     */
    const {setData, post, reset, processing }: UpdateAvatarFormProps
        = useForm({
        avatar_file_data: undefined,
    });

    /**
     * 画像の選択
     * @returns {JSX.Element}
     */
    const confirmUserDeletion = (): void => {
        setIsOpenUpdateAvatarModal(true);
    }

    /**
     * モーダルを閉じる
     */
    const closeModal = (): void => {
        setIsOpenUpdateAvatarModal(false);
        setFileData(undefined);
        setObjectUrl(undefined);
        setImage("");
    };

    /**
     * アップロードした画像のObjectUrlをステイトに保存する
     * @returns {void}
     */
    React.useEffect((): void => {
        if (fileData instanceof File) {
            objectUrl && URL.revokeObjectURL(objectUrl);
            setObjectUrl(URL.createObjectURL(fileData));
        } else {
            setObjectUrl(undefined);
        }
    }, [fileData]);

    /**
     * バックエンドに画像を送信する
     * @param e
     */
    const postData = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        post(route("avatar.update"), {
            preserveScroll: true,
            onSuccess: (): void => {
                reset();
                closeModal();
            },
        });
    }

    /**
     * 画像を反転させる
     * @param horizontal 横
     * @param vertical 縦
     */
    const flip = (horizontal: boolean, vertical: boolean): void => {
        cropperRef.current && cropperRef.current.flipImage(horizontal, vertical);
    };

    /**
     * 画像を回転させる
     * @param angle 角度
     */
    const rotate = (angle: number): void => {
        cropperRef.current && cropperRef.current.rotateImage(angle);
    };

    return (
        <Box className={`space-y-6`}>
            <Loading show={processing}/>
            <Box className="mt-6">
                <Typography className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    アカウント画像変更
                </Typography>
                <Box className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    アカウント画像を変更します。
                </Box>
            </Box>
            <PrimaryButton onClick={confirmUserDeletion}>
                アカウント画像変更
            </PrimaryButton>
            <Modal show={isOpenUpdateAvatarModal} onClose={closeModal}>
                <Box className="p-6">
                    <Typography className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        アカウント画像の変更
                    </Typography>
                    <Box className="mt-4">
                        {!objectUrl && (
                            <Box className="relative w-full h-80" {...getRootProps()}>
                                <Box className="flex items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg">
                                    <Box className="space-y-1 text-center">
                                        <svg
                                            className="w-12 h-12 mx-auto text-gray-400"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 48 48"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M24 8C15.2 8 8 15.2 8 24s7.2 16 16 16 16-7.2 16-16S32.8 8 24 8z"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M24 16v16M16 24h16"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <div className="flex text-sm">
                                            <label className="relative font-medium cursor-pointer hover:text-indigo-500 text-indigo-600 dark:text-indigo-400">
                                                <span>ファイルを選択</span>
                                                {
                                                    isDragActive ?
                                                        <p className="text-white">ファイルをドロップしてください</p> :
                                                        <p className="text-white">ここにファイルをドラッグアンドドロップするか、ファイルを選択します</p>
                                                }
                                            </label>
                                        </div>
                                    </Box>
                                </Box>
                            </Box>
                        )}
                        {objectUrl && !image && (
                            <React.Fragment>
                                <Button onClick={() => rotate(-90)}>
                                    -90
                                </Button>
                                <Button onClick={() => rotate(90)}>
                                    90
                                </Button>
                                <Button onClick={() => flip(true, false)}>
                                    horizontal
                                </Button>
                                <Button onClick={() => flip(false, true)}>
                                    vertical
                                </Button>
                                <Cropper
                                    ref={cropperRef}
                                    src={objectUrl}
                                    className={'cropper'}
                                    stencilComponent={CircleStencil}
                                />
                            </React.Fragment>
                        )}
                        {objectUrl && image && (
                            <Box className="relative w-full h-64">
                                <img src={image} alt="" style={{ height: "200px" }} />
                            </Box>
                        )}
                    </Box>
                    <Box className="flex justify-end mt-6">
                        <SecondaryButton onClick={closeModal}>
                            キャンセル
                        </SecondaryButton>
                        {
                            objectUrl && !image &&
                            <React.Fragment>
                                <PrimaryButton type="button" onClick={(): void => {
                                    setFileData(undefined);
                                    setImage(undefined);
                                    setObjectUrl(undefined);
                                }} className="ml-3">
                                    画像を変更
                                </PrimaryButton>
                                <PrimaryButton type="button" onClick={(): void => {
                                    const cropper: CropperRef|null = cropperRef.current;
                                    if (cropper) {
                                        const canvas: HTMLCanvasElement|null = cropper.getCanvas();
                                        if (canvas) {
                                            setImage(canvas.toDataURL());
                                            canvas.toBlob( (blob: Blob|null): void => {
                                                if (blob instanceof Blob) {
                                                    setImage(URL.createObjectURL(blob));
                                                    const file = new File(
                                                        [blob], "trimmed_image.jpg",
                                                        {
                                                            type: blob.type,
                                                        });
                                                    setData("avatar_file_data", file);
                                                }
                                            });
                                        }
                                    }
                                }} className="ml-3">
                                    切り取る
                                </PrimaryButton>
                            </React.Fragment>
                        }
                        {
                            objectUrl && image &&
                            <React.Fragment>
                                <PrimaryButton type="button" onClick={(): void => {
                                    setImage(undefined);
                                }} className="ml-3">
                                    やり直す
                                </PrimaryButton>
                                <PrimaryButton type="button" onClick={(e: React.MouseEvent<HTMLButtonElement>) => postData(e)} className="ml-3">
                                    更新
                                </PrimaryButton>
                            </React.Fragment>
                        }
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};
