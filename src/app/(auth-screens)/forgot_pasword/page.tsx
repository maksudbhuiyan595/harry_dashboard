"use client";

import React, { useState } from 'react';
import Image from 'next/image';

import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

// Assuming your logo is in 'src/assets/Images/logo.png'
import logo from '@/assets/Images/logo.png';

function ForgotPass() {
    // 1. Create state for all form inputs
    const [email, setEmail] = useState('');

    const router = useRouter();




    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = {
            email,
        };

        console.log("Login Form Data:", formData);

        // In a real app, you would validate credentials here

        router.push('/otp-verify'); // Redirect after logging
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
                <CardHeader className="items-center text-center pt-12">
                    <div className='flex justify-center items-center'>
                        <Image src={logo} alt="Logo" width={100} height={100} />
                    </div>
                    <CardTitle className="text-4xl font-semibold">Welcome back!</CardTitle>
                    <CardDescription className="text-lg text-[#949494]">
                        We will sent a verification code to william***@gmail.com
                    </CardDescription>
                </CardHeader>

                <CardContent className="px-16 py-8">
                    {/* Use the onSubmit event for the form */}
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="grid w-full items-center gap-2">
                            <Label htmlFor="email" className="text-base">Email*</Label>
                            <Input
                                type="email"
                                id="email"
                                placeholder="william047@gmail.com"
                                className="h-12 rounded-lg border-[#D7D7D7] bg-[#0F0E13] text-base"
                                // 2. Link the input value to the state and add onChange
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>


                        <Button
                            type="submit"
                            className="w-full h-14 bg-[#1778F2] text-lg font-bold hover:bg-blue-600"
                        >
                            Submit
                        </Button>
                    </form>
                </CardContent>
                <CardFooter />
            </Card>
        </div>
    );
}

export default ForgotPass;