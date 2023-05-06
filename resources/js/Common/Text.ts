/**
 * 20文字を超過したら...に変換する
 */
export const textOverflow = (text: string, length: number) => {
    if (text.length > length) {
        return text.substr(0, length) + '...';
    }
    return text;
}
