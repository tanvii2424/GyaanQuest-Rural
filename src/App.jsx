
import { useState } from "react";
import "./App.css";

// ==================== MISSIONS ====================

const missions = [
  { id: 1, name: "Village Market", icon: "🥕", subject: "Maths", description: "Shop, calculate prices and give correct change." },
  { id: 2, name: "Smart Farming", icon: "🌾", subject: "Maths + Science", description: "Manage seeds, crops and farm resources." },
  { id: 3, name: "Save Every Drop", icon: "💧", subject: "Maths + Science", description: "Manage water and prevent wastage." },
  { id: 4, name: "Build Your Village", icon: "🏡", subject: "Maths", description: "Explore shapes, area and measurements." },
  { id: 5, name: "Village Bus Stand", icon: "🚌", subject: "Maths + Life Skills", description: "Calculate distances, travel time and ticket costs." },
];

// ==================== LEARNING DASHBOARD ====================

const learningAreas = [
  {
    icon: "🔢",
    title: "Everyday Mathematics",
    description: "Use numbers to solve everyday problems.",
    topics: ["Addition and subtraction", "Multiplication and division", "Fractions", "Percentages", "Ratios"],
    missions: "Village Market · Smart Farming",
    color: "#fff2dc",
  },
  {
    icon: "🌱",
    title: "Sustainable Living",
    description: "Make smart decisions about natural resources.",
    topics: ["Water conservation", "Plant and crop growth", "Resource management", "Measurement and area"],
    missions: "Smart Farming · Save Every Drop",
    color: "#e8f5e8",
  },
  {
    icon: "🏡",
    title: "Real-World Problem Solving",
    description: "Apply practical thinking to village life.",
    topics: ["Money management", "Budget planning", "Distance and travel time", "Shapes and measurements", "Decision-making"],
    missions: "Build Your Village · Village Bus Stand",
    color: "#eaf2ff",
  },
];

// ==================== VILLAGE MARKET DATA ====================

const vegetables = [
  { id: 1, name: "Tomatoes", emoji: "🍅", price: 40, unit: "kg" },
  { id: 2, name: "Potatoes", emoji: "🥔", price: 30, unit: "kg" },
  { id: 3, name: "Carrots", emoji: "🥕", price: 50, unit: "kg" },
  { id: 4, name: "Onions", emoji: "🧅", price: 35, unit: "kg" },
  { id: 5, name: "Cabbage", emoji: "🥬", price: 25, unit: "piece" },
  { id: 6, name: "Bananas", emoji: "🍌", price: 60, unit: "dozen" },
  { id: 7, name: "Apples", emoji: "🍎", price: 120, unit: "kg" },
  { id: 8, name: "Chillies", emoji: "🌶️", price: 80, unit: "kg" },
];

const budgets = {
  7: 500,
  8: 750,
  9: 1000,
  10: 1500,
};

const customerOrders = [
  {
    name: "Customer 1",
    message: "I need vegetables for today's lunch!",
    request: [
      { id: 1, quantity: 2 },
      { id: 2, quantity: 1 },
      { id: 3, quantity: 1 },
    ],
  },
  {
    name: "Customer 2",
    message: "Please pack these vegetables for my family.",
    request: [
      { id: 4, quantity: 2 },
      { id: 5, quantity: 2 },
      { id: 6, quantity: 1 },
    ],
  },
  {
    name: "Customer 3",
    message: "I am shopping for a special occasion!",
    request: [
      { id: 7, quantity: 2 },
      { id: 8, quantity: 1 },
      { id: 1, quantity: 1 },
    ],
  },
];

// ==================== SMART FARMING DATA ====================

