import React from "react";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    Drawer,
    FormControlLabel,
    IconButton,
    TextField,
    Typography
} from "@mui/material";
import axios, {AxiosResponse} from "axios";
import {User} from "@/types";
import {Loading} from "@/Components/Loading";
import {
    ImportantCommunicationCategoryList,
    ImportantCommunicationCategoryType
} from "@/Const/Communication/ImportantCommunicatonCategory";
import Tooltip from "@mui/material/Tooltip";
import {convertDateForTextInput} from "@/Common/Date";

type Props = {
    auth: any,
    callback: any,
}

export const FilterDrawer = ({ auth, callback}: Props) => {

    const [isOpenFilterDrawer, setIsOpenFilterDrawer]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = React.useState(false);

    const [allUsers, setAllUsers]: [User[], React.Dispatch<React.SetStateAction<any>>] = React.useState([]);

    const [isLoading, setIsLoading]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = React.useState(false);

    const [selectedUsers, setSelectedUsers]: [User[], React.Dispatch<React.SetStateAction<any>>] = React.useState([]);

    const [selectedCategories, setSelectedCategories]: [ImportantCommunicationCategoryType[], React.Dispatch<React.SetStateAction<any>>] = React.useState([]);

    const [selectedStartDate, setSelectedStartDate]: [string, React.Dispatch<React.SetStateAction<any>>] = React.useState('');

    const [selectedEndDate, setSelectedEndDate]: [string, React.Dispatch<React.SetStateAction<any>>] = React.useState('');

    const [selectedReadFlag, setSelectedReadFlag]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = React.useState(false);

    const handleFilterDrawer = (): void => {
        setIsOpenFilterDrawer(!isOpenFilterDrawer);
    }

    const search = (): void => {
        axios.get('/api/important-communications/search', {
            params: {
                email: auth.user.email,
                selectedUsers: selectedUsers,
                selectedCategories: selectedCategories,
                selectedStartDate: selectedStartDate,
                selectedEndDate: selectedEndDate,
                selectedReadFlag: selectedReadFlag,
            },
        }).then((res: any): void => {
            callback({
                data: res.data[0],
                params: {
                    email: auth.user.email,
                    selectedUsers: selectedUsers,
                    selectedCategories: selectedCategories,
                    selectedStartDate: selectedStartDate,
                    selectedEndDate: selectedEndDate,
                    selectedReadFlag: selectedReadFlag,
                },
            });
        }).catch((err): void => {
            alert(err);
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
            <IconButton
                onClick={() => handleFilterDrawer()}
                size="large"
            >
                <FilterAltRoundedIcon />
            </IconButton>
            <Drawer
                anchor='right'
                open={isOpenFilterDrawer}
                onClose={() => handleFilterDrawer()}
            >
                <Box className="w-[400px] p-4">
                    <Typography variant="h6" className="font-bold text-lg">
                        フィルタリング
                    </Typography>
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
                                InputLabelProps={{
                                    shrink: true,
                                }}
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
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Tooltip>
                    </Box>
                    <Box className="mt-6">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="blank"
                                    checked={selectedReadFlag}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                                        setSelectedReadFlag(e.target.checked);
                                    }}
                                />
                            }
                            label="未読の投稿のみ表示する"
                        />
                    </Box>
                </Box>
            <Box className="flex justify-end p-4">
                <Box className="mr-4">
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={() => {
                            setSelectedUsers([]);
                            setSelectedCategories([]);
                            setSelectedStartDate('');
                            setSelectedEndDate('');
                            setSelectedReadFlag(false);
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
                    フィルタリング
                </Button>
            </Box>
            </Drawer>
            <Loading show={isLoading} />
        </React.Fragment>
    );
}
