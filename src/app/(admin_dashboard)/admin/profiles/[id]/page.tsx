"use client";

import React from 'react';
import Image from 'next/image';
import { IconBriefcase, IconMapPin, IconUser, IconCalendar, IconMail, IconBrandYoutube, IconBrandFacebook, IconBrandLinkedin } from '@tabler/icons-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

// --- MOCK DATA (You would fetch this data based on the ID) ---
const profilesData = {
    '1': { id: 1, name: 'Echo Studio', category: 'Music Production', owner: 'Azhar', jobs: 56, status: 'Active', avatar: 'https://placehold.co/122x122/E4E4E8/000000?text=ES', location: 'Los Angeles, CA', created: 'June 15, 2025', followers: 245, totalJobs: 12, lastActive: '2 days ago', bio: 'Passionate software engineer with 5+ years of experience building scalable web applications and leading development teams. I specialize in modern JavaScript frameworks and cloud technologies.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    // Add other profiles here...
};

const StatusBadge = ({ status }: { status: string }) => {
    const styles: { [key: string]: string } = {
        Active: "bg-green-500/20 text-green-400",
    };
    return <div className={`px-4 py-1 text-lg font-medium rounded-full inline-block ${styles[status]}`}>{status}</div>;
};

const InfoTag = ({ icon, text }: { icon: React.ElementType, text: string }) => {
    const Icon = icon;
    return (
        <div className="flex items-center gap-2 text-gray-300">
            <Icon size={20} />
            <span className="font-medium">{text}</span>
        </div>
    );
}

function ProfileDetailsPage({ params }: { params: { id: string } }) {
    const profile = profilesData[params.id];

    if (!profile) {
        return <div className="p-8 text-white">Profile not found.</div>;
    }

    return (
        <div className="p-8 min-h-screen text-white" style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #0F0E13' }}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-8 relative">
                    {/* Profile Header */}
                    <div className="flex items-center gap-8">
                        <Avatar className="h-32 w-32">
                            <AvatarImage src={profile.avatar} alt={profile.name} />
                            <AvatarFallback>{profile.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-4xl font-bold">{profile.name}</h1>
                            <div className="mt-4"><StatusBadge status={profile.status} /></div>
                        </div>
                    </div>

                    {/* Info Tags */}
                    <div className="flex flex-wrap items-center gap-6 text-sm">
                        <InfoTag icon={IconBriefcase} text={profile.category} />
                        <InfoTag icon={IconMapPin} text={profile.location} />
                        <InfoTag icon={IconUser} text={`Owner: ${profile.owner}`} />
                        <InfoTag icon={IconCalendar} text={`Created: ${profile.created}`} />
                    </div>

                    {/* About Section */}
                    <div>
                        <h2 className="text-2xl font-bold mb-3">About</h2>
                        <p className="text-gray-300 leading-relaxed">{profile.bio}</p>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                        <div className="space-y-3 ">
                            <div className="flex w-full items-center gap-3 p-2 rounded-md bg-[#3A3E41]/50 border border-gray-700 "><IconMail size={20} /><span className="text-gray-400">{profile.name.toLowerCase().replace(' ', '.')}@example.com</span></div>
                            <div className="flex items-center gap-3 p-2 rounded-md bg-[#3A3E41]/50 border border-gray-700 w-full"><IconBrandYoutube size={20} /><span className="text-gray-400">youtube.com/{profile.name.toLowerCase().replace(' ', '')}</span></div>
                            <div className="flex items-center gap-3 p-2 rounded-md bg-[#3A3E41]/50 border border-gray-700 w-full"><IconBrandFacebook size={20} /><span className="text-gray-400">facebook.com/{profile.name.toLowerCase().replace(' ', '')}</span></div>
                            <div className="flex items-center gap-3 p-2 rounded-md bg-[#3A3E41]/50 border border-gray-700 w-full"><IconBrandLinkedin size={20} /><span className="text-gray-400">linkedin.com/in/{profile.name.toLowerCase().replace(' ', '')}</span></div>
                        </div>
                    </div>

                    {/* Message from Admin */}
                    <div>
                        <h2 className="text-2xl font-bold mb-3">Message from Admin</h2>
                        <Textarea placeholder="Write something..." className="bg-[#3A3E41] border-gray-700 min-h-[120px]" />
                    </div>

                </div>

                {/* Right Sidebar Column */}
                <div className="space-y-8 pt-20">
                    <Card className="bg-[#3A3E41] border-gray-700 text-white">
                        <CardHeader><CardTitle>Activity Summary</CardTitle></CardHeader>
                        <CardContent className="grid grid-cols-2 gap-y-6 text-sm">
                            <div><Label>Status</Label><div className="mt-1"><StatusBadge status={profile.status} /></div></div>
                            <div><Label>Followers</Label><p className="font-bold text-lg">{profile.followers}</p></div>
                            <div><Label>Active Job Posts</Label><p className="font-bold text-lg">{profile.jobs}</p></div>
                            <div><Label>Total Job Posts</Label><p className="font-bold text-lg">{profile.totalJobs}</p></div>
                            <div className="col-span-2"><Label>Last Active</Label><p className="font-bold text-lg">{profile.lastActive}</p></div>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#3A3E41] border-gray-700 text-white">
                        <CardHeader><CardTitle>Admin Controls</CardTitle></CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="posting-permissions" className="font-bold">Posting Permissions</Label>
                                    <p className="text-xs text-gray-400">Allow this business to post jobs.</p>
                                </div>
                                <Switch id="posting-permissions" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="featured-business" className="font-bold">Featured Business</Label>
                                    <p className="text-xs text-gray-400">Show in featured section.</p>
                                </div>
                                <Switch id="featured-business" />
                            </div>
                        </CardContent>
                    </Card>


                </div>
            </div>
            <div className=' mt-4 '>

                <div className="max-w-xs flex flex-row items-center justify-between gap-4">
                    <Button variant="default" className="w-full h-[48px]">Suspend Account</Button>
                    <Button variant="destructive" className="w-full h-[48px]">Delete Account</Button>
                </div>
            </div>
        </div>
    );
}

export default ProfileDetailsPage;