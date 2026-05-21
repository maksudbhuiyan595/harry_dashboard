"use client";

import {
    Mail,
    Phone,
    MapPin,
    Clock,
} from "lucide-react";

export default function SupportPage() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    }
    return (
        <div className="min-h-screen bg-gray-50">
            {/* HERO SECTION */}
            <section className="bg-gradient-to-r from-slate-900 to-slate-700 py-20 text-white">
                <div className="mx-auto max-w-6xl px-4 text-center">
                    <h1 className="text-4xl font-bold md:text-5xl">
                        Support Center
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-100">
                        Need help? Our support team is here to assist you with
                        any questions, technical issues, or account-related
                        problems.
                    </p>
                </div>
            </section>

            {/* MAIN SECTION */}
            <section className="mx-auto max-w-7xl px-4 py-16">
                <div className="grid gap-10 lg:grid-cols-2">
                    {/* LEFT SIDE */}
                    <div className="rounded-3xl bg-white p-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Contact Support
                        </h2>

                        <p className="mt-3 leading-7 text-gray-600">
                            Fill out the form below and our support team will
                            get back to you as soon as possible.
                        </p>

                        {/* FORM */}
                        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                            {/* NAME */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                                />
                            </div>

                            {/* EMAIL */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                                />
                            </div>

                            {/* SUBJECT */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Subject
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter subject"
                                    className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                                />
                            </div>

                            {/* MESSAGE */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Message
                                </label>

                                <textarea
                                    rows={6}
                                    placeholder="Write your message..."
                                    className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                                />
                            </div>

                            {/* BUTTON */}
                            <button
                                type="submit"
                                className="w-full cursor-pointer rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 px-6 py-4 font-semibold text-white transition hover:bg-blue-700"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="space-y-6">
                        {/* CARD */}
                        <div className="rounded-3xl bg-white p-6 shadow-lg">
                            <div className="flex items-start gap-4">
                                <div className="rounded-2xl bg-blue-100 p-3 text-blue-600">
                                    <Mail size={24} />
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">
                                        Email Support
                                    </h3>

                                    <p className="mt-2 text-gray-600">
                                        harry@studiospace.art
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* CARD */}
                        <div className="rounded-3xl bg-white p-6 shadow-lg">
                            <div className="flex items-start gap-4">
                                <div className="rounded-2xl bg-green-100 p-3 text-green-600">
                                    <Phone size={24} />
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">
                                        Phone Support
                                    </h3>

                                    <p className="mt-2 text-gray-600">
                                        +1 (234) 567-890
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* CARD */}
                        <div className="rounded-3xl bg-white p-6 shadow-lg">
                            <div className="flex items-start gap-4">
                                <div className="rounded-2xl bg-red-100 p-3 text-red-600">
                                    <MapPin size={24} />
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">
                                        Office Address
                                    </h3>

                                    <p className="mt-2 text-gray-600">
                                        123 Business Street, New York, USA
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* CARD */}
                        <div className="rounded-3xl bg-white p-6 shadow-lg">
                            <div className="flex items-start gap-4">
                                <div className="rounded-2xl bg-yellow-100 p-3 text-yellow-600">
                                    <Clock size={24} />
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">
                                        Working Hours
                                    </h3>

                                    <p className="mt-2 text-gray-600">
                                        Monday - Friday: 9:00 AM - 6:00 PM
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* HELP BOX */}
                        {/* <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-blue-600 p-8 text-white shadow-lg">
                            <div className="flex items-center gap-4">
                                <div className="rounded-2xl bg-white/20 p-3">
                                    <MessageCircle size={28} />
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold">
                                        Live Chat Support
                                    </h3>

                                    <p className="mt-2 text-gray-100">
                                        Chat instantly with our support team for
                                        quick assistance.
                                    </p>
                                </div>
                            </div>

                            <button className="mt-6 rounded-2xl bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-gray-100">
                                Start Live Chat
                            </button>
                        </div> */}

                        {/* BACK BUTTON */}
                        {/* <Link
                            href="/"
                            className="block rounded-2xl border border-gray-300 bg-white px-6 py-4 text-center font-semibold text-gray-700 shadow transition hover:bg-gray-100"
                        >
                            Back Home
                        </Link> */}
                    </div>
                </div>
            </section>
        </div>
    );
}