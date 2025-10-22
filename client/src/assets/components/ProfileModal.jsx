import React, { useState, useEffect } from 'react';
import { dummyUserData } from '../assets';
import { Pencil } from 'lucide-react';

const ProfileModal = ({ onClose }) => {
    const user = dummyUserData;

    const [editForm, setEditForm] = useState({
        username: user.username,
        bio: user.bio,
        location: user.location,
        full_name: user.full_name,
        profile_picture: null,
        cover_photo: null,
    });

    const [previews, setPreviews] = useState({
        profile_picture: user.profile_picture,
        cover_photo: user.cover_photo,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            const file = files[0];

            const oldPreview = previews[name];
            if (oldPreview && oldPreview.startsWith('blob:')) {
                URL.revokeObjectURL(oldPreview);
            }

            setEditForm(prev => ({
                ...prev,
                [name]: file,
            }));

            setPreviews(prev => ({
                ...prev,
                [name]: URL.createObjectURL(file),
            }));
        }
    };

    useEffect(() => {
        return () => {
            if (previews.profile_picture && previews.profile_picture.startsWith('blob:')) {
                URL.revokeObjectURL(previews.profile_picture);
            }
            if (previews.cover_photo && previews.cover_photo.startsWith('blob:')) {
                URL.revokeObjectURL(previews.cover_photo);
            }
        };
    }, [previews]);

    const handleSaveProfile = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(editForm).forEach(key => {
            formData.append(key, editForm[key]);
        });

        console.log("Saving profile with data:", editForm);

        onClose();
    };

    return (
        <div
            className='fixed inset-0 z-50 h-screen overflow-y-scroll bg-black/50 p-4'
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className='max-w-2xl sm:py-6 mx-auto' onClick={(e) => e.stopPropagation()}>
                <div className='bg-white rounded-lg shadow p-6'>
                    <h1 className='text-2xl font-bold text-gray-900 mb-6'>Edit Profile</h1>

                    <form className='space-y-6' onSubmit={handleSaveProfile}>

                        <div className='space-y-4'>
                            <div className='relative group/cover'>
                                <label htmlFor="cover_photo_input" className='block text-sm font-medium text-gray-700 mb-2'>
                                    Cover Photo
                                </label>
                                <img
                                    src={previews.cover_photo}
                                    alt="Cover"
                                    className='w-full h-40 rounded-lg bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 object-cover'
                                />
                                <label htmlFor="cover_photo_input" className='cursor-pointer absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center hidden group-hover/cover:flex'>
                                    <Pencil className="w-6 h-6 text-white" />
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="cover_photo"
                                    id="cover_photo_input"
                                    hidden
                                    onChange={handleFileChange}
                                />
                            </div>

                            <div className='relative w-24 h-24 -mt-12 ml-6 group/profile'>
                                <img
                                    src={previews.profile_picture}
                                    alt="Profile"
                                    className='w-full h-full rounded-full object-cover border-4 border-white'
                                />
                                <label htmlFor="profile_picture_input" className='cursor-pointer absolute inset-0 bg-black/30 rounded-full flex items-center justify-center hidden group-hover/profile:flex'>
                                    <Pencil className="w-5 h-5 text-white" />
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="profile_picture"
                                    id="profile_picture_input"
                                    hidden
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="full_name" className='block text-sm font-medium text-gray-700 mb-1'>Full Name</label>
                            <input
                                type="text"
                                name="full_name"
                                id="full_name"
                                value={editForm.full_name}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="username" className='block text-sm font-medium text-gray-700 mb-1'>Username</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                value={editForm.username}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="bio" className='block text-sm font-medium text-gray-700 mb-1'>Bio</label>
                            <textarea
                                name="bio"
                                id="bio"
                                value={editForm.bio}
                                onChange={handleChange}
                                rows="3"
                                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="location" className='block text-sm font-medium text-gray-700 mb-1'>Location</label>
                            <input
                                type="text"
                                name="location"
                                id="location"
                                value={editForm.location}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div className='flex justify-end space-x-3 pt-6'>

                            <button
                                onClick={onClose}
                                type='button'
                                className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer'
                            >
                                Cancel
                            </button>

                            <button
                                type='submit'
                                className='px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition cursor-pointer'
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    );
};

export default ProfileModal;