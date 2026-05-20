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
import { useJobApproveMutation, useJobCancelMutation, useJobRejectMutation, useSingleJobQuery } from '@/app/api/jobManagementApi';
import { SingleJobType } from '@/utility/type/jobType';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { toast } from 'sonner';
import { approveAlert } from '@/utility/alert/approveAlert';
import { rejectAlert } from '@/utility/alert/rejectAlert';
import { deleteAlert } from '@/utility/alert/deleteAlert';
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
const JobList = ({ id }: { id: string }) => {




    const [rejectionNote, setRejectionNote] = useState('');














    const { data, isLoading } = useSingleJobQuery(id);
    const singleJob: SingleJobType = data?.data || null;

    // job approve 

    const [jobApprove] = useJobApproveMutation();

    const handleApproveJob = async (id: number) => {
        try {
            const res = await approveAlert();
            if (res.isConfirmed) {
                const res = await jobApprove(id).unwrap();
                if (res) {
                    toast.success(res?.data?.message)
                }
            }

        } catch (err) {
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message = error.data?.message || "Something went wrong ❌";
            toast.error(message);
        }
    }

    // job reject 

    const [jobReject] = useJobRejectMutation();

    const handleJobReject = async (id: number) => {
        try {

            const res = await rejectAlert()

            if (res?.isConfirmed) {
                const res = await jobReject(id).unwrap();
                if (res) {
                    toast.success(res?.data?.message)
                }
            }

        } catch (err) {
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message = error.data?.message || "Something went wrong ❌";
            toast.error(message);
        }
    };


    // handle cancel job 

    const [jobCancel] = useJobCancelMutation();

    const handleCancelJob = async (id: number) => {
        try {
            const res = await deleteAlert();
            if (res.isConfirmed) {
                const res = await jobCancel(id).unwrap();
                if (res) {
                    toast.success(res?.data?.message)
                }
            }
        } catch (err) {
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message = error.data?.message || "Something went wrong ❌";
            toast.error(message);
        }
    }












    if (isLoading) {
        return (
            <div className=' flex h-screen justify-center items-center ' >
                <h1>Loading...</h1>
            </div>
        )
    }




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
                    <CardTitle className="text-2xl font-bold">{singleJob?.job_title}</CardTitle>
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
                        <InfoCard title="Category" value={singleJob?.art_name} />
                        <InfoCard title="Location" value={singleJob?.location} />
                        <InfoCard title="Employment Type" value={singleJob?.job_type} />
                        <InfoCard title="Date Posted" value={new Date(singleJob?.created_at).toLocaleDateString()} />
                    </div>

                    {/* Applicant Count */}
                    <div className="">
                        <p className="text-lg text-[#4593F5]">Applicant</p>
                        <p className="text-3xl font-bold text-[#4593F5]">{singleJob?.applicant_count}</p>
                    </div>

                    {/* Job Description */}
                    <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
                        <h4 className="text-xl font-bold text-white">Job Description</h4>
                        <p className='whitespace-pre-line' >{singleJob?.job_description}  </p>

                        {/* <h5 className="font-semibold text-white pt-2">Responsibilities:</h5>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Design and implement sound effects for various media projects</li>
                            <li>Collaborate with directors and producers to achieve desired audio aesthetic</li>
                            <li>Edit and mix audio tracks to meet technical specifications</li>
                            <li>Create original sound effects and music when needed</li>
                        </ul> */}

                        <h5 className="font-semibold text-white pt-2">Requirements:</h5>
                        <ul className="list-disc pl-5 space-y-1">
                            {
                                singleJob?.required_skills.map((item, i) => {
                                    return (
                                        <div key={i} >
                                            <li>{item}</li>
                                        </div>
                                    )
                                })
                            }

                        </ul>

                        <h4 className="text-lg font-bold text-white pt-4">Compensation & Benefits</h4>
                        <p><span className="font-bold">${singleJob?.start_budget} - ${singleJob?.end_budget}</span> per year</p>
                        {/* <p>Health insurance, 401(k) matching, flexible schedule, professional development budget</p> */}
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
                    <Button variant="default" onClick={() => { handleCancelJob(singleJob?.id) }}  >Cancel</Button>
                    <Button onClick={() => { handleJobReject(singleJob?.id) }} variant="destructive" className="bg-[#C82E20] hover:bg-red-700" >Reject</Button>
                    <Button className="bg-[#2FAC21] hover:bg-green-600" onClick={() => { handleApproveJob(singleJob.id) }}    >Approve</Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default JobList;