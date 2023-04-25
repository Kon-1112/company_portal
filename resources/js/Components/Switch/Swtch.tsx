import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Switch.css";

/**
 * スイッチのロック解除までの遅延時間
 * @type {number}
 */
const DEBOUNCE_DELAY_MS = 1500;

/**
 * スイッチのプロパティ
 * @type {{initialOpen: boolean, onToggle: (function(*): void)}}
 */
type Props = {
    initialOpen: boolean;
    onToggle: (isOn: boolean) => void;
}

/**
 * スイッチ
 * @param initialOpen
 * @param onToggle
 * @constructor
 */
export default function Switch({ initialOpen, onToggle }: Props) {

    /**
     * スイッチの状態を管理する
     * @type {[boolean, Dispatch<SetStateAction<boolean>>]}
     */
    const [isOn, setIsOn] = useState(initialOpen);

    /**
     * スイッチのロック状態を管理する
     * @type {[boolean, Dispatch<SetStateAction<boolean>>]}
     */
    const [isLocked, setIsLocked] = useState(false);

    /**
     * スイッチをトグルする
     * @returns {void}
     */
    const handleToggle = () => {
        if (!isLocked) {
            setIsOn(!isOn);
            setIsLocked(true);
        }
    };

    /**
     * スイッチのロックを解除する
     * @returns {void}
     */
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isLocked) {
            timer = setTimeout(() => {
                setIsLocked(false);
                onToggle(isOn);
            }, DEBOUNCE_DELAY_MS);
        }
        return () => clearTimeout(timer);
    }, [isLocked, isOn, onToggle]);

    return (
        <div
            className="switch w-12 h-6 bg-gray-300 rounded-full p-1 cursor-pointer"
            data-ison={isOn}
            onClick={handleToggle}
        >
            <motion.div className="handle" layout transition={spring} />
        </div>
    );
}

/**
 * スイッチのアニメーション
 * @type {{type: string, stiffness: number, damping: number}}
 */
const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
};
