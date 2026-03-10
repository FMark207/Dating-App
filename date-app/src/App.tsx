import { Routes, Route } from "react-router-dom"
import ProfileEditor from "./components/ProfileEditor"
import ChatMessages from "./components/Chat_Messages/ChatMessages"
import ChatAction from "./components/Chat_Messages/ChatAction"
import ChatRedirector from "./components/Chat_Messages/Chat_Reidirector"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProfileEditor />} />
        <Route path="/chat" element={<ChatMessages />} />
        <Route path="/chat/:id" element={<ChatAction />} />
      </Routes>
      <ChatRedirector />
    </>
  )
}

export default App
