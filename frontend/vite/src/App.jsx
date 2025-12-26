import { useState } from "react";

function daysBetween(dueDate) {
  const today = new Date();
  const due = new Date(dueDate);
  return Math.ceil((due - today) / (1000 * 60 * 60 * 24));
}

function getColor(daysLeft) {
  if (daysLeft <= 7) return "#e53935";     // red
  if (daysLeft <= 14) return "#fb8c00";    // orange
  return "#43a047";                        // green
}

export default function App() {
  const [deadlines] = useState([
    {
      id: "1",
      title: "Math exam",
      dueDate: "2025-02-10",
      totalDays: 30
    },
    {
      id: "2",
      title: "Project submission",
      dueDate: "2025-03-01",
      totalDays: 45
    }
  ]);

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "Arial" }}>
      <h1>My Deadlines</h1>

      {deadlines.map((d) => {
        const daysLeft = daysBetween(d.dueDate);
        const progress = Math.max(
          0,
          Math.min(100, (daysLeft / d.totalDays) * 100)
        );

        return (
          <div
            key={d.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "6px",
              padding: "1rem",
              marginBottom: "1rem"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>{d.title}</strong>
              <span>{daysLeft} days left</span>
            </div>

            <div
              style={{
                marginTop: "0.5rem",
                height: "12px",
                background: "#eee",
                borderRadius: "6px",
                overflow: "hidden"
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: getColor(daysLeft),
                  transition: "width 0.4s ease"
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
