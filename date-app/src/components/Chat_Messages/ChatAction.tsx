import { useLocation, useNavigate, useParams } from "react-router-dom"
import type { Profile } from "../../types/Profile"

const ChatAction = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams<{ id: string }>()

  const incoming = location.state as { profile?: Profile } | null
  const profile = incoming?.profile

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "1.5rem",
        background: "linear-gradient(180deg, #fff4f8 0%, #ffe5e9 100%)",
        color: "#2c2c2c",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          width: "fit-content",
          border: "none",
          padding: "0.5rem 0.8rem",
          borderRadius: "999px",
          background: "rgba(255, 75, 110, 0.18)",
          cursor: "pointer",
          fontWeight: 600,
          color: "#c9163b",
        }}
      >
        ← Back
      </button>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          padding: "1rem",
          borderRadius: "18px",
          background: "white",
          boxShadow: "0 10px 22px rgba(0,0,0,0.08)",
        }}
      >
        <img
          src={profile?.image ?? "prof.avif"}
          alt={profile?.name ?? "Chat member"}
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid rgba(255,75,110,0.65)",
          }}
        />
        <div>
          <h2 style={{ margin: 0 }}>{profile?.name ?? `Chat member ${params.id ?? ""}`}</h2>
          <p style={{ margin: 0, color: "rgba(0,0,0,0.6)" }}>
            {profile ? profile.bio : "No member data provided – go back and select a profile."}
          </p>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          borderRadius: "18px",
          background: "white",
          padding: "1rem",
          boxShadow: "0 9px 20px rgba(0,0,0,0.06)",
        }}
      >
        <p style={{ color: "rgba(0,0,0,0.55)", margin: 0 }}>
          Chat area coming soon — this is where you’ll see message bubbles for {profile?.name ?? "your match"}.
        </p>
      </div>
    </div>
  )
}

export default ChatAction
