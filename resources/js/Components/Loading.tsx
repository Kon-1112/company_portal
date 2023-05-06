import { motion } from "framer-motion";
import React from "react";
import {Box, Fade, Typography} from "@mui/material";

type Props = {
    show: boolean;
    wait?: number;
}

export const Loading: React.MemoExoticComponent<({ show, wait }: Props) => JSX.Element> = React.memo((props: Props): JSX.Element => {

    const [isLoading, setIsLoading]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = React.useState<boolean>(false);

    React.useEffect(() => {
        let timerId: NodeJS.Timeout;
        if (props.show) {
            timerId = setTimeout(() => {
                setIsLoading(true);
            }, props.wait ?? 0);
        } else {
            setIsLoading(false);
        }
        return (): void => {
            clearTimeout(timerId);
        };
    }, [props.show, props.wait]);

    return (
        <Fade in={isLoading}>
            <Box className="fixed top-0 left-0 w-full h-full z-50 flex flex-col items-center justify-center bg-black bg-opacity-60">
                <Box className="flex flex-col items-center justify-center">
                    <motion.div
                        className="rounded-full mb-8 bg-gray-800 dark:bg-white"
                        animate={{
                            scale: [1, 2, 2, 1, 1],
                            rotate: [0, 0, 270, 270, 0],
                            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                        }}
                        transition={{
                            duration: 2,
                            ease: "easeInOut",
                            times: [0, 0.2, 0.5, 0.8, 1],
                            repeat: Infinity,
                            repeatType: "loop",
                        }}
                        style={{ width: 40, height: 40 }}
                    />
                    <Typography variant="body2">
                        Loading...
                    </Typography>
                </Box>
            </Box>
        </Fade>
    );
});
