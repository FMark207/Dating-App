import type { Profile } from "../types/Profile"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

interface ProfileEditorProps {
    setUserInterests?: (interests: string[]) => void;
}

const ProfileEditor = ({ setUserInterests }: ProfileEditorProps) => {
    const [profile, setProfile] = useState<Profile>(() => {
        const stored = localStorage.getItem("userProfile")
        if (stored) {
            try {
                return JSON.parse(stored) as Profile
            } catch {
                // ignore parse errors and fall back to defaults
            }
        }

        return {
            name: "Patrick",
            age: 25,
            image: "prof.avif",
            location: "Nyírparasznya",
            distance: "5km away",
            bio: "Special ed nigga",
            interests: ["Travel", "Gym", "Music", "Programming", "Gaming"],
            fun_facts: ["Gemini", "At uni"],
        }
    })
    
    // Persist profile to localStorage and update parent with interests whenever they change
    useEffect(() => {
        if (setUserInterests) {
            // Convert to lowercase for matching with profile JSON
            setUserInterests(profile.interests.map((i) => i.toLowerCase()));
        }
        localStorage.setItem("userProfile", JSON.stringify(profile))
    }, [profile, setUserInterests])
    const navigate = useNavigate()
    const [editing, setEditing] = useState(false)
    const [editingBio, setEditingBio] = useState(false)
    const [newInterest, setNewInterest] = useState("")
    const [newFunFact, setNewFunFact] = useState("")
    return (
        <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "2rem",
        background: "linear-gradient(180deg, #fff4f8 0%, #ffe5e9 100%)",
      }}
    >
      {!editing && (
        <div
          style={{
            display: "flex",
            width: "clamp(320px, 90%, 440px)",
            flexDirection: "column",
            backgroundColor: "white",
            color: "#2c2c2c",
            borderRadius: "22px",
            overflow: "hidden",
            boxShadow: "0 18px 40px rgba(0,0,0,0.1)",
            fontSize: "clamp(14px, 1vw, 18px)",
            marginBottom: "1.25rem",
          }}
        >
                    <img src={profile.image} alt="" style={{ width: "100%" }} />
                    <div style={{ display: "flex", flexDirection: "column", gap: "5px", padding: "10px" }}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "1rem 0",
                                borderBottom: "1px solid rgba(0,0,0,0.08)",
                            }}
                        >
                            <div>
                                <h1 style={{ margin: 0, fontSize: "1.6rem" }}>{profile.name}</h1>
                                <p style={{ margin: 0, color: "rgba(0,0,0,0.6)", fontSize: "0.95rem" }}>
                                    {profile.age} years old
                                </p>
                            </div>
                            <img src="checklist.png" alt="Verified" style={{ width: "44px" }} />
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <img src="home.png" alt="" style={{ width: "clamp(25px, 1vw, 35px)", marginRight: "0.5rem" }} />
                            <p>Lives in {profile.location}</p>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <img src="location.png" alt="" style={{ width: "clamp(25px, 1vw, 35px)", marginRight: "0.5rem" }} />
                            <p>{profile.distance}</p>
                        </div>
                        <hr />
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "start", marginBottom: "15px" }}>
                            <h2>About me</h2>
                            <p>{profile.bio}</p>
                        </div>
                        <hr />
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "start", marginBottom: "15px" }}>
                            <h2>Interests</h2>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                {profile.interests.map((interest, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            padding: "6px 14px",
                                            borderRadius: "999px",
                                            border: "1px solid rgba(0,0,0,0.12)",
                                            backgroundColor: "rgba(255, 75, 110, 0.08)",
                                            fontSize: "0.85rem",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {interest}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <hr />
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "start", marginBottom: "15px" }}>
                            <h2>More about me</h2>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                {profile.fun_facts.map((fun_fact, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            padding: "6px 14px",
                                            borderRadius: "999px",
                                            border: "1px solid rgba(0,0,0,0.12)",
                                            backgroundColor: "rgba(255, 75, 110, 0.08)",
                                            fontSize: "0.85rem",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {fun_fact}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>)}
            {editing && (
                <div
                    style={{
                        backgroundColor: "white",
                        borderRadius: "22px",
                        overflow: "hidden",
                        padding: "1.25rem",
                        display: "flex",
                        flexDirection: "column",
                        width: "clamp(320px, 90%, 440px)",
                        boxShadow: "0 18px 40px rgba(0,0,0,0.1)",
                    }}
                >
                    <h1 style={{ margin: 0, marginBottom: "0.75rem" }}>Edit Profile</h1>
                    <div style={{ marginBottom: "10px" }}>
                        <h2>Location:</h2>
                        <input
                            type="text"
                            value={profile.location}
                            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                            style={{
                                width: "100%",
                                padding: "0.6rem 0.75rem",
                                borderRadius: "14px",
                                border: "1px solid rgba(0,0,0,0.15)",
                                outline: "none",
                                fontSize: "1rem",
                            }}
                        />
                    </div>
                    <div>
                        <h2>About me:</h2>
                        <textarea
                            value={profile.bio}
                            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                            rows={10}
                            style={{
                                width: "100%",
                                padding: "0.75rem",
                                borderRadius: "14px",
                                border: "1px solid rgba(0,0,0,0.15)",
                                outline: "none",
                                resize: "vertical",
                                fontSize: "1rem",
                            }}
                        />
                    </div>

                    <div>
                        <h2>Interests:</h2>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "2px" }}>
                            {profile.interests.map((interest, index) => (
                                <div
                                    key={index}
                                    style={{
                                        padding: "4px 12px",
                                        borderRadius: "999px",
                                        border: "1px solid #bdbdbd",
                                        backgroundColor: "#f5f5f5",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px"
                                    }}
                                >
                                    <span>{interest}</span>
                                    <button
                                        onClick={() => {
                                            setProfile({
                                                ...profile,
                                                interests: profile.interests.filter((_, i) => i !== index)
                                            })
                                        }}
                                        style={{
                                            border: "none",
                                            paddingLeft: "5px",
                                            width: "2px",
                                            background: "transparent",
                                            cursor: "pointer",
                                            fontWeight: "bold",
                                            color: "red"
                                        }}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: "8px", marginBottom: "8px", display: "flex", gap: "8px" }}>
                            <input
                                type="text"
                                value={newInterest}
                                onChange={(e) => setNewInterest(e.target.value)}
                                placeholder="Add interest"
                                style={{
                                    flex: 1,
                                    padding: "0.65rem 0.85rem",
                                    borderRadius: "14px",
                                    border: "1px solid rgba(0,0,0,0.15)",
                                    outline: "none",
                                    fontSize: "0.95rem",
                                }}
                            />
                            <button
                                onClick={() => {
                                    if (newInterest.trim() !== "") {
                                        setProfile({
                                            ...profile,
                                            interests: [
                                                ...profile.interests,
                                                newInterest.trim().charAt(0).toUpperCase() + newInterest.trim().substring(1),
                                            ],
                                        })
                                        setNewInterest("")
                                    }
                                }}
                                style={{
                                    padding: "0.7rem 1.1rem",
                                    borderRadius: "14px",
                                    border: "none",
                                    background: "#ff4b6e",
                                    color: "white",
                                    cursor: "pointer",
                                    fontWeight: 600,
                                }}
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    <div>
                        <h2>More about me:</h2>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "2px" }}>
                            {profile.fun_facts.map((fun_fact, index) => (
                                <div
                                    key={index}
                                    style={{
                                        padding: "4px 12px",
                                        borderRadius: "999px",
                                        border: "1px solid #bdbdbd",
                                        backgroundColor: "#f5f5f5",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px"
                                    }}
                                >
                                    <span>{fun_fact}</span>
                                    <button
                                        onClick={() => {
                                            setProfile({
                                                ...profile,
                                                fun_facts: profile.fun_facts.filter((_, i) => i !== index)
                                            })
                                        }}
                                        style={{
                                            border: "none",
                                            paddingLeft: "5px",
                                            width: "2px",
                                            background: "transparent",
                                            cursor: "pointer",
                                            fontWeight: "bold",
                                            color: "red"
                                        }}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: "8px", marginBottom: "8px", display: "flex", gap: "8px" }}>
                            <input
                                type="text"
                                value={newFunFact}
                                onChange={(e) => setNewFunFact(e.target.value)}
                                placeholder="Add fun fact"
                                style={{
                                    flex: 1,
                                    padding: "0.65rem 0.85rem",
                                    borderRadius: "14px",
                                    border: "1px solid rgba(0,0,0,0.15)",
                                    outline: "none",
                                    fontSize: "0.95rem",
                                }}
                            />
                            <button
                                onClick={() => {
                                    if (newFunFact.trim() !== "") {
                                        setProfile({
                                            ...profile,
                                            fun_facts: [
                                                ...profile.fun_facts,
                                                newFunFact.trim().charAt(0).toUpperCase() + newFunFact.trim().substring(1),
                                            ],
                                        })
                                        setNewFunFact("")
                                    }
                                }}
                                style={{
                                    padding: "0.7rem 1.1rem",
                                    borderRadius: "14px",
                                    border: "none",
                                    background: "#ff4b6e",
                                    color: "white",
                                    cursor: "pointer",
                                    fontWeight: 600,
                                }}
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={() => setEditing(false)}
                        style={{
                            padding: "0.75rem 1.1rem",
                            borderRadius: "14px",
                            border: "none",
                            background: "#ff4b6e",
                            color: "white",
                            cursor: "pointer",
                            fontWeight: 600,
                            marginTop: "1rem",
                            alignSelf: "flex-end",
                        }}
                    >
                        Close
                    </button>
                </div>

            )}
            {!editing && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "18px",
                        padding: "20px",
                    }}
                >

                    <button
                        style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%",
                            border: "2px solid rgba(0,0,0,0.12)",
                            backgroundColor: "white",
                            fontSize: "24px",
                            cursor: "pointer",
                            boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
                            color: "#2c2c2c",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        onClick={() => setEditing(true)}
                    >
                        ⚙
                    </button>
                    <button
                        style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%",
                            border: "none",
                            backgroundColor: "#ff4d6d",
                            fontSize: "24px",
                            cursor: "pointer",
                            boxShadow: "0 10px 20px rgba(255, 77, 109, 0.28)",
                            color: "white",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        ✕
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProfileEditor
