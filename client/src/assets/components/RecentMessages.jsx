import React, { useEffect, useState } from 'react';
import { dummyRecentMessagesData } from '../assets';
// FIX 2: Imported 'Link' from react-router-dom
import { Link } from 'react-router-dom';
import moment from 'moment';

const RecentMessages = () => {
    const [messages, setMessages] = useState([]);

    const fetchRecentMessages = async () => {
        setMessages(dummyRecentMessagesData);
    };

    useEffect(() => {
        fetchRecentMessages();
    }, []);

    // FIX 1: Removed the outer <div> and nested 'return'
    return (
        // Note: This component provides its own card styling.
        // If the parent component (Feed) also provides card styling,
        // you might have a nested card.
        <div className='max-w-xs p-4 min-h-20 text-xs text-slate-800'>
            {/* FIX 4: Corrected 'text-slate-8' to 'text-slate-800' */}
            <h3 className='font-semibold text-slate-800 mb-4'>Recent Messages</h3>
            <div className='flex flex-col max-h-56 overflow-y-scroll no-scrollbar'>
                {messages.map((message, index) => (
                    // FIX 3: Added a 'to' prop to the Link component
                    // Using '#' as a placeholder, update this to your actual chat route
                    <Link
                        key={index}
                        to={`/messages/${message.from_user_id._id || index}`} // Use a real ID or index
                        className='flex items-start gap-2 py-2 hover:bg-slate-100'
                    >
                        <img
                            src={message.from_user_id.profile_picture}
                            alt={message.from_user_id.full_name}
                            className='w-8 h-8 rounded-full'
                        />
                        <div className='w-full'>
                            <div className='flex justify-between'>
                                <p className='font-medium'>{message.from_user_id.full_name}</p>
                                <p className='text-[10px] text-slate-400'>
                                    {moment(message.createdAt).fromNow()}
                                </p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-gray-500'>
                                    {message.text ? message.text : 'Media'}
                                </p>
                                {!message.seen && (
                                    <p className='bg-indigo-500 text-white w-4 h-4 flex items-center justify-center rounded-full text-[10px]'>
                                        1
                                    </p>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

// FIX 5: Corrected the export name typo
export default RecentMessages;