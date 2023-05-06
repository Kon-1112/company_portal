import React from "react";
import {Autocomplete, Box, Button, Drawer, IconButton, TextField, Typography} from "@mui/material";
import axios, {AxiosResponse} from "axios";
import {User} from "@/types";
import {Loading} from "@/Components/Loading";
import {ImportantCommunicationCategoryList, ImportantCommunicationCategoryType} from "@/Const/Communication/ImportantCommunicatonCategory";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {DatePicker} from "@mui/x-date-pickers";
import {Dayjs} from "dayjs";
import {addAlert, AlertMessage, AlertProps, removeAlert} from "@/Components/AlertMessage";

type Props = {
    auth: {
        user: User
    },
    callback: any,
}

export const SearchDrawer: React.NamedExoticComponent<Props> = React.memo(({ auth, callback }: Props) => {

    const [isOpenFilterDrawer, setIsOpenFilterDrawer]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = React.useState(false);

    const [searchTitle, setSearchTitle]: [string, React.Dispatch<React.SetStateAction<any>>] = React.useState('');

    const [searchContent, setSearchContent]: [string, React.Dispatch<React.SetStateAction<any>>] = React.useState('');

    const [allUsers, setAllUsers]: [User[], React.Dispatch<React.SetStateAction<any>>] = React.useState([]);

    const [isLoading, setIsLoading]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = React.useState(false);

    const [selectedUsers, setSelectedUsers]: [User[], React.Dispatch<React.SetStateAction<any>>] = React.useState([]);

    const [selectedCategories, setSelectedCategories]: [ImportantCommunicationCategoryType[], React.Dispatch<React.SetStateAction<any>>] = React.useState([]);

    const [selectedStartDayjs, setSelectedStartDayjs]: [Dayjs | null, React.Dispatch<React.SetStateAction<any>>] = React.useState<Dayjs | null>(null);

    const [selectedEndDayjs, setSelectedEndDayjs]: [Dayjs | null, React.Dispatch<React.SetStateAction<any>>] = React.useState<Dayjs | null>(null);

    const [alertList, setAlertList]: [AlertProps[], React.Dispatch<React.SetStateAction<any>>] = React.useState([]);

    /**
     * フィルタードロワーを開く
     * @returns {void}
     */
    const handleSearchDrawer = (): void => {
        setIsOpenFilterDrawer(!isOpenFilterDrawer);
    }

    const search = (): void => {
        let selectStartDateTime: string = '';
        selectedStartDayjs && (selectStartDateTime = selectedStartDayjs.format('YYYY-MM-DD') + ' 00:00:00');

        let selectEndDateTime: string = '';
        selectedEndDayjs && (selectEndDateTime = selectedEndDayjs.format('YYYY-MM-DD') + ' 23:59:59');

        let params: any = {};

        auth.user.email && (params = {email: auth.user.email});
        searchTitle && (params = {...params, searchTitle: searchTitle});
        searchContent && (params = {...params, searchContent: searchContent});
        selectedUsers.length && (params = {...params, selectedUsers: selectedUsers});
        selectedCategories.length && (params = {...params, selectedCategories: selectedCategories});
        selectStartDateTime && (params = {...params, selectedStartDate: selectStartDateTime});
        selectEndDateTime && (params = {...params, selectedEndDate: selectEndDateTime});

        callback(params);
    }

    React.useEffect((): void => {
        if (isOpenFilterDrawer && !allUsers.length) {
            setIsLoading(true);
            axios.get('/api/users')
                .then((res: AxiosResponse): void => {
                    if (res.data) {
                        const users: User[] = res.data;
                        setAllUsers(users);
                    }
                    setIsLoading(false);
                })
                .catch((err): void => {
                    alert(err);
                    setIsLoading(false);
                });
        }
    }, [isOpenFilterDrawer]);

    return (
        <React.Fragment>
            <IconButton onClick={() => handleSearchDrawer()}>
                <SearchRoundedIcon />
            </IconButton>
            <Drawer
                anchor='right'
                open={isOpenFilterDrawer}
                onClose={() => handleSearchDrawer()}
            >
                <AlertMessage alertList={alertList} />

                <Box className="w-[400px] p-4">
                    <Box className="flex justify-between items-center">
                        <Typography variant="h6" className="font-bold text-lg">
                            検索
                        </Typography>
                        <IconButton onClick={() => handleSearchDrawer()}>
                            <CloseRoundedIcon />
                        </IconButton>
                    </Box>
                    <Box className="mt-4">
                        <TextField
                            className="w-full"
                            label="タイトル検索"
                            variant="outlined"
                            value={searchTitle}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTitle(e.target.value)}
                        />
                    </Box>
                    <Box className="mt-6">
                        <TextField
                            className="w-full"
                            label="本文検索"
                            variant="outlined"
                            value={searchContent}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchContent(e.target.value)}
                        />
                    </Box>
                    {allUsers && allUsers.length > 0 && (
                        <Box className="mt-6">
                            <Autocomplete
                                multiple
                                className="mt-4"
                                id="tags-outlined"
                                options={allUsers}
                                value={selectedUsers}
                                onChange={(event: React.SyntheticEvent<Element, Event>, user: User[]): void => {
                                    setSelectedUsers(user);
                                }}
                                getOptionLabel={(option: User): string => {
                                    const isDuplicate: boolean = allUsers.filter(
                                        user => user.first_name + user.last_name === option.first_name + option.last_name
                                    ).length > 1;
                                    if (isDuplicate) {
                                        return option.first_name + ' ' + option.last_name + ' (' + option.email + ')';
                                    }
                                    return option.first_name + ' ' + option.last_name;
                                }}
                                filterSelectedOptions
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="投稿社員"
                                        variant="outlined"
                                    />
                                )}
                            />
                        </Box>
                    )}
                    {ImportantCommunicationCategoryList && ImportantCommunicationCategoryList.length > 0 && (
                        <Box className="mt-6">
                            <Autocomplete
                                multiple
                                options={ImportantCommunicationCategoryList}
                                getOptionLabel={(option: ImportantCommunicationCategoryType): string => option.title}
                                filterSelectedOptions
                                value={selectedCategories}
                                onChange={(event: any, category: any): void => {
                                    setSelectedCategories(category);
                                }}
                                renderInput={(params: any) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        label="カテゴリ"
                                    />
                                )}
                            />
                        </Box>
                    )}
                    <Box className="mt-6">
                        <DatePicker
                            className="w-full"
                            label="開始日"
                            value={selectedStartDayjs}
                            onChange={(date: Dayjs | null): void => {
                                const alertId: string = 'sd1';
                                let startDayjs: Dayjs | null = date;
                                if (selectedEndDayjs && startDayjs && startDayjs.format('YYYY-MM-DD') > selectedEndDayjs.format('YYYY-MM-DD')) {
                                    setAlertList(
                                        addAlert(
                                            alertList,
                                            {
                                                AlertSeverity: 'error',
                                                AlertId: alertId,
                                                AlertTitle: '開始日エラー',
                                                AlertMessage: '開始日は終了日以前の日付を選択してください',
                                            }
                                        )
                                    )
                                } else {
                                    setAlertList(removeAlert(alertList, alertId));
                                    setSelectedStartDayjs(date);
                                }
                            }}
                            slotProps={{
                                textField: {
                                    helperText: '開始日に設定された日付以降の投稿を検索します',
                                },
                            }}
                        />
                    </Box>
                    <Box className="mt-6">
                        <DatePicker
                            className="w-full"
                            label="終了日"
                            value={selectedEndDayjs}
                            onChange={(date: Dayjs | null): void => {
                                const alertId: string = 'sd2';
                                let endDayjs: Dayjs | null = date;
                                if (selectedStartDayjs && endDayjs && endDayjs.format('YYYY-MM-DD') < selectedStartDayjs.format('YYYY-MM-DD')) {
                                    setAlertList(
                                        addAlert(
                                            alertList,
                                            {
                                                AlertSeverity: 'error',
                                                AlertId: alertId,
                                                AlertTitle: '終了日エラー',
                                                AlertMessage: '終了日は開始日以降の日付を選択してください',
                                            }
                                        )
                                    )
                                } else {
                                    setAlertList(removeAlert(alertList, alertId));
                                    setSelectedEndDayjs(date);
                                }
                            }}
                            slotProps={{
                                textField: {
                                    helperText: '終了日に設定された日付以前の投稿を検索します',
                                },
                            }}
                        />
                    </Box>
                </Box>
                <Box className="flex justify-end p-4">
                    <Box className="mr-4">
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            onClick={(): void => {
                                setSelectedStartDayjs(null);
                                setSelectedEndDayjs(null);
                                setSearchTitle('');
                                setSearchContent('');
                                setSelectedUsers([]);
                                setSelectedCategories([]);
                                setAlertList([]);
                            }}
                        >
                            リセット
                        </Button>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => search()}
                        disabled={alertList.length > 0}
                    >
                        検索
                    </Button>
                </Box>
                <Loading show={isLoading} />
            </Drawer>
        </React.Fragment>
    );
});
