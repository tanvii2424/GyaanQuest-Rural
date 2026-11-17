
import { useState } from "react";
import "./App.css";

// ==================== GAME SETTINGS ====================

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
    description: "Run your own farm, grow crops and manage your resources.",
    color: "#e5f3d8",
  },
  {
    id: "water",
    icon: "💧",
    name: "Save Every Drop",
    subject: "Maths + Science",
    description: "Help your village save water and solve real-life water challenges.",
    color: "#dceffc",
  },
  {
    id: "bus",
    icon: "🚌",
    name: "Village Bus Stand",
    subject: "Maths + Life Skills",
    description: "Manage passengers, tickets, fares and a village bus journey.",
    color: "#fce9d8",
  },
];

// ==================== MAIN APP ====================

export default function App() {
  const [page, setPage] = useState("welcome");
  const [studentName, setStudentName] = useState("");
  const [grade, setGrade] = useState("7");
  const [mode, setMode] = useState("individual");
  const [teamMembers, setTeamMembers] = useState(3);
  const [activeMission, setActiveMission] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [coins, setCoins] = useState(500);
  const [stars, setStars] = useState(0);

  const settings = gradeSettings[grade];

  function finishMission(id, reward) {
    if (!completed.includes(id)) {
      setCompleted((old) => [...old, id]);
      setCoins((old) => old + reward);
      setStars((old) => old + 1);
    }
    setPage("dashboard");
    setActiveMission(null);
  }

  function openMission(mission) {
    setActiveMission(mission);
    setPage("intro");
  }

  return (
    <div className="gq-app">
      <style>{`
        * { box-sizing: border-box; }
        .gq-app {
          min-height: 100vh;
          padding: 24px 16px 50px;
          background: linear-gradient(135deg, #fff4f7, #fff9ed);
          color: #493844;
          font-family: Arial, sans-serif;
        }
        .gq-shell { max-width: 1050px; margin: auto; }
        .gq-header {
          display: flex; justify-content: space-between; align-items: center;
          gap: 12px; flex-wrap: wrap; margin-bottom: 25px;
        }
        .gq-logo { font-size: 25px; font-weight: 900; color: #a34c79; }
        .gq-tagline { font-size: 11px; letter-spacing: 2px; color: #936b80; margin-top: 4px; }
        .gq-pill {
          background: white; border: 1px solid #f0d6e2; border-radius: 30px;
          padding: 10px 15px; font-size: 13px; font-weight: bold;
        }
        .gq-panel {
          background: rgba(255,255,255,.94); border: 1px solid #f1dce5;
          border-radius: 22px; padding: 28px; margin-bottom: 20px;
          box-shadow: 0 8px 25px rgba(120,70,95,.07);
        }
        .gq-center { text-align: center; }
        .gq-kicker { color: #b36a8c; font-weight: bold; font-size: 12px; letter-spacing: 2px; }
        .gq-title { font-size: clamp(27px, 5vw, 43px); line-height: 1.15; margin: 12px 0; color: #71445d; }
        .gq-subtitle { color: #806d79; line-height: 1.65; max-width: 680px; margin: 10px auto; }
        .gq-btn {
          border: 0; border-radius: 12px; padding: 13px 20px; cursor: pointer;
          background: #b85f88; color: white; font-size: 14px; font-weight: bold;
          margin: 5px; transition: .2s;
        }
        .gq-btn:hover { transform: translateY(-2px); filter: brightness(.97); }
        .gq-btn.secondary { background: #f7e8ef; color: #884e6b; }
        .gq-btn.green { background: #65965d; }
        .gq-btn.blue { background: #4c91b5; }
        .gq-btn.orange { background: #d58b4d; }
        .gq-btn:disabled { opacity: .45; cursor: not-allowed; transform: none; }
        .gq-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(220px,1fr)); gap: 16px; }
        .gq-card {
          border: 1px solid #f0dce5; border-radius: 18px; padding: 20px;
          background: white; text-align: left;
        }
        .gq-card h3 { margin: 8px 0; color: #71445d; }
        .gq-card p { color: #806d79; font-size: 14px; line-height: 1.5; }
        .gq-icon { font-size: 38px; }
        .gq-label { display: block; font-weight: bold; margin: 14px 0 7px; font-size: 13px; }
        .gq-input, .gq-select {
          width: 100%; padding: 12px; border: 1px solid #e8cbd9;
          border-radius: 10px; background: white; color: #493844; font-size: 15px;
        }
        .gq-stats { display: grid; grid-template-columns: repeat(auto-fit,minmax(120px,1fr)); gap: 12px; margin: 18px 0; }
        .gq-stat { background: #fff2f7; border-radius: 14px; padding: 15px; text-align: center; }
        .gq-stat strong { display: block; font-size: 24px; color: #a34c79; }
        .gq-stat span { font-size: 12px; color: #806d79; }
        .gq-progress { height: 10px; background: #f3e4eb; border-radius: 20px; overflow: hidden; margin: 12px 0; }
        .gq-progress > div { height: 100%; background: #b85f88; transition: width .25s; }
        .gq-question { background: #fff6e9; border-radius: 15px; padding: 18px; margin: 16px 0; line-height: 1.6; }
        .gq-option { background: white; border: 1px solid #ead4df; padding: 12px; border-radius: 10px; margin: 7px 0; cursor: pointer; }
        .gq-option.selected { border: 2px solid #b85f88; background: #fff1f7; }
        .gq-small { font-size: 12px; color: #8d7884; }
        .gq-plot {
          border: 2px solid #c8dfb7; border-radius: 14px; padding: 15px;
          background: #eff8e9; text-align: center; min-height: 125px;
        }
        .gq-plot strong { display: block; margin: 7px 0; }
        .gq-notice { padding: 12px; border-radius: 10px; background: #f7edf2; margin: 12px 0; }
        @media(max-width:600px) {
          .gq-panel { padding: 20px 16px; }
          .gq-header { align-items: flex-start; }
        }
      `}</style>

      <div className="gq-shell">
        <header className="gq-header">
          <div>
            <div className="gq-logo">🏡 GyaanQuest</div>
            <div className="gq-tagline">LEARN • PLAY • GROW</div>
          </div>
          <div className="gq-pill">● Offline Friendly</div>
        </header>

        {page === "welcome" && (
          <WelcomePage onStart={() => setPage("setup")} />
        )}

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
            onContinue={() => setPage("dashboard")}
          />
        )}

        {page === "dashboard" && (
          <Dashboard
            name={studentName}
            grade={grade}
            mode={mode}
            teamMembers={teamMembers}
            coins={coins}
            stars={stars}
            completed={completed}
            onOpen={openMission}
            onChangeProfile={() => setPage("setup")}
          />
        )}

        {page === "intro" && activeMission && (
          <MissionIntro
            mission={activeMission}
            onStart={() => setPage("game")}
            onBack={() => setPage("dashboard")}
          />
        )}

        {page === "game" && activeMission?.id === "farm" && (
          <FarmingGame
            settings={settings}
            onFinish={() => finishMission("farm", 100)}
            onBack={() => setPage("dashboard")}
          />
        )}

        {page === "game" && activeMission?.id === "water" && (
          <WaterGame
            settings={settings}
            onFinish={() => finishMission("water", 100)}
            onBack={() => setPage("dashboard")}
          />
        )}

        {page === "game" && activeMission?.id === "bus" && (
          <BusGame
            settings={settings}
            onFinish={() => finishMission("bus", 100)}
            onBack={() => setPage("dashboard")}
          />
        )}
      </div>
    </div>
  );
}

