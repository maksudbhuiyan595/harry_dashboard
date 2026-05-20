export interface UserBusinessProfileType {

    id: number;
    business_name: string;
    location: string;
    description: string;
    user_name: string;
    user_email: string;
    art_name: string;
    avatar?: string | null;
    cover_picture?: string | null;
    is_banned?: number
}



export interface SingleBusinessProfile {
    user_name: string;
    user_email: string;
    business_name: string;
    location: string;
    description: string;
    website: string;
    social_links: string[];
    privacy_settings: string;
    avatar: string;
    cover_picture: string;
    art_name: string;
    total_job_posts: number;
    active_job_posts: number;
    last_active: string;
    status: string;
    updated_at: string;
    created_at: string;
    bio: string;
    followers_count: number;
    is_post?: boolean;
    is_business?: boolean | number

}

