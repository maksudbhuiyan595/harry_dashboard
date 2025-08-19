"use client";

import React, { useState, useEffect } from 'react';
import { IconPlus, IconPencil, IconTrash, IconX } from '@tabler/icons-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// --- MOCK DATA ---
const initialCategories: Category[] = [
    { id: 1, name: 'Music' },
    { id: 2, name: 'Arts' },
    { id: 3, name: 'Technology' },
    { id: 4, name: 'Sports' },
];
const initialPreferences: string[] = ['Javascript', 'Typescript', 'React', 'Node.js', 'Python'];

// --- TYPES ---
type Category = {
    id: number;
    name: string;
};

// --- REUSABLE COMPONENTS ---

const PreferenceTag = ({ preference, onRemove }: { preference: string; onRemove: (p: string) => void; }) => (
    <div className="flex items-center gap-2 bg-[#84B2EA] text-[#1A4B87] text-sm font-medium px-4 py-1 rounded-full">
        <span>{preference}</span>
        <button onClick={() => onRemove(preference)} className="hover:bg-black/10 rounded-full p-0.5">
            <IconX size={16} />
        </button>
    </div>
);

const CategoryRow = ({ category, onEdit, onDelete }: { category: Category; onEdit: (c: Category) => void; onDelete: (id: number) => void; }) => (
    <div className="w-full p-4 border border-white/30 rounded-lg flex justify-between items-center transition-all hover:border-white/50">
        <h3 className="text-xl font-semibold text-white">{category.name}</h3>
        <div className="flex items-center gap-4 text-gray-400">
            <Button variant="outline" size="icon" onClick={() => onEdit(category)}>
                <IconPencil size={20} />
            </Button>
            <Button variant="destructive" size="icon" onClick={() => onDelete(category.id)}>
                <IconTrash size={20} />
            </Button>
        </div>
    </div>
);

const AddEditCategoryModal = ({ isOpen, onClose, onSave, categoryToEdit }: { isOpen: boolean; onClose: () => void; onSave: (c: Partial<Category>) => void; categoryToEdit: Category | null; }) => {
    const [name, setName] = useState('');
    const isEditing = !!categoryToEdit;

    useEffect(() => {
        setName(isEditing ? categoryToEdit.name : '');
    }, [categoryToEdit, isEditing]);

    const handleSave = () => {
        if (name.trim()) {
            onSave({ ...categoryToEdit, name });
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                className="p-8 rounded-lg shadow-2xl border-2 border-blue-500/50"
                style={{ background: 'linear-gradient(145deg, #2d3748, #1a202c)' }}
            >
                <DialogHeader className="text-left mb-4">
                    <DialogTitle className="text-2xl font-bold text-white">{isEditing ? 'Edit Category' : 'Add a New Category'}</DialogTitle>
                    <DialogDescription className="text-gray-400">
                        {isEditing ? `Make changes to your category here.` : `Enter the name for the new category.`} Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-base font-medium text-gray-300">Category Name</Label>
                    <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Gaming"
                        className="bg-gray-900/50 border-gray-600 text-white h-12 text-base"
                    />
                </div>
                <DialogFooter className="mt-6 gap-2 sm:justify-end">
                    <DialogClose asChild>
                        <Button type="button" variant="default">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

// --- MAIN PAGE COMPONENT ---
function ManagePreferencesPage() {
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [preferences, setPreferences] = useState<string[]>(initialPreferences);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
    const [categoryToDeleteId, setCategoryToDeleteId] = useState<number | null>(null);

    const handleRemovePreference = (preferenceToRemove: string) => {
        setPreferences(preferences.filter(p => p !== preferenceToRemove));
    };

    const handleOpenAddModal = () => {
        setCategoryToEdit(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (category: Category) => {
        setCategoryToEdit(category);
        setIsModalOpen(true);
    };

    const handleSaveCategory = (savedCategory: Partial<Category>) => {
        if (savedCategory.id) {
            setCategories(categories.map(c => c.id === savedCategory.id ? (savedCategory as Category) : c));
        } else {
            setCategories([...categories, { ...savedCategory, id: Date.now() } as Category]);
        }
    };

    const handleOpenDeleteAlert = (id: number) => {
        setCategoryToDeleteId(id);
        setIsAlertOpen(true);
    };

    const handleConfirmDelete = () => {
        setCategories(categories.filter(c => c.id !== categoryToDeleteId));
        setIsAlertOpen(false);
        setCategoryToDeleteId(null);
    };

    return (
        <div
            className="p-10 mx-0.5 -mt-5 rounded-t-2xl min-h-screen font-sans"
            style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #3A3E41' }}
        >
            <div className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-4">Your Preferences</h2>
                <div className="flex flex-wrap items-center gap-4">
                    {preferences.map(pref => (
                        <PreferenceTag key={pref} preference={pref} onRemove={handleRemovePreference} />
                    ))}
                    {preferences.length === 0 && <p className="text-gray-400">No preferences selected.</p>}
                </div>
            </div>

            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Manage Categories</h2>
                <div className="space-y-4">
                    {categories.map(category => (
                        <CategoryRow
                            key={category.id}
                            category={category}
                            onEdit={handleOpenEditModal}
                            onDelete={handleOpenDeleteAlert}
                        />
                    ))}
                </div>
            </div>

            <div className="mt-12 flex justify-center">
                <Button
                    onClick={handleOpenAddModal}
                    className="flex items-center gap-3 bg-[#1778F2] text-white font-semibold px-8 py-6 text-base hover:bg-blue-600 transition-colors"
                >
                    <IconPlus size={20} />
                    <span>Add a new category</span>
                </Button>
            </div>

            <AddEditCategoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveCategory}
                categoryToEdit={categoryToEdit}
            />

            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogContent className="bg-gray-900 border-red-500/50 text-white shadow-2xl rounded-lg">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-2xl font-bold">Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-400">
                            This action cannot be undone. This will permanently delete the category and all associated data.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-4">
                        <AlertDialogCancel asChild>
                            <Button className='bg-[#1778F2] border-none' variant="default">Cancel</Button>
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmDelete} asChild>
                            <Button className='bg-[#1778F2] border-none' variant="default">Continue</Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default ManagePreferencesPage;