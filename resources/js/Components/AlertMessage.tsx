import React from "react";
import {Alert, AlertTitle, Button, Collapse} from "@mui/material";

export type AlertProps = {
    AlertId: string,
    AlertTitle: string,
    AlertMessage: string,
    AlertSeverity: "success" | "info" | "warning" | "error",
    AlertShowCloseButton?: boolean,
    AlertActionButtonText?: string,
    AlertActionButtonCallback?: () => void,
}

/**
 * アラートリストを追加する
 * @param alertList
 * @param alertItem
 * @returns {AlertProps[]}
 */
export const addAlert = (alertList: AlertProps[], alertItem: AlertProps): AlertProps[] => {
    if (isExistAlert(alertList, alertItem.AlertId)) {
        return alertList;
    }
    return [...alertList, alertItem];
}

/**
 * 指定のアラートIDが既に存在するかどうかを判定する
 * @param alertList
 * @param alertId
 * @returns {boolean}
 */
const isExistAlert = (alertList: AlertProps[], alertId: string): boolean => {
    return alertList.some((item: AlertProps) => item.AlertId === alertId);
}

/**
 * 指定のアラートIDのアラートリストを削除する
 * @param alertList
 * @param alertId
 * @returns {AlertProps[]}
 */
export const removeAlert = (alertList: AlertProps[], alertId: string): AlertProps[] => {
    return alertList.filter((item: AlertProps) => item.AlertId !== alertId);
}

export const AlertMessage: React.NamedExoticComponent<{ alertList: AlertProps[] }> = React.memo(({ alertList }: { alertList: AlertProps[] }): JSX.Element => {

    const [alertItems, setAlertItems]: [AlertProps[], React.Dispatch<React.SetStateAction<AlertProps[]>>] = React.useState([] as AlertProps[]);

    React.useEffect((): void => {
        setAlertItems(alertList);
    }, [alertList]);

    return (
        <Collapse in={alertItems && alertItems.length > 0}>
            {alertItems.map((alertItem: AlertProps) => (
                alertItem.AlertShowCloseButton ? (
                    <Alert
                        icon={false}
                        key={alertItem.AlertId}
                        severity={alertItem.AlertSeverity}
                        variant="filled"
                        sx={{ width: '100%' }}
                        onClose={(): void => setAlertItems(alertItems.filter((item: AlertProps) => item.AlertId !== alertItem.AlertId))}
                        action={
                            alertItem.AlertActionButtonText &&
                            <Button
                                variant="outlined"
                                size="large"
                                color="inherit"
                                onClick={(): void => alertItem.AlertActionButtonCallback && alertItem.AlertActionButtonCallback()}
                            >
                                {alertItem.AlertActionButtonText}
                            </Button>
                        }
                    >
                        <AlertTitle>{alertItem.AlertTitle}</AlertTitle>
                        {alertItem.AlertMessage}
                        {alertItem.AlertActionButtonText}
                    </Alert>
                ) : (
                    <Alert
                        icon={false}
                        key={alertItem.AlertId}
                        severity={alertItem.AlertSeverity}
                        variant="filled"
                        sx={{ width: '100%' }}
                        action={
                            alertItem.AlertActionButtonText &&
                            <Button
                                variant="outlined"
                                size="large"
                                color="inherit"
                                onClick={(): void => alertItem.AlertActionButtonCallback && alertItem.AlertActionButtonCallback()}
                            >
                                {alertItem.AlertActionButtonText}
                            </Button>
                        }
                    >
                        <AlertTitle>{alertItem.AlertTitle}</AlertTitle>
                        {alertItem.AlertMessage}
                    </Alert>
                )
            ))}
        </Collapse>
    );
});
