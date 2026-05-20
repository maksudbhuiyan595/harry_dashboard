"use client";
import Link from 'next/link';
import { IconEye, IconTrash, IconSearch, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useAllCategoryQuery } from '@/app/api/categoryApi';
import { AllCategory } from '@/utility/type/categoryType';
import { useAllJobQuery } from '@/app/api/jobManagementApi';
import { AllJobType } from '@/utility/type/jobType';





function BusinessjobManagementPage() {
    const [category, setCategory] = useState<string | undefined>("0");
    const [status, setStatus] = useState<string | undefined>("0");
    const [keyword, setKeyword] = useState<string>("");




    // category list 

    const { data } = useAllCategoryQuery(undefined);

    const allCategory: AllCategory[] = data?.data || [];

    const { data: allJob } = useAllJobQuery({ category, status, keyword })

    const jobData: AllJobType[] = allJob?.data?.data || [];




    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalItems = jobData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const paginateAllJob = jobData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );




    return (
        <div className="p-8 min-h-screen text-white" style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #0F0E13' }}>
            <h1 className="text-2xl font-bold mb-8">Job Management</h1>

            {/* Filters and Search Bar */}
            <div className="flex items-center justify-between p-4 mb-6 rounded-lg" style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #3A3E41' }}>
                <div className="relative w-1/2">
                    <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <Input value={keyword} onChange={(e) => { setKeyword(e.target.value) }} placeholder="Search for a business..." className="bg-[#1A1C20] border-[#989898] pl-10 h-11" />
                </div>
                <div className="flex items-center gap-4">
                    <Select value={category} onValueChange={setCategory} >
                        <SelectTrigger className="w-[180px] bg-[#0F0E13] border-[#989898]">
                            <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                allCategory.map((item, i) => {
                                    return (
                                        <div key={i} >
                                            <SelectItem value={String(item?.id)} > {item?.name} </SelectItem>
                                        </div>
                                    )
                                })
                            }
                        </SelectContent>
                    </Select>


                    <Select value={status} onValueChange={setStatus} >
                        <SelectTrigger className="w-[180px] bg-[#0F0E13] border-[#989898]">
                            <SelectValue placeholder="All Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={String(0)}>approved</SelectItem>
                            <SelectItem value={String(1)}>pending</SelectItem>
                            {/* <SelectItem value="pending">Pending</SelectItem> */}
                        </SelectContent>
                    </Select>

                </div>
            </div>

            {/* Business jobs Table */}
            <div className="rounded-lg border border-[#989898] overflow-hidden">
                <Table>
                    <TableHeader style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #3A3E41' }}>
                        <TableRow className="border-b border-[#989898] hover:bg-transparent">
                            <TableHead className="text-white font-semibold text-lg">Job Title</TableHead>
                            <TableHead className="text-white font-semibold text-lg">Art Category</TableHead>
                            <TableHead className="text-white font-semibold text-lg">Posted By</TableHead>
                            <TableHead className="text-white font-semibold text-lg">Applications</TableHead>
                            <TableHead className="text-white font-semibold text-lg">Status</TableHead>
                            <TableHead className="text-white font-semibold text-lg">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginateAllJob.map((job) => (
                            <TableRow key={job.id} className="border-b border-[#989898] hover:bg-gray-900/50">
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold">{job.job_title}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{job.art_name}</TableCell>
                                <TableCell>{job.user_name}</TableCell>
                                <TableCell>{job.applicant_count}</TableCell>
                                <TableCell>
                                    <div className=' ' >
                                        {job?.status === "approved" ? (
                                            <span className=' bg-[#60BD66] py-1 px-2 text-[#10700B] rounded-[9px] ' >Approved</span>
                                        ) : job?.status === "pending" ? (
                                            <span className=' bg-[#BDBA60] py-1 px-2 text-[#70670B] rounded-[9px] ' >Pending</span>
                                        ) : (
                                            <span className=' bg-[#BD6260] py-1 px-2 text-[#700B0B] rounded-[9px] ' >Rejected</span>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Link href={`/admin/jobs/${job.id}`}>
                                            <Button variant="secondary" className=' cursor-pointer ' size="icon"><IconEye size={20} /></Button>
                                        </Link>
                                        <Button variant="secondary" size="icon"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 0C15.5 0 20 4.5 20 10C20 15.5 15.5 20 10 20C4.5 20 0 15.5 0 10C0 4.5 4.5 0 10 0ZM10 2C8.1 2 6.4 2.6 5.1 3.7L16.3 14.9C17.3 13.5 18 11.8 18 10C18 5.6 14.4 2 10 2ZM14.9 16.3L3.7 5.1C2.6 6.4 2 8.1 2 10C2 14.4 5.6 18 10 18C11.9 18 13.6 17.4 14.9 16.3Z" fill="#4593F5" />
                                        </svg>
                                        </Button>
                                        <Button variant="destructive" size="icon"><IconTrash size={20} /></Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-3 mt-8">

                {/* Prev */}
                <Button
                    variant="secondary"
                    size="icon"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    className="disabled:opacity-50"
                >
                    <IconChevronLeft size={20} />
                </Button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
                    <Button
                        key={page}
                        variant={currentPage === page ? "default" : "secondary"}
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </Button>
                ))}

                {/* Next */}
                <Button
                    variant="secondary"
                    size="icon"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    className="disabled:opacity-50"
                >
                    <IconChevronRight size={20} />
                </Button>

            </div>




        </div>
    );
}

export default BusinessjobManagementPage;