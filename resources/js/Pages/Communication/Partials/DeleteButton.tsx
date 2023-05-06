import React from "react";
import {Alert, Box, Button, DialogTitle, Typography} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {formatDateTime} from "@/Common/Date";
import {textOverflow} from "@/Common/Text";
import {ImportantCommunicationCategoryList} from "@/Const/Communication/ImportantCommunicatonCategory";
import axios from "axios";
import {ItemProps} from "@/Pages/Communication/ImportantCommunication";
import {addAlert, AlertProps, AlertMessage, removeAlert} from "@/Components/AlertMessage";
import {User} from "@/types";

type Props = {
    auth: {
        user: User;
    }
    item: ItemProps;
    callback: any
}

export const DeleteButton: React.NamedExoticComponent<Props> = React.memo(({ auth, item, callback }: Props): JSX.Element => {

    const [isOpenDeleteModal, setIsOpenDeleteModal]: [boolean, (isOpenDeleteModal: boolean) => void] = React.useState(false);

    const [alertList, setAlertList]: [AlertProps[], React.Dispatch<React.SetStateAction<AlertProps[]>>] = React.useState([] as AlertProps[]);

    /**
     * 削除モーダルの表示切替
     * @returns {void}
     */
    const handleDeleteModal = (): void => {
        setIsOpenDeleteModal(!isOpenDeleteModal);
    }

    /**
     * 削除処理
     * @returns {void}
     */
    const destroy = (): void => {
        const alertId: string = "delete";
        axios.delete(`/api/important-communications/delete`, {
            data: {
                email: auth.user.email,
                ic_id: item.ic_id,
            }
        })
            .then((): void => {
                setAlertList(removeAlert(alertList, alertId));
                handleDeleteModal();
                callback({
                    title: "削除完了",
                    message: "該当の投稿が正常に削除されました。",
                    severity: "success",
                });
            })
            .catch((): void => {
                setAlertList(addAlert(alertList, {
                    AlertId: alertId,
                    AlertTitle: "削除エラー",
                    AlertMessage: "削除に失敗しました。",
                    AlertSeverity: "error",
                }));
            });
    }

    return (
        <React.Fragment>
            {item && (
                <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteModal()}
                >
                    削除
                </Button>
            )}
            <Dialog
                open={isOpenDeleteModal}
                onClose={() => handleDeleteModal()}
            >
                <AlertMessage alertList={alertList} />
                <DialogTitle>
                    投稿削除
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body2">
                        以下の投稿を削除を削除してもよろしいですか？
                    </Typography>
                    <Alert icon={false} severity="info" className="mt-6">
                        <Box className="mb-2 mt-2">
                            タイトル：{textOverflow(item.ic_title, 50)}
                        </Box>
                        <Box className="mb-2">
                            カテゴリ：{
                            ImportantCommunicationCategoryList.filter((category) => {
                                    return category.id === item.ic_category_id;
                                }
                            )[0].title
                        }
                        {item.ic_created_at !== item.ic_updated_at ? (
                            <Box>
                                更新日時：{formatDateTime(item.ic_updated_at)}
                            </Box>
                        ) : (
                            <Box>
                                投稿日時：{formatDateTime(item.ic_updated_at)}
                            </Box>
                        )}
                        </Box>
                    </Alert>
                    <Alert icon={false} severity="warning" className="mt-4">
                        ・投稿者に削除の通知が自動送信されます<br />
                        ・削除された投稿はもとに戻すことはできません
                    </Alert>
                </DialogContent>
                <DialogActions>
                    <Box className="flex justify-end p-4">
                        <Box className="mr-4">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleDeleteModal()}
                            >
                                キャンセル
                            </Button>
                        </Box>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => destroy()}
                        >
                            削除
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
});
