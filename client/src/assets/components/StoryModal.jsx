import { ArrowLeft, Sparkle, TextIcon, Upload } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const StoryModal = ({ setShowModal, fetchStories }) => {
    const bgColors = ["#4f46e5", "#7c3aed", "#db2777", "#e11d48", "#ca8a04", "#0d9488"];

    const [mode, setMode] = useState("text");
    const [background, setBackground] = useState(bgColors[0]);
    const [text, setText] = useState("");
    const [media, setMedia] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isCreating, setIsCreating] = useState(false);

    const handleMediaUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setMedia(file)
            setPreviewUrl(URL.createObjectURL(file))
            
        }
    };

    const handleCreateStory = async () => {
        // 1. Validation: Ensure content exists
        if (mode === 'text' && !text.trim()) {
            throw new Error("Text story cannot be empty.");
        }
        if (mode === 'media' && !media) {
            throw new Error("Please select a photo or video to upload.");
        }

        setIsCreating(true);
        const formData = new FormData();

        // 2. Prepare FormData based on the story mode
        formData.append('type', mode);
        if (mode === 'text') {
            formData.append('content', text);
            formData.append('backgroundColor', background);
        } else {
            formData.append('media', media);
        }

        try {
            // 3. API Call: Send data to your backend endpoint
            //    Replace '/api/stories' with your actual API endpoint
            const response = await fetch('/api/stories', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create story.');
            }

            // 4. On Success: Refresh stories and close modal
            fetchStories();
            setShowModal(false);
            return "Story created successfully!"; // This message will be shown in the success toast

        } catch (error) {
            // Re-throw the error to be caught by toast.promise
            throw error;
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className='fixed inset-0 z-[110] min-h-screen bg-black/80 backdrop-blur text-white flex items-center justify-center p-4'>
            <div className='w-full max-w-md bg-zinc-900 rounded-lg p-4'>
                <div className='text-center mb-4 flex items-center justify-between'>
                    <button onClick={() => setShowModal(false)} className='text-white p-2 cursor-pointer rounded-full hover:bg-zinc-800'>
                        <ArrowLeft />
                    </button>
                    <h2 className='text-xl font-semibold'>Create Story</h2>
                    <span className='w-10'></span> {/* Spacer */}
                </div>

                <div className='rounded-lg h-96 flex items-center justify-center relative overflow-hidden' style={{ backgroundColor: mode === 'text' ? background : '#000' }}>
                    {mode === 'text' && (
                        <textarea
                            className='bg-transparent text-white text-center w-full h-full p-6 text-2xl resize-none focus:outline-none flex items-center justify-center'
                            placeholder="What's on your mind?"
                            onChange={(e) => setText(e.target.value)}
                            value={text}
                        />
                    )}
                    {mode === 'media' && previewUrl && (
                        media?.type.startsWith('image') ? (
                            <img src={previewUrl} alt="Story preview" className='object-contain h-full w-full' />
                        ) : (
                            <video src={previewUrl} controls className='object-contain h-full w-full' />
                        )
                    )}
                </div>

                {mode === 'text' && (
                    <div className='flex justify-center mt-4 gap-2'>
                        {bgColors.map((color) => (
                            <button
                                key={color}
                                className={`w-8 h-8 rounded-full cursor-pointer transition-transform duration-200 ${background === color ? 'ring-2 ring-white scale-110' : 'ring-1 ring-white/50'}`}
                                style={{ backgroundColor: color }}
                                onClick={() => setBackground(color)}
                            />
                        ))}
                    </div>
                )}


                <div className='grid grid-cols-2 gap-2 mt-4'>
                    <button onClick={() => { setMode('text'); setMedia(null); setPreviewUrl(null); }} className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg cursor-pointer transition-colors ${mode === 'text' ? "bg-white text-black" : "bg-zinc-800 hover:bg-zinc-700"}`}>
                        <TextIcon size={18} /> Text
                    </button>

                    <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg cursor-pointer transition-colors ${mode === 'media' ? "bg-white text-black" : "bg-zinc-800 hover:bg-zinc-700"}`}>
                        <input onChange={handleMediaUpload} type="file" accept="image/*, video/*" className="hidden" />
                        <Upload size={18} /> Photo/Video
                    </label>
                </div>

                <button
                    onClick={() => toast.promise(handleCreateStory(), {
                        loading: 'Creating your story...',
                        success: (message) => <b>{message}</b>,
                        error: (err) => <b>{err.message}</b>,
                    })}
                    disabled={isCreating}
                    className='flex items-center justify-center gap-2 text-white py-3 mt-4 w-full rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed'
                >
                    <Sparkle size={18} /> {isCreating ? "Creating..." : "Create Story"}
                </button>
            </div>
        </div>
    );
};

export default StoryModal;