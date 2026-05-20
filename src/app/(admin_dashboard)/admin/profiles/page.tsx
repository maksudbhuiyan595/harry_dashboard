"use client";


import Link from 'next/link';
import Image from 'next/image';
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
import avater from '../../../../assets/Images/avater.png'
import { useAllCategoryQuery } from '@/app/api/categoryApi';
import { AllCategory } from '@/utility/type/categoryType';
import { useState } from 'react';
import { useAllBusinessUserQuery } from '@/app/api/businessProfileApi';
import { UserBusinessProfileType } from '@/utility/type/businessProfileType';



const StatusBadge = ({ status }: { status: string }) => {
    const styles: { [key: string]: string } = {
        Active: "bg-green-500/20 text-green-400",
        Suspended: "bg-red-500/20 text-red-400",
        Pending: "bg-yellow-500/20 text-yellow-400",
    };
    return <div className={`px-3 py-1 text-sm font-medium rounded-full inline-block ${styles[status]}`}>{status}</div>;
};

function BusinessProfileManagementPage() {

    // user 

    const [bandValue, setBandValue] = useState<string | undefined>("0");
    const [categoryValue, setCategoryValue] = useState<string | undefined>("0");
    const [search, setSearch] = useState<string>("");

    // category 
    const { data } = useAllCategoryQuery(undefined);


    const allCategory: AllCategory[] = data?.data || [];



    // business profile api
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const { data: bussinessProfile } = useAllBusinessUserQuery({ categoryValue, bandValue, search });

    const userBusiness: UserBusinessProfileType[] = bussinessProfile?.data?.data || [];

    const totalItems = userBusiness.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const paginatedBusiness = userBusiness.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );



    return (
        <div className="p-8 min-h-screen text-white" style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #0F0E13' }}>
            <h1 className="text-2xl font-bold mb-8">Business Profile Management</h1>

            {/* Filters and Search Bar */}
            <div className="flex items-center justify-between p-4 mb-6 rounded-lg" style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #3A3E41' }}>
                <div className="relative w-1/2">
                    <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <Input value={search} onChange={(e) => { setSearch(e.target.value) }} placeholder="Search for a business..." className="bg-[#1A1C20] border-[#989898] pl-10 h-11" />
                </div>


                <div className="flex items-center gap-4">
                    <Select value={categoryValue} onValueChange={setCategoryValue}>
                        <SelectTrigger className="w-[180px] bg-[#0F0E13] border-[#989898]">
                            <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                allCategory?.map((item, i) => (
                                    <SelectItem key={i} value={String(item?.id)}>
                                        {item?.name}
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                    <Select value={bandValue} onValueChange={setBandValue} >
                        <SelectTrigger className="w-[180px] bg-[#0F0E13] border-[#989898]">
                            <SelectValue placeholder="All Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={String(0)}>Active</SelectItem>
                            <SelectItem value={String(1)}>Suspended</SelectItem>
                            {/* <SelectItem value="pending">Pending</SelectItem> */}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Business Profiles Table */}
            <div className="rounded-lg border border-[#989898] overflow-hidden">
                <Table>
                    <TableHeader style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #3A3E41' }}>
                        <TableRow className="border-b border-[#989898] hover:bg-transparent">
                            <TableHead className="text-white font-semibold text-lg">Business</TableHead>
                            <TableHead className="text-white font-semibold text-lg">Category</TableHead>
                            <TableHead className="text-white font-semibold text-lg">Owner</TableHead>
                            <TableHead className="text-white font-semibold text-lg">Jobs</TableHead>
                            <TableHead className="text-white font-semibold text-lg">Status</TableHead>
                            <TableHead className="text-white font-semibold text-lg">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedBusiness.map((profile) => (
                            <TableRow key={profile.id} className="border-b border-[#989898] hover:bg-gray-900/50">
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        <Image src={profile?.cover_picture || avater} alt={profile.business_name} width={40} height={40} className="rounded-full" />
                                        <span className="font-bold">{profile.business_name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{profile.art_name}</TableCell>
                                <TableCell>{profile.user_name}</TableCell>
                                <TableCell>{profile.business_name}</TableCell>
                                <TableCell>
                                    <StatusBadge status={profile.is_banned === 0 ? 'Active' : 'Suspended'} />
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Link className='cursor-pointer' href={`/admin/profiles/${profile.id}`}>
                                            <Button variant="secondary" className='cursor-pointer' size="icon"><IconEye size={20} /></Button>
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

export default BusinessProfileManagementPage;