import { motion } from "framer-motion";
import React from "react";
import {Box, Fade, Typography} from "@mui/material";

const Loading = (props: { show: boolean }) => {
    return (
        <Fade in={props.show}>
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
                    <Typography variant="body2">Loading...</Typography>
                </Box>
            </Box>
        </Fade>
    );
};

export default Loading;
