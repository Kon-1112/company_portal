import React from "react";
import {Accordion, AccordionDetails, AccordionSummary, Alert, AlertTitle, Avatar, Box, Button, Chip, Fade, Pagination, Snackbar, Typography} from "@mui/material";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {BaseCommonProps, User} from "@/types";
import {Head} from "@inertiajs/react";
import {AddFrom} from "@/Pages/Communication/Partials/AddFrom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MarkdownEditor from "@uiw/react-markdown-editor";
import TimerRoundedIcon from '@mui/icons-material/TimerRounded';
import TimerOffRoundedIcon from '@mui/icons-material/TimerOffRounded';
import Tooltip from '@mui/material/Tooltip';
import UpdateRoundedIcon from '@mui/icons-material/UpdateRounded';
import QueryBuilderRoundedIcon from '@mui/icons-material/QueryBuilderRounded';
import {formatDate, formatDateTime, getRemainingDays, hasTime, isOverTime} from "@/Common/Date";
import {ImportantCommunicationCategoryList, ImportantCommunicationCategoryType, READ_STATUS, UNREAD_STATUS} from "@/Const/Communication/ImportantCommunicatonCategory";
import axios, {AxiosResponse} from "axios";
import {SearchDrawer} from "@/Pages/Communication/Partials/SearchDrawer";
import {DeleteButton} from "@/Pages/Communication/Partials/DeleteButton";
import {addAlert, AlertMessage, AlertProps, removeAlert} from "@/Components/AlertMessage";
import {SortMenu} from "@/Pages/Communication/Partials/SortMenu";
import {Loading} from "@/Components/Loading";

