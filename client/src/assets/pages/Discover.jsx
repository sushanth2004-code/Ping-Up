import React, { useState } from 'react';
import { Search } from 'lucide-react'; // Assuming you use lucide-react for icons
import { dummyConnectionsData } from '../assets';
import UserCard from '../components/UserCard'; // Make sure to import UserCard
import Loading from '../components/Loading';   // Make sure to import Loading

const Discover = () => {
  const [input, setInput] = useState('');
  const [users, setUsers] = useState(dummyConnectionsData);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setLoading(true);
      setUsers([]); // Clear current users to show loading state

      // Simulate an API call delay
      setTimeout(() => {
        if (input.trim() === '') {
          // If search is empty, show all users again
          setUsers(dummyConnectionsData);
        } else {
          // Filter users based on the input text (case-insensitive)
          const searchLower = input.toLowerCase();
          const filteredUsers = dummyConnectionsData.filter(user =>
            user.name.toLowerCase().includes(searchLower) ||
            user.username.toLowerCase().includes(searchLower) ||
            (user.bio && user.bio.toLowerCase().includes(searchLower)) ||
            (user.location && user.location.toLowerCase().includes(searchLower))
          );
          setUsers(filteredUsers);
        }
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
      <div className='max-w-6xl mx-auto p-6'> {/* Corrected: max-w-6xl */}
        {/* Title */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-slate-900 mb-2'>Discover People</h1>
          <p className='text-slate-600'>Connect with amazing people and grow your network</p>
        </div>

        {/* Search */}
        <div className='mb-8 shadow-md rounded-md border border-slate-200/60 bg-white/80'>
          <div className='p-6'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5' />
              <input
                type="text"
                placeholder='Search people by name, username, bio, or location...'
                className='pl-10 sm:pl-12 py-2 w-full border border-gray-300 rounded-md max-sm:text-sm' /* Corrected: sm:pl-12 */
                onChange={(e) => setInput(e.target.value)}
                value={input}
                onKeyUp={handleSearch}
              />
            </div>
          </div>
        </div>

        {/* User Cards */}
        <div className='flex flex-wrap gap-6'>
          {users.map((user) => (
            <UserCard user={user} key={user._id} />
          ))}
        </div>

        {/* Loading State */}
        {loading && <Loading height='60vh' />} {/* Corrected: Removed extra space and dangling 'l' prop */}

        {/* No Results Message */}
        {!loading && users.length === 0 && (
          <div className='text-center w-full py-10'>
            <p className='text-slate-500'>No users found. Try a different search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;
