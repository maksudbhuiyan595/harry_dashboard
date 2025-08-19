"use client";

import React, { useState } from 'react';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from 'next/image';
import logo from '@/assets/Images/logo.png';
function CreateNewPasswordPage() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevents the page from reloading
        setError(''); // Clear previous errors

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match. Please try again.");
            return;
        }

        if (newPassword.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        window.location.href = '/admin';
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
                    <CardTitle className="text-4xl font-semibold">Create new password</CardTitle>
                    <CardDescription className="text-lg text-[#949494] pt-2">
                        Your new password must be different from previous passwords.
                    </CardDescription>
                </CardHeader>

                <CardContent className="px-16 py-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid w-full items-center gap-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <div className="relative">
                                <Input
                                    type={newPasswordVisible ? "text" : "password"}
                                    id="new-password"
                                    placeholder="********"
                                    className="h-12 rounded-lg border-[#D7D7D7] bg-[#0F0E13] text-base pr-10"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setNewPasswordVisible(!newPasswordVisible)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                                >
                                    {newPasswordVisible ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="grid w-full items-center gap-2">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <div className="relative">
                                <Input
                                    type={confirmPasswordVisible ? "text" : "password"}
                                    id="confirm-password"
                                    placeholder="********"
                                    className="h-12 rounded-lg border-[#D7D7D7] bg-[#0F0E13] text-base pr-10"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                                >
                                    {confirmPasswordVisible ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                                </button>
                            </div>
                        </div>

                        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                        <Button
                            type="submit"
                            className="w-full h-14 bg-[#1778F2] text-lg font-bold hover:bg-blue-600 mt-4"
                        >
                            Done
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default CreateNewPasswordPage;