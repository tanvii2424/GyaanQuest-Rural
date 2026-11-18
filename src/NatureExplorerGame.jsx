
import { useState } from "react";

const challenges = [
  {
    title: "🌧️ Water Cycle",
    description: "Help the village understand how water moves through nature.",
    question: "What happens when the Sun heats water in rivers and lakes?",
    options: ["Freezing", "Evaporation", "Condensation", "Rainfall"],
    answer: "Evaporation",
    explanation:
      "The Sun heats water and changes it into water vapour. This process is called evaporation.",
  },
  {
    title: "🌱 Plant Life",
    description: "Help a farmer grow healthy plants.",
    question: "What do plants mainly need to make their food?",
    options: [
      "Sunlight, water and carbon dioxide",
      "Only soil",
      "Only water",
      "Sand and stones",
    ],
    answer: "Sunlight, water and carbon dioxide",
    explanation:
      "Plants use sunlight, water and carbon dioxide to prepare food through photosynthesis.",
  },
  {
    title: "🦋 Food Chains",
    description: "Discover how living things depend on each other.",
    question: "In a grass → grasshopper → frog food chain, what eats the grasshopper?",
    options: ["Grass", "Frog", "Sun", "Tree"],
    answer: "Frog",
    explanation:
      "The frog eats the grasshopper. This shows how energy moves through a food chain.",
  },
];

export default function NatureExplorerGame({ onFinish, onBack }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const challenge = challenges[current];
  const correctCount = answers.filter(Boolean).length;

  function checkAnswer() {
    if (!selected) return;

    const isCorrect = selected === challenge.answer;
    const updatedAnswers = [...answers, isCorrect];

    setAnswers(updatedAnswers);

    if (current === challenges.length - 1) {
      setFinished(true);
    } else {
      setCurrent(current + 1);
      setSelected("");
    }
  }

  function completeMission() {
    const score = correctCount;
    const reward = score * 30;

    onFinish(
      "nature",
      score,
      reward,
      "Nature Explorer Completed! 🌿",
      [
        "Understanding the water cycle",
        "Learning about photosynthesis",
        "Understanding food chains and ecosystems",
      ],
      `You completed ${score} out of 3 Science challenges and explored the wonders of nature!`
    );
  }

  if (finished) {
    return (
      <div className="game-card">
        <div className="game-header">
          <span>🌿 SCIENCE MISSION</span>
          <h1>Nature Explorer Completed!</h1>
          <p>You explored the wonders of nature.</p>
        </div>

        <div className="game-result">
          <div style={{ fontSize: "65px" }}>🌳</div>
          <h2>{correctCount} / 3 Correct Answers</h2>
          <p>⭐ {correctCount} Science Stars</p>
          <p>🪙 {correctCount * 30} Coins Earned</p>
        </div>

        <button className="primary-btn" onClick={completeMission}>
          Collect Rewards →
        </button>
      </div>
    );
  }

  return (
    <div className="game-card">
      <div className="game-header">
        <span>🌿 SCIENCE MISSION</span>
        <h1>Nature Explorer</h1>
        <p>Explore nature and complete all three challenges!</p>
      </div>

      <div className="game-progress">
        Challenge {current + 1} of {challenges.length}
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: `${((current + 1) / challenges.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="nature-scene">
        <span>☀️</span>
        <span>☁️</span>
        <span>🌳</span>
        <span>🌱</span>
        <span>🦋</span>
        <span>💧</span>
      </div>

      <div className="challenge-card">
        <h2>{challenge.title}</h2>
        <p>{challenge.description}</p>

        <h3>{challenge.question}</h3>

        <div className="nature-options">
          {challenge.options.map((option) => (
            <button
              key={option}
              className={`nature-option ${
                selected === option ? "selected" : ""
              }`}
              onClick={() => setSelected(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <button
          className="primary-btn"
          disabled={!selected}
          onClick={checkAnswer}
        >
          {current === challenges.length - 1
            ? "Finish Challenge"
            : "Next Challenge →"}
        </button>
      </div>

      <button className="back-btn" onClick={onBack}>
        ← Back to Village
      </button>
    </div>
  );
}
