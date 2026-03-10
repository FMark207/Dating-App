import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import type { Profile } from "../../types/Profile"

type ChatGame = {
  message: string
  options: Array<{ id: string; text: string }>
  correctOptionId: string
}

type ProfileWithChat = Profile & { isMatched?: boolean; chatGame?: ChatGame }

const ChatAction = () => {
  const navigate = useNavigate()
  const params = useParams<{ id: string }>()
  const profileIndex = Number(params.id ?? "")

  const [profile, setProfile] = useState<ProfileWithChat | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(null)

    const MATCHED_IDS_KEY = "matchedProfileIds"
    const getMatchedIds = () => {
      try {
        return JSON.parse(localStorage.getItem(MATCHED_IDS_KEY) ?? "[]") as string[]
      } catch {
        return []
      }
    }

    fetch("/profiles.json")
      .then((res) => res.json())
      .then((data: ProfileWithChat[]) => {
        const matchedIds = getMatchedIds()

        const idParam = params.id
        const foundById = idParam ? data.find((p) => p.id === idParam) : undefined
        const indexFromId = idParam ? Number(idParam) : NaN
        const foundByIndex = !Number.isNaN(indexFromId) ? data[indexFromId] : undefined
        const found = foundById ?? foundByIndex

        if (!found) {
          setError("Profile not found")
          return
        }

        const isMatched = found.id ? matchedIds.includes(found.id) : found.isMatched
        if (!isMatched) {
          setError("This profile is not matched yet.")
          return
        }

        setProfile({ ...found, isMatched })
      })
      .catch((err) => {
        setError("Failed to load profiles")
        console.error(err)
      })
      .finally(() => setLoading(false))
  }, [profileIndex, params.id])

  const interestsSnippet = useMemo(() => {
    if (!profile?.interests?.length) return "No interests yet."
    return `Interested in ${profile.interests.slice(0, 3).join(", ")}.`
  }, [profile])

  const options = profile?.chatGame?.options ?? []
  const correctId = profile?.chatGame?.correctOptionId

  const handleChoose = (id: string) => {
    setSelectedOption(id)
    setShowResult(true)
  }

  const isCorrect = selectedOption && selectedOption === correctId

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

      {loading && <p>Loading chat…</p>}
      {error && <p style={{ color: "#c9163b" }}>{error}</p>}

      {!loading && !error && profile && (
        <>
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
              src={profile.image}
              alt={profile.name}
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid rgba(255,75,110,0.65)",
              }}
            />
            <div>
              <h2 style={{ margin: 0 }}>{profile.name}</h2>
              <p style={{ margin: 0, color: "rgba(0,0,0,0.6)" }}>
                {profile.shortDescription}
              </p>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              alignItems: "start",
            }}
          >
            <div
              style={{
                padding: "1.25rem",
                borderRadius: "18px",
                background: "white",
                boxShadow: "0 9px 20px rgba(0,0,0,0.06)",
                minHeight: 220,
              }}
            >
              <h3 style={{ margin: 0, marginBottom: "0.75rem" }}>Their interests</h3>
              <p style={{ margin: 0, color: "rgba(0,0,0,0.7)" }}>{interestsSnippet}</p>
            </div>

            <div
              style={{
                padding: "1.25rem",
                borderRadius: "18px",
                background: "white",
                boxShadow: "0 9px 20px rgba(0,0,0,0.06)",
                minHeight: 220,
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <h3 style={{ margin: 0 }}>Choose the right reply</h3>
              <p style={{ margin: 0, color: "rgba(0,0,0,0.6)" }}>
                {profile.chatGame?.message ?? "No game set up for this profile."}
              </p>

              {options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleChoose(option.id)}
                  style={{
                    padding: "0.8rem 1rem",
                    borderRadius: "14px",
                    border: "1px solid rgba(0,0,0,0.12)",
                    background:
                      selectedOption === option.id
                        ? option.id === correctId
                          ? "#e8f7ea"
                          : "#ffe7e7"
                        : "white",
                    color: "#2c2c2c",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  {option.text}
                </button>
              ))}

              {showResult && (
                <div
                  style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0,0,0,0.3)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "1.5rem",
                    zIndex: 9999,
                  }}
                >
                  <div
                    style={{
                      maxWidth: 360,
                      width: "100%",
                      borderRadius: "18px",
                      background: "white",
                      padding: "1.75rem",
                      boxShadow: "0 18px 35px rgba(0,0,0,0.25)",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        marginBottom: "0.75rem",
                        color: isCorrect ? "#2d6a4f" : "#9b1c1c",
                      }}
                    >
                      {isCorrect ? "✅ True love!" : "❌ Not quite — try again."}
                    </div>
                    <div style={{ marginBottom: "1rem", color: "rgba(0,0,0,0.7)" }}>
                      {isCorrect
                        ? "You picked the perfect response — they loved it!"
                        : "Try again and see if you can win their heart."
                      }
                    </div>
                    <button
                      onClick={() => {
                        setShowResult(false)
                        setSelectedOption(null)
                      }}
                      style={{
                        padding: "0.65rem 1rem",
                        borderRadius: "999px",
                        border: "none",
                        background: "#ff4b6e",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ChatAction
