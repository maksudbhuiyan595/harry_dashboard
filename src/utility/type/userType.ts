export interface AllUserType {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    avatar: string;
    phone_number: string;
    google_id?: null | string;
    role: string;
    user_type: string;
    is_banned?: number;
    is_online?: number;
    fcm_token?: string;
    is_business?: number;
    is_post?: number;
    created_at: string;
    updated_at: string
}