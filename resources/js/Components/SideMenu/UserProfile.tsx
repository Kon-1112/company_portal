import React from "react";
import { Avatar, Box, Typography } from "@mui/material";

/**
 * ユーザープロフィールの型
 * @type {UserProfileType}
 */
type UserProfileType = {
    profile_image_url: string;
    first_name: string;
    first_name_kana: string;
    last_name: string;
    last_name_kana: string;
    email: string;
};

/**
 * ユーザープロフィール
 * @param props
 */
export const UserProfile: React.MemoExoticComponent<React.FunctionComponent<UserProfileType>> = React.memo((props: UserProfileType) => {

    /**
     * スタイル
     * @type {{[p: string]: React.CSSProperties}}
     */
    const styles: { [key: string]: React.CSSProperties }
        = {
        container: {
            marginTop: "20px",
            marginBottom: "25px",
        },
        avatarWrapper: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "6px",
        },
        nameWrapper: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
        },
        name: {
            fontWeight: 600,
        },
        email: {
            fontWeight: 600,
        },
    };

    return (
        <Box sx={styles.container}>
            <Box sx={styles.avatarWrapper}>
                <Avatar
                    alt="社員画像"
                    src={props.profile_image_url}
                    sx={{ width: 100, height: 100 }}
                />
            </Box>
            <Box sx={styles.nameWrapper}>
                <Typography variant="h6" sx={styles.name}>
                    <ruby>
                        {props.first_name}
                        <rt>{props.first_name_kana}</rt>
                    </ruby>
                    &nbsp;
                    <ruby>
                        {props.last_name}
                        <rt>{props.last_name_kana}</rt>
                    </ruby>
                </Typography>
                <Typography variant="body2" sx={styles.email}>
                    {props.email}
                </Typography>
            </Box>
        </Box>
    );
});