const farmingChallenges = {
  7: [
    {
      title: "Buy the Seeds",
      icon: "🌱",
      story: "You have 4 acres of farmland. Each acre needs 5 kg of wheat seeds.",
      question: "How many kilograms of seeds do you need altogether?",
      answer: 20,
      unit: "kg",
      explanation: "Seeds needed = 4 × 5 = 20 kg.",
      topic: "Multiplication",
    },
    {
      title: "Water the Crops",
      icon: "💧",
      story: "Each acre of your wheat farm needs 100 litres of water.",
      question: "How much water is needed for 4 acres?",
      answer: 400,
      unit: "litres",
      explanation: "Water required = 4 × 100 = 400 litres.",
      topic: "Multiplication",
    },
    {
      title: "Harvest Time",
      icon: "🌾",
      story: "Your farm produces 20 kg of wheat from each acre. You have 3 acres ready for harvest.",
      question: "How many kilograms of wheat will you harvest?",
      answer: 60,
      unit: "kg",
      explanation: "Total harvest = 3 × 20 = 60 kg.",
      topic: "Multiplication",
    },
  ],
  8: [
    {
      title: "Measure the Farm",
      icon: "📏",
      story: "Your rectangular farm is 12 metres long and 8 metres wide.",
      question: "What is the area of the farm in square metres?",
      answer: 96,
      unit: "m²",
      explanation: "Area = length × breadth = 12 × 8 = 96 m².",
      topic: "Area",
    },
    {
      title: "Prepare the Seeds",
      icon: "🌱",
      story: "You need 2 kg of seeds for every 8 square metres of farmland. Your farm has an area of 96 m².",
      question: "How many kilograms of seeds are required?",
      answer: 24,
      unit: "kg",
      explanation: "96 ÷ 8 = 12 groups. 12 × 2 = 24 kg.",
      topic: "Division",
    },
    {
      title: "Convert Water Units",
      icon: "🚰",
      story: "Your farm needs 3,000 litres of water. A water tank holds 1,000 litres.",
      question: "How many full tanks of water are required?",
      answer: 3,
      unit: "tanks",
      explanation: "3,000 ÷ 1,000 = 3 tanks.",
      topic: "Unit calculations",
    },
  ],
  9: [
    {
      title: "Calculate Fertilizer",
      icon: "🌿",
      story: "Your farm has 150 kg of fertilizer. You plan to use 20% of it today.",
      question: "How many kilograms of fertilizer will you use?",
      answer: 30,
      unit: "kg",
      explanation: "20% of 150 = (20 ÷ 100) × 150 = 30 kg.",
      topic: "Percentages",
    },
    {
      title: "Save Water",
      icon: "💧",
      story: "Your farm normally uses 800 litres of water. Drip irrigation can save 25% of the water.",
      question: "How many litres of water will you save?",
      answer: 200,
      unit: "litres",
      explanation: "25% of 800 = 200 litres saved.",
      topic: "Percentages",
    },
    {
      title: "Divide the Seeds",
      icon: "🌱",
      story: "You have 50 kg of seeds. The ratio of wheat seeds to rice seeds is 3:2.",
      question: "How many kilograms of wheat seeds will you use?",
      answer: 30,
      unit: "kg",
      explanation: "Total parts = 5. One part = 50 ÷ 5 = 10 kg. Wheat = 3 × 10 = 30 kg.",
      topic: "Ratios",
    },
  ],
  10: [
    {
      title: "Calculate the Profit",
      icon: "💰",
      story: "You spend ₹2,000 on seeds and farming materials. After selling your crops, you earn a 25% profit on this cost.",
      question: "How much profit do you make?",
      answer: 500,
      unit: "rupees",
      explanation: "Profit = 25% of 2,000 = ₹500.",
      topic: "Percentages and profit",
    },
    {
      title: "Plan Your Expenses",
      icon: "🧮",
      story: "Your farming expenses include ₹200 fixed costs and ₹5 per seed packet. Your total budget is ₹700.",
      question: "How many seed packets can you buy? Solve 5x + 200 = 700.",
      answer: 100,
      unit: "packets",
      explanation: "5x + 200 = 700. 5x = 500. x = 100.",
      topic: "Linear equations",
    },
    {
      title: "Plan the Harvest",
      icon: "🌾",
      story: "You harvest 1,200 kg of rice. You sell 60% of the harvest to the market.",
      question: "How many kilograms of rice will you sell?",
      answer: 720,
      unit: "kg",
      explanation: "60% of 1,200 = 720 kg.",
      topic: "Percentages",
    },
  ],
};

// ==================== SAVE EVERY DROP DATA ====================

const waterChallenges = {
  7: [
    {
      title: "The Village Water Tank",
      icon: "🚰",
      story: "The village tank contains 1,000 litres of water. Families have already used 2/5 of the water.",
      question: "How many litres of water have been used?",
      answer: 400,
      unit: "litres",
      topic: "Fractions",
      explanation: "Water used = 2/5 × 1,000 = 400 litres.",
    },
    {
      title: "Save Water at Home",
      icon: "🏡",
      story: "A family normally uses 2,000 litres of water every month. By fixing leaking taps, they reduce their usage by 15%.",
      question: "How many litres of water do they save?",
      answer: 300,
      unit: "litres",
      topic: "Percentages",
      explanation: "Water saved = 15/100 × 2,000 = 300 litres.",
    },
    {
      title: "Share Water Fairly",
      icon: "🌾",
      story: "A village has 840 litres of water to distribute between two fields. The ratio of water given to Field A and Field B is 3:4.",
      question: "How many litres should Field A receive?",
      answer: 360,
      unit: "litres",
      topic: "Ratios",
      explanation: "Total parts = 3 + 4 = 7. One part = 840 ÷ 7 = 120 litres. Field A gets 3 × 120 = 360 litres.",
    },
  ],
  8: [
    {
      title: "Calculate the Water Saved",
      icon: "💧",
      story: "A village uses 2,400 litres of water daily. A conservation project reduces usage by 25%.",
      question: "How many litres are saved each day?",
      answer: 600,
      unit: "litres",
      topic: "Percentages",
      explanation: "25% of 2,400 = 600 litres.",
    },
    {
      title: "Fill the Water Tank",
      icon: "🚰",
      story: "A tank already contains 150 litres. A pump adds the same amount of water every minute. After 10 minutes, the tank contains 450 litres.",
      question: "How many litres does the pump add per minute?",
      answer: 30,
      unit: "litres per minute",
      topic: "Linear equations",
      explanation: "150 + 10x = 450. 10x = 300. Therefore x = 30 litres per minute.",
    },
    {
      title: "Plan Water Distribution",
      icon: "🌱",
      story: "A village has 1,200 litres of water. It is shared between two areas in the ratio 5:3.",
      question: "How many litres will the area receiving the larger share get?",
      answer: 750,
      unit: "litres",
      topic: "Ratios",
      explanation: "Total parts = 8. One part = 1,200 ÷ 8 = 150. Larger share = 5 × 150 = 750 litres.",
    },
  ],
  9: [
    {
      title: "Reduce Water Consumption",
      icon: "💧",
      story: "A village consumes 5,000 litres of water daily. A new system reduces consumption by 18%.",
      question: "How many litres of water are saved daily?",
      answer: 900,
      unit: "litres",
      topic: "Percentages",
      explanation: "18% of 5,000 = 900 litres.",
    },
    {
      title: "Find the Leak",
      icon: "🔧",
      story: "A leaking pipe loses water at a constant rate. In 4 hours, it loses 280 litres.",
      question: "How many litres are lost in 7 hours at the same rate?",
      answer: 490,
      unit: "litres",
      topic: "Direct proportion",
      explanation: "Water lost per hour = 280 ÷ 4 = 70 litres. In 7 hours = 70 × 7 = 490 litres.",
    },
    {
      title: "Divide the Water Supply",
      icon: "🏘️",
      story: "A village receives 1,500 litres of water. The ratio of water distributed to three areas is 2:3:5.",
      question: "How many litres does the third area receive?",
      answer: 750,
      unit: "litres",
      topic: "Ratios",
      explanation: "Total parts = 10. One part = 1,500 ÷ 10 = 150. Third area = 5 × 150 = 750 litres.",
    },
  ],
  10: [
    {
      title: "Calculate the Water Bill",
      icon: "🧮",
      story: "A household uses 40,000 litres of water. The first 30,000 litres cost ₹2 per 1,000 litres, and the remaining water costs ₹3 per 1,000 litres.",
      question: "What is the total water bill?",
      answer: 90,
      unit: "rupees",
      topic: "Arithmetic applications",
      explanation: "First 30,000 litres cost ₹60. Remaining 10,000 litres cost ₹30. Total = ₹90.",
    },
    {
      title: "Design a Water Tank",
      icon: "📐",
      story: "A cylindrical water tank has a radius of 7 metres and a height of 10 metres. Use π = 22/7.",
      question: "What is the volume of the tank in cubic metres?",
      answer: 1540,
      unit: "m³",
      topic: "Surface area and volume",
      explanation: "Volume = πr²h = 22/7 × 7 × 7 × 10 = 1,540 m³.",
    },
    {
      title: "Plan Rainwater Collection",
      icon: "🌧️",
      story: "A rooftop has an area of 200 m². Rainfall measures 5 cm. Assume all rainwater is collected.",
      question: "How many cubic metres of rainwater can be collected?",
      answer: 10,
      unit: "m³",
      topic: "Area and volume",
      explanation: "5 cm = 0.05 m. Volume = 200 × 0.05 = 10 m³.",
    },
  ],
};

