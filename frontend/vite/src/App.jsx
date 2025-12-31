import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    fetch("/api/appointments")
      .then(r => r.json())
      .then(setData)
      .catch(e => setErr(String(e)));
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h1>Appointments</h1>
      {err ? <pre style={{ color: "crimson" }}>{err}</pre> : null}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
