import React from 'react'
import JobList from './JobList';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    return (
        <div>
            <JobList id={id} />
        </div>
    )
}

export default page