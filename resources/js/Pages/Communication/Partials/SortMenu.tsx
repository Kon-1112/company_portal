import SortRoundedIcon from '@mui/icons-material/SortRounded';
import React from "react";
import {Divider, Fade, IconButton, Menu, MenuItem} from "@mui/material";

type Props = {
    callback: any,
}

type SortParamProps = {
    column?: string;
    orderBy?: string;
}

export const SortMenu: React.NamedExoticComponent<Props> = React.memo(({ callback }: Props): JSX.Element => {

    const [anchorEl, setAnchorEl]: [null | HTMLElement, React.Dispatch<React.SetStateAction<null | HTMLElement>>] = React.useState<null | HTMLElement>(null);

    const [sortParam, setSortParam]: [SortParamProps, React.Dispatch<React.SetStateAction<SortParamProps>>] = React.useState({});

    const open: boolean = Boolean(anchorEl);

    /**
     * メニューを開く
     * @param event
     */
    const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchorEl(event.currentTarget);
    };

    /**
     * メニューを閉じる
     */
    const handleClose = (): void => {
        setAnchorEl(null);
    };

    /**
     * ソートパラメータを設定する
     * @param sortParam
     * @returns {void}
     */
    React.useEffect((): void => {
        callback(sortParam);
    }, [sortParam]);

    return (
        <React.Fragment>
            <IconButton onClick={handleClick}>
                <SortRoundedIcon />
            </IconButton>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={() => setSortParam({
                        column: 'icrf_read_at',
                        orderBy: 'desc'
                    })}
                >
                    未読順
                </MenuItem>
                <MenuItem onClick={() => setSortParam({
                        column: 'icrf_read_at',
                        orderBy: 'asc'
                    })}
                >
                    既読順
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => setSortParam({
                        column: 'ic_created_at',
                        orderBy: 'desc'
                    })}
                >
                    新しい投稿日時順
                </MenuItem>
                <MenuItem
                    onClick={() => setSortParam({
                        column: 'ic_created_at',
                        orderBy: 'asc'
                    })}
                >
                    古い投稿日時順
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => setSortParam({
                        column: 'ic_deadline_at',
                        orderBy: 'desc'
                    })}
                >
                    期限日が新しい順
                </MenuItem>
                <MenuItem onClick={() => setSortParam({
                        column: 'ic_deadline_at',
                        orderBy: 'asc'
                    })}
                >
                    期限日が古い順
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => setSortParam({})}
                >
                    リセット
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
});