type ItemListProps = {
    last_page: number;
    current_page: number;
    data: ItemProps[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

export type ItemProps = {
    id: number;
    ic_id: number;
    ic_title: string;
    ic_content: string;
    ic_category_id: number;
    ic_deadline_at: string;
    ic_created_at: string;
    ic_updated_at: string;
    icrf_read_at: string | null;
    first_name: string;
    first_name_kana: string;
    last_name: string;
    last_name_kana: string;
    avatar_url: string;
}

type SearchParamProps = {
    email: string;
    searchTitle?: string;
    searchContent?: string;
    selectedCategories?: ImportantCommunicationCategoryType[];
    selectedStartDate?: string;
    selectedEndDate?: string;
    selectedUsers?: User[];
    column?: string;
    orderBy?: string;
    pageLength: number;
}

export type resultProps = {
    title?: string;
    message?: string;
    severity?: "success" | "info" | "warning" | "error" | undefined;
}

let url: string = '/api/important-communications/search';

const ImportantCommunication: React.NamedExoticComponent<BaseCommonProps> = React.memo(({ auth }: BaseCommonProps): JSX.Element => {

    const pageLength: number = 20;

    const [isOpenAccordion, setIsOpenAccordion]: [number | false, React.Dispatch<React.SetStateAction<number | false>>] = React.useState<number | false>(false);

    const [importantItems, setImportantItems]: [ItemListProps | undefined, React.Dispatch<React.SetStateAction<ItemListProps | undefined>>] = React.useState();

    const [alertList, setAlertList]: [AlertProps[], React.Dispatch<React.SetStateAction<AlertProps[]>>] = React.useState<AlertProps[]>([]);

    const [nowPage, setNowPage]: [number, React.Dispatch<React.SetStateAction<number>>] = React.useState(1);

    const [isLoading, setIsLoading]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = React.useState(false);

    const [result, setResult]: [resultProps | undefined, React.Dispatch<React.SetStateAction<resultProps | undefined>>] = React.useState();

    const [searchParam, setSearchParam]: [SearchParamProps, React.Dispatch<React.SetStateAction<SearchParamProps>>] = React.useState({
        email: auth.user.email,
        pageLength: pageLength,
    });

    /**
     * アコーディオンを開閉する
     * @param icId 重要連絡ID
     */
    const handleChange = (icId: number) => (event: React.SyntheticEvent, isExpanded: boolean): void => {
        if (isExpanded) {
            updateReadStatus(icId, READ_STATUS);
            setIsOpenAccordion(icId);
        } else {
            setIsOpenAccordion(false);
        }
    };

    /**
     * 重要連絡情報を取得する
     * @param page 閲覧するページ番号
     * @param params 制御パラメータ
     */
    const fetch = (page: number, params: SearchParamProps): void => {

        setIsLoading(true);
        setNowPage(page);
        setSearchParam(params);

        const alertId: string = 'ic1';

        axios.get(url + `?page=${page}`, {
            params: params,
        }).then((res: AxiosResponse): void => {
            setIsLoading(false);
            setAlertList(removeAlert(alertList, alertId));
            setImportantItems(res.data[0]);
        }).catch((): void => {
            setIsLoading(false);
            setAlertList(
                addAlert(alertList, {
                    AlertId: alertId,
                    AlertSeverity: 'error',
                    AlertTitle: '致命的なシステムエラー',
                    AlertMessage: '重要連絡先の取得に失敗しました',
                }
            ));
        });
    };

    /**
     * 既読・未読のステータスを更新する
     * @param icId
     * @param status
     */
    const updateReadStatus = (icId: number, status: number): void => {
        const alertId: string = 'ic2';

        axios.post(`/api/important-communications/read`, {
            email: auth.user.email,
            ic_id: icId,
            status: status,
        }).then((): void => {
            setAlertList(removeAlert(alertList, alertId));
            if (!importantItems || !importantItems.data || !Array.isArray(importantItems.data)) {
                return;
            }
            const updateImportantItems: ItemProps[] = importantItems.data.map((item: ItemProps) => {
                const now: Date = new Date();
                const updatedItem: ItemProps = { ...item };
                if (status === READ_STATUS && item.ic_id === icId) {
                    updatedItem.icrf_read_at = now.toISOString();
                }
                else if (status === UNREAD_STATUS && item.ic_id === icId) {
                    updatedItem.icrf_read_at = null;
                }
                return updatedItem;
            });

            setImportantItems({
                ...importantItems,
                data: updateImportantItems,
                current_page: importantItems.current_page,
                last_page: importantItems.last_page,
            });
        }).catch((): void => {
            setAlertList(
                addAlert(alertList, {
                        AlertId: alertId,
                        AlertSeverity: 'error',
                        AlertTitle: '致命的なシステムエラー',
                        AlertMessage: '重要連絡先の既読状態の更新に失敗しました',
                    }
                ));
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <Box className="w-full flex justify-between items-center">
                    <Box className="flex items-center">
                        <Typography variant="h6">
                            重要連絡
                        </Typography>
                    </Box>
                    <Box className="flex items-center">
                        <SortMenu
                            callback={(params: any): void => {
                                const { column, orderBy, ...rest } = searchParam;
                                fetch(1, {
                                    ...rest,
                                    ...params,
                                });
                            }}
                        />
                        <SearchDrawer
                            auth={auth}
                            callback={(params: SearchParamProps): void => {
                                const { searchContent, searchTitle, selectedCategories, selectedEndDate, selectedStartDate, selectedUsers, ...rest } = searchParam;
                                fetch(1, {
                                    ...rest,
                                    ...params,
                                });
                            }}
                        />
                        <AddFrom
                            auth={auth}
                            callback={(): void => {
                                // fetch(1);
                            }}
                        />
                    </Box>
                </Box>
            }
        >
            <Head title="重要連絡" />
            <AlertMessage alertList={alertList} />
            <Box className="w-full mx-auto flex flex-col items-center justify-center mb-6 border-t border-gray-600">
                <Box className="w-[1200px]">
                    <Box className="flex flex-col items-center mt-6 mb-6">
                        <Pagination
                            color="secondary"
                            count={importantItems && importantItems.last_page ? importantItems.last_page : 1}
                            page={importantItems && importantItems.current_page ? importantItems.current_page : 1}
                            onChange={(_: React.ChangeEvent<unknown>, page: number) => fetch(page, searchParam)}
                        />
                    </Box>
                    <Fade in={!isLoading}>
                        <Box className="w-full">
                            {!isLoading && importantItems && importantItems.data.map((item: ItemProps, index: number): JSX.Element => (
                                <Accordion
                                    key={index}
                                    expanded={isOpenAccordion === item.ic_id}
                                    onChange={handleChange(item.ic_id)}
                                    className="w-[1200px] mx-auto mb-1"
                                >
                                    <AccordionSummary expandIcon={<KeyboardArrowDownIcon />}>
                                        <Box className="flex justify-between w-full">
                                            <Box className="flex items-center">
                                                <Box className="mr-4">
                                                    {item.icrf_read_at ? (
                                                        <Tooltip title={"既読日時：" + formatDateTime(item.icrf_read_at)}>
                                                            <Chip
                                                                className="font-bold"
                                                                variant="filled"
                                                                size="small"
                                                                color="primary"
                                                                label="既読"
                                                            />
                                                        </Tooltip>
                                                    ) : (
                                                        <Chip
                                                            className="font-bold"
                                                            variant="filled"
                                                            size="small"
                                                            color="error"
                                                            label="未読"
                                                        />
                                                    )}
                                                </Box>
                                                <Typography className="font-bold text-lg">
                                                    {item.ic_title}
                                                </Typography>
                                            </Box>
                                            <Box className="flex items-end">
                                                <Chip
                                                    className="ml-2 font-bold"
                                                    avatar={<Avatar alt="アバター画像" src={item.avatar_url} />}
                                                    label={item.first_name + " " + item.last_name}
                                                    variant="filled"
                                                    color="primary"
                                                />
                                                {item.ic_category_id && (
                                                    ImportantCommunicationCategoryList
                                                        .filter((category: ImportantCommunicationCategoryType): boolean => category.id === item.ic_category_id)
                                                        .map((category: ImportantCommunicationCategoryType) => (
                                                            <Tooltip title={category.description} key={category.id}>
                                                                <Chip
                                                                    className="ml-2 w-28 font-bold"
                                                                    variant="filled"
                                                                    color={category.color}
                                                                    label={category.title}
                                                                />
                                                            </Tooltip>
                                                        ))
                                                )}
                                                {item.ic_deadline_at ? (
                                                    <Tooltip
                                                        title = {
                                                            hasTime(item.ic_deadline_at) ?
                                                                "期限：" + formatDateTime(item.ic_deadline_at) :
                                                                "期限：" + formatDate(item.ic_deadline_at)
                                                        }
                                                    >
                                                        <Chip
                                                            className="ml-2 mr-4 w-24 font-bold"
                                                            variant="filled"
                                                            color={isOverTime(item.ic_deadline_at) ? "error" : (getRemainingDays(item.ic_deadline_at) > 3 ? "success" : "warning")}
                                                            avatar={isOverTime(item.ic_deadline_at) ? <TimerOffRoundedIcon /> : <TimerRoundedIcon />}
                                                            label={
                                                                getRemainingDays(item.ic_deadline_at) >= 1 ?
                                                                    getRemainingDays(item.ic_deadline_at) + "日後" :
                                                                    (getRemainingDays(item.ic_deadline_at) < 0 ? Math.abs(getRemainingDays(item.ic_deadline_at)) + "日前" : "今日")
                                                            }
                                                        />
                                                    </Tooltip>
                                                ) : (
                                                    <Tooltip title = "期限は設定されていません">
                                                        <Chip
                                                            className="ml-2 mr-4 w-24 font-bold"
                                                            variant="filled"
                                                            color="info"
                                                            avatar={<TimerOffRoundedIcon />}
                                                            label="未設定"
                                                        />
                                                    </Tooltip>
                                                )}
                                            </Box>
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <MarkdownEditor.Markdown
                                            className="p-4"
                                            source={item.ic_content ?? ''} />
                                        <Box className="flex justify-between w-full mt-4">
                                            <Box className="flex items-center">
                                                <Button
                                                    variant="contained"
                                                    color="warning"
                                                    size="small"
                                                    onClick={(): void => {
                                                        updateReadStatus(item.ic_id, UNREAD_STATUS);
                                                        setIsOpenAccordion(false);
                                                    }}
                                                >
                                                    未読に戻す
                                                </Button>
                                                <Tooltip title="投稿日時" placement="top">
                                                    <Chip
                                                        className="mr-4 ml-4"
                                                        variant="filled"
                                                        color="primary"
                                                        size="small"
                                                        icon={<QueryBuilderRoundedIcon />}
                                                        label={formatDateTime(item.ic_created_at)}
                                                    />
                                                </Tooltip>
                                                {item.ic_created_at !== item.ic_updated_at && (
                                                    <Tooltip title="更新日時" placement="top">
                                                        <Chip
                                                            variant="filled"
                                                            color="primary"
                                                            size="small"
                                                            icon={<UpdateRoundedIcon />}
                                                            label={formatDateTime(item.ic_updated_at)}
                                                        />
                                                    </Tooltip>
                                                )}
                                            </Box>
                                            <Box className="flex items-center">
                                                <Box className="mr-2">
                                                    <Button
                                                        variant="contained"
                                                        size="small"
                                                        color="primary"
                                                    >
                                                        編集
                                                    </Button>
                                                </Box>
                                                <DeleteButton
                                                    auth={auth}
                                                    item={item}
                                                    callback={(result: resultProps): void => {
                                                    result && setResult(result);
                                                    fetch(nowPage, searchParam);
                                                }} />
                                            </Box>
                                        </Box>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                            {!isLoading && importantItems && importantItems.data.length === 0 && (
                                <Box className="w-full text-center">
                                    <Typography className="text-2xl font-bold">データがありません</Typography>
                                </Box>
                            )}
                        </Box>
                    </Fade>
                </Box>
            </Box>
            <Loading show={isLoading} wait={200} />
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={!!result?.title}
                autoHideDuration={4000}
                onClose={() => setResult({})}
            >
                {result && (
                    <Alert
                        icon={false}
                        onClose={() => setResult({})}
                        severity={result.severity}
                    >
                        <AlertTitle>{result.title}</AlertTitle>
                        {result.message}
                    </Alert>
                )}
            </Snackbar>
        </AuthenticatedLayout>
    );
});

export default ImportantCommunication;
