
      {/* WELCOME PAGE */}

      {screen === "home" && (
        <main className="home">
          <section className="welcome">
            <div>
              <span className="eyebrow">WELCOME TO A NEW WAY OF LEARNING</span>

              <h1>
                Learning becomes an <span>Adventure!</span> 🌱
              </h1>

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

              <button
                className="start-btn"
                onClick={() => setScreen("login")}
              >
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
            borderRadius: "18px"
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
              marginTop: "25px"
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
