import Login from './assets/pages/login.jsx'
import React from 'react'
import { Routes, Route, Outlet} from 'react-router-dom'
import Feed from './assets/pages/Feed.jsx'
import Messages from './assets/pages/Messages'
import Connections from './assets/pages/Connections'
import Discover from './assets/pages/Discover'
import Profile from './assets/pages/Profile'
import CreatePost from './assets/pages/CreatePost'
import ChatBox from './assets/pages/ChatBox'
import {useUser} from '@clerk/clerk-react'
import Layout from './assets/pages/Layout.jsx'
import {Toaster} from 'react-hot-toast'



const App = () => {
  const { user } = useUser();

  return (
    <>
    <Toaster />
    <Routes>
      <Route path='/' element={ !user ? <Login /> : <Layout/> }>
      <Route index element={<Feed/>}/>
      <Route path='messages' element={<Messages/>} />
      <Route path='messages/:userId' element={<ChatBox/>} />
      <Route path='connections' element={<Connections/>} />
      <Route path='discover' element={<Discover/>} />
      <Route path='profile' element={<Profile/>} />
      <Route path='profile/:profileId' element={<Profile/>} />
      <Route path='create-post' element={<CreatePost/>} />
      </Route>
    </Routes>
    </>
  )
}

export default App
