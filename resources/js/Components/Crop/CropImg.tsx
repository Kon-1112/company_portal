import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Crop } from "react-image-crop/dist/types";

const CropImg = () => {

    /**
     * 画像のファイルデータ
     * @type {File | undefined}
     */
    const [fileData, setFileData]: [File | undefined, any] = useState<File | undefined>();

    /**
     * 画像のObjectUrl
     * @type {string | undefined}
     */
    const [objectUrl, setObjectUrl]: [string | undefined, any] = useState<string | undefined>();

    /**
     * プロフィールイメージ
     * @type {string}
     */
    const [profileImg, setProfileImg]: [string, any] = useState<string>("");

    /**
     * Crop
     * @type {Crop}
     */
    const [crop, setCrop]: [Crop, any] = useState<Crop>({
        unit: "px",
        x: 0,
        y: 0,
        width: 200,
        height: 200,
    });

    /**
     * アップロードした画像のObjectUrlをステイトに保存する
     * @returns {void}
     */
    useEffect(() => {
        if (fileData instanceof File) {
            objectUrl && URL.revokeObjectURL(objectUrl);
            setObjectUrl(URL.createObjectURL(fileData));
        } else {
            setObjectUrl(undefined);
        }
    }, [fileData]);

    /**
     * 切り取った画像のObjectUrlを作成し、ステイトに保存する
     * @returns {void}
     */
    const makeProfileImgObjectUrl = async (): Promise<void> => {
        if (objectUrl) {
            const canvas = document.createElement("canvas");
            canvas.width = crop.width;
            canvas.height = crop.height;
            const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
            ctx.beginPath();
            ctx.arc(
                canvas.width / 2,
                canvas.height / 2,
                canvas.width / 2,
                0,
                2 * Math.PI,
                false
            );
            ctx.clip();

            const img = await loadImage(objectUrl);
            console.log(img.width, img.naturalWidth);
            ctx.drawImage(
                img,
                crop.x,
                crop.y,
                crop.width,
                crop.height,
                0,
                0,
                crop.width,
                crop.height
            );

            canvas.toBlob((result) => {
                if (result instanceof Blob) setProfileImg(URL.createObjectURL(result));
            });
        }
    };

    /**
     * 画像をロードする
     * @param src
     */
    const loadImage = (src: string): Promise<HTMLImageElement> => {
        return new Promise((resolve) => {
            const img: HTMLImageElement = new Image();
            img.src = src;
            img.onload = () => resolve(img);
        });
    };

    return (
        <div>
            <br/><br/>

            <form
                onSubmit={(e: FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    makeProfileImgObjectUrl();
                }}
            >
                <input
                    type="file"
                    onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                        e.target.files && setFileData(e.target.files[0]);
                    }}
                />
                <button>切り取り</button>
            </form>

            <br/><br/>

            <div>
                {objectUrl && (
                    <ReactCrop
                        crop={crop}
                        onChange={(c) => setCrop(c)}
                        aspect={1}
                        circularCrop={true}
                        keepSelection={true}
                    >
                        <img src={objectUrl} alt="" style={{ width: "100%" }} />
                    </ReactCrop>
                )}
            </div>

            <br/><br/>

            <div>
                {profileImg ? <img src={profileImg} alt="プロフィール画像" /> : ""}
            </div>

            <br/><br/>
        </div>
    );
};

export default CropImg;
