/**
 * 日付をフォーマットする
 * @param dateString
 * @returns {string}
 */
export const formatDate = (dateString: string): string => {
    const date: Date    = new Date(dateString);
    const year: number  = date.getFullYear();
    const month: string = String(date.getMonth() + 1).padStart(2, '0');
    const day: string   = String(date.getDate()).padStart(2, '0');
    return `${year}年${month}月${day}日`;
}

/**
 * 現在の時刻を超過しているかを判定
 * @param dateString
 * @returns {boolean}
 */
export const isOverTime = (dateString: string): boolean => {
    if (!hasTime(dateString)) {
        dateString += ' 00:00:00';
    }
    const date: Date    = new Date(dateString);
    const now: Date     = new Date();
    return date.getTime() < now.getTime();
}

/**
 * 現在の期限からあと何日かを取得する
 * @param dateString
 * @returns {number}
 */
export const getRemainingDays = (dateString: string): number => {
    const date: Date    = new Date(dateString);
    const now: Date     = new Date();

    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);

    const diff: number  = date.getTime() - now.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}

/**
 * TextInputで使用する日付フォーマットに変換する
 * @param dateString
 * @returns {string}
 */
export const convertDateForTextInput = (dateString: string): string => {
    const date: Date    = new Date(dateString);
    const year: number  = date.getFullYear();
    const month: string = String(date.getMonth() + 1).padStart(2, '0');
    const day: string   = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * TextInputで使用する時間フォーマットに変換する
 * @param dateString
 * @returns {string}
 */
export const convertTimeForTextInput = (dateString: string): string => {
    const date: Date    = new Date(dateString);
    const hour: string  = String(date.getHours()).padStart(2, '0');
    const minute: string = String(date.getMinutes()).padStart(2, '0');
    return `${hour}:${minute}`;
}

/**
 * 日付情報に時間情報が含まれるかを判定する
 * @param dateString
 * @returns {boolean}
 */
export const hasTime = (dateString: string): boolean => {
    const date: Date    = new Date(dateString);
    const hour: number  = date.getHours();
    const minute: number = date.getMinutes();
    return hour !== 0 || minute !== 0;
}

/**
 * 日時をフォーマットする
 * @param dateString
 * @returns {string}
 */
export const formatDateTime = (dateString: string): string => {
    const date: Date    = new Date(dateString);
    const year: number  = date.getFullYear();
    const month: string = String(date.getMonth() + 1).padStart(2, '0');
    const day: string   = String(date.getDate()).padStart(2, '0');
    const hour: string  = String(date.getHours()).padStart(2, '0');
    const minute: string = String(date.getMinutes()).padStart(2, '0');
    return `${year}年${month}月${day}日 ${hour}時${minute}分`;
}
