import React from 'react'
import { UserPlus, MessageCircle, MapPin } from 'lucide-react'
import { dummyUserData } from '../assets';

// Assuming dummyUserData and user prop structure are correct

const UserCard = ({ user }) => {
    // NOTE: Ensure 'dummyUserData' is correctly imported and available.
    // I'm assuming 'currentUser' is the logged-in user's data.
    const currentUser = dummyUserData 

    const handleFollow = async () => {
        // Implement follow logic here
        console.log(`Attempting to follow user: ${user.full_name}`)
    }

    const handleConnectionRequest = async () => {
        // Implement connection/message logic here
        console.log(`Connection/Message action for user: ${user.full_name}`)
    }

    // Determine the text and state for the Connection/Message button
    const isConnected = currentUser?.connections.includes(user._id);
    const connectionButtonText = isConnected ? 'Message' : 'Connect';
    const connectionButtonIcon = isConnected ? 
        <MessageCircle className='w-5 h-5 transition' /> : 
        <UserPlus className='w-5 h-5 transition' />;
    const connectionButtonClass = `
        flex items-center justify-center 
        flex-1 py-2 
        border border-gray-300 
        text-slate-500 
        hover:border-indigo-500 hover:text-indigo-500
        rounded-md 
        cursor-pointer 
        active:scale-95 
        transition
    `;

    // Determine the text and state for the Follow button
    const isFollowing = currentUser?.following.includes(user._id);
    const followButtonText = isFollowing ? 'Following' : 'Follow';
    const followButtonClass = `
        flex-1 py-2 rounded-md 
        flex justify-center items-center gap-2 
        ${isFollowing 
            ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
            : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white cursor-pointer'
        }
        active:scale-95 transition
    `;

    return (
        // Added margin-top to the overall card container
        <div key={user._id} className='p-4 pt-6 flex flex-col justify-between w-72 shadow border border-gray-200 rounded-md'>
            <div className='text-center'>
                <img src={user.profile_picture} alt="" className='rounded-full w-16 shadow-md mx-auto' />
                <p className='mt-4 font-semibold'>{user.full_name}</p>
                {user.username && <p className='text-gray-500 font-light'>@{user.username}</p>}
                {user.bio && <p className='text-gray-600 mt-2 text-center text-sm px-4'>{user.bio}</p>}
            </div>

            {/* Location and Followers Info */}
            <div className='flex items-center justify-center gap-2 mt-4 mb-4 text-xs text-gray-600'>
                <div className='flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1'>
                    <MapPin className='w-4 h-4' /> {user.location}
                </div>
                <div className='flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1'>
                    {/* Fallback to 0 if followers array is not present */}
                    <span>{user.followers?.length || 0}</span> Followers
                </div>
            </div>

            {/* Action Buttons Container */}
            <div className='flex gap-2'> 
                {/* Follow Button */}
                <button 
                    onClick={handleFollow} 
                    disabled={isFollowing} 
                    className={followButtonClass}
                >
                    <UserPlus className='w-4 h-4' /> {followButtonText}
                </button>

                {/* Connection Request / Message Button */}
                <button 
                    onClick={handleConnectionRequest} 
                    className={connectionButtonClass}
                    title={connectionButtonText} // Added title for accessibility
                >
                    {connectionButtonIcon}
                </button>
            </div>
        </div>
    );
}

export default UserCard;