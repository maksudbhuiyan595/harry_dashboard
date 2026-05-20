import React from 'react'
import ProfileList from './ProfileList';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    return (
        <div>
            <ProfileList id={id} />
        </div>
    )
}

export default page