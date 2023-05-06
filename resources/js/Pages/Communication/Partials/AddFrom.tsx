import React from "react";
import AddIcon from "@mui/icons-material/Add";
import {Box, Button, Checkbox, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, TextField, Typography} from "@mui/material";
import {User} from "@/types";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MarkdownEditor from "@uiw/react-markdown-editor";
import {DatePicker, TimePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {ImportantCommunicationCategoryList, ImportantCommunicationCategoryType} from "@/Const/Communication/ImportantCommunicatonCategory";
import Tooltip from "@mui/material/Tooltip";
import {AlertMessage, AlertProps} from "@/Components/AlertMessage";
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';

type Props = {
    auth: {
        user: User;
    };
    callback: () => void;
}

export const AddFrom = React.memo(({ auth, callback }: Props): JSX.Element => {

    const [isOpenAddModal, setIsOpenAddModal]: [boolean, (isOpenAddModal: boolean) => void] = React.useState(false);

    const [markdown, setMarkdown]: [string, (markdown: string) => void] = React.useState("");

    const [deadlineDayjs, setDeadlineDayjs]: [dayjs.Dayjs | null, (deadlineDayjs: dayjs.Dayjs | null) => void] = React.useState<Dayjs | null>(null);

    const [alertList, setAlertList]: [AlertProps[], React.Dispatch<React.SetStateAction<AlertProps[]>>] = React.useState([] as AlertProps[]);

    const [selectedCategoryId, setSelectedCategoryId]: [number, (selectedCategoryId: number) => void] = React.useState(0);

    /**
     * 追加モーダルの表示切替
     * @returns {void}
     */
    const handleAddModal = (): void => {
        setIsOpenAddModal(!isOpenAddModal);
    }

    return (
        <React.Fragment>
            <IconButton onClick={handleAddModal}>
                <AddIcon />
            </IconButton>
            <Modal
                open={isOpenAddModal}
                onClose={handleAddModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                closeAfterTransition
                BackdropProps={{ onClick: undefined }}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 1200,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4
                }}>
                    <AlertMessage alertList={alertList} />
                    <Box className="flex justify-between items-center">
                        <Typography variant="h5" component="h2">
                            重要連絡を投稿
                        </Typography>
                        <Box className="flex justify-end">
                            <Box className="mr-2">
                                <Tooltip title="下書き保存">
                                    <IconButton
                                        // onClick={(): void => {
                                    >
                                        <SaveRoundedIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <IconButton onClick={(): void => {
                                if (markdown === "") {
                                    handleAddModal();
                                    return;
                                }
                                confirm('入力内容が破棄されますがよろしいですか？') && handleAddModal();
                            }}>
                                <CloseRoundedIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    <Box className="mt-8 w-full" data-color-mode={auth.user.theme_mode}>
                        <TextField
                            className="w-full"
                            label="重要連絡のタイトル"
                            variant="outlined" />
                        <MarkdownEditor
                            className="mt-8"
                            minHeight='300px'
                            maxHeight='500px'
                            placeholder="マークダウン形式で入力できます。"
                            value={markdown}
                            onChange={(value: string): void => {
                                setMarkdown(value);
                            }}
                        />
                        <Box className="flex justify-between items-center">
                            <Box className="w-1/4 mr-4 mt-8">
                                <FormControl className="w-full">
                                    <InputLabel id="category">カテゴリ (必須)</InputLabel>
                                    <Select
                                        labelId='category'
                                        label="カテゴリ (必須)"
                                        className="w-full"
                                        value={selectedCategoryId}
                                        onChange={(e: SelectChangeEvent<number>): void => {
                                            setSelectedCategoryId(e.target.value as number);
                                        }}
                                    >
                                        <MenuItem value={0} selected={true}>選択してください</MenuItem>
                                        {ImportantCommunicationCategoryList.map((category: ImportantCommunicationCategoryType) => {
                                            return (
                                                <MenuItem value={category.id} key={category.id}>
                                                    {category.title}
                                                </MenuItem>
                                            );
                                        })
                                        }
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box className="w-1/4 mr-2 mt-8">
                                <DatePicker
                                    className="w-full"
                                    label="締切日 (任意)"
                                    value={deadlineDayjs}
                                    onChange={(newValue: dayjs.Dayjs | null): void => {
                                        setDeadlineDayjs(newValue);
                                    }}
                                />
                            </Box>
                            <Box className="w-1/4 ml-2 mt-8">
                                <TimePicker
                                    className="w-full"
                                    label="締切時刻 (任意)"
                                />
                            </Box>
                            <Box className="w-1/4 ml-4 mt-6 flex justify-between">
                                <Tooltip title='全社員の既読を矯正します'>
                                    <FormControlLabel
                                        label="既読強制"
                                        control={
                                            <Checkbox
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                            />
                                        }/>
                                </Tooltip>
                                <Button
                                    variant="contained"
                                    size="large"
                                    color="success"
                                    onClick={handleAddModal}
                                >
                                    投稿
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    );
});
