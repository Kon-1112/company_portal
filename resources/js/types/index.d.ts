/**
 * ユーザー情報
 * @interface User
 */
export interface User {
    // ID
    id: number;
    // 苗字
    first_name: string;
    // 名前
    last_name: string;
    // 苗字(カナ)
    first_name_kana: string;
    // 名前(カナ)
    last_name_kana: string;
    // ニックネーム
    nick_name: string;
    // メールアドレス
    email: string;
    // メールアドレス確認日時
    email_verified_at: string;
    // 初期パスワード判定フラグ
    initial_password_flag: boolean;
    // GoogleID
    google_id: string;
    // SlackID
    slack_id: string;
    // 血液型ID
    blood_type_id: number;
    // 性別ID
    gender_id: number;
    // 生年月日
    birthday: string;
    // 画像パス
    avatar_url: string;

    password: string;
    remember_token: string;
}

/**
 * メニューカテゴリーリスト
 * @interface MenuCategoryList
 */
export type MenuCategoryList = {
    [key: string]: MenuCategory;
}

/**
 * メニューカテゴリー
 * @interface MenuCategory
 */
export type MenuCategory = {
    mc_color: string;
    mc_created_email: string;
    mc_delete_flag: boolean;
    mc_deleted_email: string | null;
    mc_description: string;
    mc_id: number;
    mc_name: string;
    mc_order: number;
    mc_updated_email: string;
}

/**
 * メニューアイテムリスト
 * @interface MenuItemList
 */
export type MenuItemList = {
    [key: string]: MenuItem;
}

/**
 * メニューアイテム
 * @interface MenuItem
 */
export type MenuItem = {
    mi_color: string;
    mi_created_email: string;
    mi_delete_flag: boolean;
    mi_deleted_email: string | null;
    mi_icon: string;
    mi_id: string;
    mi_mc_id: number;
    mi_name: string;
    mi_order: number;
    mi_route: string;
    mi_updated_email: string;
    mi_url: string;
}


export type Ziggy = {
    namedRoutes: {
        [key: string]: {
            uri: string;
            methods: string[];
            domain: string | null;
        }
    }
}



export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
