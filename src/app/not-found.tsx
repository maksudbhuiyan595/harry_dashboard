"use client";

import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-4">
            <div className="w-full max-w-3xl text-center">
                {/* 404 TEXT */}
                <h1 className="text-[120px] font-extrabold leading-none text-blue-600 md:text-[180px]">
                    404
                </h1>

                {/* TITLE */}
                <h2 className="-mt-4 text-3xl font-bold text-gray-900 md:text-5xl">
                    Page Not Found
                </h2>

                {/* DESCRIPTION */}
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
                    Sorry, the page you are looking for does not exist,
                    has been removed, or is temporarily unavailable.
                </p>

                {/* BUTTONS */}
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link
                        href="/"
                        className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 px-7 py-4 font-semibold text-white shadow-lg transition hover:bg-blue-700"
                    >
                        <Home size={20} />
                        Back To Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 rounded-2xl border border-gray-300 bg-white px-7 py-4 cursor-pointer font-semibold text-gray-700 shadow-sm transition hover:bg-gray-100"
                    >
                        <ArrowLeft size={20} />
                        Go Back
                    </button>
                </div>

                

                {/* EXTRA LINKS */}
                <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-gray-500">
                    <Link
                        href="/app-settings/support"
                        className="transition hover:text-blue-600"
                    >
                        Support
                    </Link>

                    <Link
                        href="/app-settings/privacy"
                        className="transition hover:text-blue-600"
                    >
                        Privacy Policy
                    </Link>

                    <Link
                        href="/app-settings/terms-and-conditions"
                        className="transition hover:text-blue-600"
                    >
                        Terms & Conditions
                    </Link>
                </div>
            </div>
        </div>
    );
}