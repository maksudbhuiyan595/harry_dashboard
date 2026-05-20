import React, { Suspense } from 'react'
import OtpVerifyPage from './OtpVerifyPage'

const page = () => {
    return (
        <div>
            <Suspense fallback={<p>Loading...</p>}>
                <OtpVerifyPage />
            </Suspense>
        </div>
    )
}

export default page