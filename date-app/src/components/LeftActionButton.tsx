import { useLocation, useNavigate } from "react-router-dom"

const LeftActionButton = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const isOnSwipe = location.pathname === "/swipe"

  // If you're not on the swipe page, show the "Go to swipe" button.
  // If you are on the swipe page, show the "Go to account" button.
  const label = isOnSwipe ? "Go to profile" : "Go to swipe"
  const emoji = isOnSwipe ? "👤" : "💘"
  const target = isOnSwipe ? "/" : "/swipe"

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => navigate(target)}
      style={{
        position: "fixed",
        bottom: 24,
        left: 24,
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
        boxShadow: "0 7px 18px rgba(0,0,0,0.18)",
        zIndex: 9999,
      }}
    >
      <span style={{ fontSize: "1.25rem", lineHeight: 1 }}>{emoji}</span>
    </button>
  )
}

export default LeftActionButton
