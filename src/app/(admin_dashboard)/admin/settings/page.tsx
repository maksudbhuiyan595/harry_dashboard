"use client";


import { IconCamera, IconEye, IconEyeOff, IconPlus, IconPencil, IconTrash } from '@tabler/icons-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from 'react';

// --- TYPES ---
type FAQ = { id: number; question: string; answer: string; };

// --- MOCK DATA ---
const initialFaqs: FAQ[] = [
    { id: 1, question: "How do I reset my password?", answer: "To reset your password, go to the login screen and click on 'Forgot Password'. Follow the instructions sent to your email." },
];

// --- MODAL COMPONENTS ---
const UpdatePasswordModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [formData, setFormData] = React.useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [showCurrent, setShowCurrent] = React.useState(false);
    const [showNew, setShowNew] = React.useState(false);
    const [showConfirm, setShowConfirm] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            alert("New passwords do not match.");
            return;
        }
        console.log("Password Update Data:", formData);
        alert("Password update request logged to console!");
        onClose();
    };

    const PasswordInput = ({ id, value, onChange, show, onToggle }: { id: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, show: boolean, onToggle: () => void }) => (
        <div className="relative">
            <Input placeholder='*****' id={id} type={show ? "text" : "password"} value={value} onChange={onChange} className="bg-transparent border-gray-400 h-12 pr-10 text-white" required />
            <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={onToggle}>
                {show ? <IconEyeOff size={20} /> : <IconEye size={20} />}
            </Button>
        </div>
    );

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#0F0E13] border-gray-700 text-white">
                <DialogHeader><DialogTitle className="text-3xl font-bold">Update password</DialogTitle></DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <div className="space-y-2"><Label htmlFor="currentPassword">Current password*</Label><PasswordInput id="currentPassword" value={formData.currentPassword} onChange={handleChange} show={showCurrent} onToggle={() => setShowCurrent(!showCurrent)} /></div>
                    <div className="space-y-2"><Label htmlFor="newPassword">New password*</Label><PasswordInput id="newPassword" value={formData.newPassword} onChange={handleChange} show={showNew} onToggle={() => setShowNew(!showNew)} /></div>
                    <div className="space-y-2"><Label htmlFor="confirmPassword">Confirm password*</Label><PasswordInput id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} show={showConfirm} onToggle={() => setShowConfirm(!showConfirm)} /></div>
                    <DialogFooter>
                        <Button type="submit" className="w-full h-12 text-base bg-[#1778F2] hover:bg-blue-600 mt-4">Update password</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

