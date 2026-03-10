import { useNavigate } from "react-router-dom"
import type { Profile } from "../../types/Profile"
import ChatProfile from "./ChatProfile"

const profiles: Profile[] = [
  {
    name: "Ava",
    age: 26,
    image: "prof.avif",
    location: "Los Angeles",
    distance: "2 km away",
    bio: "Coffee enthusiast and movie buff.",
    interests: ["Hiking", "Films", "Cooking"],
    fun_facts: ["Has a dog named Mochi", "Knows 3 languages"],
  },
  {
    name: "Jordan",
    age: 28,
    image: "prof.avif",
    location: "Brooklyn",
    distance: "4 km away",
    bio: "Design nerd who loves late-night tacos.",
    interests: ["Design", "Music", "Skateboarding"],
    fun_facts: ["Used to DJ", "Collects sneakers"],
  },
  {
    name: "Taylor",
    age: 24,
    image: "prof.avif",
    location: "Queens",
    distance: "3 km away",
    bio: "Always planning the next adventure.",
    interests: ["Travel", "Photography", "Yoga"],
    fun_facts: ["Has been to 20 countries", "Loves sunrise runs"],
  },
]

const ChatMessages = () => {
  const navigate = useNavigate()

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
            key={profile.name + index}
            profile={profile}
            lastMessage={`Hey! I loved your profile, ${profile.name}.`}
            onSelect={() => navigate(`/chat/${index}`, { state: { profile } })}
          />
        ))}
      </div>

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
