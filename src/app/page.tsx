"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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

function LoginPage() {
  // 1. Create state for all form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // 3. Update the login handler to log state and then redirect
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the form from reloading the page

    const formData = {
      email,
      password,
      rememberMe,
    };

    console.log("Login Form Data:", formData); // Log all values to the console

    // In a real app, you would validate credentials here

    router.push('/admin'); // Redirect after logging
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
            Please enter your email & password to continue
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
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="password">Password*</Label>
              <div className="relative">
                <Input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  placeholder="********"
                  className="h-12 rounded-lg border-[#D7D7D7] bg-[#0F0E13] text-base pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                >
                  {passwordVisible ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember-me"
                  className="border-gray-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(Boolean(checked))}
                />
                <Label htmlFor="remember-me" className="text-gray-400 font-normal">
                  Remember password
                </Label>
              </div>
              <Link href="/forgot_pasword" className="font-medium text-[#1778F2] hover:underline">
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-14 bg-[#1778F2] text-lg font-bold hover:bg-blue-600"
            >
              Log in
            </Button>
          </form>
        </CardContent>
        <CardFooter />
      </Card>
    </div>
  );
}

export default LoginPage;