const SaveFaqModal = ({ isOpen, onClose, onSave, faqToEdit }: { isOpen: boolean, onClose: () => void, onSave: (faq: Omit<FAQ, 'id'> | FAQ) => void, faqToEdit: FAQ | null }) => {
    const [question, setQuestion] = React.useState('');
    const [answer, setAnswer] = React.useState('');
    const isEditing = !!faqToEdit;

    React.useEffect(() => {
        setQuestion(isEditing ? faqToEdit.question : '');
        setAnswer(isEditing ? faqToEdit.answer : '');
    }, [faqToEdit, isOpen]);

    const handleSave = () => {
        if (!question || !answer) {
            alert("Please fill all fields.");
            return;
        }
        const faqData = { question, answer };
        console.log("Saving FAQ Data:", isEditing ? { ...faqData, id: faqToEdit.id } : faqData);
        onSave(isEditing ? { ...faqData, id: faqToEdit.id } : faqData);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl bg-[#3A3E41] border-gray-700 text-white">
                <DialogHeader><DialogTitle className="text-2xl">{isEditing ? 'Edit FAQ' : 'Create FAQ'}</DialogTitle></DialogHeader>
                <div className="py-6 space-y-4">
                    <div className="space-y-2"><Label htmlFor="question">Question</Label><Input id="question" value={question} onChange={(e) => setQuestion(e.target.value)} className="bg-[#0F0E13] border-[#686868] h-10 text-white" placeholder='write your question' /></div>
                    <div className="space-y-2"><Label htmlFor="answer">Answer</Label><Textarea id="answer" value={answer} onChange={(e) => setAnswer(e.target.value)} className="bg-[#0F0E13] border-[#686868] min-h-[150px] text-white" placeholder='write your answer' /></div>
                </div>
                <DialogFooter className="gap-2"><Button variant="default" onClick={onClose}>Cancel</Button><Button onClick={handleSave} className="bg-[#20C820] hover:bg-green-600">Save</Button></DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

// --- MAIN SETTINGS PAGE ---
function SettingsPage() {
    // State for forms
    const [profile, setProfile] = React.useState({ fullName: 'Admin User', contactNumber: '+1234567890', location: 'New York, USA' });
    const [faqs, setFaqs] = React.useState(initialFaqs);

    // State for modals
    const [isPasswordModalOpen, setIsPasswordModalOpen] = React.useState(false);
    const [isFaqModalOpen, setIsFaqModalOpen] = React.useState(false);
    const [faqToEdit, setFaqToEdit] = React.useState<FAQ | null>(null);

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfile({ ...profile, [e.target.id]: e.target.value });
    };

    const handleProfileSave = () => {
        console.log("Saving Profile Data:", profile);
        alert("Profile changes logged to console!");
    };

    const openCreateFaqModal = () => {
        setFaqToEdit(null);
        setIsFaqModalOpen(true);
    };

    const openEditFaqModal = (faq: FAQ) => {
        setFaqToEdit(faq);
        setIsFaqModalOpen(true);
    };

    const handleSaveFaq = (faqData: Omit<FAQ, 'id'> | FAQ) => {
        if ('id' in faqData) {
            setFaqs(faqs.map(f => f.id === faqData.id ? faqData : f));
        } else {
            setFaqs([...faqs, { ...faqData, id: Date.now() }]);
        }
    };

    const handleDeleteFaq = (id: number) => {
        if (confirm("Are you sure you want to delete this FAQ?")) {
            setFaqs(faqs.filter(f => f.id !== id));
        }
    };

    return (
        <div className="p-8 min-h-screen" style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #0F0E13' }}>
            <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Settings */}
                <Card className="lg:col-span-1 p-6 border-none" style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #3A3E41' }}>
                    <div className="flex flex-col items-center">
                        <div className="relative w-40 h-40">
                            <Avatar className="w-40 h-40 border-2 border-gray-500">
                                <AvatarImage src="https://placehold.co/160x160" />
                                <AvatarFallback>A</AvatarFallback>
                            </Avatar>
                            <Button size="icon" className="absolute bottom-2 right-2 rounded-full"><IconCamera size={20} /></Button>
                        </div>
                        <p className="text-2xl font-medium text-white mt-4">Upload your photo</p>
                    </div>
                    <div className="space-y-4 mt-10">
                        <Input id="fullName" value={profile.fullName} onChange={handleProfileChange} placeholder="Full Name" className="bg-[#0F0E13] border-gray-400 h-12 text-base text-white" />
                        <Input id="contactNumber" value={profile.contactNumber} onChange={handleProfileChange} placeholder="Contact Number" className="bg-[#0F0E13] border-gray-400 h-12 text-base text-white" />
                        <Input id="location" value={profile.location} onChange={handleProfileChange} placeholder="Location" className="bg-[#0F0E13] border-gray-400 h-12 text-base text-white" />
                    </div>
                    <div className="space-y-4 mt-10">
                        <Button onClick={handleProfileSave} className="w-full h-12 text-base font-bold bg-[#1778F2] hover:bg-blue-600">Save changes</Button>
                        <Button onClick={() => setIsPasswordModalOpen(true)} variant="outline" className="w-full h-12 text-base font-bold bg-[#35393C] border-[#989898] hover:bg-gray-700">Update password</Button>
                    </div>
                </Card>

                {/* FAQ Management */}
                <Card className="lg:col-span-2 p-6 border-none" style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #3A3E41' }}>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">Help & Support (FAQ)</h2>
                        <Button onClick={openCreateFaqModal} className="bg-[#4593F5] hover:bg-blue-600 gap-2"><IconPlus size={18} />Create New FAQ</Button>
                    </div>
                    <div className="space-y-4">
                        {faqs.map(faq => (
                            <div key={faq.id} className="p-4 rounded-lg border border-[#989898] flex justify-between items-start" style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #0F0E13' }}>
                                <div><h4 className="font-semibold text-white text-lg">{faq.question}</h4><p className="text-sm text-gray-400 mt-1">{faq.answer}</p></div>
                                <div className="flex gap-2"><Button variant="outline" size="icon" onClick={() => openEditFaqModal(faq)}><IconPencil size={18} /></Button><Button variant="destructive" size="icon" onClick={() => handleDeleteFaq(faq.id)}><IconTrash size={18} /></Button></div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Modals */}
            <UpdatePasswordModal isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} />
            <SaveFaqModal isOpen={isFaqModalOpen} onClose={() => setIsFaqModalOpen(false)} onSave={handleSaveFaq} faqToEdit={faqToEdit} />
        </div>
    );
}

export default SettingsPage;