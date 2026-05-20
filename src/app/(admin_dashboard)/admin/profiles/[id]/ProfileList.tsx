"use client";

import React from 'react';
import { IconBriefcase, IconMapPin, IconUser, IconCalendar, IconMail, IconBrandYoutube, IconBrandFacebook, IconBrandLinkedin } from '@tabler/icons-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useBanUserMutation, useBusinessPermisionMutation, useBusinessProfileDeleteMutation, usePostPermissionMutation, useSingleBusinessUserQuery } from '@/app/api/businessProfileApi';
import { SingleBusinessProfile } from '@/utility/type/businessProfileType';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { toast } from 'sonner';
import { deleteAlert } from '@/utility/alert/deleteAlert';
import { bandAlert } from '@/utility/alert/bandAlert';
import { errorMesage } from '@/utility/error/error';
import { successMessage } from '@/utility/error/successMessage';




const InfoTag = ({ icon, text }: { icon: React.ElementType, text: string }) => {
    const Icon = icon;
    return (
        <div className="flex items-center gap-2 text-gray-300">
            <Icon size={20} />
            <span className="font-medium">{text}</span>
        </div>
    );
}

const ProfileList = ({ id }: { id: string }) => {

    // post permision 

    const [postPermission] = usePostPermissionMutation();

    const handlePostPermission = async () => {
        try {
            const res = await postPermission(id).unwrap();
            if (res) {
                successMessage(res?.message);
            }

        } catch (error) {
            errorMesage(error);
        }
    };


    // bussiness permision api 

    const [businessPermision] = useBusinessPermisionMutation();


    const handleBussnessPermision = async () => {
        try {
            const res = await businessPermision(id).unwrap();
            if (res) {
                successMessage(res?.message)
            }
        } catch (error) {
            errorMesage(error)
        }
    }





    // -------- DELETE PROFILE ------------
    const [businessProfileDelete] = useBusinessProfileDeleteMutation();

    const handleProfileDelete = async (id: string) => {
        try {
            const res = await deleteAlert();
            if (res?.isConfirmed) {
                const result = await businessProfileDelete(id).unwrap();
                if (result) {
                    toast.success(result?.data?.message);
                }
            }
        } catch (err) {
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            toast.error(error.data?.message || "Something went wrong ❌");
        }
    };

    // -------- BAN USER ------------
    const [banUser] = useBanUserMutation();

    const handleBanUser = async (id: string) => {
        try {
            const res = await bandAlert();
            if (res?.isConfirmed) {
                const result = await banUser(id).unwrap();
                if (result) {
                    toast.success(result?.data?.message);
                }
            }
        } catch (err) {
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            toast.error(error.data?.message || "Something went wrong ❌");
        }
    };

    // -------- FETCH USER PROFILE ------------
    const { data, isLoading, error } = useSingleBusinessUserQuery(id);

    const profile: SingleBusinessProfile = data?.data || null;

    if (isLoading) return <p>Loading...</p>;
    if (error || !profile) return <p>Error loading profile</p>;








    return (
        <div
            className="p-8 min-h-screen text-white"
            style={{ background: "linear-gradient(0deg, rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0.20)), #0F0E13" }}
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* LEFT SIDE */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Header */}
                    <div className="flex items-center gap-8">
                        <Avatar className="h-32 w-32 border-2 border-gray-600">
                            <AvatarImage src={profile?.avatar} alt={profile?.business_name} />
                            <AvatarFallback>{profile?.user_name?.substring(0, 2)}</AvatarFallback>
                        </Avatar>

                        <div>
                            <h1 className="text-4xl font-bold">{profile?.user_name}</h1>
                            <div className="mt-4">
                                {profile?.status === "Active" ? (
                                    <span className="bg-[#60BD66] py-1 px-2 text-[#10700B] rounded-[9px]">Approved</span>
                                ) : profile?.status === "Suspended" ? (
                                    <span className="bg-[#BDBA60] py-1 px-2 text-[#70670B] rounded-[9px]">Suspended</span>
                                ) : (
                                    <span className="bg-[#BD6260] py-1 px-2 text-[#700B0B] rounded-[9px]">Rejected</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-6 text-sm">
                        <InfoTag icon={IconBriefcase} text={profile?.art_name} />
                        <InfoTag icon={IconMapPin} text={profile?.location} />
                        <InfoTag icon={IconUser} text={`Owner: ${profile?.user_name}`} />
                        <InfoTag icon={IconCalendar} text={`Created: ${new Date(profile?.created_at).toLocaleDateString()}`} />
                    </div>

                    {/* About */}
                    <div>
                        <h2 className="text-2xl font-bold mb-3">About</h2>
                        <p className="text-gray-300 leading-relaxed">{profile?.bio}</p>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-2 rounded-md bg-[#3A3E41]/50 border border-gray-700 w-fit">
                                <IconMail size={20} />
                                <span className="text-gray-400">
                                    {profile?.user_name?.toLowerCase().replace(/ /g, ".")}@example.com
                                </span>
                            </div>

                            {profile?.social_links?.[1] && (
                                <div className="flex items-center gap-3 p-2 rounded-md bg-[#3A3E41]/50 border border-gray-700 w-fit">
                                    <IconBrandYoutube size={20} />
                                    <span className="text-gray-400">
                                        youtube.com/{profile.social_links[1].toLowerCase().replace(/ /g, "")}
                                    </span>
                                </div>
                            )}

                            {profile?.social_links?.[0] && (
                                <div className="flex items-center gap-3 p-2 rounded-md bg-[#3A3E41]/50 border border-gray-700 w-fit">
                                    <IconBrandFacebook size={20} />
                                    <span className="text-gray-400">
                                        facebook.com/{profile.social_links[0].toLowerCase().replace(/ /g, "")}
                                    </span>
                                </div>
                            )}

                            {profile?.social_links?.[2] && (
                                <div className="flex items-center gap-3 p-2 rounded-md bg-[#3A3E41]/50 border border-gray-700 w-fit">
                                    <IconBrandLinkedin size={20} />
                                    <span className="text-gray-400">
                                        linkedin.com/in/{profile.social_links[2].toLowerCase().replace(/ /g, "")}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Admin Message */}
                    <div>
                        <h2 className="text-2xl font-bold mb-3">Message from Admin</h2>
                        <Textarea placeholder="Write something..." className="bg-[#3A3E41] border-gray-700 min-h-[120px]" />
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="space-y-8">
                    {/* Activity Summary Card */}
                    <Card className="bg-[#3A3E41] border-gray-700 text-white">
                        <CardHeader>
                            <CardTitle>Activity Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-y-6 text-sm">
                            <div>
                                <Label>Status</Label>
                                <div className="mt-3">
                                    {profile?.status === "Active" ? (
                                        <span className="bg-[#60BD66] py-1 px-2 text-[#10700B] rounded-[9px]">Approved</span>
                                    ) : profile?.status === "Suspended" ? (
                                        <span className="bg-[#BDBA60] py-1 px-2 text-[#70670B] rounded-[9px]">Suspended</span>
                                    ) : (
                                        <span className="bg-[#BD6260] py-1 px-2 text-[#700B0B] rounded-[9px]">Rejected</span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <Label>Followers</Label>
                                <p className="font-bold text-lg">{profile?.followers_count}</p>
                            </div>

                            <div>
                                <Label>Active Job Posts</Label>
                                <p className="font-bold text-lg">{profile?.active_job_posts}</p>
                            </div>

                            <div>
                                <Label>Total Job Posts</Label>
                                <p className="font-bold text-lg">{profile?.total_job_posts}</p>
                            </div>

                            <div className="col-span-2">
                                <Label>Last Active</Label>
                                <p className="font-bold text-lg">
                                    {new Date(profile?.last_active).toLocaleDateString()}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Admin Controls Card */}
                    <Card className="bg-[#3A3E41] border-gray-700 text-white">
                        <CardHeader>
                            <CardTitle>Admin Controls</CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            {/* POSTING PERMISSION */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label className="font-bold">Posting Permissions</Label>
                                    <p className="text-xs text-gray-400">Allow this business to post jobs.</p>
                                </div>

                                <Switch
                                    onCheckedChange={handlePostPermission}
                                    disabled={profile?.status !== "Active"}
                                    checked={profile?.is_post == true}
                                />
                            </div>

                            {/* FEATURED */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label className="font-bold">Featured Business</Label>
                                    <p className="text-xs text-gray-400">Show in featured section.</p>
                                </div>
                                <Switch
                                    onCheckedChange={handleBussnessPermision}
                                    disabled={profile?.status !== "Active"}
                                    checked={profile?.is_business == true}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Buttons */}
                    <div className="flex gap-4">
                        <Button
                            onClick={() => handleBanUser(id)}
                            variant="outline"
                            className="text-black h-12"
                        >
                            {profile?.status === "Active" ? "Suspend Account" : "Unsuspend Account"}
                        </Button>

                        <Button
                            onClick={() => handleProfileDelete(id)}
                            variant="destructive"
                            className="h-12"
                        >
                            Delete Account
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileList;