// ==================== WELCOME PAGE ====================

function WelcomePage({ onStart }) {
  return (
    <section className="gq-panel gq-center">
      <div style={{ fontSize: 65 }}>🏡🌻</div>
      <div className="gq-kicker">YOUR ADVENTURE BEGINS</div>
      <h1 className="gq-title">Welcome to Mission Village!</h1>
      <p className="gq-subtitle">
        Learning should connect with the world around us. Many students
        learn better when they can explore, experiment and solve everyday
        challenges. GyaanQuest turns village life into an exciting adventure.
      </p>
      <div className="gq-grid" style={{ margin: "28px 0" }}>
        <div className="gq-card">
          <div className="gq-icon">🌾</div>
          <h3>Explore</h3>
          <p>Discover challenges inspired by everyday village life.</p>
        </div>
        <div className="gq-card">
          <div className="gq-icon">🧠</div>
          <h3>Think</h3>
          <p>Make decisions and solve practical problems.</p>
        </div>
        <div className="gq-card">
          <div className="gq-icon">🏆</div>
          <h3>Achieve</h3>
          <p>Earn rewards as you complete your missions.</p>
        </div>
      </div>
      <button className="gq-btn" onClick={onStart}>Start Your Adventure →</button>
    </section>
  );
}

// ==================== PLAYER SETUP ====================

function SetupPage({
  studentName, setStudentName, grade, setGrade, mode, setMode,
  teamMembers, setTeamMembers, onContinue,
}) {
  const canContinue = studentName.trim().length > 0;

  return (
    <section className="gq-panel">
      <div className="gq-kicker">PLAYER SETUP</div>
      <h1 className="gq-title">Let's get you ready!</h1>
      <p className="gq-subtitle" style={{ marginLeft: 0 }}>
        Tell us a little about your learning adventure.
      </p>

      <label className="gq-label">Your name</label>
      <input
        className="gq-input"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        placeholder="Enter your name"
        maxLength={30}
      />

      <label className="gq-label">Select your class</label>
      <select className="gq-select" value={grade} onChange={(e) => setGrade(e.target.value)}>
        {[7, 8, 9, 10].map((g) => <option key={g} value={g}>Class {g}</option>)}
      </select>

      <label className="gq-label">Choose how you want to play</label>
      <div className="gq-grid">
        <div
          className={`gq-card ${mode === "individual" ? "selected" : ""}`}
          onClick={() => setMode("individual")}
          style={{ cursor: "pointer", border: mode === "individual" ? "2px solid #b85f88" : undefined }}
        >
          <div className="gq-icon">🧑‍🎓</div>
          <h3>Individual Play</h3>
          <p>Play on your own and complete each mission.</p>
        </div>
        <div
          className="gq-card"
          onClick={() => setMode("team")}
          style={{ cursor: "pointer", border: mode === "team" ? "2px solid #b85f88" : undefined }}
        >
          <div className="gq-icon">👩‍👩‍👧</div>
          <h3>Team Play</h3>
          <p>Work together with friends on one shared device.</p>
        </div>
      </div>

      {mode === "team" && (
        <>
          <label className="gq-label">Number of team members</label>
          <select
            className="gq-select"
            value={teamMembers}
            onChange={(e) => setTeamMembers(Number(e.target.value))}
          >
            {[3, 4, 5].map((n) => <option key={n} value={n}>{n} students</option>)}
          </select>
        </>
      )}

      <div style={{ textAlign: "center", marginTop: 25 }}>
        <button className="gq-btn" disabled={!canContinue} onClick={onContinue}>
          Enter Mission Village →
        </button>
      </div>
    </section>
  );
}

// ==================== DASHBOARD ====================

function Dashboard({
  name, grade, mode, teamMembers, coins, stars, completed, onOpen, onChangeProfile,
}) {
  return (
    <>
      <section className="gq-panel">
        <div className="gq-kicker">YOUR LEARNING DASHBOARD</div>
        <h1 className="gq-title" style={{ fontSize: 32 }}>Hello, {name || "Explorer"}! 👋</h1>
        <p className="gq-subtitle" style={{ marginLeft: 0 }}>
          Welcome to your village adventure. Choose a mission and get started!
        </p>
        <div className="gq-stats">
          <div className="gq-stat"><strong>Class {grade}</strong><span>Your class</span></div>
          <div className="gq-stat"><strong>{stars} ⭐</strong><span>Missions completed</span></div>
          <div className="gq-stat"><strong>{coins} 🪙</strong><span>Village coins</span></div>
          <div className="gq-stat">
            <strong>{mode === "team" ? "Team" : "Solo"}</strong>
            <span>{mode === "team" ? `${teamMembers} students` : "Individual play"}</span>
          </div>
        </div>
        <button className="gq-btn secondary" onClick={onChangeProfile}>Edit Player Setup</button>
      </section>

      <section className="gq-panel">
        <div className="gq-kicker">LEARNING ADVENTURES</div>
        <h2 style={{ color: "#71445d" }}>Choose Your Mission</h2>
        <p className="gq-small">Complete all three village missions to collect your rewards.</p>
        <div className="gq-grid">
          {missions.map((mission) => (
            <div className="gq-card" key={mission.id}>
              <div className="gq-icon">{mission.icon}</div>
              <h3>{mission.name}</h3>
              <p>{mission.description}</p>
              <p className="gq-small">{mission.subject}</p>
              {completed.includes(mission.id) && <div className="gq-notice">✓ Mission completed!</div>}
              <button className="gq-btn" onClick={() => onOpen(mission)}>
                {completed.includes(mission.id) ? "Play Again" : "Explore Mission →"}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="gq-panel">
        <h2 style={{ color: "#71445d" }}>What will you explore?</h2>
        <div className="gq-grid">
          <div className="gq-card"><strong>🔢 Maths</strong><p>Numbers, calculations, measurement and money.</p></div>
          <div className="gq-card"><strong>🔬 Science</strong><p>Plants, water, natural resources and the environment.</p></div>
          <div className="gq-card"><strong>🤝 Life Skills</strong><p>Decision-making, teamwork and everyday problem-solving.</p></div>
        </div>
      </section>
    </>
  );
}

// ==================== MISSION INTRO ====================

function MissionIntro({ mission, onStart, onBack }) {
  const descriptions = {
    farm: "Your village farm needs a helping hand! Prepare the land, grow crops and make sure every plant gets the care it needs.",
    water: "Your village is facing a water shortage. Find ways to stop wastage, collect rainwater and make sure every household gets water.",
    bus: "The village bus is ready for its journey. Help passengers travel safely and manage the bus stand efficiently.",
  };

  return (
    <section className="gq-panel gq-center">
      <div className="gq-icon" style={{ fontSize: 65 }}>{mission.icon}</div>
      <div className="gq-kicker">MISSION BRIEFING</div>
      <h1 className="gq-title">{mission.name}</h1>
      <p className="gq-subtitle">{descriptions[mission.id]}</p>
      <div className="gq-question">
        <strong>Your challenge:</strong>
        <p>Explore the situation, make smart decisions and complete the mission to earn 100 village coins!</p>
      </div>
      <button className="gq-btn" onClick={onStart}>Start Mission →</button>
      <button className="gq-btn secondary" onClick={onBack}>Back to Dashboard</button>
    </section>
  );
}

// ==================== SMART FARMING ====================

function FarmingGame({ settings, onFinish, onBack }) {
  const [plots, setPlots] = useState([0, 0, 0, 0, 0, 0]);
  const [water, setWater] = useState(settings.farmWater);
  const [message, setMessage] = useState("Tap an empty field to plant a crop.");
  const [harvested, setHarvested] = useState(0);

  function updatePlot(index) {
    const current = plots[index];
    const next = [...plots];

    if (current === 0) {
      next[index] = 1;
      setMessage("🌱 Seeds planted! Give your crop some water.");
    } else if (current === 1) {
      if (water <= 0) {
        setMessage("You are out of water! Manage your water supply carefully.");
        return;
      }
      next[index] = 2;
      setWater((old) => old - 1);
      setMessage("💦 Your crop has been watered!");
    } else if (current === 2) {
      next[index] = 3;
      setHarvested((old) => old + 1);
      setMessage("🌾 Great harvest! You collected one crop.");
    } else {
      setMessage("This plot has already been harvested.");
      return;
    }

    setPlots(next);
  }

  const target = settings.farmTarget;
  const won = harvested >= target;

  return (
    <section className="gq-panel">
      <div className="gq-kicker">🌾 SMART FARMING</div>
      <h1 className="gq-title" style={{ fontSize: 32 }}>Run Your Village Farm</h1>
      <p className="gq-subtitle" style={{ marginLeft: 0 }}>
        Plant seeds, water your crops and harvest your farm.
      </p>

      <div className="gq-stats">
        <div className="gq-stat"><strong>{harvested}/{target}</strong><span>Crops harvested</span></div>
        <div className="gq-stat"><strong>{water} 💧</strong><span>Water units left</span></div>
      </div>

      <div className="gq-progress"><div style={{ width: `${Math.min(100, harvested / target * 100)}%` }} /></div>

      <div className="gq-question">
        <strong>🌻 Your Farming Situation</strong>
        <p>You need to harvest {target} crops. Each plot needs to be planted and watered before harvesting.</p>
        <strong>Tap each field to complete its stages.</strong>
      </div>

      <div className="gq-grid">
        {plots.map((stage, index) => (
          <button className="gq-plot" key={index} onClick={() => updatePlot(index)} disabled={won}>
            <span style={{ fontSize: 30 }}>{["🟫", "🌱", "🌿", "🌾"][stage]}</span>
            <strong>Field {index + 1}</strong>
            <span className="gq-small">{["Empty field", "Seeds planted", "Growing crop", "Harvested"][stage]}</span>
          </button>
        ))}
      </div>

      <div className="gq-notice">{message}</div>

      {won ? (
        <div className="gq-center">
          <h2>🎉 Your farm is successful!</h2>
          <p>You harvested {harvested} crops. Well done, farmer!</p>
          <button className="gq-btn green" onClick={onFinish}>Collect 100 Coins</button>
        </div>
      ) : (
        <button className="gq-btn secondary" onClick={onBack}>Exit Mission</button>
      )}
    </section>
  );
}

// ==================== SAVE EVERY DROP ====================

function WaterGame({ settings, onFinish, onBack }) {
  const [leakFixed, setLeakFixed] = useState(false);
  const [rainCollected, setRainCollected] = useState(false);
  const [allocation, setAllocation] = useState([0, 0, 0]);
  const [message, setMessage] = useState("Start by repairing the leaking village pipe.");

  const total = settings.waterTarget;
  const allocated = allocation.reduce((sum, value) => sum + value, 0);
  const targetEach = total / 3;
  const complete = leakFixed && rainCollected && allocation.every((v) => v >= targetEach);

  function changeAllocation(index, value) {
    const next = [...allocation];
    const amount = Math.max(0, Number(value));
    const otherTotal = allocation.reduce((sum, v, i) => i === index ? sum : sum + v, 0);
    next[index] = Math.min(amount, total - otherTotal);
    setAllocation(next);
  }

  return (
    <section className="gq-panel">
      <div className="gq-kicker">💧 SAVE EVERY DROP</div>
      <h1 className="gq-title" style={{ fontSize: 32 }}>Help Your Village Save Water</h1>
      <p className="gq-subtitle" style={{ marginLeft: 0 }}>
        Complete the tasks to make sure the village has enough water.
      </p>

      <div className="gq-stats">
        <div className="gq-stat"><strong>{total} L</strong><span>Village water target</span></div>
        <div className="gq-stat"><strong>{allocated} L</strong><span>Water allocated</span></div>
      </div>

      <div className="gq-card">
        <h3>1. Repair the leaking pipe 🔧</h3>
        <p>A village pipe is wasting water. Stop the leak before it gets worse.</p>
        <button className="gq-btn blue" disabled={leakFixed} onClick={() => {
          setLeakFixed(true);
          setMessage("Great! The pipe has been repaired.");
        }}>
          {leakFixed ? "✓ Pipe Repaired" : "Repair Pipe"}
        </button>
      </div>

      <div className="gq-card" style={{ marginTop: 14 }}>
        <h3>2. Collect rainwater 🌧️</h3>
        <p>Set up a rainwater collection system for the village.</p>
        <button className="gq-btn blue" disabled={rainCollected || !leakFixed} onClick={() => {
          setRainCollected(true);
          setMessage("Wonderful! Rainwater collection is ready.");
        }}>
          {rainCollected ? "✓ Rainwater Collected" : "Set Up Collection"}
        </button>
        {!leakFixed && <p className="gq-small">Repair the pipe first.</p>}
      </div>

      <div className="gq-card" style={{ marginTop: 14 }}>
        <h3>3. Share water fairly 🏘️</h3>
        <p>Divide {total} litres equally between three village areas. Each area needs at least {targetEach} litres.</p>
        {["Homes", "School", "Farm"].map((area, index) => (
          <div key={area} style={{ margin: "12px 0" }}>
            <label className="gq-label">{area}: {allocation[index]} litres</label>
            <input
              className="gq-input"
              type="number"
              min="0"
              max={total}
              value={allocation[index]}
              onChange={(e) => changeAllocation(index, e.target.value)}
            />
          </div>
        ))}
        <p className="gq-small">Total allocated: {allocated} / {total} litres</p>
      </div>

      <div className="gq-notice">{message}</div>

      {complete ? (
        <div className="gq-center">
          <h2>🎉 Your village is water-wise!</h2>
          <p>You repaired the leak, collected rainwater and shared water fairly.</p>
          <button className="gq-btn green" onClick={onFinish}>Collect 100 Coins</button>
        </div>
      ) : (
        <>
          <p className="gq-small">Complete all three tasks to finish this mission.</p>
          <button className="gq-btn secondary" onClick={onBack}>Exit Mission</button>
        </>
      )}
    </section>
  );
}

// ==================== VILLAGE BUS STAND ====================

function BusGame({ settings, onFinish, onBack }) {
  const [route, setRoute] = useState("");
  const [passengers, setPassengers] = useState(0);
  const [adultTickets, setAdultTickets] = useState(0);
  const [studentTickets, setStudentTickets] = useState(0);
  const [message, setMessage] = useState("Choose a route to begin your journey.");

  const capacity = settings.busCapacity;
  const totalTickets = adultTickets + studentTickets;
  const revenue = adultTickets * settings.fare + studentTickets * (settings.fare / 2);
  const completed = route !== "" && passengers > 0 && totalTickets === passengers;

  function boardPassenger() {
    if (passengers >= capacity) {
      setMessage("The bus is full! You cannot board more passengers.");
      return;
    }
    setPassengers((old) => old + 1);
    setMessage("A passenger has boarded. Remember to issue a ticket!");
  }

  function issueTicket(type) {
    if (totalTickets >= passengers) {
      setMessage("Board a passenger before issuing another ticket.");
      return;
    }
    if (type === "adult") setAdultTickets((old) => old + 1);
    else setStudentTickets((old) => old + 1);
    setMessage("Ticket issued successfully!");
  }

  return (
    <section className="gq-panel">
      <div className="gq-kicker">🚌 VILLAGE BUS STAND</div>
      <h1 className="gq-title" style={{ fontSize: 32 }}>Manage Your Village Bus</h1>
      <p className="gq-subtitle" style={{ marginLeft: 0 }}>
        Choose a route, board passengers and manage their tickets.
      </p>

      <div className="gq-stats">
        <div className="gq-stat"><strong>{passengers}/{capacity}</strong><span>Passengers</span></div>
        <div className="gq-stat"><strong>{totalTickets}</strong><span>Tickets issued</span></div>
        <div className="gq-stat"><strong>₹{revenue}</strong><span>Fare collected</span></div>
      </div>

      <div className="gq-card">
        <h3>1. Choose your bus route</h3>
        {["Village to School", "Village to Market", "Village to Hospital"].map((item) => (
          <div
            key={item}
            className={`gq-option ${route === item ? "selected" : ""}`}
            onClick={() => {
              setRoute(item);
              setMessage(`Route selected: ${item}`);
            }}
          >
            {route === item ? "🔘" : "⚪"} {item}
          </div>
        ))}
      </div>

      <div className="gq-card" style={{ marginTop: 14 }}>
        <h3>2. Board passengers</h3>
        <p>Make sure the bus does not exceed its capacity.</p>
        <button className="gq-btn orange" disabled={!route || passengers >= capacity} onClick={boardPassenger}>
          + Board Passenger
        </button>
      </div>

      <div className="gq-card" style={{ marginTop: 14 }}>
        <h3>3. Issue passenger tickets</h3>
        <p>Adult fare: ₹{settings.fare} | Student fare: ₹{settings.fare / 2}</p>
        <button className="gq-btn orange" disabled={totalTickets >= passengers} onClick={() => issueTicket("adult")}>
          Adult Ticket
        </button>
        <button className="gq-btn orange" disabled={totalTickets >= passengers} onClick={() => issueTicket("student")}>
          Student Ticket
        </button>
        <p className="gq-small">Adult tickets: {adultTickets} | Student tickets: {studentTickets}</p>
      </div>

      <div className="gq-notice">{message}</div>

      {completed ? (
        <div className="gq-center">
          <h2>🎉 Bus ready for departure!</h2>
          <p>Route: {route}</p>
          <p>Passengers: {passengers} | Tickets: {totalTickets} | Revenue: ₹{revenue}</p>
          <button className="gq-btn green" onClick={onFinish}>Start Trip & Collect 100 Coins</button>
        </div>
      ) : (
        <>
          <p className="gq-small">Choose a route, board at least one passenger and issue a ticket to each passenger.</p>
          <button className="gq-btn secondary" onClick={onBack}>Exit Mission</button>
        </>
      )}
    </section>
  );
}
