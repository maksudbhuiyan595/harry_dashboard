"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from 'next/image';
import logo from '@/assets/Images/logo.png';
function OtpVerificationPage() {
    const [otp, setOtp] = useState('');

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault(); // Prevents the page from reloading
        console.log("Verifying OTP:", otp);
        // Add your API call logic here to verify the OTP
        if (otp.length === 6) {
            // Redirect to the next page
            window.location.href = '/create-new-password';
        }
    };

    return (
        <div
            className="flex min-h-screen w-full items-center justify-center p-4"
            style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #0F0E13' }}
        >
            <Card
                className="w-full max-w-2xl rounded-2xl border-none text-white shadow-2xl"
                style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #3A3E41' }}
            >
                <CardHeader className="items-center text-center pt-16">
                    {/* Placeholder for your logo */}
                    <div className='flex justify-center items-center'>
                        <Image src={logo} alt="Logo" width={100} height={100} />
                    </div>
                    <CardTitle className="text-4xl font-semibold">OTP Verification</CardTitle>
                    <CardDescription className="text-lg text-[#949494] pt-2">
                        We have sent a verification code to william***@gmail.com
                    </CardDescription>
                </CardHeader>

                <CardContent className="px-16 py-8">
                    <form onSubmit={handleVerify} className="flex flex-col items-center space-y-10">
                        <InputOTP
                            maxLength={6}
                            value={otp}
                            onChange={(value) => setOtp(value)}
                        >
                            <InputOTPGroup className="gap-4">
                                <InputOTPSlot index={0} className="h-14 w-14 rounded-lg border-[#D7D7D7] bg-white text-2xl text-black font-semibold" />
                                <InputOTPSlot index={1} className="h-14 w-14 rounded-lg border-[#D7D7D7] bg-white text-2xl text-black font-semibold" />
                                <InputOTPSlot index={2} className="h-14 w-14 rounded-lg border-[#D7D7D7] bg-white text-2xl text-black font-semibold" />
                                <InputOTPSlot index={3} className="h-14 w-14 rounded-lg border-[#D7D7D7] bg-white text-2xl text-black font-semibold" />
                                <InputOTPSlot index={4} className="h-14 w-14 rounded-lg border-[#D7D7D7] bg-white text-2xl text-black font-semibold" />
                                <InputOTPSlot index={5} className="h-14 w-14 rounded-lg border-[#D7D7D7] bg-white text-2xl text-black font-semibold" />
                            </InputOTPGroup>
                        </InputOTP>

                        <Button
                            type="submit"
                            className="w-full h-14 bg-[#1778F2] text-lg font-bold hover:bg-blue-600"
                            disabled={otp.length < 6}
                        >
                            Verify
                        </Button>

                        <div className="text-center text-sm">
                            <span className="text-[#989898]">Didn’t receive code? </span>
                            <button
                                type="button"
                                className="font-medium text-[#1778F2] hover:underline"
                                onClick={() => alert("Resending OTP...")}
                            >
                                Send again
                            </button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default OtpVerificationPage;