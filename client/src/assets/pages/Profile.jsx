import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import UserProfileInfo from '../components/UserProfileInfo'
import Loading from '../components/Loading'
import moment from 'moment'
import PostCard from '../components/PostCard'
import { dummyPostsData, dummyUserData } from '../assets'
import ProfileModal from '../components/ProfileModal'

const Profile = () => {
  const { profileId } = useParams()
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [activeTab, setActiveTab] = useState('media')
  const [showEdit, setShowEdit] = useState(false)

  useEffect(() => {
    // Load dummy data (in a real app, fetch from backend)
    setUser(dummyUserData)
    setPosts(dummyPostsData)
  }, [profileId])

  if (!user) return <Loading />

  return (
    <div className="relative h-full overflow-y-scroll bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          {/* Cover Photo */}
          <div className="h-48 md:h-64 relative">
            {user.cover_photo ? (
              <img
                src={user.cover_photo}
                alt="cover"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200" />
            )}

            {/* Profile Image */}
            <div className="absolute -bottom-14 left-8">
              <img
                src={user.profile_photo}
                alt="profile"
                className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-lg"
              />
            </div>
          </div>

          {/* User Info */}
          <div className="pt-16 pb-6 px-8">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  {user.name}
                  {user.isVerified && (
                    <span className="text-blue-500 text-lg">✔</span>
                  )}
                </h2>
                <p className="text-gray-600">@{user.username}</p>
              </div>
              <button
                onClick={() => setShowEdit(true)}
                className="px-4 py-1 border rounded-lg text-sm font-medium hover:bg-gray-100 transition"
              >
                Edit
              </button>
            </div>

            <p className="mt-3 text-gray-700">
              {user.bio || 'Dreamer ✨ | Learner 📚 | Doer 🚀'}
            </p>

            <div className="flex gap-4 mt-4 text-sm text-gray-500">
              <span>📍 {user.location || 'New York, NY'}</span>
              <span>🕓 Joined {moment(user.joinedAt || new Date()).fromNow()}</span>
            </div>

            {/* Stats */}
            <div className="flex gap-6 mt-4 text-sm font-medium text-gray-700">
              <span><strong>{posts.length}</strong> Posts</span>
              <span><strong>2</strong> Followers</span>
              <span><strong>2</strong> Following</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow p-1 flex max-w-md mx-auto">
            {['posts', 'media', 'likes'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${
                  activeTab === tab
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Posts Tab */}
          {activeTab === 'posts' && (
            <div className="mt-6 flex flex-col items-center gap-6">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}

          {/* Media Tab */}
          {activeTab === 'media' && (
            <div className="flex flex-wrap mt-6 gap-4 justify-center">
              {posts
                .filter((p) => p.image_urls?.length)
                .flatMap((p) =>
                  p.image_urls.map((image, idx) => (
                    <Link
                      to={image}
                      key={`${p._id}-${idx}`}
                      target="_blank"
                      className="relative group rounded-lg overflow-hidden"
                    >
                      <img
                        src={image}
                        alt="media"
                        className="w-64 h-40 object-cover rounded-lg"
                      />
                      <p className="absolute bottom-0 right-0 text-xs px-2 py-1 backdrop-blur-md bg-black/40 text-white opacity-0 group-hover:opacity-100 transition">
                        Posted {moment(p.createdAt).fromNow()}
                      </p>
                    </Link>
                  ))
                )}
            </div>
          )}

          {/* Likes Tab */}
          {activeTab === 'likes' && (
            <p className="text-center mt-10 text-gray-500">
              You haven’t liked any posts yet 💬
            </p>
          )}
        </div>
      </div>

      {/* Profile Edit Modal */}
      {showEdit && <ProfileModal setShowEdit={setShowEdit} />}
    </div>
  )
}

export default Profile
