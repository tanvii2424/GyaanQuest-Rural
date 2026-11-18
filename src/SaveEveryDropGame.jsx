
import { useState } from "react";

const initialPipes = [
  { id: 1, type: "source", rotation: 0, fixed: true },
  { id: 2, type: "straight", rotation: 0 },
  { id: 3, type: "corner", rotation: 0 },
  { id: 4, type: "straight", rotation: 90 },

  { id: 5, type: "corner", rotation: 90 },
  { id: 6, type: "straight", rotation: 90 },
  { id: 7, type: "corner", rotation: 180 },
  { id: 8, type: "straight", rotation: 0 },

  { id: 9, type: "straight", rotation: 0 },
  { id: 10, type: "corner", rotation: 0 },
  { id: 11, type: "corner", rotation: 270 },
  { id: 12, type: "target", rotation: 0, fixed: true },
];

const basePorts = {
  source: ["E"],
  target: ["W"],
  straight: ["W", "E"],
  corner: ["N", "E"],
};

const directions = {
  N: { opposite: "S", dx: 0, dy: -1 },
  E: { opposite: "W", dx: 1, dy: 0 },
  S: { opposite: "N", dx: 0, dy: 1 },
  W: { opposite: "E", dx: -1, dy: 0 },
};

function getPorts(pipe) {
  let ports = [...basePorts[pipe.type]];

  const turns = (pipe.rotation / 90) % 4;

  for (let i = 0; i < turns; i++) {
    ports = ports.map((port) => ({
      N: "E",
      E: "S",
      S: "W",
      W: "N",
    })[port]);
  }

  return ports;
}

function findWaterPath(pipes) {
  const visited = new Set([0]);
  const queue = [[0, [0]]];

  while (queue.length) {
    const [current, path] = queue.shift();

    if (current === 11) return path;

    const x = current % 4;
    const y = Math.floor(current / 4);
    const currentPorts = getPorts(pipes[current]);

    for (const direction of currentPorts) {
      const { dx, dy, opposite } = directions[direction];
      const nx = x + dx;
      const ny = y + dy;

      if (nx < 0 || nx > 3 || ny < 0 || ny > 2) continue;

      const next = ny * 4 + nx;

      if (visited.has(next)) continue;

      if (!getPorts(pipes[next]).includes(opposite)) continue;

      visited.add(next);
      queue.push([next, [...path, next]]);
    }
  }

  return null;
}

