import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import "./SlideShow.css";

const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        };
    }
};

/**
 * スワイプのしきい値
 * @type {number}
 */
const swipeConfidenceThreshold = 10000;

/**
 * スワイプのパワー(距離と速度の積)
 * @param offset
 * @param velocity
 */
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

/**
 * スライドショーのプロパティ
 * @type {{images: string[]}}
 */
type SlideShowProps = {
    images: string[];
}

/**
 * スライドショー
 * @param images
 * @constructor
 */
export const SlideShow = ({ images } : SlideShowProps) => {

    /**
     * page: 現在のページ
     * direction: 進む方向
     * setPage: ページを進める
     * @type {[number, number] | ((value: React.SetStateAction<[number, number]>) => void)}
     */
    const [[page, direction], setPage] = useState([0, 0]);

    /**
     * ページをループさせる
     */
    const imageIndex = wrap(0, images.length, page);

    /**
     * ページを進める
     * @param newDirection
     */
    const paginate = (newDirection: number): void => {
        setPage([page + newDirection, newDirection]);
    };

    return (
        <div className="slide-container">
            <AnimatePresence initial={false} custom={direction}>
                <motion.img
                    key={page}
                    src={images[imageIndex]}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {

                        // スワイプのしきい値を超えたらページを進める
                        const swipe = swipePower(offset.x, velocity.x);

                        if (swipe < -swipeConfidenceThreshold) {
                            paginate(1);
                        } else if (swipe > swipeConfidenceThreshold) {
                            paginate(-1);
                        }
                    }}
                />
            </AnimatePresence>
            <div className="next" onClick={() => paginate(1)}>
                {"‣"}
            </div>
            <div className="prev" onClick={() => paginate(-1)}>
                {"‣"}
            </div>
        </div>
    );
};
