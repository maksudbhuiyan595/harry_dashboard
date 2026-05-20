
export interface AllJobType {


    id: number;
    job_title: string;
    job_description: string;
    art_name: string;
    user_name: string;
    user_email: string;
    job_type: string;
    location: string;
    application_deadline: string;
    required_skills: string[];
    start_budget?: string | null;
    end_budget?: string | null;
    status: string;
    applicant_count: number;
    created_at: string;


}

export interface SingleJobType {
    id: number;
    job_title: string;
    job_description: string;
    art_name: string;
    user_name: string;
    user_email: string;
    is_banned: number;
    job_type: string
    location: string;
    application_deadline: string
    required_skills: string[];
    start_budget?: string | null;
    end_budget?: string | null;
    status: string;
    applicant_count: string;
    created_at: string;
    updated_at: string;
}