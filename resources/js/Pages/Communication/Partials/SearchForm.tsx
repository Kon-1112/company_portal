import React from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {Box, Drawer, IconButton, TextField, Typography} from "@mui/material";

export const SearchForm: React.FC = (): JSX.Element => {

    const [isOpenSearchDrawer, setIsOpenSearchDrawer]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = React.useState(false);

    return (
        <React.Fragment>
            <IconButton
                size="small"
                onClick={() => setIsOpenSearchDrawer(true)}
            >
                <SearchRoundedIcon />
            </IconButton>

            <Drawer
                anchor='right'
                open={isOpenSearchDrawer}
                onClose={() => setIsOpenSearchDrawer(false)}
            >
                <Box className="w-[400px] p-4">
                    <Typography className="font-bold text-lg">検索</Typography>
                    <Box className="mt-4">
                        <TextField
                            className="w-full"
                            label="タイトル検索"
                            variant="outlined"
                            size="small"
                            // value={searchTitle}
                            // onChange={(e) => setSearchTitle(e.target.value)}
                        />
                    </Box>
                    <Box className="mt-4">
                        <TextField
                            className="w-full"
                            label="本文検索"
                            variant="outlined"
                            size="small"
                            // value={searchTitle}
                            // onChange={(e) => setSearchTitle(e.target.value)}
                        />
                    </Box>
                </Box>
            </Drawer>
        </React.Fragment>
    );
}
