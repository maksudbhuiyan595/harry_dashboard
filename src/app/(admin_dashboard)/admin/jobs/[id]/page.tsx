"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import avater from '@/assets/Images/avater.png'
import Image from 'next/image';
// --- REUSABLE SUB-COMPONENTS ---

const StatusBadge = ({ text, className }: { text: string; className: string; }) => (
    <div className={`px-3 py-1 text-xs font-medium rounded-md inline-block ${className}`}>
        {text}
    </div>
);

const InfoCard = ({ title, value }: { title: string; value: string; }) => (
    <div className="flex-1 text-center">
        <p className="text-sm text-gray-400 mb-1">{title}</p>
        <p className="font-bold text-white text-lg">{value}</p>
    </div>
);

// --- MAIN PAGE COMPONENT ---
function JobApprovalPage() {
    const [rejectionNote, setRejectionNote] = useState('');

    const handleAction = (action: 'Approve' | 'Reject' | 'Cancel') => {
        console.log({
            action,
            rejectionNote: action === 'Reject' ? rejectionNote : undefined
        });
        alert(`Action: ${action}`);
    };

    return (
        <div
            className="flex min-h-screen w-full items-center justify-center p-8"
            style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #0F0E13' }}
        >
            <Card
                className="w-full max-w-8xl rounded-lg border-[#989898] text-white shadow-2xl"
                style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #3A3E41' }}
            >
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Sound Designer Position</CardTitle>
                </CardHeader>

                <CardContent className="space-y-8">
                    {/* Company Info */}
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <Image alt="Echo Studio" height={64} width={64} src={avater} />
                            <AvatarFallback>ES</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="text-lg font-bold">Echo Studio</h3>
                            <StatusBadge text="Pending Approval" className="bg-[#BDBA60] text-[#70670B]" />
                        </div>
                    </div>

                    {/* Key Details Bar */}
                    <div className="flex justify-around p-4 rounded-md border border-[#989898]" style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #0F0E13' }}>
                        <InfoCard title="Category" value="Music" />
                        <InfoCard title="Location" value="Los Angeles, CA (Hybrid)" />
                        <InfoCard title="Employment Type" value="Full-time" />
                        <InfoCard title="Date Posted" value="Jun 15, 2025" />
                    </div>

                    {/* Applicant Count */}
                    <div className="">
                        <p className="text-lg text-[#4593F5]">Applicant</p>
                        <p className="text-3xl font-bold text-[#4593F5]">12</p>
                    </div>

                    {/* Job Description */}
                    <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
                        <h4 className="text-xl font-bold text-white">Job Description</h4>
                        <p>We're looking for a talented Sound Designer to join our team working on film and game projects. The ideal candidate will have experience creating immersive audio experiences and a strong portfolio of previous work.</p>

                        <h5 className="font-semibold text-white pt-2">Responsibilities:</h5>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Design and implement sound effects for various media projects</li>
                            <li>Collaborate with directors and producers to achieve desired audio aesthetic</li>
                            <li>Edit and mix audio tracks to meet technical specifications</li>
                            <li>Create original sound effects and music when needed</li>
                        </ul>

                        <h5 className="font-semibold text-white pt-2">Requirements:</h5>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>3+ years experience in sound design</li>
                            <li>Proficiency in Pro Tools, Logic Pro, or similar software</li>
                            <li>Strong understanding of audio post-production processes</li>
                            <li>Portfolio demonstrating creative sound design work</li>
                        </ul>

                        <h4 className="text-lg font-bold text-white pt-4">Compensation & Benefits</h4>
                        <p><span className="font-bold">$65,000 - $80,000</span> per year</p>
                        <p>Health insurance, 401(k) matching, flexible schedule, professional development budget</p>
                    </div>

                    {/* Rejection Note */}
                    <div className="space-y-2">
                        <Label htmlFor="rejection-note" className="text-lg font-semibold text-white">Rejection Note (Optional)</Label>
                        <p className="text-sm text-gray-400">If rejecting this job post, you can provide feedback to the business owner:</p>
                        <Textarea
                            id="rejection-note"
                            placeholder="Explain why this job post is being rejected..."
                            value={rejectionNote}
                            onChange={(e) => setRejectionNote(e.target.value)}
                            className="bg-[#0F0E13] border-[#989898] min-h-[80px]"
                        />
                    </div>
                </CardContent>

                <CardFooter className="flex justify-end gap-4">
                    <Button variant="default" onClick={() => handleAction('Cancel')}>Cancel</Button>
                    <Button variant="destructive" className="bg-[#C82E20] hover:bg-red-700" onClick={() => handleAction('Reject')}>Reject</Button>
                    <Button className="bg-[#2FAC21] hover:bg-green-600" onClick={() => handleAction('Approve')}>Approve</Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default JobApprovalPage;