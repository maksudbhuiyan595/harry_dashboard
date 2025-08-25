"use client";

import React, { useState } from 'react';
import { IconPlus, IconCalendar, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

// --- TYPES ---
type Notification = {
    id: number;
    title: string;
    message: string;
    to: string;
    sentAt: string;
    recipients: number;
    openRate: number;
};

// --- MOCK DATA ---
const sentNotifications: Notification[] = [
    { id: 1, title: "New Feature: Portfolio Showcase", message: "We’ve added a new portfolio showcase feature for artists!", to: "All Users", sentAt: "2024-01-22 at 10:30 AM", recipients: 12847, openRate: 68 },
    { id: 2, title: "Scheduled Maintenance Alert", message: "Our services will be temporarily unavailable this Saturday.", to: "Developers", sentAt: "2024-01-20 at 5:00 PM", recipients: 452, openRate: 85 },
];

// --- REUSABLE COMPONENTS ---
const StatCard = ({ title, value, color }: { title: string, value: string | number, color: string }) => (
    <Card className="flex flex-row items-center justify-between p-4 border-[#989898] " style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #3A3E41' }}>
        <div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-sm text-gray-300">{title}</p>
        </div>
        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
    </Card>
);

const NotificationCard = ({ notification }: { notification: Notification }) => (
    <Card className="p-4 border-[#989898] text-white" style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #0F0E13' }}>
        <div className="flex justify-between items-start">
            <div>
                <h3 className="font-bold text-lg">{notification.title}</h3>
                <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
                <div className="flex items-center gap-4 text-xs text-gray-400 mt-3">
                    <span>To: {notification.to}</span>
                    <span>{notification.sentAt}</span>
                </div>
            </div>
            <div className="text-right">
                <p className="font-semibold">{notification.recipients.toLocaleString()} recipients</p>
                <p className="text-green-400 text-sm">{notification.openRate}% open rate</p>
            </div>
        </div>
    </Card>
);

const CreateNotificationModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [audience, setAudience] = useState('');
    const [date, setDate] = useState<Date | undefined>();

    const handleSend = () => {
        if (!title || !message || !audience) {
            alert('Please fill in all required fields.');
            return;
        }
        const notificationData = {
            title,
            message,
            audience,
            scheduleDate: date ? format(date, 'PPP') : 'Not scheduled',
        };
        console.log("Sending Notification:", notificationData);
        alert("Notification sent! (Check console for data)");
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl border-[#989898] text-white" style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #3A3E41' }}>
                <DialogHeader><DialogTitle className="text-2xl">Create Push Notification</DialogTitle></DialogHeader>
                <div className="py-6 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="font-semibold">Title*</Label>
                        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Notification title" className="bg-[#0F0E13] border-[#686868] h-10" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="message" className="font-semibold">Message*</Label>
                        <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write your notification message..." className="bg-[#0F0E13] border-[#686868] min-h-[120px]" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="audience" className="font-semibold">Target Audience</Label>
                        <Select onValueChange={setAudience} value={audience}>
                            <SelectTrigger className="bg-[#0F0E13] border-[#686868] h-10"><SelectValue placeholder="Select Audience" /></SelectTrigger>
                            <SelectContent><SelectItem value="all">All Users</SelectItem><SelectItem value="artists">Artists</SelectItem><SelectItem value="clients">Clients</SelectItem></SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label className="font-semibold">Schedule (Optional)</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-between bg-[#0F0E13] border-[#686868] h-10 hover:bg-[#1f2128] hover:text-white">
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    <IconCalendar className="h-4 w-4 text-gray-400" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={date} onSelect={setDate} initialFocus /></PopoverContent>
                        </Popover>
                    </div>
                </div>
                <DialogFooter className="gap-2">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSend} className="bg-[#20C820] hover:bg-green-600">Send Now</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};


function NotificationPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className="p-8 min-h-screen" style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #0F0E13' }}>
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-white">Notification Management</h1>
                <Button onClick={() => setIsModalOpen(true)} className="bg-[#4593F5] hover:bg-blue-600 gap-2">
                    <IconPlus size={18} />
                    <span>Create Notification</span>
                </Button>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Sent" value="1,506" color="#5191F0" />
                <StatCard title="This week" value={23} color="#F0A151" />
                <StatCard title="Avg. Open Rate" value="68%" color="#28C93A" />
                <StatCard title="Active Recipients" value="10.2k" color="#F33535" />
            </section>

            <main className="p-6 rounded-lg border border-[#989898]" style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #3A3E41' }}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-white">Sent Notifications</h2>
                    <Select><SelectTrigger className="w-[180px] bg-[#0F0E13] border-[#989898]"><SelectValue placeholder="This Month" /></SelectTrigger></Select>
                </div>
                <div className="space-y-4">
                    {sentNotifications.map(notif => <NotificationCard key={notif.id} notification={notif} />)}
                </div>
            </main>

            <div className="flex justify-center items-center gap-4 mt-8">
                <Button variant="outline" size="icon"><IconChevronLeft size={20} /></Button>
                <Button>1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline" size="icon"><IconChevronRight size={20} /></Button>
            </div>

            <CreateNotificationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}

export default NotificationPage;