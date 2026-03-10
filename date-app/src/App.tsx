import { Routes, Route } from "react-router-dom"
import { useState } from "react"
import ProfileEditor from "./components/ProfileEditor"
import ChatMessages from "./components/Chat_Messages/ChatMessages"
import ChatAction from "./components/Chat_Messages/ChatAction"
import ChatRedirector from "./components/Chat_Messages/Chat_Reidirector"
import SwipePage from "./components/Swipepage.tsx/SwipePage"
import LeftActionButton from "./components/LeftActionButton"

function App() {
  const [userInterests, setUserInterests] = useState<string[]>(["hiking", "music", "design"])

  return (
    <>
      <Routes>
        <Route path="/" element={<ProfileEditor setUserInterests={setUserInterests} />} />
        <Route path="/swipe" element={<SwipePage userInterests={userInterests} />} />
        <Route path="/chat" element={<ChatMessages />} />
        <Route path="/chat/:id" element={<ChatAction />} />
      </Routes>
      <ChatRedirector />
      <LeftActionButton />
    </>
  )
}

export default App
