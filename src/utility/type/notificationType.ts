export interface NotificationType {

    id: string,
    type: string,
    notifiable_type: string,
    notifiable_id: number,
    data: {
        title: string,
        message: string,
        type: string,
        user_id: number
    },
    read_at?: null,
    created_at: string,
    updated_at: string

}