import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import type { Profile } from "../../types/Profile"
import ChatProfile from "./ChatProfile"

const ChatMessages = () => {
  const navigate = useNavigate()
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const MATCHED_IDS_KEY = "matchedProfileIds"

  const getMatchedIds = () => {
    try {
      return JSON.parse(localStorage.getItem(MATCHED_IDS_KEY) ?? "[]") as string[]
    } catch {
      return []
    }
  }

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetch("/profiles.json")
      .then((res) => res.json())
      .then((data: Profile[]) => {
        const matchedIds = getMatchedIds()
        const matchedProfiles = data
          .map((profile) => ({
            ...profile,
            isMatched: profile.id ? matchedIds.includes(profile.id) : profile.isMatched,
          }))
          .filter((profile) => profile.isMatched)

        setProfiles(matchedProfiles)
      })
      .catch((err) => {
        console.error(err)
        setError("Could not load chat profiles.")
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        background: "linear-gradient(180deg, #ffe5e9 0%, #ffffff 100%)",
        color: "#2c2c2c",
      }}
    >
      <h1>Chat</h1>
      <p style={{ margin: 0 }}>
        Pick a profile to start a chat. Click the heart button anytime to come back.
      </p>

      {loading && <p>Loading profiles…</p>}
      {error && <p style={{ color: "#c9163b" }}>{error}</p>}

      {!loading && !error && profiles.length === 0 && (
        <p style={{ color: "rgba(0,0,0,0.65)", fontStyle: "italic" }}>
          No matches yet — swipe in the app to find someone to chat with!
        </p>
      )}

      {!loading && !error && profiles.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1rem",
            width: "100%",
          }}
        >
          {profiles.map((profile, index) => (
            <ChatProfile
              key={profile.id ?? profile.name + index}
              profile={profile}
              lastMessage={profile.chatGame?.message ?? "Tap to open chat"}
              onSelect={() => navigate(`/chat/${profile.id ?? index}`, { state: { profile } })}
            />
          ))}
        </div>
      )}

      <button
        onClick={() => navigate("/")}
        style={{
          alignSelf: "flex-start",
          padding: "0.65rem 1rem",
          borderRadius: "999px",
          border: "2px solid #ff4b6e",
          background: "white",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        Back to profile
      </button>
    </div>
  )
}

export default ChatMessages