export default function SaveEveryDropGame({
  studentName = "Explorer",
  selectedClass = "7",
  onBack,
  onComplete,
}) {
  const [pipes, setPipes] = useState(initialPipes);
  const [waterPath, setWaterPath] = useState([]);
  const [released, setReleased] = useState(false);
  const [message, setMessage] = useState("");
  const [completed, setCompleted] = useState(false);
  const [waterSaved, setWaterSaved] = useState(0);

  function rotatePipe(index) {
    if (completed || pipes[index].fixed || released) return;

    setPipes((old) =>
      old.map((pipe, i) =>
        i === index
          ? { ...pipe, rotation: (pipe.rotation + 90) % 360 }
          : pipe
      )
    );

    setMessage("");
  }

  function releaseWater() {
    const path = findWaterPath(pipes);

    if (path) {
      setWaterPath(path);
      setReleased(true);
      setWaterSaved(500);

      setMessage(
        "Amazing! You connected the pipeline. Water is flowing to the village!"
      );

      setCompleted(true);
    } else {
      setWaterPath([]);
      setMessage(
        "Oh no! The water cannot reach the houses yet. Rotate the pipes and try again!"
      );
    }
  }

  function tryAgain() {
    setReleased(false);
    setWaterPath([]);
    setMessage("");
  }

  function restartGame() {
    setPipes(initialPipes);
    setWaterPath([]);
    setReleased(false);
    setMessage("");
    setCompleted(false);
    setWaterSaved(0);
  }

  const activeCount = waterPath.length;

  return (
    <div style={styles.page}>
      <div style={styles.top}>
        <button style={styles.back} onClick={onBack}>
          ← Back to Village
        </button>
        <span style={styles.level}>MISSION 03 · LEVEL 1</span>
      </div>

      <h1 style={styles.heading}>💧 Save Every Drop</h1>
      <p style={styles.subtitle}>
        Welcome, {studentName}! The village needs your help.
      </p>

      <div style={styles.story}>
        <h3>🚨 Emergency at Mission Village!</h3>
        <p>
          A pipeline has been damaged. The village tank is full,
          but water cannot reach the houses. Repair the pipeline
          before the villagers run out of water!
        </p>
      </div>

      <div style={styles.stats}>
        <div style={styles.stat}>
          <span>💧</span>
          <strong>1,000 L</strong>
          <small>Tank capacity</small>
        </div>
        <div style={styles.stat}>
          <span>🏠</span>
          <strong>{completed ? "Connected" : "Waiting"}</strong>
          <small>Village supply</small>
        </div>
        <div style={styles.stat}>
          <span>⭐</span>
          <strong>{completed ? "3" : "0"}</strong>
          <small>Stars earned</small>
        </div>
      </div>

      <div style={styles.gameCard}>
        <h2>🛠️ Repair the Pipeline</h2>
        <p style={styles.instruction}>
          Tap a pipe to rotate it. Connect the blue water tank
          to the village house.
        </p>

        <div style={styles.labels}>
          <span>💧 WATER TANK</span>
          <span>🏡 VILLAGE</span>
        </div>

        <div style={styles.board}>
          {pipes.map((pipe, index) => {
            const flowing = waterPath.includes(index);

            return (
              <button
                key={pipe.id}
                onClick={() => rotatePipe(index)}
                disabled={pipe.fixed || released || completed}
                style={{
                  ...styles.pipe,
                  background: flowing
                    ? "#b8efff"
                    : pipe.fixed
                    ? "#e4f2ff"
                    : "#f2f5f8",
                  border: flowing
                    ? "3px solid #159bd1"
                    : "2px solid #d2dce6",
                  cursor: pipe.fixed || released ? "default" : "pointer",
                }}
                title="Tap to rotate pipe"
              >
                <span style={styles.pipeIcon}>
                  {pipe.type === "source"
                    ? "🚰"
                    : pipe.type === "target"
                    ? "🏠"
                    : pipe.type === "straight"
                    ? "━"
                    : "└"}
                </span>

                {pipe.type !== "source" &&
                  pipe.type !== "target" && (
                    <span
                      style={{
                        ...styles.rotation,
                        transform: `rotate(${pipe.rotation}deg)`,
                      }}
                    >
                      {pipe.type === "straight" ? "━" : "└"}
                    </span>
                  )}

                {flowing && <span style={styles.flow}>💧</span>}
              </button>
            );
          })}
        </div>

        <p style={styles.tip}>
          💡 Tip: Straight pipes connect two opposite sides.
          Corner pipes connect two neighbouring sides.
        </p>

        {!completed ? (
          <button style={styles.primary} onClick={releaseWater}>
            💦 Release Water
          </button>
        ) : (
          <div style={styles.success}>
            <h2>🎉 Pipeline Repaired!</h2>
            <p>The village water supply is restored!</p>
            <h3>+50 Coins · ⭐ 3 Stars</h3>
            <button
              style={styles.primary}
              onClick={() => onComplete?.(50, 3)}
            >
              Collect Rewards
            </button>
          </div>
        )}

        {message && (
          <div
            style={{
              ...styles.message,
              background: completed ? "#e2f8e9" : "#fff3d7",
            }}
          >
            {message}
          </div>
        )}

        {released && !completed && (
          <button style={styles.secondary} onClick={tryAgain}>
            Try Again
          </button>
        )}

        <button style={styles.restart} onClick={restartGame}>
          ↻ Restart Level
        </button>
      </div>

      <div style={styles.footer}>
        <strong>🌱 What you explored</strong>
        <p>
          Water conservation · Logical thinking ·
          Direction and spatial reasoning · Problem solving
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    maxWidth: 850,
    margin: "0 auto",
    padding: "24px 16px",
    color: "#25364a",
    fontFamily: "inherit",
  },
  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
  },
  back: {
    border: "none",
    background: "#edf2f7",
    padding: "10px 16px",
    borderRadius: 10,
    cursor: "pointer",
  },
  level: {
    fontSize: 12,
    fontWeight: 800,
    color: "#1685b5",
  },
  heading: {
    fontSize: "clamp(26px, 5vw, 38px)",
    marginBottom: 5,
  },
  subtitle: {
    color: "#64748b",
    marginTop: 0,
  },
  story: {
    background: "#eaf7ff",
    padding: 18,
    borderRadius: 16,
    margin: "20px 0",
    lineHeight: 1.6,
  },
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 10,
    marginBottom: 20,
  },
  stat: {
    background: "#f2f7fa",
    borderRadius: 14,
    padding: 14,
    display: "flex",
    flexDirection: "column",
    gap: 5,
    textAlign: "center",
  },
  gameCard: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 18,
    padding: 18,
    textAlign: "center",
    boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
  },
  instruction: {
    color: "#64748b",
    lineHeight: 1.6,
  },
  labels: {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: 420,
    margin: "24px auto 10px",
    fontSize: 11,
    fontWeight: 800,
    color: "#1685b5",
  },
  board: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: 8,
    maxWidth: 420,
    margin: "0 auto",
    padding: 10,
    background: "#eaf0f5",
    borderRadius: 16,
  },
  pipe: {
    aspectRatio: "1",
    borderRadius: 12,
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  pipeIcon: {
    fontSize: 27,
    color: "#1685b5",
  },
  rotation: {
    position: "absolute",
    fontSize: 45,
    color: "#1685b5",
    lineHeight: 1,
  },
  flow: {
    position: "absolute",
    fontSize: 17,
    top: 2,
    right: 3,
  },
  tip: {
    color: "#64748b",
    fontSize: 13,
    margin: "18px 0",
  },
  primary: {
    width: "100%",
    border: "none",
    borderRadius: 12,
    padding: 15,
    background: "#1685b5",
    color: "white",
    fontWeight: 800,
    fontSize: 16,
    cursor: "pointer",
  },
  secondary: {
    marginTop: 12,
    padding: 12,
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
  },
  restart: {
    marginTop: 12,
    display: "block",
    width: "100%",
    padding: 10,
    border: "none",
    background: "transparent",
    color: "#64748b",
    cursor: "pointer",
  },
  message: {
    marginTop: 15,
    padding: 14,
    borderRadius: 12,
    lineHeight: 1.5,
  },
  success: {
    background: "#e2f8e9",
    padding: 18,
    borderRadius: 14,
    marginTop: 12,
  },
  footer: {
    background: "#f2f7fa",
    borderRadius: 14,
    padding: 16,
    marginTop: 20,
    lineHeight: 1.6,
  },
};
