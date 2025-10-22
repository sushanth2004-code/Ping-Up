import React, { useEffect, useRef, useState } from 'react'
import { dummyUserData, dummyMessagesData } from '../assets' // Assuming these are correctly imported
import { ImageIcon, SendHorizonal } from 'lucide-react'

const ChatBox = () => {
  // NOTE: You are currently importing dummyMessagesData and not adding new messages to it.
  // In a real app, 'messages' would likely be a state variable like:
  // const [messages, setMessages] = useState(dummyMessagesData);
  const messages = dummyMessagesData

  const [text, setText] = useState('')
  const [image, setImage] = useState(null)
  const [user, setUser] = useState(dummyUserData)
  const messagesEndRef = useRef(null)

  const sendMessage = async () => {
    // This is where your message sending logic would go.
    // For now, let's just clear the input fields
    console.log('Sending message:', { text, image })
    setText('')
    setImage(null)
  }

  // Scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Fix 1: Removed extra ')' after className in <img> tag.
  return user && (
    <div className='flex flex-col h-screen'>
      <div className='flex items-center gap-2 p-2 md:px-10 xl:p1-42
bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-300'>
        <img src={user.profile_picture} alt="" className="size-8 rounded-full" />
        <div>
          <p className="font-medium">{user.full_name}</p>
          <p className="text-sm text-gray-500 -mt-1.5">@{user.username}</p>
        </div>
      </div>

      <div className='p-5 md:px-10 h-full overflow-y-scroll'>
        <div className='space-y-4 max-w-4xl mx-auto'>
          {
            // Fix 2: Corrected line break in .toSorted() call and fixed syntax issue with curly brace
            messages.toSorted((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
              .map((message, index) => (
                // Fix 3: Removed an unnecessary closing curly brace '}'
                <div key={index} className={`flex flex-col ${message.to_user_id !==
                  user._id ? 'items-start' : 'items-end'}`}>
                  {/* Fix 4: Removed an unnecessary closing curly brace '}' and fixed typo 'rounded-1g' to 'rounded-lg' */}
                  <div className={`p-2 text-sm max-w-sm bg-white text-slate-700 rounded-lg shadow ${message.to_user_id !== user._id ?
                    'rounded-bl-none' : 'rounded-br-none'}`}>
                    {
                      message.message_type === 'image' && <img src={message.media_url}
                        className='w-full max-w-sm rounded-lg mb-1' alt="" />
                    }
                    <p>{message.text}</p>
                  </div>
                </div>
              ))
          }
          <div ref={messagesEndRef} />
        </div>
      </div>
      {/* Fix 5: Added closing </div> for the outer chat messages container */}
      <div className='px-4'>
        <div className='flex items-center gap-3 pl-5 p-1.5 bg-white w-full
max-w-xl mx-auto border border-gray-200 shadow rounded-full mb-5'>
          {/* Fix 6: Corrected line break in onChange handler */}
          <input type="text" className='flex-1 outline-none text-slate-700'
            placeholder='Type a message...'
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            onChange={(e) => setText(e.target.value)}
            value={text} />

          {/* Fix 7: Removed the first redundant <label> block that contained only a hidden <input type="file" /> */}
          <label htmlFor="image">
            {
              image
                ? <img src={URL.createObjectURL(image)} alt="Preview" className='h-8 rounded' />
                : <ImageIcon className='size-7 text-gray-400 cursor-pointer' />
            }
            <input
              type="file"
              id='image'
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <button
            onClick={sendMessage}
            // Fix 8: Corrected typo in Tailwind CSS class: 'hover: to-purple-800' to 'hover:to-purple-800'
            className='bg-gradient-to-br
            from-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-800 active:scale-95 cursor-pointer text-white p-2 rounded-full'
            disabled={!text.trim() && !image} // Optional: Disable button if no text/image
          >
            <SendHorizonal size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatBox