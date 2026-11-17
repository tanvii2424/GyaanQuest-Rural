
import { useState } from "react";
import "./App.css";

const gradeSettings = {
  7: { farmTarget: 3, farmWater: 3, waterTarget: 600, busCapacity: 12, fare: 10 },
  8: { farmTarget: 4, farmWater: 4, waterTarget: 900, busCapacity: 16, fare: 12 },
  9: { farmTarget: 5, farmWater: 5, waterTarget: 1200, busCapacity: 20, fare: 15 },
  10: { farmTarget: 6, farmWater: 6, waterTarget: 1500, busCapacity: 24, fare: 18 },
};

const missions = [
  {
    id: "farm",
    icon: "🌾",
    name: "Smart Farming",
    subject: "Maths + Science",
    description: "Run your own farm. Plant crops, manage water and collect your harvest.",
    color: "farm",
  },
  {
    id: "water",
    icon: "💧",
    name: "Save Every Drop",
    subject: "Science + Maths",
    description: "Help your village save water by fixing leaks and sharing water wisely.",
    color: "water",
  },
  {
    id: "bus",
    icon: "🚌",
    name: "Village Bus Stand",
    subject: "Maths + Life Skills",
    description: "Manage a busy bus stand, plan routes and help passengers travel safely.",
    color: "bus",
  },
];

// Creates five questions according to the selected mission and class.
function getQuizQuestions(missionId, grade) {
  const level = Number(grade);
  const settings = gradeSettings[grade];

  function question(text, correct, wrong) {
    const answer = String(correct);
    const options = [answer, ...wrong.map(String)];

    return {
      text,
      answer,
      options: options.sort((a, b) => {
        // Keep the answer position varied without randomizing on every render.
        return (a.length + a.charCodeAt(0)) % 3 -
          ((b.length + b.charCodeAt(0)) % 3);
      }),
    };
  }

  if (missionId === "farm") {
    const seedsPerPlot = level + 2;
    const totalSeeds = settings.farmTarget * seedsPerPlot;
    const waterPerPlot = settings.farmWater / settings.farmTarget;

    return [
      question(
        `Your farm needs ${settings.farmTarget} plots. Each plot needs ${seedsPerPlot} seed packets. How many packets do you need altogether?`,
        totalSeeds,
        [totalSeeds + 2, totalSeeds - 1, totalSeeds + 5]
      ),
      question(
        `You have ${settings.farmWater} water units for ${settings.farmTarget} plots. If shared equally, how many units does each plot receive?`,
        waterPerPlot,
        [waterPerPlot + 1, waterPerPlot + 2, Math.max(0, waterPerPlot - 1)]
      ),
      question(
        "Which sequence shows the correct stages of growing a crop?",
        "Seed → Seedling → Plant → Harvest",
        [
          "Harvest → Seed → Plant → Seedling",
          "Plant → Harvest → Seed → Seedling",
          "Seedling → Harvest → Seed → Plant",
        ]
      ),
      question(
        `Your farm has 6 plots. You have planted ${settings.farmTarget} plots. How many plots are still unplanted?`,
        6 - settings.farmTarget,
        [settings.farmTarget, 6, 6 - settings.farmTarget + 1]
      ),
      question(
        `If you harvest ${settings.farmTarget} plots and each gives ${level + 1} baskets of crops, how many baskets do you collect?`,
        settings.farmTarget * (level + 1),
        [
          settings.farmTarget + level + 1,
          settings.farmTarget * level,
          settings.farmTarget * (level + 2),
        ]
      ),
    ];
  }

  if (missionId === "water") {
    const each = settings.waterTarget / 3;
    const dailyWaste = (level + 1) * 10;
    const threeDayWaste = dailyWaste * 3;

    return [
      question(
        `Your village has ${settings.waterTarget} litres of water. It must be shared equally among 3 places. How much does each receive?`,
        each,
        [each + 50, each - 50, each * 2]
      ),
      question(
        `Homes, school and farm each receive ${each} litres. What is the total amount distributed?`,
        settings.waterTarget,
        [settings.waterTarget - 100, settings.waterTarget + 100, each * 2]
      ),
      question(
        `A leaking pipe wastes ${dailyWaste} litres every day. How much water is wasted in 3 days?`,
        threeDayWaste,
        [dailyWaste * 2, threeDayWaste + dailyWaste, dailyWaste + 3]
      ),
      question(
        "Which action helps conserve water?",
        "Repairing leaking pipes",
        [
          "Leaving taps running",
          "Washing vehicles with a running hose",
          "Throwing clean water away",
        ]
      ),
      question(
        `The village collects ${settings.waterTarget} litres and distributes ${settings.waterTarget} litres equally. How much water remains?`,
        0,
        [50, each, settings.waterTarget / 2]
      ),
    ];
  }

  const capacity = settings.busCapacity;
  const fare = settings.fare;
  const studentFare = Math.ceil(fare / 2);
  const halfCapacity = Math.floor(capacity / 2);
  const remainingSeats = capacity - halfCapacity;

  return [
    question(
      `Your bus has a capacity of ${capacity} passengers. If ${halfCapacity} passengers board, how many seats remain?`,
      remainingSeats,
      [halfCapacity, capacity, remainingSeats + 2]
    ),
    question(
      `An adult ticket costs ₹${fare} and a student ticket costs ₹${studentFare}. What is the total for 2 adult tickets and 1 student ticket?`,
      2 * fare + studentFare,
      [2 * fare + 2 * studentFare, fare + studentFare, 3 * fare]
    ),
    question(
      `Your bus carries ${halfCapacity} passengers. Each passenger needs one ticket. How many tickets should you issue?`,
      halfCapacity,
      [halfCapacity + 1, capacity, halfCapacity - 1]
    ),
    question(
      `You collect ${halfCapacity} adult fares of ₹${fare} each. How much money do you collect?`,
      halfCapacity * fare,
      [halfCapacity + fare, capacity * fare, halfCapacity * studentFare]
    ),
    question(
      "Which destination should receive priority during a medical emergency?",
      "Hospital",
      ["Market", "Playground", "Shopping centre"]
    ),
  ];
}

function App() {
  const [page, setPage] = useState("welcome");
  const [studentName, setStudentName] = useState("");
  const [grade, setGrade] = useState("7");
  const [mode, setMode] = useState("individual");
  const [teamMembers, setTeamMembers] = useState(3);
  const [activeMission, setActiveMission] = useState(null);
  const [coins, setCoins] = useState(500);
  const [stars, setStars] = useState(0);
  const [completed, setCompleted] = useState([]);
  const [lastResult, setLastResult] = useState(null);

  const settings = gradeSettings[grade];

  function startSetup() {
    setPage("setup");
  }

  function enterVillage() {
    if (!studentName.trim()) {
      alert("Please enter your name to continue!");
      return;
    }
    setPage("dashboard");
  }

  function openMission(mission) {
    setActiveMission(mission);
    setPage("intro");
  }

  function finishMission(missionId, score, reward, title, concepts, message) {
    const alreadyCompleted = completed.includes(missionId);

    if (!alreadyCompleted) {
      setCoins((current) => current + reward);
      setStars((current) => current + 1);
      setCompleted((current) => [...current, missionId]);
    } else {
      setCoins((current) => current + Math.floor(reward / 2));
    }

    setLastResult({
      missionId,
      score,
      reward: alreadyCompleted ? Math.floor(reward / 2) : reward,
      title,
      concepts,
      message,
      alreadyCompleted,
    });

    setPage("result");
  }

  function finishQuiz(bonus) {
    setCoins((current) => current + bonus);
  }

  function returnToVillage() {
    setActiveMission(null);
    setLastResult(null);
    setPage("dashboard");
  }

  return (
    <div className="gq-app">
      <header className="gq-header">
        <div className="gq-brand">
          <div className="gq-brand-icon">🏡</div>
          <div>
            <h2>GyaanQuest</h2>
            <p>LEARN • PLAY • GROW</p>
          </div>
        </div>
        <div className="gq-header-right">
          <span className="offline-pill">● Offline Friendly</span>
          {page !== "welcome" && page !== "setup" && (
            <span className="coin-pill">🪙 {coins}</span>
          )}
        </div>
      </header>

      <main className="gq-shell">
        {page === "welcome" && <WelcomePage onStart={startSetup} />}

        {page === "setup" && (
          <SetupPage
            studentName={studentName}
            setStudentName={setStudentName}
            grade={grade}
            setGrade={setGrade}
            mode={mode}
            setMode={setMode}
            teamMembers={teamMembers}
            setTeamMembers={setTeamMembers}
            onContinue={enterVillage}
          />
        )}

        {page === "dashboard" && (
          <Dashboard
            studentName={studentName}
            grade={grade}
            mode={mode}
            teamMembers={teamMembers}
            coins={coins}
            stars={stars}
            completed={completed}
            onOpenMission={openMission}
          />
        )}

        {page === "intro" && activeMission && (
          <MissionIntro
            mission={activeMission}
            onStart={() => setPage("game")}
            onBack={returnToVillage}
          />
        )}

        {page === "game" && activeMission?.id === "farm" && (
          <FarmingGame
            settings={settings}
            onFinish={(score) =>
              finishMission(
                "farm",
                score,
                100,
                "Farm Champion!",
                [
                  "Multiplication: calculating seeds and resources",
                  "Measurement: understanding land and area",
                  "Plant growth: understanding the stages of a crop",
                  "Resource management: using water carefully",
                ],
                "Your farm is flourishing! You managed your crops and resources successfully."
              )
            }
            onBack={returnToVillage}
          />
        )}

        {page === "game" && activeMission?.id === "water" && (
          <WaterGame
            settings={settings}
            onFinish={(score) =>
              finishMission(
                "water",
                score,
                120,
                "Water Guardian!",
                [
                  "Water conservation and responsible usage",
                  "Division: sharing water equally",
                  "Addition: calculating total water requirements",
                  "Problem-solving: identifying and fixing water wastage",
                ],
                "You helped the village save water and distribute it fairly!"
              )
            }
            onBack={returnToVillage}
          />
        )}

        {page === "game" && activeMission?.id === "bus" && (
          <BusGame
            settings={settings}
            onFinish={(score) =>
              finishMission(
                "bus",
                score,
                150,
                "Transport Manager!",
                [
                  "Addition: counting passengers and tickets",
                  "Multiplication: calculating ticket revenue",
                  "Capacity: understanding passenger limits",
                  "Decision-making: selecting suitable routes",
                ],
                "The bus is ready! You managed the passengers and ticket counter."
              )
            }
            onBack={returnToVillage}
          />
        )}

        {page === "result" && lastResult && (
          <ResultPage
            result={lastResult}
            onStartQuiz={() => setPage("quiz")}
            onContinue={returnToVillage}
          />
        )}

        {page === "quiz" && activeMission && (
          <QuizPage
            mission={activeMission}
            grade={grade}
            questions={getQuizQuestions(activeMission.id, grade)}
            onComplete={finishQuiz}
            onContinue={returnToVillage}
          />
        )}
      </main>

      <footer className="gq-footer">
        <span>🌱 GyaanQuest – Learn • Play • Grow</span>
        <span>Every challenge makes you smarter!</span>
      </footer>
    </div>
  );
}

function WelcomePage({ onStart }) {
  return (
    <section className="welcome-page">
      <div className="welcome-art">
        <div className="sun">☀️</div>
        <div className="welcome-house">🏡</div>
        <div className="welcome-field">🌾 🌳 🌻 🌳 🌾</div>
        <div className="welcome-cloud cloud-one">☁️</div>
        <div className="welcome-cloud cloud-two">☁️</div>
      </div>

      <div className="welcome-content">
        <span className="eyebrow">YOUR ADVENTURE BEGINS</span>
        <h1>Learning becomes an Adventure!</h1>
        <p>
          Welcome to Mission Village, where everyday challenges become
          exciting learning adventures. Explore your village, solve problems
          and make a difference!
        </p>
        <button className="primary-btn" onClick={onStart}>
          Enter Mission Village <span>→</span>
        </button>
      </div>

      <div className="welcome-features">
        <div className="feature-card">
          <span>🧭</span>
          <h3>Explore</h3>
          <p>Discover exciting village missions.</p>
        </div>
        <div className="feature-card">
          <span>🧠</span>
          <h3>Think</h3>
          <p>Use your knowledge to solve challenges.</p>
        </div>
        <div className="feature-card">
          <span>🏆</span>
          <h3>Achieve</h3>
          <p>Earn rewards as you complete missions.</p>
        </div>
      </div>
    </section>
  );
}

function SetupPage({
  studentName,
  setStudentName,
  grade,
  setGrade,
  mode,
  setMode,
  teamMembers,
  setTeamMembers,
  onContinue,
}) {
  return (
    <section className="setup-page">
      <div className="section-heading">
        <span className="eyebrow">LET'S GET STARTED</span>
        <h1>Meet Your Adventurer! 🌻</h1>
        <p>Set up your player before entering the village.</p>
      </div>

      <div className="setup-card">
        <label>Your name</label>
        <input
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="Enter your name"
          maxLength={30}
        />

        <label>Choose your class</label>
        <div className="grade-grid">
          {[7, 8, 9, 10].map((number) => (
            <button
              key={number}
              className={`grade-btn ${grade === String(number) ? "selected" : ""}`}
              onClick={() => setGrade(String(number))}
            >
              Class {number}
            </button>
          ))}
        </div>

        <label>How would you like to play?</label>
        <div className="mode-grid">
          <button
            className={`mode-card ${mode === "individual" ? "selected" : ""}`}
            onClick={() => setMode("individual")}
          >
            <span>🧑‍🎓</span>
            <strong>Individual Play</strong>
            <small>Play on your own</small>
          </button>
          <button
            className={`mode-card ${mode === "team" ? "selected" : ""}`}
            onClick={() => setMode("team")}
          >
            <span>👩‍👩‍👧</span>
            <strong>Team Play</strong>
            <small>Play together</small>
          </button>
        </div>

        {mode === "team" && (
          <div className="team-setting">
            <label>Number of team members</label>
            <select
              value={teamMembers}
              onChange={(e) => setTeamMembers(Number(e.target.value))}
            >
              {[3, 4, 5].map((number) => (
                <option key={number} value={number}>
                  {number} members
                </option>
              ))}
            </select>
            <p>Share one device and solve the missions together!</p>
          </div>
        )}

        <button className="primary-btn full-btn" onClick={onContinue}>
          Let's Explore! →
        </button>
      </div>
    </section>
  );
}

