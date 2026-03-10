
import { useEffect, useState } from "react";
import type { DatingProfile } from "./profile.model";
import "./SwipePage.css";

// Accept userInterests as a prop (string[])
interface SwipePageProps {
  userInterests: string[];
}

export default function SwipePage({ userInterests }: SwipePageProps) {
  const [profiles, setProfiles] = useState<(DatingProfile & { image: string })[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function loadProfiles() {
      const res = await fetch("/profiles.json");
      const data: DatingProfile[] = await res.json();

      // Only keep profiles with at least one matching interest
      const filtered = data.filter(profile =>
        profile.interests.some(interest => userInterests.includes(interest))
      );

      const dataWithImages = filtered.map((p) => ({
        ...p,
        image: `https://api.dicebear.com/9.x/avataaars/svg?seed=${p.id}`
      }));

      setProfiles(dataWithImages);
    }
    loadProfiles();
  }, [userInterests]);

  if (profiles.length === 0) return <div className="swipe-container">No matching profiles...</div>;
  if (currentIndex >= profiles.length) return <div className="swipe-container">No more profiles</div>;

  const currentProfile = profiles[currentIndex];

  function handleChoice(choice: "smash" | "pass") {
    console.log(`${choice} -> ${currentProfile.name}`);
    setCurrentIndex(currentIndex + 1);
  }

  return (
    <div className="swipe-container">
      <div className="swipe-card">
        {/* Left side image */}
        <img src={currentProfile.image} alt="Profile" />

        {/* Right side content: only show interests */}
        <div className="swipe-card-content">
          <div>
            <h3>Interests</h3>
            <ul>
              {currentProfile.interests.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </div>

          {/* Buttons */}
          <div className="swipe-buttons">
            <button className="smash-btn" onClick={() => handleChoice("smash")}>Smash</button>
            <button className="pass-btn" onClick={() => handleChoice("pass")}>Pass</button>
          </div>
        </div>
      </div>
    </div>
  );
}