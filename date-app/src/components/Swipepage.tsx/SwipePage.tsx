import { useEffect, useState } from "react";
import type { DatingProfile } from "./profile.model";
import "./SwipePage.css";

// Accept userInterests as a prop (string[])
interface SwipePageProps {
  userInterests: string[];
}

interface ProfileWithMatch extends DatingProfile {
  matchPercentage: number;
  matchingInterests: string[];
}

export default function SwipePage({ userInterests }: SwipePageProps) {
  const [profiles, setProfiles] = useState<ProfileWithMatch[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchedProfile, setMatchedProfile] = useState<ProfileWithMatch | null>(null);
  const [showMatch, setShowMatch] = useState(false);

  useEffect(() => {
    async function loadProfiles() {
      const res = await fetch("/profiles.json");
      const data: DatingProfile[] = await res.json();

      // Get user interests from localStorage or use the prop as fallback
      let userProfileInterests = userInterests;
      const storedProfile = localStorage.getItem("userProfile");
      if (storedProfile) {
        try {
          const parsedProfile = JSON.parse(storedProfile);
          if (parsedProfile.interests && Array.isArray(parsedProfile.interests)) {
            userProfileInterests = parsedProfile.interests.map((i: string) => i.toLowerCase());
          }
        } catch (e) {
          console.log("Could not parse stored profile, using prop interests");
        }
      }

      // Calculate match percentage and filter profiles
      const profilesWithMatch = data
        .map((profile) => {
          // Find matching interests (case-insensitive)
          const matchingInterests = profile.interests.filter(interest =>
            userProfileInterests.some(userInt => userInt.toLowerCase() === interest.toLowerCase())
          );

          // Calculate match percentage
          const maxInterests = Math.max(profile.interests.length, userProfileInterests.length);
          const matchPercentage = maxInterests > 0 
            ? Math.round((matchingInterests.length / maxInterests) * 100)
            : 0;

          return {
            ...profile,
            matchPercentage,
            matchingInterests
          };
        })
        .sort((a, b) => b.matchPercentage - a.matchPercentage); // Sort by match percentage descending

      setProfiles(profilesWithMatch);
    }
    loadProfiles();
  }, [userInterests]);

  if (profiles.length === 0) return <div style={{
    display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh",
    background: "linear-gradient(to bottom, #ff4b6e, #fc6717)",
    fontSize: "18px"
  }}>No matching profiles...</div>;

  if (currentIndex >= profiles.length) return <div style={{
    display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh",
    background: "linear-gradient(to bottom, #ff4b6e, #fc6717)",
    fontSize: "18px"
  }}>No more profiles</div>;

  const currentProfile = profiles[currentIndex];

  function handleChoice(choice: "smash" | "pass") {
    console.log(`${choice} -> ${currentProfile.name} (${currentProfile.matchPercentage}% match)`);
    
    if (choice === "smash" && currentProfile.isMatched) {
      setMatchedProfile(currentProfile);
      setShowMatch(true);
      setTimeout(() => {
        setShowMatch(false);
        setCurrentIndex(currentIndex + 1);
      }, 2000);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }

  // Determine color based on match percentage
  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return "#00c851"; // Green for high match
    if (percentage >= 60) return "#ffbb33"; // Orange for medium match
    if (percentage >= 40) return "#ff8800"; // Darker orange for low-medium match
    return "#ff4b6e"; // Pink for low match
  };

  return (
    <div style={{
      display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh",
      background: "linear-gradient(to bottom, #ff4b6e, #fc6717"
    }}>
      {showMatch && matchedProfile && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
          background: "rgba(0, 0, 0, 0.7)", zIndex: 1000
        }}>
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            backgroundColor: "white", padding: "40px", borderRadius: "25px",
            textAlign: "center"
          }}>
            <h1 style={{ fontSize: "48px", color: "#ff4b6e", marginBottom: "20px" }}>🎉 It's a Match! 🎉</h1>
            <p style={{ fontSize: "24px", marginBottom: "10px" }}>You and {matchedProfile.name} liked each other!</p>
            <p style={{ fontSize: "20px", marginBottom: "20px", color: getMatchColor(matchedProfile.matchPercentage) }}>
              {matchedProfile.matchPercentage}% Compatible
            </p>
            <img src={matchedProfile.image} alt={matchedProfile.name} style={{
              width: "150px", height: "150px", borderRadius: "50%", objectFit: "cover"
            }} />
          </div>
        </div>
      )}
      
      <div style={{
        display: "flex", width: "clamp(280px, 90%, 400px)", flexDirection: "column",
        backgroundColor: "white", color: "black", border: "2px solid black", borderRadius: "25px", overflow: "hidden",
        fontSize: "clamp(14px, 1vw, 18px)", marginBottom: "15px"
      }}>
        <div style={{ position: "relative" }}>
          <img src={currentProfile.image} alt={currentProfile.name} style={{ width: "100%", display: "block" }} />
          {/* Match percentage badge */}
          <div style={{
            position: "absolute", top: "10px", right: "10px",
            backgroundColor: getMatchColor(currentProfile.matchPercentage),
            color: "white", padding: "8px 16px", borderRadius: "20px",
            fontSize: "16px", fontWeight: "bold"
          }}>
            {currentProfile.matchPercentage}%
          </div>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "5px", padding: "10px" }}>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "15px" }}>
            <h1 style={{ marginRight: "25px" }}>{currentProfile.name}</h1>
            <h1 style={{ marginRight: "5px" }}>{currentProfile.age}</h1>
            <img src="checklist.png" alt="" style={{ width: "45px" }} />
          </div>
          <p>{currentProfile.shortDescription}</p>
          <hr />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "start", marginBottom: "15px" }}>
            <h2>All Interests</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {currentProfile.interests.length > 0 ? (
                currentProfile.interests.map((interest, idx) => {
                  const isMatching = currentProfile.matchingInterests.includes(interest);
                  return (
                    <div key={idx} style={{
                      padding: "4px 12px", borderRadius: "999px", 
                      border: isMatching ? "1px solid #ff4b6e" : "1px solid #ccc",
                      backgroundColor: isMatching ? "#ffe0e6" : "#f5f5f5", 
                      fontSize: "0.85rem", whiteSpace: "nowrap", 
                      color: isMatching ? "#ff4b6e" : "#666", 
                      fontWeight: isMatching ? "bold" : "normal"
                    }}>
                      {interest}
                    </div>
                  );
                })
              ) : (
                <p style={{ fontSize: "0.9rem", color: "#999" }}>No interests listed</p>
              )}
            </div>
          </div>
          <hr />
          <div style={{ display: "flex", flexDirection: "row", gap: "10px", justifyContent: "center" }}>
            <button onClick={() => handleChoice("pass")} style={{
              flex: 1, padding: "10px", borderRadius: "10px", border: "none", backgroundColor: "#ff4b6e",
              color: "white", fontSize: "16px", fontWeight: "bold", cursor: "pointer"
            }}>Pass</button>
            <button onClick={() => handleChoice("smash")} style={{
              flex: 1, padding: "10px", borderRadius: "10px", border: "none", backgroundColor: "#fc6717",
              color: "white", fontSize: "16px", fontWeight: "bold", cursor: "pointer"
            }}>Smash</button>
          </div>
        </div>
      </div>
    </div>
  );
}