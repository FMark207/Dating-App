import type { Profile } from "../types/Profile"
import { useState } from "react"

const ProfileEditor = () => {
    const [profile, setProfile] = useState<Profile>({
        name: "Patrick",
        age: 25,
        image: "prof.avif",
        location: "Nyírparasznya",
        distance: "5km away",
        bio: "Special ed nigga",
        interests: ["Travel", "Gym", "Music", "Programming", "Gaming"],
        fun_facts: ["Gemini", "At uni"]
    })
    const [editing, setEditing] = useState(false)
    return (
        <div style={{
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh",
            background: "linear-gradient(to bottom, #ff4b6e, #fc6717"
        }}>
            {!editing && (
                <div style={{
                    display: "flex", width: "clamp(280px, 90%, 400px)", flexDirection: "column",
                    backgroundColor: "white", color: "black", border: "2px solid black", borderRadius: "25px", overflow: "hidden",
                    fontSize: "clamp(14px, 1vw, 18px)", marginBottom: "15px"
                }}>
                    <img src={profile.image} alt="" style={{ width: "100%" }} />
                    <div style={{ display: "flex", flexDirection: "column", gap: "5px", padding: "10px" }}>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "15px" }}>
                            <h1 style={{ marginRight: "25px" }}>{profile.name}</h1>
                            <h1 style={{ marginRight: "5px" }}>{profile.age}</h1>
                            <img src="checklist.png" alt="" style={{ width: "45px" }} />
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
                                    <div key={idx} style={{
                                        padding: "4px 12px", borderRadius: "999px", border: "1px solid black",
                                        backgroundColor: "#f5f5f5", fontSize: "0.85rem", whiteSpace: "nowrap"
                                    }}>
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
                                    <div key={idx} style={{
                                        padding: "4px 12px", borderRadius: "999px", border: "1px solid black",
                                        backgroundColor: "#f5f5f5", fontSize: "0.85rem", whiteSpace: "nowrap"
                                    }}>
                                        {fun_fact}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>)}
            {editing && (
                <div style={{

                }}>
                    <h2>Edit Profile</h2>
                    <input type="text" value={profile.location} onChange={(e) =>
                        setProfile({ ...profile, location: e.target.value })
                    } />
                    <button onClick={() => setEditing(false)}>Close</button>
                </div>

            )}
            {!editing && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "20px",
                        padding: "20px"
                    }}
                >
                    
                    <button
                        style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%",
                            border: "none",
                            backgroundColor: "white",
                            fontSize: "24px",
                            cursor: "pointer",
                            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                            color: "#2ecc71",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        ✔
                    </button>

                    <button
                        style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%",
                            border: "none",
                            backgroundColor: "white",
                            fontSize: "24px",
                            cursor: "pointer",
                            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                            color: "#2c2c2c",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
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
                            backgroundColor: "white",
                            fontSize: "24px",
                            cursor: "pointer",
                            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                            color: "#ff4d6d",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        ✕
                    </button>                    
                </div>)}
        </div>
    )
}

export default ProfileEditor
