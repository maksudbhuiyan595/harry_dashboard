"use client";

import Link from "next/link";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* HERO SECTION */}
            <section className="bg-gradient-to-r from-slate-900 to-slate-700 py-20 text-white">
                <div className="mx-auto max-w-6xl px-4 text-center">
                    <h1 className="text-4xl font-bold md:text-5xl">
                        Privacy Policy
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-100">
                        Your privacy is important to us. This Privacy Policy
                        explains how we collect, use, and protect your
                        information when you use our platform.
                    </p>

                    <p className="mt-4 text-sm text-gray-200">
                        {/* Last Updated: August 2026 */}
                    </p>
                </div>
            </section>

            {/* CONTENT */}
            <section className="mx-auto max-w-5xl px-4 py-16">
                <div className="rounded-3xl bg-white p-8 shadow-lg md:p-12">
                    <div className="space-y-10">
                        {/* SECTION */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                1. Information We Collect
                            </h2>

                            <p className="mt-4 leading-8 text-gray-600">
                                We may collect personal information such as your
                                name, email address, phone number, payment
                                information, and usage activity when you use our
                                website or services.
                            </p>
                        </div>

                        {/* SECTION */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                2. How We Use Your Information
                            </h2>

                            <ul className="mt-4 list-disc space-y-3 pl-6 leading-8 text-gray-600">
                                <li>
                                    To provide and improve our services
                                </li>
                                <li>To process transactions securely</li>
                                <li>
                                    To communicate updates and notifications
                                </li>
                                <li>
                                    To personalize user experience and content
                                </li>
                                <li>
                                    To maintain platform security and prevent
                                    fraud
                                </li>
                            </ul>
                        </div>

                        {/* SECTION */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                3. Cookies & Tracking Technologies
                            </h2>

                            <p className="mt-4 leading-8 text-gray-600">
                                We use cookies and similar technologies to
                                improve website functionality, analyze traffic,
                                and enhance your browsing experience.
                            </p>
                        </div>

                        {/* SECTION */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                4. Data Protection
                            </h2>

                            <p className="mt-4 leading-8 text-gray-600">
                                We implement industry-standard security measures
                                to protect your personal information from
                                unauthorized access, disclosure, or misuse.
                            </p>
                        </div>

                        {/* SECTION */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                5. Third-Party Services
                            </h2>

                            <p className="mt-4 leading-8 text-gray-600">
                                Our platform may contain links or integrations
                                with third-party services. We are not
                                responsible for the privacy practices of those
                                external platforms.
                            </p>
                        </div>

                        {/* SECTION */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                6. User Rights
                            </h2>

                            <p className="mt-4 leading-8 text-gray-600">
                                You may request access, correction, or deletion
                                of your personal data at any time by contacting
                                our support team.
                            </p>
                        </div>

                        {/* SECTION */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                7. Changes To This Policy
                            </h2>

                            <p className="mt-4 leading-8 text-gray-600">
                                We reserve the right to update this Privacy
                                Policy at any time. Any changes will be posted
                                on this page with an updated revision date.
                            </p>
                        </div>

                        {/* SECTION */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                8. Contact Us
                            </h2>

                            <p className="mt-4 leading-8 text-gray-600">
                                If you have any questions regarding this Privacy
                                Policy, please contact us.
                            </p>

                            
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}