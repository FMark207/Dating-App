import type { Profile } from "../../types/Profile"

type Props = {
  profile: Profile
  lastMessage?: string
  onSelect: () => void
}

const ChatProfile = ({ profile, lastMessage, onSelect }: Props) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      style={{
        width: "100%",
        padding: "0.75rem 1rem",
        borderRadius: "16px",
        border: "1px solid rgba(0,0,0,0.12)",
        background: "rgba(255,255,255,0.92)",
        boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
        cursor: "pointer",
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        transition: "transform 140ms ease, box-shadow 140ms ease",
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"
        ;(e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 26px rgba(0,0,0,0.12)"
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"
        ;(e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 16px rgba(0,0,0,0.08)"
      }}
    >
      <img
        src={profile.image}
        alt={profile.name}
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          objectFit: "cover",
          border: "2px solid rgba(255,75,110,0.6)",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontWeight: 700, fontSize: "1rem" }}>{profile.name}</span>
          <span style={{ color: "rgba(0,0,0,0.45)", fontSize: "0.85rem" }}>
            {profile.distance}
          </span>
        </div>
        <span style={{ color: "rgba(0,0,0,0.55)", fontSize: "0.9rem" }}>
          {lastMessage ?? profile.bio}
        </span>
      </div>
    </button>
  )
}

export default ChatProfile
