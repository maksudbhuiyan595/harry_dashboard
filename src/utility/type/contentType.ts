type Unreviewed = 'unreviewed';
type Removed = 'removed';
type Approved = 'approved';

export interface AllContentType {
    id: number;
    user_id: number;
    post_id: number;
    name: string;
    description: string;
    type: string;
    created_at: string;
    updated_at: string;
    status: Unreviewed | Removed | Approved;
    user: {
        id: number;
        name: string;
        avatar: string;
        email: string;
    },
    post: {
        id: number;
        user_id: number;
        content?: string;
        photos?: string;
        video?: string;
        document?: string;
        privacy: string;
        status: string;
        removed_date: string;
        created_at: string;

        updated_at: string;
        user: {
            id: number,
            name: string,
            avatar: string,
            email: string
        }

    }
}



// export interface SingleReportType {

// }

export interface ReportType {
    reported_by: string;
    date_reported: string;
    type: string;
    description: string;
}