import React, {useEffect} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Box,
    Button, Checkbox,
    Chip,
    Drawer, FormControlLabel, IconButton,
    Pagination, TextField,
    Typography
} from "@mui/material";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {User} from "@/types";
import {Head, router} from "@inertiajs/react";
import {AddFrom} from "@/Pages/Communication/Partials/AddFrom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {Loading} from "@/Components/Loading";
import MarkdownEditor from "@uiw/react-markdown-editor";
import TimerRoundedIcon from '@mui/icons-material/TimerRounded';
import TimerOffRoundedIcon from '@mui/icons-material/TimerOffRounded';
import Tooltip from '@mui/material/Tooltip';
import UpdateRoundedIcon from '@mui/icons-material/UpdateRounded';
import QueryBuilderRoundedIcon from '@mui/icons-material/QueryBuilderRounded';
import {formatDate, formatDateTime, getRemainingDays, hasTime, isOverTime} from "@/Common/Date";
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {ImportantCommunicationCategoryList, ImportantCommunicationCategoryType, READ_STATUS, UNREAD_STATUS
} from "@/Const/Communication/ImportantCommunicatonCategory";
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import {SearchForm} from "@/Pages/Communication/Partials/SearchForm";
import {FilterDrawer} from "@/Pages/Communication/Partials/FilterDrawer";

type Props = {
    auth: {
        user: User;
    },
    items?: ItemProps;
}