// ==================== REUSABLE CHALLENGE GAME ====================

function ChallengeGame({
  title,
  icon,
  subject,
  challenges,
  studentName,
  selectedClass,
  coins,
  stars,
  setCoins,
  setStars,
  onBack,
  completionTitle,
  achievement,
  completionMessage,
  restartLabel,
}) {
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [solved, setSolved] = useState(false);
  const [complete, setComplete] = useState(false);
  const [earnedCoins, setEarnedCoins] = useState(0);
  const [earnedStars, setEarnedStars] = useState(0);

  const currentChallenge = challenges[challengeIndex];

  function checkAnswer() {
    if (answer.trim() === "") {
      setFeedback("Please enter your answer first!");
      return;
    }

    if (Number(answer) === currentChallenge.answer) {
      setSolved(true);
      setFeedback("Excellent! Your answer is correct! 🎉");
      setCoins((previous) => previous + 10);
      setStars((previous) => previous + 1);
      setEarnedCoins((previous) => previous + 10);
      setEarnedStars((previous) => previous + 1);
    } else {
      setFeedback("Not quite right! Try again. Read the situation carefully.");
    }
  }

  function nextChallenge() {
    if (challengeIndex < challenges.length - 1) {
      setChallengeIndex((previous) => previous + 1);
      setAnswer("");
      setFeedback("");
      setSolved(false);
    } else {
      setComplete(true);
    }
  }

  function restartGame() {
    setChallengeIndex(0);
    setAnswer("");
    setFeedback("");
    setSolved(false);
    setComplete(false);
    setEarnedCoins(0);
    setEarnedStars(0);
    setCoins(0);
    setStars(0);
  }

  return (
    <main style={{ maxWidth: "1100px", margin: "auto", padding: "25px 20px 50px" }}>
      <button className="back-btn" onClick={onBack}>
        ← Back to Village
      </button>

      <div style={{ textAlign: "center", margin: "25px 0" }}>
        <span className="eyebrow">
          {title.toUpperCase()} · {subject.toUpperCase()}
        </span>
        <h1 style={{ fontSize: "2.3rem", margin: "12px 0" }}>
          {icon} {title}
        </h1>
        <p>{completionMessage}</p>
      </div>

      {!complete ? (
        <>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "12px",
            marginBottom: "25px",
          }}>
            {[
              ["🎓", "Class", selectedClass],
              ["📍", "Level", `${challengeIndex + 1}/3`],
              ["🪙", "Coins", coins],
              ["⭐", "Stars", stars],
            ].map(([symbol, label, value]) => (
              <div className="market-stats" key={label}>
                <div>
                  <span>{symbol}</span>
                  <small>{label}</small>
                  <strong>{value}</strong>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            background: title === "Save Every Drop" ? "#e8f5f5" : "#e7f5e9",
            padding: "20px",
            borderRadius: "16px",
            marginBottom: "22px",
            textAlign: "center",
          }}>
            <div style={{ fontSize: "3rem" }}>
              {title === "Save Every Drop" ? "🌧️ 💧 🏡" : "👩‍🌾 🌱 🚜"}
            </div>
            <h2 style={{ margin: "8px 0" }}>
              {title === "Save Every Drop" ? "Every Drop Counts!" : "Welcome, Farmer!"}
            </h2>
            <p>
              Complete all three challenges to earn your rewards and unlock
              your achievement.
            </p>
          </div>

          <div style={{
            background: "white",
            padding: "25px",
            borderRadius: "18px",
            boxShadow: "0 4px 18px rgba(0,0,0,0.07)",
            border: "1px solid #e5eadf",
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "10px",
            }}>
              <span className="eyebrow">
                CHALLENGE {challengeIndex + 1}
              </span>
              <span style={{
                background: "#edf6e9",
                color: "#39713b",
                padding: "7px 13px",
                borderRadius: "20px",
                fontWeight: "bold",
              }}>
                Level {challengeIndex + 1} of 3
              </span>
            </div>

            <h2 style={{ marginTop: "18px" }}>
              {currentChallenge.icon} {currentChallenge.title}
            </h2>

            <div style={{
              background: title === "Save Every Drop" ? "#f0f8f8" : "#fff8e8",
              padding: "20px",
              borderRadius: "12px",
              margin: "20px 0",
              lineHeight: "1.7",
            }}>
              <strong>{title === "Save Every Drop" ? "💧 Your Village Situation" : "🌻 Your Farming Situation"}</strong>
              <p style={{ marginTop: "8px" }}>{currentChallenge.story}</p>
            </div>

            <h3 style={{ marginBottom: "12px" }}>🧠 Your Challenge</h3>
            <p style={{ fontSize: "1.05rem", lineHeight: "1.6" }}>
              {currentChallenge.question}
            </p>

            <div style={{ marginTop: "22px" }}>
              <label style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "9px",
              }}>
                Enter your answer:
              </label>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <input
                  type="number"
                  value={answer}
                  disabled={solved}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                    setFeedback("");
                  }}
                  placeholder="Enter your answer"
                  style={{
                    flex: "1",
                    minWidth: "160px",
                    padding: "13px",
                    border: "1px solid #cbd5c0",
                    borderRadius: "9px",
                    fontSize: "1rem",
                  }}
                />
                <span style={{ alignSelf: "center", fontWeight: "bold" }}>
                  {currentChallenge.unit}
                </span>
              </div>
            </div>

            {feedback && (
              <div style={{
                marginTop: "18px",
                padding: "15px",
                borderRadius: "10px",
                background: solved ? "#e7f7e9" : "#fff3df",
                color: solved ? "#236b35" : "#875b16",
                lineHeight: "1.6",
              }}>
                <strong>{feedback}</strong>
              </div>
            )}

            {solved && (
              <div style={{
                marginTop: "15px",
                padding: "16px",
                background: "#f0f7eb",
                borderRadius: "10px",
                lineHeight: "1.7",
              }}>
                <strong>📘 Let's understand:</strong>
                <p>{currentChallenge.explanation}</p>
                <p style={{ marginTop: "8px" }}>🪙 10 coins earned!</p>
                <p>⭐ 1 star earned!</p>
              </div>
            )}

            <div style={{ marginTop: "22px" }}>
              {!solved ? (
                <button className="start-btn" onClick={checkAnswer} style={{ width: "100%" }}>
                  Check My Answer ✓
                </button>
              ) : (
                <button className="start-btn" onClick={nextChallenge} style={{ width: "100%" }}>
                  {challengeIndex === 2 ? "Complete Mission 🏆" : "Next Challenge →"}
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <div style={{
          maxWidth: "700px",
          margin: "35px auto",
          padding: "35px 25px",
          background: "#f0f8ec",
          borderRadius: "20px",
          textAlign: "center",
          border: "1px solid #d7e9ce",
        }}>
          <div style={{ fontSize: "5rem" }}>🏆</div>
          <span className="eyebrow">MISSION COMPLETED</span>
          <h1 style={{ color: "#32663c", margin: "12px 0" }}>
            {completionTitle}
          </h1>
          <p style={{ lineHeight: "1.7" }}>
            Amazing work{studentName.trim() ? `, ${studentName}` : ""}!
            You successfully completed all three challenges.
          </p>

          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "18px",
            flexWrap: "wrap",
            margin: "25px 0",
          }}>
            <div className="reward-stat">
              <strong>🪙 {earnedCoins}</strong>
              Coins Earned
            </div>
            <div className="reward-stat">
              <strong>⭐ {earnedStars}</strong>
              Stars Earned
            </div>
            <div className="reward-stat">
              <strong>✅ 3/3</strong>
              Challenges
            </div>
          </div>

          <h3>🏅 Achievement Unlocked</h3>
          <div style={{
            background: "white",
            padding: "18px",
            borderRadius: "12px",
            margin: "15px 0 25px",
          }}>
            <div style={{ fontSize: "2.5rem" }}>
              {title === "Save Every Drop" ? "💧" : "🌾"}
            </div>
            <strong>{achievement}</strong>
            <p>Completed all three challenges!</p>
          </div>

          <div style={{
            background: "white",
            padding: "18px",
            borderRadius: "12px",
            margin: "15px 0 25px",
            textAlign: "left",
          }}>
            <h3 style={{ marginBottom: "12px", textAlign: "center" }}>
              📚 What You Explored
            </h3>
            <ul style={{ paddingLeft: "22px", lineHeight: "2" }}>
              {[...new Set(challenges.map((challenge) => challenge.topic))].map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </div>

          <button className="start-btn" onClick={onBack} style={{ width: "100%", marginBottom: "12px" }}>
            Return to Mission Village →
          </button>
          <button className="back-btn" onClick={restartGame}>
            {restartLabel} ↻
          </button>
        </div>
      )}
    </main>
  );
}