function Dashboard({
  studentName,
  grade,
  mode,
  teamMembers,
  coins,
  stars,
  completed,
  onOpenMission,
}) {
  return (
    <section className="dashboard-page">
      <div className="dashboard-welcome">
        <div>
          <span className="eyebrow">WELCOME TO YOUR VILLAGE</span>
          <h1>Hello, {studentName}! 👋</h1>
          <p>
            Class {grade} · {mode === "team" ? `Team of ${teamMembers}` : "Individual Player"}
          </p>
        </div>
        <div className="dashboard-avatar">🧑‍🌾</div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>🪙</span>
          <div><strong>{coins}</strong><small>Village Coins</small></div>
        </div>
        <div className="stat-card">
          <span>⭐</span>
          <div><strong>{stars}</strong><small>Stars Earned</small></div>
        </div>
        <div className="stat-card">
          <span>🏅</span>
          <div><strong>{completed.length}/3</strong><small>Missions Completed</small></div>
        </div>
      </div>

      <div className="mission-heading">
        <div>
          <span className="eyebrow">YOUR VILLAGE NEEDS YOU</span>
          <h2>Choose Your Mission</h2>
          <p>Three adventures. Three ways to make a difference!</p>
        </div>
      </div>

      <div className="mission-grid">
        {missions.map((mission, index) => (
          <article className={`mission-card ${mission.color}`} key={mission.id}>
            <div className="mission-number">MISSION 0{index + 1}</div>
            <div className="mission-icon">{mission.icon}</div>
            <h3>{mission.name}</h3>
            <span className="subject-tag">{mission.subject}</span>
            <p>{mission.description}</p>
            <div className="mission-bottom">
              {completed.includes(mission.id) ? (
                <span className="completed-label">✓ Completed</span>
              ) : (
                <span className="new-label">Ready to explore</span>
              )}
              <button onClick={() => onOpenMission(mission)}>
                {completed.includes(mission.id) ? "Play Again ↗" : "Explore Mission →"}
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="learning-topics">
        <div className="section-heading left">
          <span className="eyebrow">LEARNING BEHIND THE ADVENTURE</span>
          <h2>What Will You Discover?</h2>
          <p>Every mission connects classroom learning with real village life.</p>
        </div>
        <div className="topic-grid">
          <div className="topic-card">
            <span>🌾</span>
            <div>
              <strong>Smart Farming</strong>
              <p>Multiplication, measurement, plant growth and resource management.</p>
            </div>
          </div>
          <div className="topic-card">
            <span>💧</span>
            <div>
              <strong>Save Every Drop</strong>
              <p>Water conservation, addition, division and fair distribution.</p>
            </div>
          </div>
          <div className="topic-card">
            <span>🚌</span>
            <div>
              <strong>Village Bus Stand</strong>
              <p>Passenger counting, multiplication, money and capacity.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MissionIntro({ mission, onStart, onBack }) {
  return (
    <section className="intro-page">
      <button className="back-btn" onClick={onBack}>← Back to Village</button>
      <div className={`intro-art ${mission.color}`}>
        <span>{mission.icon}</span>
        <div className="intro-sparkle">✦</div>
      </div>
      <span className="eyebrow">YOUR NEXT ADVENTURE</span>
      <h1>{mission.name}</h1>
      <span className="subject-tag">{mission.subject}</span>
      <p>{mission.description}</p>
      <div className="challenge-box">
        <span>🎯 YOUR CHALLENGE</span>
        <p>
          The village is counting on you! Explore the situation, make smart
          decisions and complete your mission.
        </p>
      </div>
      <button className="primary-btn" onClick={onStart}>Start Mission →</button>
    </section>
  );
}

function FarmingGame({ settings, onFinish, onBack }) {
  const [plots, setPlots] = useState([0, 0, 0, 0, 0, 0]);
  const [water, setWater] = useState(settings.farmWater);
  const [message, setMessage] = useState("Choose a plot to begin planting!");
  const [harvested, setHarvested] = useState(0);

  const target = settings.farmTarget;
  const planted = plots.filter((plot) => plot >= 1).length;

  function workOnPlot(index) {
    const stage = plots[index];

    if (stage === 0) {
      setPlots((current) => current.map((value, i) => i === index ? 1 : value));
      setMessage("Great! You planted a seed. Now give it water. 🌱");
    } else if (stage === 1) {
      if (water <= 0) {
        setMessage("You are out of water! Try another plot or finish with your harvest.");
        return;
      }
      setWater((current) => current - 1);
      setPlots((current) => current.map((value, i) => i === index ? 2 : value));
      setMessage("Your crop is growing! Keep going. 🌿");
    } else if (stage === 2) {
      setPlots((current) => current.map((value, i) => i === index ? 3 : value));
      setHarvested((current) => current + 1);
      setMessage("Wonderful harvest! You grew a healthy crop. 🌾");
    } else {
      setMessage("This plot has already been harvested!");
    }
  }

  function finish() {
    if (harvested < target) {
      setMessage(`You need to harvest ${target} plots. You have harvested ${harvested}.`);
      return;
    }
    onFinish(harvested);
  }

  return (
    <section className="game-page">
      <button className="back-btn" onClick={onBack}>← Leave Mission</button>
      <div className="game-heading">
        <span className="eyebrow">MISSION 01</span>
        <h1>🌾 Smart Farming</h1>
        <p>Grow healthy crops and manage your farm!</p>
      </div>

      <div className="game-scene farm-scene">
        <div className="scene-sun">☀️</div>
        <div className="scene-title">YOUR FARM</div>
        <div className="farm-plots">
          {plots.map((stage, index) => (
            <button
              key={index}
              className={`farm-plot stage-${stage}`}
              onClick={() => workOnPlot(index)}
              disabled={stage === 3}
            >
              <span>{stage === 0 ? "🟫" : stage === 1 ? "🌱" : stage === 2 ? "🌿" : "🌾"}</span>
              <small>{stage === 0 ? "Plant" : stage === 1 ? "Water" : stage === 2 ? "Harvest" : "Done"}</small>
            </button>
          ))}
        </div>
        <div className="scene-ground">🌻　🌱　🌼　🌱　🌻</div>
      </div>

      <div className="game-stats">
        <div><span>💧</span><strong>{water}</strong><small>Water units left</small></div>
        <div><span>🌱</span><strong>{planted}/6</strong><small>Plots planted</small></div>
        <div><span>🌾</span><strong>{harvested}/{target}</strong><small>Harvest goal</small></div>
      </div>

      <div className="game-instructions">
        <h3>🚜 How to play</h3>
        <p>Tap an empty plot to plant a seed. Tap it again to water it. Tap the growing crop to harvest it.</p>
        <div className="notice">{message}</div>
        <button className="primary-btn full-btn" onClick={finish}>
          Collect Farm Reward →
        </button>
      </div>
    </section>
  );
}

function WaterGame({ settings, onFinish, onBack }) {
  const total = settings.waterTarget;
  const targetEach = total / 3;

  const [leakFixed, setLeakFixed] = useState(false);
  const [rainCollected, setRainCollected] = useState(false);
  const [allocation, setAllocation] = useState([0, 0, 0]);
  const [message, setMessage] = useState("Fix the leaking pipe first!");

  const allocated = allocation.reduce((sum, value) => sum + value, 0);
  const remaining = total - allocated;
  const places = ["🏠 Homes", "🏫 School", "🌾 Farm"];

  function changeAllocation(index, amount) {
    setAllocation((current) => {
      const updated = [...current];
      const nextValue = Math.max(0, Math.min(targetEach, updated[index] + amount));
      const otherTotal = updated.reduce((sum, value, i) => i === index ? value : sum + value, 0);
      updated[index] = Math.min(nextValue, total - otherTotal);
      return updated;
    });
  }

  function finish() {
    const allEqual = allocation.every((value) => value === targetEach);
    if (!leakFixed || !rainCollected || allocated !== total || !allEqual) {
      setMessage("Complete all tasks and distribute the water equally before finishing.");
      return;
    }
    onFinish(3);
  }

  return (
    <section className="game-page">
      <button className="back-btn" onClick={onBack}>← Leave Mission</button>
      <div className="game-heading">
        <span className="eyebrow">MISSION 02</span>
        <h1>💧 Save Every Drop</h1>
        <p>Your village needs your help to manage its water supply!</p>
      </div>

      <div className="game-scene water-scene">
        <div className="water-sky">☁️　☀️　☁️</div>
        <div className="water-village">🏠　🏫　🏡</div>
        <div className="water-river">〰️💧〰️💧〰️💧〰️</div>
      </div>

      <div className="task-card">
        <div className="task-top">
          <span>STEP 1</span>
          <strong>{leakFixed ? "✓ Completed" : "Fix the leaking pipe"}</strong>
        </div>
        <p>A village pipe is wasting water. Stop the leak to protect the supply.</p>
        <button
          className={leakFixed ? "success-btn" : "secondary-btn"}
          onClick={() => {
            setLeakFixed(true);
            setMessage("Leak fixed! Now collect rainwater. 🌧️");
          }}
          disabled={leakFixed}
        >
          {leakFixed ? "Pipe Repaired ✓" : "🔧 Repair Pipe"}
        </button>
      </div>

      <div className="task-card">
        <div className="task-top">
          <span>STEP 2</span>
          <strong>{rainCollected ? "✓ Completed" : "Collect rainwater"}</strong>
        </div>
        <p>Rainwater can help the village. Collect it for the community.</p>
        <button
          className={rainCollected ? "success-btn" : "secondary-btn"}
          onClick={() => {
            setRainCollected(true);
            setMessage("Rainwater collected! Now share the water fairly. 💧");
          }}
          disabled={!leakFixed || rainCollected}
        >
          {rainCollected ? "Rainwater Collected ✓" : "🪣 Collect Water"}
        </button>
      </div>

      <div className="task-card allocation-card">
        <div className="task-top">
          <span>STEP 3</span>
          <strong>Share the water fairly</strong>
        </div>
        <p>
          You have <strong>{total} litres</strong> of water. Give each place
          exactly <strong>{targetEach} litres</strong>.
        </p>
        <div className="water-counter">
          <span>Remaining water</span>
          <strong>{remaining} L</strong>
        </div>
        {places.map((place, index) => (
          <div className="allocation-row" key={place}>
            <div className="allocation-label">
              <strong>{place}</strong>
              <span>{allocation[index]} / {targetEach} L</span>
            </div>
            <div className="allocation-controls">
              <button onClick={() => changeAllocation(index, -50)} disabled={allocation[index] === 0}>−</button>
              <div className="allocation-bar">
                <div style={{ width: `${(allocation[index] / targetEach) * 100}%` }} />
              </div>
              <button onClick={() => changeAllocation(index, 50)} disabled={allocation[index] >= targetEach || remaining === 0}>+</button>
            </div>
          </div>
        ))}
        <div className="allocation-total">
          Total distributed: <strong>{allocated} / {total} L</strong>
        </div>
        <div className="notice">{message}</div>
        <button
          className="primary-btn full-btn"
          onClick={finish}
          disabled={!leakFixed || !rainCollected}
        >
          Complete Water Mission →
        </button>
      </div>
    </section>
  );
}

function BusGame({ settings, onFinish, onBack }) {
  const [route, setRoute] = useState("");
  const [passengers, setPassengers] = useState(0);
  const [adultTickets, setAdultTickets] = useState(0);
  const [studentTickets, setStudentTickets] = useState(0);
  const [message, setMessage] = useState("Choose a route to begin your journey!");

  const capacity = settings.busCapacity;
  const totalTickets = adultTickets + studentTickets;
  const revenue = adultTickets * settings.fare + studentTickets * Math.ceil(settings.fare / 2);

  function boardPassenger() {
    if (!route) {
      setMessage("Choose a route before boarding passengers.");
      return;
    }
    if (passengers >= capacity) {
      setMessage("The bus is full! You have reached its capacity.");
      return;
    }
    setPassengers((current) => current + 1);
    setMessage("A passenger has boarded the bus!");
  }

  function issueTicket(type) {
    if (totalTickets >= passengers) {
      setMessage("Every ticket must belong to a passenger who has boarded.");
      return;
    }
    if (type === "adult") {
      setAdultTickets((current) => current + 1);
    } else {
      setStudentTickets((current) => current + 1);
    }
    setMessage("Ticket issued successfully!");
  }

  function finish() {
    if (!route || passengers === 0 || totalTickets !== passengers) {
      setMessage("Choose a route, board passengers and issue one ticket to each passenger.");
      return;
    }
    onFinish(passengers);
  }

  return (
    <section className="game-page">
      <button className="back-btn" onClick={onBack}>← Leave Mission</button>
      <div className="game-heading">
        <span className="eyebrow">MISSION 03</span>
        <h1>🚌 Village Bus Stand</h1>
        <p>Manage your bus and help passengers reach their destinations!</p>
      </div>

      <div className="game-scene bus-scene">
        <div className="bus-sky">☁️　　　　☀️</div>
        <div className="bus-road">
          <div className="bus-vehicle">🚌</div>
          <span>🚏 VILLAGE BUS STAND</span>
        </div>
      </div>

      <div className="task-card">
        <div className="task-top">
          <span>STEP 1</span>
          <strong>Choose your route</strong>
        </div>
        <p>Where should your bus travel today?</p>
        <div className="route-grid">
          {["Village → School", "Village → Market", "Village → Hospital"].map((item) => (
            <button
              key={item}
              className={`route-btn ${route === item ? "selected" : ""}`}
              onClick={() => {
                setRoute(item);
                setMessage(`Route selected: ${item}`);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="task-card">
        <div className="task-top">
          <span>STEP 2</span>
          <strong>Board passengers</strong>
        </div>
        <p>Bus capacity: {capacity} passengers.</p>
        <div className="passenger-count">
          <span>🧍 Passengers on board</span>
          <strong>{passengers} / {capacity}</strong>
        </div>
        <div className="capacity-bar">
          <div style={{ width: `${(passengers / capacity) * 100}%` }} />
        </div>
        <button
          className="secondary-btn"
          onClick={boardPassenger}
          disabled={passengers >= capacity}
        >
          + Board Passenger
        </button>
      </div>

      <div className="task-card">
        <div className="task-top">
          <span>STEP 3</span>
          <strong>Issue tickets</strong>
        </div>
        <p>
          Adult fare: ₹{settings.fare}. Student fare: ₹{Math.ceil(settings.fare / 2)}.
        </p>
        <div className="ticket-buttons">
          <button
            className="ticket-btn"
            onClick={() => issueTicket("adult")}
            disabled={totalTickets >= passengers}
          >
            🎟️ Adult Ticket
          </button>
          <button
            className="ticket-btn"
            onClick={() => issueTicket("student")}
            disabled={totalTickets >= passengers}
          >
            🎫 Student Ticket
          </button>
        </div>
        <div className="ticket-summary">
          <div><span>Adult tickets</span><strong>{adultTickets}</strong></div>
          <div><span>Student tickets</span><strong>{studentTickets}</strong></div>
          <div><span>Total tickets</span><strong>{totalTickets}/{passengers}</strong></div>
          <div><span>Money collected</span><strong>₹{revenue}</strong></div>
        </div>
        <div className="notice">{message}</div>
        <button className="primary-btn full-btn" onClick={finish}>
          Complete Bus Mission →
        </button>
      </div>
    </section>
  );
}

function ResultPage({ result, onStartQuiz, onContinue }) {
  return (
    <section className="result-page">
      <div className="result-confetti">🎉 ✨ 🎊 ✨ 🎉</div>
      <div className="result-medal">🏆</div>
      <span className="eyebrow">MISSION ACCOMPLISHED</span>
      <h1>{result.title}</h1>
      <p className="result-message">{result.message}</p>

      <div className="result-stats">
        <div>
          <span>⭐</span>
          <strong>{result.score}</strong>
          <small>Mission score</small>
        </div>
        <div>
          <span>🪙</span>
          <strong>+{result.reward}</strong>
          <small>Coins earned</small>
        </div>
      </div>

      {result.alreadyCompleted && (
        <p className="repeat-note">You have played this mission before. You earned a repeat-play reward!</p>
      )}

      <div className="learning-result-card">
        <span className="eyebrow">WHAT DID YOU LEARN?</span>
        <h2>Learning from your adventure 🧠</h2>
        <p>You just used real-life skills to solve a village challenge!</p>
        <ul>
          {result.concepts.map((concept) => (
            <li key={concept}>✓ {concept}</li>
          ))}
        </ul>
      </div>

      <button className="primary-btn full-btn" onClick={onStartQuiz}>
        Take Your 5-Question Quiz 🧠 →
      </button>
      <button
        className="back-btn"
        style={{ display: "block", margin: "14px auto 0" }}
        onClick={onContinue}
      >
        Return to Mission Village
      </button>
    </section>
  );
}

function QuizPage({ mission, grade, questions, onComplete, onContinue }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const currentQuestion = questions[questionIndex];
  const bonus = finalScore * 20;

  function checkAnswer() {
    if (!selected) return;

    const correct = selected === currentQuestion.answer;

    if (correct) {
      setScore((current) => current + 1);
    }

    setChecked(true);
  }

  function nextQuestion() {
    const correct = selected === currentQuestion.answer;
    const updatedScore = score;

    // The score state is already updated when the answer is checked.
    const final = updatedScore;

    if (questionIndex < questions.length - 1) {
      setQuestionIndex((current) => current + 1);
      setSelected("");
      setChecked(false);
    } else {
      const totalCorrect = final;
      setFinalScore(totalCorrect);
      setFinished(true);
      onComplete(totalCorrect * 20);
    }
  }

  return (
    <section className="game-page">
      {!finished ? (
        <>
          <button className="back-btn" onClick={onContinue}>← Return to Village</button>

          <div className="game-heading">
            <span className="eyebrow">MISSION QUIZ</span>
            <h1>🧠 {mission.name} Quiz</h1>
            <p>Class {grade} · Test what you learned!</p>
          </div>

          <div
            className="task-card"
            style={{ maxWidth: "720px", margin: "0 auto", padding: "28px" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
              <strong>Question {questionIndex + 1} of {questions.length}</strong>
              <span>⭐ Correct: {score}</span>
            </div>

            <div
              style={{
                height: "9px",
                background: "#e8eadc",
                borderRadius: "20px",
                overflow: "hidden",
                margin: "16px 0 24px",
              }}
            >
              <div
                style={{
                  width: `${((questionIndex + 1) / questions.length) * 100}%`,
                  height: "100%",
                  background: "#72945a",
                  borderRadius: "20px",
                  transition: "width 0.3s ease",
                }}
              />
            </div>

            <h2 style={{ fontSize: "clamp(19px, 3vw, 25px)", lineHeight: 1.5, marginBottom: "22px" }}>
              {currentQuestion.text}
            </h2>

            <div style={{ display: "grid", gap: "12px" }}>
              {currentQuestion.options.map((option, index) => {
                const isCorrect = checked && option === currentQuestion.answer;
                const isWrong = checked && selected === option && option !== currentQuestion.answer;

                return (
                  <button
                    key={`${questionIndex}-${index}`}
                    onClick={() => !checked && setSelected(option)}
                    disabled={checked}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "15px 17px",
                      borderRadius: "12px",
                      border: isCorrect
                        ? "2px solid #4b9255"
                        : isWrong
                          ? "2px solid #c65b4d"
                          : selected === option
                            ? "2px solid #78985d"
                            : "1px solid #d9ddcc",
                      background: isCorrect
                        ? "#e5f4e5"
                        : isWrong
                          ? "#fbe9e5"
                          : selected === option
                            ? "#edf2e5"
                            : "#fff",
                      color: "#263b2b",
                      cursor: checked ? "default" : "pointer",
                      fontSize: "15px",
                      fontWeight: selected === option ? 700 : 500,
                    }}
                  >
                    <span style={{ marginRight: "10px" }}>
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                    {isCorrect && <span style={{ float: "right" }}>✓</span>}
                    {isWrong && <span style={{ float: "right" }}>✗</span>}
                  </button>
                );
              })}
            </div>

            {checked && (
              <div
                style={{
                  marginTop: "20px",
                  padding: "14px",
                  borderRadius: "10px",
                  background: selected === currentQuestion.answer ? "#e5f4e5" : "#fbe9e5",
                  color: "#263b2b",
                  fontWeight: 600,
                }}
              >
                {selected === currentQuestion.answer
                  ? "🎉 Correct! You earned 20 bonus coins."
                  : `Not quite! The correct answer is: ${currentQuestion.answer}`}
              </div>
            )}

            <div style={{ marginTop: "24px" }}>
              {!checked ? (
                <button
                  className="primary-btn full-btn"
                  onClick={checkAnswer}
                  disabled={!selected}
                  style={{ opacity: selected ? 1 : 0.55 }}
                >
                  Check Answer →
                </button>
              ) : (
                <button className="primary-btn full-btn" onClick={nextQuestion}>
                  {questionIndex === questions.length - 1 ? "See Quiz Results →" : "Next Question →"}
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <div
          className="result-page"
          style={{ maxWidth: "720px", margin: "0 auto" }}
        >
          <div className="result-confetti">🎉 ✨ 🎊 ✨ 🎉</div>
          <div className="result-medal">🧠</div>
          <span className="eyebrow">QUIZ COMPLETED</span>
          <h1>Well Done, Adventurer!</h1>
          <p className="result-message">
            You completed the {mission.name} quiz!
          </p>

          <div className="result-stats">
            <div>
              <span>⭐</span>
              <strong>{finalScore}/5</strong>
              <small>Correct answers</small>
            </div>
            <div>
              <span>🪙</span>
              <strong>+{bonus}</strong>
              <small>Bonus coins</small>
            </div>
          </div>

          <div className="learning-result-card">
            <h2>
              {finalScore === 5
                ? "Perfect Score! 🌟"
                : finalScore >= 3
                  ? "Great Effort! 👏"
                  : "Keep Learning! 🌱"}
            </h2>
            <p>
              {finalScore === 5
                ? "Amazing! You answered every question correctly."
                : "Every question is a chance to learn something new. Keep practising!"}
            </p>
            <p style={{ marginTop: "12px" }}>
              You earned {bonus} bonus coins for your correct answers.
            </p>
          </div>

          <button className="primary-btn full-btn" onClick={onContinue}>
            Return to Mission Village →
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
