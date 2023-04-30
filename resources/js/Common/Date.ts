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
    return `${year}-${month}-${day}`;
}
