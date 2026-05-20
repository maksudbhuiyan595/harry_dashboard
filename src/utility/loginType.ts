export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    avatar: string;
    phone_number: string | null;
    google_id: string | null;
    role: string;
    user_type: string;
    is_banned: number;
    created_at: string;
    updated_at: string;
}

export interface LoginData {
    user: User;
    token: string | undefined;
}

export interface LoginApiResponse {
    status: string;
    message: string;
    data: LoginData;
}

export interface LoginApiPayloadType {
    email: string;
    password: string;
}


export interface OtpSendApiResponseType {
    status: string;
    message: string;
    data: {
        otp: number;
        name: string
    }
}


export interface SendOtpApiPayload {
    email: string
}

export interface UserProfileApiResponseType {
    status: string;
    message: string;
    data: {
        id: number;
        name: string;
        email: string;
        email_verified_at: string;
        avatar: string;
        phone_number: string | null;
        google_id: string | null;
        role: string;
        user_type: string;
        is_banned: number;
        created_at: string;
        updated_at: string;
    };
};


export interface UserProfileUpdateResponseType {
  status: string;
  message: string;
  data: {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    avatar: string | null;
    phone_number: string | null;
    google_id: string | null;
    role: "ADMIN" | "USER" | "MODERATOR" | string;
    user_type: "BUSINESS" | "PERSONAL" | string;
    is_banned: number; // 0 or 1
    created_at: string;
    updated_at: string;
  };
}


