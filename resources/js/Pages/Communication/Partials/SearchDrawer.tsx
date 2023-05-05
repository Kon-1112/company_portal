import React from "react";
import {Autocomplete, Box, Button, Drawer, IconButton, TextField, Typography} from "@mui/material";
import axios, {AxiosResponse} from "axios";
import {User} from "@/types";
import {Loading} from "@/Components/Loading";
import {ImportantCommunicationCategoryList, ImportantCommunicationCategoryType} from "@/Const/Communication/ImportantCommunicatonCategory";
import Tooltip from "@mui/material/Tooltip";
import {convertDateForTextInput} from "@/Common/Date";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

type Props = {
    auth: {
        user: User
    },
    callback: any,
}

export const SearchDrawer = React.memo(({ auth, callback }: Props) => {

    const [isOpenFilterDrawer, setIsOpenFilterDrawer]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = React.useState(false);

    const [searchTitle, setSearchTitle]: [string, React.Dispatch<React.SetStateAction<any>>] = React.useState('');

    const [searchContent, setSearchContent]: [string, React.Dispatch<React.SetStateAction<any>>] = React.useState('');

    const [allUsers, setAllUsers]: [User[], React.Dispatch<React.SetStateAction<any>>] = React.useState([]);

    const [isLoading, setIsLoading]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = React.useState(false);

    const [selectedUsers, setSelectedUsers]: [User[], React.Dispatch<React.SetStateAction<any>>] = React.useState([]);

    const [selectedCategories, setSelectedCategories]: [ImportantCommunicationCategoryType[], React.Dispatch<React.SetStateAction<any>>] = React.useState([]);

    const [selectedStartDate, setSelectedStartDate]: [string, React.Dispatch<React.SetStateAction<any>>] = React.useState('');

    const [selectedEndDate, setSelectedEndDate]: [string, React.Dispatch<React.SetStateAction<any>>] = React.useState('');

    const handleFilterDrawer = (): void => {
        setIsOpenFilterDrawer(!isOpenFilterDrawer);
    }

    const search = (): void => {
        const selectStartDateTime: string = selectedStartDate + ' 00:00:00';
        const selectEndDateTime: string = selectedEndDate + ' 23:59:59';
        const params: any = {
            email: auth.user.email,
            searchTitle: searchTitle,
            searchContent: searchContent,
            selectedUsers: selectedUsers,
            selectedCategories: selectedCategories,
            selectedStartDate: selectedStartDate ? selectStartDateTime : '',
            selectedEndDate: selectedEndDate ? selectEndDateTime : '',
        }

        setIsLoading(true);
        axios.get('/api/important-communications/search', {
            params: params,
        }).then((res: AxiosResponse): void => {
            console.log(res.data[0]);
            callback({data: res.data[0], params: params});
            setIsLoading(false);
        }).catch((err): void => {
            alert(err);
            setIsLoading(false);
        });
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
            <IconButton onClick={() => handleFilterDrawer()}>
                <SearchRoundedIcon />
            </IconButton>
            <Drawer
                anchor='right'
                open={isOpenFilterDrawer}
                onClose={() => handleFilterDrawer()}
            >
                <Box className="w-[400px] p-4">
                    <Box className="flex justify-between items-center">
                        <Typography variant="h6" className="font-bold text-lg">
                            検索
                        </Typography>
                        <IconButton onClick={() => handleFilterDrawer()}>
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
                            <Tooltip title="投稿した社員名でフィルタリングします" placement="left">
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
                            </Tooltip>
                        </Box>
                    )}
                    {ImportantCommunicationCategoryList && ImportantCommunicationCategoryList.length > 0 && (
                        <Box className="mt-6">
                            <Tooltip title="投稿されたカテゴリ名でフィルタリングします" placement="left">
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
                            </Tooltip>
                        </Box>
                    )}
                    <Box className="mt-6">
                        <Tooltip title="開始日以降の投稿をフィルタリングします" placement="left">
                            <TextField
                                className="w-full"
                                label="開始日"
                                type="date"
                                variant="outlined"
                                value={selectedStartDate ? convertDateForTextInput(selectedStartDate) : ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                                    if (selectedEndDate && selectedEndDate < e.target.value) {
                                        return;
                                    }
                                    setSelectedStartDate(e.target.value);
                                }}
                                InputLabelProps={{shrink: true}}
                            />
                        </Tooltip>
                    </Box>
                    <Box className="mt-6">
                        <Tooltip title="終了日以前の投稿をフィルタリングします" placement="left">
                            <TextField
                                className="w-full"
                                label="終了日"
                                type="date"
                                variant="outlined"
                                value={selectedEndDate ? convertDateForTextInput(selectedEndDate) : ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                                    if (selectedStartDate && selectedStartDate > e.target.value) {
                                        return;
                                    }
                                    setSelectedEndDate(e.target.value);
                                }}
                                InputLabelProps={{shrink: true}}
                            />
                        </Tooltip>
                    </Box>
                </Box>
                <Box className="flex justify-end p-4">
                    <Box className="mr-4">
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            onClick={() => {
                                setSearchTitle('');
                                setSearchContent('');
                                setSelectedUsers([]);
                                setSelectedCategories([]);
                                setSelectedStartDate('');
                                setSelectedEndDate('');
                            }}
                        >
                            リセット
                        </Button>
                    </Box>
                    <Button
                        variant="contained"
                        color="info"
                        size="large"
                        onClick={() => search()}
                    >
                        検索
                    </Button>
                </Box>
                <Loading show={isLoading} />
            </Drawer>
        </React.Fragment>
    );
});
