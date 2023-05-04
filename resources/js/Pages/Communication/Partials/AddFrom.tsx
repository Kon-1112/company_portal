import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import AddIcon from "@mui/icons-material/Add";
import {IconButton} from "@mui/material";

export const AddFrom: React.FC = (): JSX.Element => {

    return (
        <React.Fragment>
            <IconButton
                size="small"
            >
                <AddIcon />
            </IconButton>
        </React.Fragment>
    );
}
