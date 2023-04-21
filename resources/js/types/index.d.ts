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
    profile_image_url: string;

    password: string;
    remember_token: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
