import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, UserPlus, UserCheck, UserRoundPen, MessageSquare } from 'lucide-react';
import {
  dummyConnectionsData as connections,
  dummyFollowersData as followers,
  dummyFollowingData as following,
  dummyPendingConnectionsData as pendingConnections
} from '../../assets/assets.js';

const Connections = () => {
  const [currentTab, setCurrentTab] = React.useState('Followers');
  const navigate = useNavigate();

  const dataArray = [
    { label: 'Followers', value: followers, icon: Users },
    { label: 'Following', value: following, icon: UserCheck },
    { label: 'Pending', value: pendingConnections, icon: UserRoundPen },
    { label: 'Connections', value: connections, icon: UserPlus },
  ];

  // Find the data for the currently active tab
  const currentData = dataArray.find(item => item.label === currentTab)?.value || [];

  return (
    <div className='min-h-screen bg-slate-50'>
      <div className='max-w-6xl mx-auto p-6'>
        {/* Title */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-slate-900 mb-2'>Connections</h1>
          <p className='text-slate-600'>Manage your network and discover new connections.</p>
        </div>

        {/* Counts */}
        <div className='mb-8 grid grid-cols-2 md:grid-cols-4 gap-4'>
          {dataArray.map((item, index) => (
            <div key={index} className='flex flex-col items-center justify-center p-4 border border-gray-200 bg-white shadow-sm rounded-lg'>
              <b className='text-2xl font-bold text-slate-800'>{item.value.length}</b>
              <p className='text-sm text-slate-600'>{item.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className='mb-8 border-b border-gray-200'>
          <div className='flex items-center gap-2 flex-wrap'>
            {dataArray.map((tab) => (
              <button
                onClick={() => setCurrentTab(tab.label)}
                key={tab.label}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-md transition-colors focus:outline-none ${currentTab === tab.label
                    ? 'border-b-2 border-indigo-600 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-800'
                  }`}
              >
                <tab.icon className='w-5 h-5' />
                <span>{tab.label}</span>
                <span className={`px-2 py-0.5 text-xs rounded-full ${currentTab === tab.label
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-gray-100 text-gray-600'
                  }`}>
                  {tab.value.length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* User Cards Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {currentData.length > 0 ? currentData.map((user) => (
            <div key={user._id} className='w-full bg-white shadow rounded-lg p-6 flex flex-col'>
              <div className="flex items-center gap-4 mb-4">
                <img src={user.profile_picture} alt={user.full_name} className="rounded-full w-14 h-14 object-cover" />
                <div className='flex-1'>
                  <p className="font-semibold text-slate-800">{user.full_name}</p>
                  <p className="text-sm text-slate-500">@{user.username}</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 flex-grow">{user.bio.slice(0, 80)}...</p>

              <div className='flex flex-col gap-2 mt-auto'>
                {/* Always show View Profile button except for Pending tab */}
                {currentTab !== 'Pending' && (
                  <button onClick={() => navigate(`/profile/${user._id}`)}
                    className='w-full p-2 text-sm rounded bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition text-white cursor-pointer'>
                    View Profile
                  </button>
                )}

                {/* Conditional Buttons */}
                {currentTab === 'Following' && (
                  <button className='w-full p-2 text-sm rounded bg-slate-100 hover:bg-slate-200 text-black active:scale-95 transition cursor-pointer'>
                    Unfollow
                  </button>
                )}
                {currentTab === 'Pending' && (
                  <button className='w-full p-2 text-sm rounded bg-green-500 hover:bg-green-600 text-white active:scale-95 transition cursor-pointer'>
                    Accept
                  </button>
                )}
                {currentTab === 'Connections' && (
                  <button onClick={() => navigate(`/messages/${user._id}`)} className='w-full p-2 text-sm rounded bg-slate-100 hover:bg-slate-200 text-black active:scale-95 transition cursor-pointer flex items-center justify-center gap-2'>
                    <MessageSquare className='w-4 h-4' />
                    Message
                  </button>
                )}
              </div>
            </div>
          )) : (
            <div className='col-span-full text-center py-12 bg-white border border-gray-200 rounded-lg'>
              <p className='text-slate-500'>No users to display in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Connections;

