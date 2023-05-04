
export type ImportantCommunicationCategoryType = {
    id: number,
    title: string
    color: "success" | "warning" | "error" | "primary" | "default" | "secondary" | "info",
    description: string
}

/**
 * 重要連絡のカテゴリーリスト
 * @type {ImportantCommunicationCategoryType[]}
 */
export const ImportantCommunicationCategoryList: ImportantCommunicationCategoryType[] = [
    {
        id: 1,
        title: 'お知らせ',
        color: 'info',
        description: '全社員に対するお知らせです',
    },
    {
        id: 2,
        title: 'イベント',
        color: 'success',
        description: 'イベントの開催に関するお知らせです',
    },
    {
        id: 3,
        title: 'メンテナンス',
        color: 'warning',
        description: 'サービスのメンテナンスに関するお知らせです',
    },
    {
        id: 4,
        title: '必須回答',
        color: 'error',
        description: '回答必須のアンケートなどに関するお知らせです',
    },
    {
        id: 5,
        title: '任意回答',
        color: 'info',
        description: '回答必須のアンケートなどに関するお知らせです',
    },
    {
        id: 6,
        title: '変更連絡',
        color: 'warning',
        description: '社内制度・人事異動など、変更に関するお知らせです',
    },
    {
        id: 7,
        title: 'トラブル',
        color: 'error',
        description: 'トラブルや問題に関するお知らせです',
    },
];

// 未読
export const UNREAD_STATUS: number = 0;
// 既読済み
export const READ_STATUS: number = 1;
