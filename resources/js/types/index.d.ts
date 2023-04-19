export interface User {
    // ID
    u_id: number;
    // 苗字
    u_first_name: string;
    // 名前
    u_last_name: string;
    // 苗字(カナ)
    u_first_name_kana: string;
    // 名前(カナ)
    u_last_name_kana: string;
    // ニックネーム
    u_nick_name: string;
    // メールアドレス
    u_email: string;
    // メールアドレス確認日時
    u_email_verified_at: string;
    // 初期パスワード判定フラグ
    u_initial_password_flag: boolean;
    // GoogleID
    u_google_id: string;
    // SlackID
    u_slack_id: string;
    // 血液型ID
    u_blood_type_id: number;
    // 性別ID
    u_gender_id: number;
    // 生年月日
    u_birthday: string;
    // 画像パス
    u_profile_image_url: string;

    u_password: string;
    u_remember_token: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
