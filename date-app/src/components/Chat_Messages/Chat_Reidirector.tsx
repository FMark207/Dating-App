import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const ChatRedirector = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)

  // Hide the button when we are already on the chat page
  if (location.pathname === "/chat") {
    return null
  }

  return (
    <button
      type="button"
      aria-label="Go to chat"
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: "50%",
        border: "2px solid #cc3b5b",
        backgroundColor: "#ff4b6e",
        color: "white",
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        outline: "none",
        boxShadow: hovered ? "0 14px 28px rgba(0,0,0,0.25)" : "0 7px 18px rgba(0,0,0,0.18)",
        transform: pressed ? "scale(0.92)" : hovered ? "scale(1.06)" : "scale(1)",
        transition: "transform 160ms ease, box-shadow 160ms ease",
        zIndex: 9999,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        setPressed(false)
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onClick={() => navigate("/chat")}
    >
      <span
        style={{
          fontSize: "1.25rem",
          lineHeight: 1,
          transform: pressed ? "scale(0.85)" : "scale(1)",
          transition: "transform 120ms ease",
        }}
      >
        ♥
      </span>
    </button>
  )
}

export default ChatRedirector
