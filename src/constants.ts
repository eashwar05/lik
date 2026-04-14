export interface Question {
  id: number;
  text: string;
  type: 'slider' | 'mcq';
  options?: string[];
  labels?: { min: string; max: string };
}

export const QUESTIONS: Question[] = [
  // Phase 1: Lifestyle Solvency
  { id: 0, text: "The Friday Night Protocol: It’s 7 PM on a Friday. Your battery is at 10%. How do you recharge?", type: 'slider', labels: { min: "Total digital blackout", max: "High-volume social energy" } },
  { id: 1, text: "The Itinerary Check: You are heading on a 5-day international trip. How much of it is pre-booked?", type: 'slider', labels: { min: "Pure chaos/Figure it out", max: "Color-coded spreadsheet" } },
  { id: 2, text: "The Social Engagement Strategy: At a high-profile party where you only know the host, you usually...", type: 'mcq', options: ["Locate the quietest corner or the host's pet.", "Shadow the host until you find a safe subgroup.", "Work the room until you’ve secured three new contacts."] },
  { id: 3, text: "The Culinary Risk Threshold: Your partner suggests a restaurant where the menu is in a language you don’t speak.", type: 'slider', labels: { min: "Safe & familiar", max: "High-risk, weirdest thing" } },
  { id: 4, text: "The Domestic Landscape: How does your personal living space look 48 hours before a deep clean?", type: 'slider', labels: { min: "Controlled disaster zone", max: "Museum-quality minimalism" } },

  // Phase 2: Core Asset Alignment
  { id: 5, text: "The Capital Windfall: You just received a surprise $1,000 credit. Where is it allocated?", type: 'mcq', options: ["Immediate deposit into high-yield savings.", "Settling a boring, practical utility bill.", "A spontaneous luxury experience."] },
  { id: 6, text: "The Appreciation Currency: You feel the highest level of 'Policy Security' when your partner...", type: 'mcq', options: ["Articulates exactly why they value your presence (Words).", "Removes a stressful task from your plate (Acts).", "Presents a small, thoughtful physical token (Gifts).", "Initiates 30 minutes of phone-free proximity (Time)."] },
  { id: 7, text: "The Accountability Logic: You’ve made a significant error. Your instinct to repair is...", type: 'mcq', options: ["A detailed verbal autopsy of why it happened.", "A tangible peace offering (dinner, flowers).", "Providing silent space until the market stabilizes."] },
  { id: 8, text: "The 5-Year Horizon: When you visualize your life in 60 months, how sharp is the image?", type: 'slider', labels: { min: "Abstract blur/Living day-to-day", max: "High-definition roadmap" } },
  { id: 9, text: "The Priority Hierarchy: What has the highest impact on your daily peace of mind?", type: 'mcq', options: ["Career & Personal Ambition", "Intimate Connection & Partnership", "Personal Sovereignty (Hobbies/Alone Time)", "Financial Security & Accumulation"] },

  // Phase 3: Risk & Conflict Coverage
  { id: 10, text: "The Hardware Stress Test: You are building complex furniture and a crucial piece is missing.", type: 'mcq', options: ["Laugh it off, open wine, pivot to a different plan.", "Take full control of the project to ensure it gets done.", "Tense, passive-aggressive silence starts to fill the room."] },
  { id: 11, text: "The Response Latency: Your partner views your message but doesn't respond for 4 hours. You assume...", type: 'mcq', options: ["They are deeply focused or device failed.", "I have likely said something to irritate them.", "Nothing—I didn't notice the time gap."] },
  { id: 12, text: "The Conflict Resolution Protocol: During a high-friction disagreement, your primary goal is to...", type: 'mcq', options: ["Stay in the conversation until 100% resolved.", "Disengage immediately to process alone for hours.", "Use humor or sarcasm to de-escalate tension quickly."] },
  { id: 13, text: "The Autonomy Requirement: Your partner goes on a 4-day solo trip. How does the separation feel?", type: 'slider', labels: { min: "Slight anxiety/Frequent check-ins", max: "Pure liberation" } },
  { id: 14, text: "The Vulnerability Transparency: How much of your 'Internal Chaos' (fears/weird thoughts) do you reveal?", type: 'slider', labels: { min: "A highly curated top 10%", max: "Unfiltered, raw 100%" } },
  { id: 15, text: "The Routine Disruption: A major, unexpected change ruins weekend plans. How fast is your pivot?", type: 'slider', labels: { min: "Mourn the plan", max: "Already made plan B" } },
  { id: 16, text: "The Policy Dealbreaker: Which 'Coverage Gap' is the fastest way to void your attraction?", type: 'mcq', options: ["Empathy Failure (Arrogance/Cruelty)", "Resource Failure (Laziness/Lack of Drive)", "Stability Failure (Inconsistency/Unpredictability)"] },

  // Phase 4: Verification Buffers
  { id: 17, text: "The Sunday Vibe: On an ideal Sunday, do you prefer a structured list of errands or zero obligations?", type: 'slider', labels: { min: "Zero obligations/Flow", max: "Strict itinerary" } },
  { id: 18, text: "The Ledger Audit: How often do you check your banking/investment balances?", type: 'slider', labels: { min: "Maybe once a quarter", max: "Multiple times per day" } },
  { id: 19, text: "The Cancellation Reaction: A social event you were nervous about gets cancelled last minute.", type: 'slider', labels: { min: "Secret, massive relief", max: "Genuine disappointment" } },
  { id: 20, text: "The Reassurance Loop: In a relationship, do you need to be told you are loved daily?", type: 'slider', labels: { min: "Actions speak louder", max: "I need verbal confirmation" } },
];