// ==================== APP ====================

function App() {
  const [studentName, setStudentName] = useState("");
  const [selectedClass, setSelectedClass] = useState("7");
  const [playMode, setPlayMode] = useState("Individual");
  const [screen, setScreen] = useState("welcome");
  const [selectedMission, setSelectedMission] = useState(null);

  // Market states
  const [cart, setCart] = useState({});
  const [payment, setPayment] = useState("");
  const [changeReturned, setChangeReturned] = useState("");
  const [saleComplete, setSaleComplete] = useState(false);

  // Common reward states
  const [coins, setCoins] = useState(0);
  const [stars, setStars] = useState(0);
  const [message, setMessage] = useState("");
  const [orderIndex, setOrderIndex] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);

  const [farmChallengeIndex, setFarmChallengeIndex] = useState(0);
  const [farmAnswer, setFarmAnswer] = useState("");
  const [farmFeedback, setFarmFeedback] = useState("");
  const [farmSolved, setFarmSolved] = useState(false);
  const [farmComplete, setFarmComplete] = useState(false);

  const total = vegetables.reduce(
    (sum, item) => sum + item.price * (cart[item.id] || 0),
    0
  );

  const itemCount = Object.values(cart).reduce(
    (sum, quantity) => sum + quantity,
    0
  );

  const change = Number(payment) - total;
  const budget = budgets[selectedClass];
  const currentOrder = customerOrders[orderIndex];

  const classChallenges = farmingChallenges[selectedClass];
  const currentFarmChallenge = classChallenges[farmChallengeIndex];

  function openMission(mission) {
    setSelectedMission(mission);
    setScreen("mission");

    setCart({});
    setPayment("");
    setChangeReturned("");
    setSaleComplete(false);
    setMessage("");
    setOrderIndex(0);
    setCompletedOrders(0);

    setFarmChallengeIndex(0);
    setFarmAnswer("");
    setFarmFeedback("");
    setFarmSolved(false);
    setFarmComplete(false);

    setCoins(0);
    setStars(0);
  }

  function returnToVillage() {
    setScreen("village");
    setSelectedMission(null);
  }

  // ==================== MARKET FUNCTIONS ====================

  function addToCart(id) {
    if (saleComplete) return;

    const request = currentOrder.request.find((item) => item.id === id);

    if (!request) {
      setMessage("This item is not on the customer's shopping list!");
      return;
    }

    const quantity = cart[id] || 0;

    if (quantity >= request.quantity) {
      setMessage("You already have the required quantity!");
      return;
    }

    const vegetable = vegetables.find((item) => item.id === id);

    if (total + vegetable.price > budget) {
      setMessage("This order exceeds the class budget!");
      return;
    }

    setCart((previous) => ({
      ...previous,
      [id]: quantity + 1,
    }));

    setMessage("");
  }

  function removeFromCart(id) {
    if (saleComplete) return;

    setCart((previous) => {
      const updated = { ...previous };

      if (updated[id] > 1) {
        updated[id]--;
      } else {
        delete updated[id];
      }

      return updated;
    });

    setMessage("");
  }

  function isOrderCorrect() {
    return vegetables.every((item) => {
      const request = currentOrder.request.find((entry) => entry.id === item.id);
      return (cart[item.id] || 0) === (request ? request.quantity : 0);
    });
  }

  function completeSale() {
    if (itemCount === 0) {
      setMessage("Please add vegetables to the basket!");
      return;
    }

    if (!isOrderCorrect()) {
      setMessage("Check the customer's shopping list!");
      return;
    }

    if (payment.trim() === "" || Number(payment) < total) {
      setMessage("The customer has not paid enough!");
      return;
    }

    if (changeReturned.trim() === "") {
      setMessage("Please calculate and enter the change you will return!");
      return;
    }

    if (Number(changeReturned) !== change) {
      setMessage(`Incorrect change! Calculate again. The correct change is ₹${change}.`);
      return;
    }

    setCoins((previous) => previous + 20);
    setStars((previous) => previous + 3);
    setCompletedOrders((previous) => previous + 1);
    setSaleComplete(true);
    setMessage("Perfect! Correct order and correct change! 🎉");
  }

  function serveNextCustomer() {
    if (orderIndex < 2) {
      setOrderIndex((previous) => previous + 1);
      setCart({});
      setPayment("");
      setChangeReturned("");
      setSaleComplete(false);
      setMessage("");
    }
  }

  // ==================== SMART FARMING FUNCTIONS ====================

  function checkFarmAnswer() {
    if (farmAnswer.trim() === "") {
      setFarmFeedback("Please enter your answer first!");
      return;
    }

    if (Number(farmAnswer) === currentFarmChallenge.answer) {
      setFarmSolved(true);
      setFarmFeedback("Excellent! Your calculation is correct! 🎉");
      setCoins((previous) => previous + 10);
      setStars((previous) => previous + 1);
    } else {
      setFarmFeedback("Not quite right! Try again. Read the farming information carefully.");
    }
  }

  function nextFarmChallenge() {
    if (farmChallengeIndex < classChallenges.length - 1) {
      setFarmChallengeIndex((previous) => previous + 1);
      setFarmAnswer("");
      setFarmFeedback("");
      setFarmSolved(false);
    } else {
      setFarmComplete(true);
    }
  }

  function restartFarm() {
    setFarmChallengeIndex(0);
    setFarmAnswer("");
    setFarmFeedback("");
    setFarmSolved(false);
    setFarmComplete(false);
    setCoins(0);
    setStars(0);
  }

  function openRewards() {
    setScreen("rewards");
  }

  // ==================== RENDER ====================

  return (
    <div className="app">

      {/* NAVBAR */}

      <header className="navbar">
        <div className="logo">
          <span className="logo-icon">🎮</span>
          <div>
            <h2>GyaanQuest</h2>
            <p>LEARN • PLAY • GROW</p>
          </div>
        </div>
        <div className="offline-tag">● Offline Friendly</div>
      </header>

      {/* WELCOME PAGE */}

      {screen === "welcome" && (
        <main className="home">
          <section className="welcome">
            <div>
              <span className="eyebrow">WELCOME TO A NEW WAY OF LEARNING</span>
              <h1>Learning becomes an <span>Adventure!</span> 🏡</h1>

              <p>
                Every day, students face challenges that require practical
                thinking and problem-solving. But learning does not always
                happen inside a classroom.
              </p>

              <p>
                GyaanQuest transforms everyday village life into exciting
                interactive adventures where students explore, experiment
                and discover through play.
              </p>

              <button className="start-btn" onClick={() => setScreen("login")}>
                Get Started →
              </button>
            </div>

            <div className="welcome-art">
              🌳 🏡 🌾
              <p>LEARN • PLAY • GROW</p>
            </div>
          </section>

          <section style={{
            maxWidth: "950px",
            margin: "35px auto",
            padding: "25px",
            textAlign: "center",
            background: "#f5f8ef",
            borderRadius: "18px",
          }}>
            <h2>Why GyaanQuest?</h2>
            <p style={{ lineHeight: "1.8", color: "#536052" }}>
              We aim to make learning engaging, accessible and connected
              to real-life situations, especially for students in rural
              communities.
            </p>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "18px",
              marginTop: "25px",
            }}>
              <div>
                <span style={{ fontSize: "2.5rem" }}>🎮</span>
                <h3>Learn Through Games</h3>
                <p>Explore interactive challenges.</p>
              </div>
              <div>
                <span style={{ fontSize: "2.5rem" }}>🏡</span>
                <h3>Real-Life Situations</h3>
                <p>Connect learning with everyday life.</p>
              </div>
              <div>
                <span style={{ fontSize: "2.5rem" }}>🤝</span>
                <h3>Learn Together</h3>
                <p>Play individually or with friends.</p>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* PLAYER LOGIN */}

      {screen === "login" && (
        <main className="home">
          <section className="setup-card">
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "3.5rem", marginBottom: "12px" }}>🎮</div>
              <span className="eyebrow">YOUR ADVENTURE STARTS HERE</span>
              <h2 style={{ marginTop: "12px" }}>Player Login</h2>
              <p className="section-subtitle">
                Tell us a little about yourself before entering GyaanQuest!
              </p>
            </div>

            <label>Student Name / Team Name</label>
            <input
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Enter your name or team name"
            />

            <label>Select Your Class</label>
            <div className="class-options">
              {["7", "8", "9", "10"].map((grade) => (
                <button
                  key={grade}
                  className={selectedClass === grade ? "class-btn active" : "class-btn"}
                  onClick={() => setSelectedClass(grade)}
                >
                  Class {grade}
                </button>
              ))}
            </div>

            <label>Choose Your Playing Mode</label>
            <div className="mode-options">
              <button
                className={playMode === "Individual" ? "mode-btn selected" : "mode-btn"}
                onClick={() => setPlayMode("Individual")}
              >
                <span>👤</span>
                <strong>Individual Mode</strong>
                <small>Play on your own</small>
              </button>

              <button
                className={playMode === "Team" ? "mode-btn selected" : "mode-btn"}
                onClick={() => setPlayMode("Team")}
              >
                <span>👥</span>
                <strong>Team Mode</strong>
                <small>Play with 3–5 friends</small>
              </button>
            </div>

            <button className="start-btn" onClick={() => {
              if (!studentName.trim()) {
                alert("Please enter your name or team name!");
                return;
              }
              setScreen("dashboard");
            }}>
              Enter GyaanQuest →
            </button>

            <div style={{ textAlign: "center" }}>
              <button className="back-btn" onClick={() => setScreen("welcome")}>
                ← Back to Welcome
              </button>
            </div>
          </section>
        </main>
      )}

      {/* LEARNING DASHBOARD */}

      {screen === "dashboard" && (
        <main style={{ maxWidth: "1100px", margin: "auto", padding: "35px 20px 55px" }}>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <span className="eyebrow">YOUR LEARNING JOURNEY</span>
            <h1 style={{ margin: "12px 0", fontSize: "2.3rem" }}>
              Discover What You Can Explore! 📚
            </h1>
            <p style={{ color: "#647067", lineHeight: "1.7" }}>
              Welcome{studentName.trim() ? `, ${studentName}` : ""}!
              Here's a look at the skills and ideas waiting for you inside Mission Village.
            </p>
            <p style={{ fontWeight: "bold", marginTop: "10px" }}>
              Class {selectedClass} · {playMode} Mode
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}>
            {learningAreas.map((area) => (
              <section key={area.title} style={{
                background: area.color,
                padding: "24px",
                borderRadius: "18px",
                border: "1px solid rgba(0,0,0,0.06)",
              }}>
                <div style={{ fontSize: "2.7rem" }}>{area.icon}</div>
                <h2 style={{ fontSize: "1.25rem", margin: "12px 0 8px" }}>
                  {area.title}
                </h2>
                <p style={{ lineHeight: "1.6", color: "#536052" }}>
                  {area.description}
                </p>
                <h3 style={{ fontSize: "1rem", marginTop: "20px" }}>
                  What you'll explore
                </h3>
                <ul style={{ paddingLeft: "20px", lineHeight: "1.9" }}>
                  {area.topics.map((topic) => <li key={topic}>{topic}</li>)}
                </ul>
                <div style={{
                  marginTop: "18px",
                  padding: "12px",
                  background: "rgba(255,255,255,0.7)",
                  borderRadius: "10px",
                  fontSize: "0.9rem",
                }}>
                  <strong>Explore through:</strong>
                  <p style={{ marginTop: "5px" }}>{area.missions}</p>
                </div>
              </section>
            ))}
          </div>

          <div style={{
            textAlign: "center",
            marginTop: "35px",
            padding: "25px",
            background: "#f5f8ef",
            borderRadius: "18px",
          }}>
            <h2>Ready to put your skills into action? 🚀</h2>
            <p style={{ margin: "10px 0 20px", color: "#59665a" }}>
              Choose a mission, explore a village location and take on exciting real-world challenges!
            </p>
            <button className="start-btn" onClick={() => setScreen("village")}>
              Explore Mission Village →
            </button>
            <div style={{ marginTop: "15px" }}>
              <button className="back-btn" onClick={() => setScreen("login")}>
                ← Back to Player Login
              </button>
            </div>
          </div>
        </main>
      )}

      {/* VILLAGE MAP */}

      {screen === "village" && (
        <main className="village-page">
          <div className="village-heading">
            <span className="eyebrow">
              CLASS {selectedClass} · {playMode.toUpperCase()} MODE
            </span>
            <h1>Explore Mission Village 🏡</h1>
            <p>Choose a location on the map to begin your adventure.</p>
          </div>

          <div className="village-instructions">
            <span>🧭</span>
            <div>
              <strong>Your Mission Map</strong>
              <p>Explore all five locations and complete exciting challenges!</p>
            </div>
          </div>

          <div className="village-map">
            <div className="village-sun">☀️</div>
            <div className="village-cloud cloud-one">☁️</div>
            <div className="village-cloud cloud-two">☁️</div>
            <div className="village-road road-one" />
            <div className="village-road road-two" />
            <div className="village-road road-three" />
            <div className="map-decoration tree tree-one">🌳</div>
            <div className="map-decoration tree tree-two">🌴</div>
            <div className="map-decoration tree tree-three">🌳</div>
            <div className="map-decoration field-decoration">🌾🌾</div>
            <div className="map-decoration pond-decoration">💧</div>

            {missions.map((mission) => (
              <button
                key={mission.id}
                className={`map-location location-${mission.id}`}
                onClick={() => openMission(mission)}
              >
                <span className="map-icon">{mission.icon}</span>
                <strong>{mission.name}</strong>
                <small>{mission.subject}</small>
              </button>
            ))}
          </div>

          <button className="back-btn" onClick={() => setScreen("dashboard")}>
            ← Back to Learning Dashboard
          </button>
        </main>
      )}

      {/* MARKET REWARDS */}

      {screen === "rewards" && (
        <main className="rewards-page">
          <div className="rewards-trophy">🏆</div>
          <span className="eyebrow">MISSION COMPLETED</span>
          <h1>Market Champion!</h1>
          <p>
            Amazing work{studentName.trim() ? `, ${studentName}` : ""}!
            You successfully served all three customers.
          </p>

          <div className="rewards-total">
            <div className="reward-stat">
              <strong>🪙 {coins}</strong>
              Coins Earned
            </div>
            <div className="reward-stat">
              <strong>⭐ {stars}</strong>
              Stars Earned
            </div>
            <div className="reward-stat">
              <strong>✅ {completedOrders}/3</strong>
              Orders Completed
            </div>
          </div>

          <h2>Your Achievement Badges</h2>
          <div className="reward-badges">
            <div className="reward-badge">
              <span>🛍️</span>
              <strong>Smart Shopper</strong>
              <p>Completed all three shopping lists correctly.</p>
            </div>
            <div className="reward-badge">
              <span>🧮</span>
              <strong>Quick Calculator</strong>
              <p>Calculated the correct change for all customers.</p>
            </div>
            <div className="reward-badge">
              <span>🏆</span>
              <strong>Market Champion</strong>
              <p>Successfully served all three customers.</p>
            </div>
          </div>

          <h3>Skills You Used</h3>
          <p style={{ lineHeight: "1.8" }}>
            Shopping calculations · Money management · Budget planning · Calculating totals and change
          </p>

          <h3>Your Star Collection</h3>
          <div className="reward-progress">
            <div className="reward-progress-fill" style={{ width: `${(stars / 9) * 100}%` }} />
          </div>
          <p className="reward-note">{stars} out of 9 stars collected!</p>

          <button className="reward-button" onClick={returnToVillage}>
            Return to Mission Village →
          </button>
        </main>
      )}

      {/* MISSION SCREEN */}

      {screen === "mission" && selectedMission && (
        <>
          {/* VILLAGE MARKET */}

          {selectedMission.id === 1 && (
            <main className="market-page">
              <div className="market-header">
                <button className="back-btn" onClick={returnToVillage}>
                  ← Back to Village
                </button>
                <p className="eyebrow">MISSION 1 · MATHS</p>
                <h1>🥕 Village Market</h1>
                <p>Become the best shopkeeper in the village!</p>
              </div>

              <div className="market-stats">
                <div><span>🎓</span><small>Class</small><strong>{selectedClass}</strong></div>
                <div><span>💰</span><small>Budget</small><strong>₹{budget}</strong></div>
                <div><span>🪙</span><small>Coins</small><strong>{coins}</strong></div>
                <div><span>⭐</span><small>Stars</small><strong>{stars}</strong></div>
                <div><span>🧺</span><small>Basket</small><strong>{itemCount} items</strong></div>
              </div>

              <div className="customer-order">
                <div className="customer-avatar">🧑‍🌾</div>
                <div className="customer-details">
                  <span className="eyebrow">CUSTOMER {orderIndex + 1} OF 3</span>
                  <h2>{currentOrder.name} has arrived!</h2>
                  <p>{currentOrder.message}</p>
                  <strong>Shopping List</strong>
                  <div className="order-list">
                    {currentOrder.request.map((request) => {
                      const item = vegetables.find((v) => v.id === request.id);
                      return (
                        <span className="order-item" key={request.id}>
                          {item.emoji} {item.name} × {request.quantity}
                        </span>
                      );
                    })}
                  </div>
                  <p className="order-progress">Orders completed: {completedOrders} / 3</p>
                </div>
              </div>

              <div className="market-layout">
                <section className="shop-section">
                  <h2>🛍️ Vegetable Shop</h2>
                  <p className="basket-subtitle">Choose items from the shopping list.</p>

                  <div className="vegetable-grid">
                    {vegetables.map((item) => {
                      const request = currentOrder.request.find((r) => r.id === item.id);
                      const required = request ? request.quantity : 0;
                      const quantity = cart[item.id] || 0;

                      return (
                        <div className="vegetable-card" key={item.id}>
                          <span className="vegetable-emoji">{item.emoji}</span>
                          <strong>{item.name}</strong>
                          <span className="vegetable-price">₹{item.price} / {item.unit}</span>
                          <small>{required ? `Required: ${required}` : "Not in this order"}</small>
                          <button
                            className="add-button"
                            disabled={saleComplete || !required || quantity >= required}
                            onClick={() => addToCart(item.id)}
                          >
                            {!required ? "Not Required" : quantity >= required ? "Added ✓" : "Add to Basket +"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </section>

                <aside className="basket-section">
                  <h2>🧺 Shopping Basket</h2>

                  {itemCount === 0 ? (
                    <div className="empty-basket">
                      <span>🧺</span>
                      <p>Your basket is empty!</p>
                      <small>Add items from the shop.</small>
                    </div>
                  ) : (
                    <div className="basket-items">
                      {vegetables.filter((item) => cart[item.id]).map((item) => (
                        <div className="basket-item" key={item.id}>
                          <span className="basket-emoji">{item.emoji}</span>
                          <div className="basket-item-info">
                            <strong>{item.name}</strong>
                            <small>₹{item.price} × {cart[item.id]}</small>
                          </div>
                          <div className="quantity-controls">
                            <button disabled={saleComplete} onClick={() => removeFromCart(item.id)}>−</button>
                            <span>{cart[item.id]}</span>
                            <button
                              disabled={saleComplete || cart[item.id] >= currentOrder.request.find((r) => r.id === item.id).quantity}
                              onClick={() => addToCart(item.id)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="bill-total">
                    <span>Total Amount</span>
                    <strong>₹{total}</strong>
                  </div>

                  <div className="budget-progress">
                    <div className="budget-label">
                      <span>Class budget</span>
                      <span>₹{budget - total} left</span>
                    </div>
                    <div className="budget-track">
                      <div className="budget-fill" style={{ width: `${Math.min((total / budget) * 100, 100)}%` }} />
                    </div>
                  </div>

                  <div className="payment-section">
                    <label>💵 Customer Payment (₹)</label>
                    <input
                      type="number"
                      min="0"
                      placeholder="Enter payment"
                      value={payment}
                      disabled={saleComplete}
                      onChange={(e) => {
                        setPayment(e.target.value);
                        setChangeReturned("");
                        setMessage("");
                      }}
                    />
                  </div>

                  {payment !== "" && total > 0 && (
                    <div className="change-display">
                      <span>Amount to return</span>
                      <strong>{change >= 0 ? `₹${change}` : "Insufficient payment"}</strong>
                    </div>
                  )}

                  {payment !== "" && total > 0 && change >= 0 && (
                    <div className="payment-section">
                      <label>🧮 Enter Change You Will Return (₹)</label>
                      <input
                        className="change-input"
                        type="number"
                        min="0"
                        placeholder="Calculate the change"
                        value={changeReturned}
                        disabled={saleComplete}
                        onChange={(e) => {
                          setChangeReturned(e.target.value);
                          setMessage("");
                        }}
                      />
                    </div>
                  )}

                  {message && (
                    <p className={saleComplete ? "success-message" : "error-message"}>
                      {message}
                    </p>
                  )}

                  {!saleComplete && (
                    <button className="checkout-button" onClick={completeSale}>
                      Complete Sale ✓
                    </button>
                  )}

                  {saleComplete && (
                    <div className="sale-success">
                      <span>🎉</span>
                      <h3>Order Completed!</h3>
                      <p>Correct shopping list and change!</p>
                      <p>⭐ 3 Stars earned!</p>
                      <p>🪙 20 Coins earned!</p>
                      {orderIndex < 2 ? (
                        <button className="add-button" onClick={serveNextCustomer}>
                          Serve Next Customer →
                        </button>
                      ) : (
                        <button className="add-button" onClick={openRewards}>
                          View My Rewards 🏆
                        </button>
                      )}
                    </div>
                  )}

                  <div className="market-tip">
                    💡 <strong>Challenge Tip:</strong> Pay attention to the customer's shopping list and make sure the basket is correct!
                  </div>
                </aside>
              </div>
            </main>
          )}

          {/* SMART FARMING */}

          {selectedMission.id === 2 && (
            <main className="farm-page">
              <ChallengeGame
                title="Smart Farming"
                icon="🌾"
                subject="Maths + Science"
                challenges={classChallenges}
                studentName={studentName}
                selectedClass={selectedClass}
                coins={coins}
                stars={stars}
                setCoins={setCoins}
                setStars={setStars}
                onBack={returnToVillage}
                completionTitle="Farming Champion!"
                achievement="Smart Farmer"
                completionMessage="Welcome to your farm! Make smart decisions, grow healthy crops and become a farming champion."
                restartLabel="Play Smart Farming Again"
              />
            </main>
          )}

          {/* SAVE EVERY DROP */}

          {selectedMission.id === 3 && (
            <main className="water-page">
              <ChallengeGame
                title="Save Every Drop"
                icon="💧"
                subject="Maths + Science"
                challenges={waterChallenges[selectedClass]}
                studentName={studentName}
                selectedClass={selectedClass}
                coins={coins}
                stars={stars}
                setCoins={setCoins}
                setStars={setStars}
                onBack={returnToVillage}
                completionTitle="Water Conservation Champion!"
                achievement="Water Guardian"
                completionMessage="Help the villagers use water wisely and protect this precious resource."
                restartLabel="Play Save Every Drop Again"
              />
            </main>
          )}

          {/* OTHER MISSIONS */}

          {[4, 5].includes(selectedMission.id) && (
            <main className="mission-detail">
              <button className="back-btn" onClick={returnToVillage}>
                ← Back to Village
              </button>
              <span className="large-mission-icon">{selectedMission.icon}</span>
              <span className="eyebrow">MISSION {selectedMission.id}</span>
              <h1>{selectedMission.name}</h1>
              <p>{selectedMission.description}</p>
              <div className="coming-soon">
                <h2>🚧 Interactive Game Coming Next!</h2>
                <p>We are building this village adventure for you.</p>
              </div>
              <button className="start-btn" onClick={returnToVillage}>
                Explore Other Missions
              </button>
            </main>
          )}
        </>
      )}

      {/* FOOTER */}

      <footer>
        <strong>GyaanQuest – Learn • Play • Grow</strong>
        <br />
        <small>Turning everyday village life into an interactive classroom.</small>
      </footer>
    </div>
  );
}

export default App;
