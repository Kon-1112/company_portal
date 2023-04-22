import React from "react";
import {Avatar, Box, Typography} from "@mui/material";

export const CompanyLogo = React.memo(() => {
    const url = new URL(window.location.href);
    return (
        <Box className="flex items-center justify-center p-4 border-b dark:border-gray-600">
            <Box className="flex items-center justify-center w-16 h-16 mr-4 bg-gray-100 rounded-full">
            <Avatar
                sx={{width: 60, height: 60}}
                src={url.origin + "/storage/images/icon.png"}
                alt="ロゴ"
                variant="square" />
            </Box>
            <Typography variant="h6" className="text-2xl font-bold">
                Company Name
            </Typography>
        </Box>
    );
});
