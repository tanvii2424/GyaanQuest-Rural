
import { useState } from "react";

const farmingChallenges = {
  7: [
    {
      title: "Prepare the Seed Bags",
      story: "You have 3 acres of farmland. Each acre needs 4 kg of wheat seeds.",
      question: "How many kilograms of seeds do you need?",
      answer: 12,
      unit: "kg",
      hint: "Multiply the number of acres by the seeds needed per acre.",
      explanation: "3 × 4 = 12 kg of seeds."
    },
    {
      title: "Water the Fields",
      story: "Each acre of your farm requires 80 litres of water. You have 3 acres.",
      question: "How much water is required in total?",
      answer: 240,
      unit: "litres",
      hint: "Multiply 80 litres by 3 acres.",
      explanation: "80 × 3 = 240 litres of water."
    },
    {
      title: "Harvest Time",
      story: "Your farm produces 25 kg of vegetables from each acre. You have 4 acres.",
      question: "How many kilograms will you harvest?",
      answer: 100,
      unit: "kg",
      hint: "Multiply the yield per acre by the number of acres.",
      explanation: "25 × 4 = 100 kg of vegetables."
    }
  ],
  8: [
    {
      title: "Measure Your Land",
      story: "Your rectangular farm is 12 metres long and 8 metres wide.",
      question: "What is the area of your farm?",
      answer: 96,
      unit: "square metres",
      hint: "Area of a rectangle = length × width.",
      explanation: "12 × 8 = 96 square metres."
    },
    {
      title: "Calculate the Seeds",
      story: "Your farm has an area of 96 square metres. You need 2 kg of seeds for every 10 square metres.",
      question: "How many kilograms of seeds are required?",
      answer: 19.2,
      unit: "kg",
      hint: "Divide 96 by 10, then multiply by 2.",
      explanation: "(96 ÷ 10) × 2 = 19.2 kg."
    },
    {
      title: "Fill the Water Tank",
      story: "Every square metre of your farm needs 15 litres of water. Your farm is 96 square metres.",
      question: "How many litres of water do you need?",
      answer: 1440,
      unit: "litres",
      hint: "Multiply the area by 15.",
      explanation: "96 × 15 = 1,440 litres."
    }
  ],
  9: [
    {
      title: "Choose Better Seeds",
      story: "You have 250 kg of seeds. You decide to use 20% of them for wheat.",
      question: "How many kilograms of seeds will you use?",
      answer: 50,
      unit: "kg",
      hint: "Calculate 20% of 250.",
      explanation: "(20 ÷ 100) × 250 = 50 kg."
    },
    {
      title: "Mix the Fertilizer",
      story: "You need to mix seeds and fertilizer in the ratio 3:2. You have 40 kg of mixture.",
      question: "How many kilograms of fertilizer are needed?",
      answer: 16,
      unit: "kg",
      hint: "There are 5 total parts. Fertilizer represents 2 parts.",
      explanation: "40 ÷ 5 = 8. Fertilizer = 8 × 2 = 16 kg."
    },
    {
      title: "Save Water",
      story: "Your farm normally uses 800 litres of water. A new irrigation system reduces usage by 15%.",
      question: "How much water will you use after the reduction?",
      answer: 680,
      unit: "litres",
      hint: "First calculate 15% of 800, then subtract it from 800.",
      explanation: "15% of 800 = 120. New usage = 800 − 120 = 680 litres."
    }
  ],
  10: [
    {
      title: "Sell Your Harvest",
      story: "You harvest 120 kg of tomatoes. The market price is ₹25 per kg.",
      question: "How much money will you earn?",
      answer: 3000,
      unit: "rupees",
      hint: "Multiply the quantity by the selling price.",
      explanation: "120 × 25 = ₹3,000."
    },
    {
      title: "Plan Your Farming Budget",
      story: "Your farming cost is ₹200 plus ₹5 for every seed packet. Your total budget is ₹1,200.",
      question: "How many seed packets can you buy? Solve 5x + 200 = 1200.",
      answer: 200,
      unit: "packets",
      hint: "Subtract 200 from both sides, then divide by 5.",
      explanation: "5x = 1200 − 200 = 1000. Therefore x = 1000 ÷ 5 = 200."
    },
    {
      title: "Calculate Your Profit",
      story: "Your total farming cost is ₹2,000. You sell your harvest for ₹2,500.",
      question: "What is your profit percentage?",
      answer: 25,
      unit: "%",
      hint: "Profit percentage = (Profit ÷ Cost Price) × 100.",
      explanation: "Profit = 2500 − 2000 = ₹500. Percentage = (500 ÷ 2000) × 100 = 25%."
    }
  ]
};

