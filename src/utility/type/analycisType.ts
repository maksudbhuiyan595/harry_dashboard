export interface TopUserType {
    name: string,
    avatar: string,
    art: string,
    post_count: number,
    last_active_at?: null | string,
    engagement: string
}

export interface TopBussinessType {
    name: string,
    category?: string | null,
    logo?: string | null,
    followers: number,
    job_posted: number,

}

export interface JobsArtType {
    art_id: number,
    name: string,
    count: string,
    progress?: -66.7 | null
}