type ItemProps = {
    last_page: number;
    current_page: number;
    data: ItemDataProps[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

type ItemDataProps = {
    id: number;
    ic_id: number;
    ic_title: string;
    ic_content: string;
    ic_category_id: number;
    ic_deadline_at: string;
    ic_created_at: string;
    ic_updated_at: string;
    icrf_status: number;
    icrf_read_at: string;
    first_name: string;
    first_name_kana: string;
    last_name: string;
    last_name_kana: string;
    avatar_url: string;
}

const ImportantCommunication: React.FC<Props> = ({ auth, items }: Props) => {

    const [isOpenAccordion, setIsOpenAccordion]: [number | false, React.Dispatch<React.SetStateAction<number | false>>] = React.useState<number | false>(false);

    const [importantItems, setImportantItems]: [ItemProps | undefined, React.Dispatch<React.SetStateAction<ItemProps | undefined>>] = React.useState(items);

    const [params, setParams] = React.useState();

    const handleChange = (icId: number) => (event: React.SyntheticEvent, isExpanded: boolean): void => {
        if (isExpanded) {
            updateReadStatus(icId, READ_STATUS);
            setIsOpenAccordion(icId);
        } else {
            setIsOpenAccordion(false);
        }
    };

    const handlePageChange = (page: number): void => {
        if (!importantItems || !importantItems.links || !Array.isArray(importantItems.links)) {
            return;
        }
        const url: string = importantItems.links[1].url?.replace(/\?page=\d+/, '') || '';
        if (url === window.location.origin + '/important-communication') {
            url && router.visit(url + `?page=${page}`);
        }
        else {
            axios.get(url + `?page=${page}`, {
                params: params,
            }).then((res): void => {
                setImportantItems(res.data[0]);
            }).catch((err): void => {
                alert(err);
            });
        }
    };

    const updateReadStatus = (icId: number, status: number): void => {
        axios.post(`/api/important-communication/read`, {
            email: auth.user.email,
            ic_id: icId,
            status: status,
        }).then((): void => {
            if (!importantItems || !importantItems.data || !Array.isArray(importantItems.data)) {
                return;
            }
            const updateImportantItems: ItemDataProps[] = importantItems.data.map((item: ItemDataProps) => {
                const now: Date = new Date();
                const updatedItem: ItemDataProps = { ...item };
                if (status === READ_STATUS && item.ic_id === icId) {
                    updatedItem.icrf_status = READ_STATUS;
                    updatedItem.icrf_read_at = now.toISOString();
                }
                else if (status === UNREAD_STATUS && item.ic_id === icId) {
                    updatedItem.icrf_status = UNREAD_STATUS;
                }
                return updatedItem;
            });
            setImportantItems({
                ...importantItems,
                data: updateImportantItems,
                current_page: importantItems.current_page,
                last_page: importantItems.last_page,
            });
        }).catch((err): void => {
            alert(err);
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
                        <FilterDrawer
                            auth={auth}
                            callback={(items: any): void => {
                                items && items.data && setImportantItems(items.data);
                                setParams(items.params);
                            }}
                        />
                        <SearchForm
                        />
                        <AddFrom />
                    </Box>
                </Box>
            }
        >
            <Head title="重要連絡" />
            <Box className="w-[1200px] mx-auto flex flex-col items-center justify-center">
                    <Box className="flex flex-col items-center mt-6 mb-6">
                        {
                            importantItems && (
                                <Pagination
                                    count={importantItems.last_page}
                                    page={importantItems.current_page}
                                    color="primary"
                                    size="medium"
                                    shape="rounded"
                                    onChange={(_: React.ChangeEvent<unknown>, page: number) => handlePageChange(page)}
                                />
                            )
                        }
                    </Box>

                    {importantItems && importantItems.data && Array.isArray(importantItems.data) ? importantItems.data.map((item, index: number): JSX.Element => (
                        <Accordion
                            key={index}
                            expanded={isOpenAccordion === item.ic_id}
                            onChange={handleChange(item.ic_id)}
                            className="w-[1200px] mx-auto mb-1"
                        >
                            <AccordionSummary
                                expandIcon={<KeyboardArrowDownIcon />}
                                aria-controls={`panel-${item.ic_id}bh-content`}
                                id="panel1bh-header"
                            >
                                <Box className="flex justify-between w-full">
                                    <Box className="flex items-center">
                                        <Box className="mr-4">
                                            {
                                                item.icrf_status === READ_STATUS ? (
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
                                                )
                                            }
                                        </Box>
                                        <Typography
                                            className="font-bold text-lg"
                                        >
                                            {item.ic_title}
                                        </Typography>
                                    </Box>
                                    <Box className="flex items-end">
                                        {/* 投稿者情報 */}
                                        <Chip
                                            className="ml-2 font-bold"
                                            avatar={<Avatar alt="アバター画像" src={item.avatar_url} />}
                                            label={item.first_name + " " + item.last_name}
                                            variant="filled"
                                            color="primary"
                                        />

                                        {/****************************************
                                            周知ジャンル
                                         ****************************************/}
                                        {item.ic_category_id && (
                                            ImportantCommunicationCategoryList
                                                .filter((category: ImportantCommunicationCategoryType): boolean => category.id === item.ic_category_id)
                                                .map((category: ImportantCommunicationCategoryType) => (
                                                    <Tooltip title={category.description} key={category.id}>
                                                        <Chip
                                                            className="ml-2 font-bold w-28"
                                                            variant="filled"
                                                            color={category.color}
                                                            label={category.title}
                                                        />
                                                    </Tooltip>
                                                ))
                                        )}

                                        {/****************************************
                                            対応期限
                                         ****************************************/}
                                        {
                                            item.ic_deadline_at ? (
                                                <Tooltip
                                                    title = {
                                                        hasTime(item.ic_deadline_at) ?
                                                            "期限：" + formatDateTime(item.ic_deadline_at) :
                                                            "期限：" + formatDate(item.ic_deadline_at)
                                                    }
                                                >
                                                    <Chip
                                                        className="ml-2 font-bold mr-4 w-24"
                                                        variant="filled"
                                                        color={isOverTime(item.ic_deadline_at) ? "error" : (getRemainingDays(item.ic_deadline_at) > 3 ? "success" : "warning")}
                                                        avatar={isOverTime(item.ic_deadline_at) ? <TimerOffRoundedIcon /> : <TimerRoundedIcon />}
                                                        label={
                                                            getRemainingDays(item.ic_deadline_at) >= 1 ?
                                                                getRemainingDays(item.ic_deadline_at) + "日後" :
                                                                (
                                                                    getRemainingDays(item.ic_deadline_at) < 0 ? Math.abs(getRemainingDays(item.ic_deadline_at)) + "日前" : "今日"
                                                                )
                                                        }
                                                    />
                                                </Tooltip>
                                            ) : (
                                                <Tooltip title = "期限は設定されていません">
                                                    <Chip
                                                        className="ml-2 font-bold mr-4 w-24"
                                                        variant="filled"
                                                        color="info"
                                                        avatar={<TimerOffRoundedIcon />}
                                                        label="未設定"
                                                    />
                                                </Tooltip>
                                            )
                                        }
                                    </Box>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <MarkdownEditor.Markdown
                                    className="p-4"
                                    source={item.ic_content ?? ''} />
                                <Box className="flex justify-between w-full mt-3">
                                    <Box className="flex items-center">
                                        <Button
                                            variant="outlined"
                                            color="warning"
                                            size="small"
                                            onClick={(): void => {
                                                updateReadStatus(item.ic_id, UNREAD_STATUS);
                                                setIsOpenAccordion(false);
                                            }}
                                        >
                                            未読に戻す
                                        </Button>
                                        <Chip
                                            className="mr-2 ml-2"
                                            variant="filled"
                                            color="primary"
                                            size="small"
                                            icon={<QueryBuilderRoundedIcon />}
                                            label={formatDateTime(item.ic_created_at)}
                                        />
                                        <Chip
                                            className="mr-2"
                                            variant="filled"
                                            color="primary"
                                            size="small"
                                            icon={<UpdateRoundedIcon />}
                                            label={formatDateTime(item.ic_updated_at)}
                                        />
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
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            color="error"
                                        >
                                            削除
                                        </Button>
                                    </Box>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    ))
                    : (
                        <Box className="w-[1200px] mx-auto">
                            <Typography className="text-center">重要連絡はありません</Typography>
                        </Box>
                    )}
                </Box>
            <Loading show={!items} />
        </AuthenticatedLayout>
    );
}

export default ImportantCommunication;