const crops = [
  { name: "Wheat", emoji: "🌾", water: "Moderate", duration: "4 months" },
  { name: "Rice", emoji: "🌱", water: "High", duration: "5 months" },
  { name: "Tomatoes", emoji: "🍅", water: "Moderate", duration: "3 months" },
  { name: "Groundnuts", emoji: "🥜", water: "Low", duration: "4 months" }
];

export default function SmartFarming({ selectedClass, onBack, onReward }) {
  const challenges = farmingChallenges[selectedClass] || farmingChallenges[7];

  const [stage, setStage] = useState("intro");
  const [crop, setCrop] = useState("Wheat");
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const current = challenges[challengeIndex];

  function startFarm() {
    setStage("game");
  }

  function checkAnswer(e) {
    e.preventDefault();

    if (answer.trim() === "") {
      setFeedback("Please enter your answer first!");
      return;
    }

    const submitted = Number(answer);

    if (!Number.isFinite(submitted)) {
      setFeedback("Please enter a valid number.");
      return;
    }

    setAttempts((previous) => previous + 1);

    if (Math.abs(submitted - current.answer) < 0.001) {
      setCorrectAnswers((previous) => previous + 1);
      setFeedback("correct");
    } else {
      setFeedback("Not quite right! Try again. You can use the hint.");
    }
  }

  function nextChallenge() {
    if (challengeIndex < challenges.length - 1) {
      setChallengeIndex((previous) => previous + 1);
      setAnswer("");
      setFeedback("");
      setShowHint(false);
    } else {
      setCompleted(true);
      setStage("complete");
      onReward?.(60, 9);
    }
  }

  const selectedCrop = crops.find((item) => item.name === crop);

  const styles = {
    page: {
      maxWidth: "1050px",
      margin: "0 auto",
      padding: "25px 18px 45px",
      color: "#294333"
    },
    card: {
      background: "#fff",
      borderRadius: "20px",
      padding: "25px",
      marginTop: "20px",
      boxShadow: "0 5px 20px rgba(0,0,0,0.07)"
    },
    button: {
      background: "#367a4b",
      color: "white",
      border: "none",
      borderRadius: "12px",
      padding: "13px 22px",
      fontWeight: "bold",
      cursor: "pointer",
      fontSize: "15px"
    },
    secondary: {
      background: "#e9f3e9",
      color: "#367a4b",
      border: "none",
      borderRadius: "12px",
      padding: "12px 18px",
      cursor: "pointer",
      fontWeight: "bold"
    },
    input: {
      width: "100%",
      boxSizing: "border-box",
      padding: "14px",
      border: "2px solid #d9e6d9",
      borderRadius: "10px",
      fontSize: "18px",
      marginTop: "12px"
    }
  };

  return (
    <main style={styles.page}>
      <button style={styles.secondary} onClick={onBack}>
        ← Back to Village
      </button>

      <div style={{ textAlign: "center", marginTop: "25px" }}>
        <div style={{ fontSize: "55px" }}>🌾</div>
        <p style={{ color: "#66836a", fontWeight: "bold" }}>
          MISSION 2 · MATHS + SCIENCE
        </p>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 40px)", margin: "8px 0" }}>
          Smart Farming
        </h1>
        <p>Grow crops, manage resources and become a smart farmer!</p>
      </div>

      <div style={{
        display: "flex",
        justifyContent: "space-around",
        gap: "10px",
        flexWrap: "wrap",
        marginTop: "25px"
      }}>
        <div style={styles.card}>
          🎓 <strong>Class {selectedClass}</strong>
        </div>
        <div style={styles.card}>
          ⭐ <strong>{stage === "complete" ? 9 : correctAnswers * 3} Stars</strong>
        </div>
        <div style={styles.card}>
          🪙 <strong>{stage === "complete" ? 60 : correctAnswers * 20} Coins</strong>
        </div>
      </div>

      {stage === "intro" && (
        <>
          <section style={styles.card}>
            <h2>🚜 Welcome, Farmer!</h2>
            <p>
              Your village needs a successful harvest. Select a crop and
              complete three farming challenges using your maths and science
              knowledge.
            </p>

            <h3>Choose Your Crop</h3>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(135px, 1fr))",
              gap: "12px"
            }}>
              {crops.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setCrop(item.name)}
                  style={{
                    padding: "18px 10px",
                    borderRadius: "14px",
                    border: crop === item.name ? "3px solid #367a4b" : "2px solid #e1e9df",
                    background: crop === item.name ? "#eff8ee" : "white",
                    cursor: "pointer",
                    color: "#294333"
                  }}
                >
                  <div style={{ fontSize: "35px" }}>{item.emoji}</div>
                  <strong>{item.name}</strong>
                  <p style={{ fontSize: "12px" }}>{item.water} water</p>
                  <small>{item.duration}</small>
                </button>
              ))}
            </div>

            <div style={{
              background: "#f1f7ed",
              padding: "15px",
              borderRadius: "12px",
              marginTop: "20px"
            }}>
              <strong>🌱 Your selected crop: {selectedCrop.name}</strong>
              <p>Water requirement: {selectedCrop.water}</p>
              <p>Growing duration: {selectedCrop.duration}</p>
            </div>

            <div style={{ marginTop: "20px" }}>
              <h3>Your Farming Missions</h3>
              <p>🌱 Mission 1: Prepare your farm resources</p>
              <p>💧 Mission 2: Manage water and resources</p>
              <p>🌾 Mission 3: Complete your harvest calculations</p>
            </div>

            <p style={{ color: "#66836a" }}>
              Three correct challenges will earn you 60 coins and 9 stars!
            </p>

            <button style={styles.button} onClick={startFarm}>
              Start Farming Adventure →
            </button>
          </section>
        </>
      )}

      {stage === "game" && (
        <section style={styles.card}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            flexWrap: "wrap"
          }}>
            <strong>Challenge {challengeIndex + 1} of 3</strong>
            <strong>🌾 {crop} Farm</strong>
          </div>

          <div style={{
            height: "10px",
            background: "#e8eee6",
            borderRadius: "20px",
            marginTop: "15px",
            overflow: "hidden"
          }}>
            <div style={{
              width: `${((challengeIndex + 1) / 3) * 100}%`,
              height: "100%",
              background: "#64a66e",
              transition: "width 0.3s"
            }} />
          </div>

          <div style={{
            background: "#f3f8ef",
            borderRadius: "15px",
            padding: "20px",
            marginTop: "25px"
          }}>
            <div style={{ fontSize: "40px" }}>🚜</div>
            <h2>{current.title}</h2>
            <p style={{ lineHeight: 1.7 }}>{current.story}</p>
          </div>

          <h3 style={{ marginTop: "25px" }}>🧮 Your Challenge</h3>
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>
            {current.question}
          </p>

          <form onSubmit={checkAnswer}>
            <label htmlFor="farm-answer">Your answer ({current.unit})</label>
            <input
              id="farm-answer"
              style={styles.input}
              type="number"
              step="any"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                if (feedback !== "correct") setFeedback("");
              }}
              placeholder="Enter your answer"
              disabled={feedback === "correct"}
            />

            <button
              type="submit"
              style={{ ...styles.button, marginTop: "15px" }}
              disabled={feedback === "correct"}
            >
              Check Answer ✓
            </button>
          </form>

          <button
            style={{ ...styles.secondary, marginTop: "15px", display: "block" }}
            onClick={() => setShowHint((previous) => !previous)}
          >
            💡 {showHint ? "Hide Hint" : "Show Hint"}
          </button>

          {showHint && (
            <p style={{
              background: "#fff8df",
              padding: "14px",
              borderRadius: "10px",
              marginTop: "12px"
            }}>
              {current.hint}
            </p>
          )}

          {feedback && (
            <div style={{
              background: feedback === "correct" ? "#e9f7e9" : "#fff0e8",
              color: feedback === "correct" ? "#24643b" : "#a04c26",
              padding: "16px",
              borderRadius: "12px",
              marginTop: "20px"
            }}>
              {feedback === "correct" ? (
                <>
                  <h3>🎉 Excellent Work!</h3>
                  <p>{current.explanation}</p>
                  <p>⭐ You earned 3 stars and 🪙 20 coins!</p>
                  <button
                    style={{ ...styles.button, marginTop: "10px" }}
                    onClick={nextChallenge}
                  >
                    {challengeIndex === 2 ? "Complete Farm 🏆" : "Next Challenge →"}
                  </button>
                </>
              ) : (
                <p>{feedback}</p>
              )}
            </div>
          )}
        </section>
      )}

      {stage === "complete" && (
        <section style={{ ...styles.card, textAlign: "center" }}>
          <div style={{ fontSize: "75px" }}>🏆</div>
          <h1>Farm Champion!</h1>
          <p>You successfully completed all three farming challenges!</p>

          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "25px",
            flexWrap: "wrap",
            margin: "25px 0"
          }}>
            <h2>⭐ 9 Stars</h2>
            <h2>🪙 60 Coins</h2>
          </div>

          <div style={{
            background: "#f1f7ed",
            padding: "18px",
            borderRadius: "12px"
          }}>
            <h3>🌾 Your Harvest Report</h3>
            <p>Crop selected: {crop}</p>
            <p>Challenges completed: 3 / 3</p>
            <p>Correct answers: {correctAnswers} / 3</p>
            <p>Answer attempts: {attempts}</p>
          </div>

          <h2 style={{ marginTop: "25px" }}>🌱 Keep Growing!</h2>
          <p>Every smart farmer learns something new every day.</p>

          <button
            style={styles.button}
            onClick={onBack}
          >
            Return to Mission Village →
          </button>
        </section>
      )}
    </main>
  );
}
