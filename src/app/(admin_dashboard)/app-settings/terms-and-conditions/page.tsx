"use client";

import Link from "next/link";

export default function TermsAndConditionsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* HERO SECTION */}
            <section className="bg-gradient-to-r from-slate-900 to-slate-700 py-20 text-white">
                <div className="mx-auto max-w-6xl px-4 text-center">
                    <h1 className="text-4xl font-bold md:text-5xl">
                        Terms & Conditions
                    </h1>

                    <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-200">
                        Please read these Terms and Conditions carefully before
                        using our website and services. By accessing our
                        platform, you agree to comply with these terms.
                    </p>

                    <p className="mt-4 text-sm text-gray-300">
                        {/* Last Updated: August 2026 */}
                    </p>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <section className="mx-auto max-w-5xl px-4 py-16">
                <div className="rounded-3xl bg-white p-8 shadow-lg md:p-12">
                    <div className="space-y-10">
                        {/* SECTION */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                1. Acceptance of Terms
                            </h2>

                            <p className="mt-4 leading-8 text-gray-600">
                                By accessing and using our platform, you accept
                                and agree to be bound by these Terms and
                                Conditions and all applicable laws and
                                regulations.
                            </p>
                        </div>

                        {/* SECTION */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                2. User Responsibilities
                            </h2>

                            <ul className="mt-4 list-disc space-y-3 pl-6 leading-8 text-gray-600">
                                <li>
                                    Provide accurate and complete information
                                </li>
                                <li>
                                    Maintain the confidentiality of your account
                                </li>
                                <li>
                                    Use the platform only for lawful purposes
                                </li>
                                <li>
                                    Avoid any activity that may harm the
                                    platform or other users
                                </li>
                            </ul>
                        </div>

                        {/* SECTION */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                3. Intellectual Property
                            </h2>

                            <p className="mt-4 leading-8 text-gray-600">
                                All content, trademarks, logos, and materials on
                                this platform are the property of the company
                                and protected by copyright and intellectual
                                property laws.
                            </p>
                        </div>

                        {/* SECTION */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                4. Payment & Refund Policy
                            </h2>

                            <p className="mt-4 leading-8 text-gray-600">
                                Payments made through our platform must be
                                completed using approved payment methods. Refund
                                requests are subject to our refund policy and
                                review process.
                            </p>
                        </div>

                        {/* SECTION */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                5. Limitation of Liability
                            </h2>

                            <p className="mt-4 leading-8 text-gray-600">
                                We are not responsible for any direct, indirect,
                                incidental, or consequential damages arising
                                from the use of our services or inability to
                                access the platform.
                            </p>
                        </div>

                        {/* SECTION */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                6. Account Suspension
                            </h2>

                            <p className="mt-4 leading-8 text-gray-600">
                                We reserve the right to suspend or terminate any
                                user account that violates these Terms and
                                Conditions without prior notice.
                            </p>
                        </div>

                        {/* SECTION */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                7. Third-Party Services
                            </h2>

                            <p className="mt-4 leading-8 text-gray-600">
                                Our platform may include links or integrations
                                with third-party services. We are not
                                responsible for the content or practices of
                                third-party platforms.
                            </p>
                        </div>

                        {/* SECTION */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                8. Changes to Terms
                            </h2>

                            <p className="mt-4 leading-8 text-gray-600">
                                We reserve the right to update or modify these
                                Terms and Conditions at any time. Continued use
                                of the platform after changes means you accept
                                the revised terms.
                            </p>
                        </div>

                        {/* SECTION */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                9. Governing Law
                            </h2>

                            <p className="mt-4 leading-8 text-gray-600">
                                These Terms and Conditions shall be governed and
                                interpreted in accordance with the applicable
                                laws and regulations of your country or region.
                            </p>
                        </div>

                        {/* CONTACT SECTION */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                10. Contact Information
                            </h2>

                            <p className="mt-4 leading-8 text-gray-600">
                                If you have any questions regarding these Terms
                                and Conditions, please contact our support team.
                            </p>

                            {/* <div className="mt-6 flex flex-wrap gap-4">
                                <Link
                                    href="/contact"
                                    className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                                >
                                    Contact Us
                                </Link>

                                <Link
                                    href="/"
                                    className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                                >
                                    Back Home
                                </Link>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}