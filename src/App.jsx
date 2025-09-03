import { useState } from "react";
import Login from "./components/auth/Login.jsx";
import Layout from "./components/Layout.jsx";

export default function App() {
  const [authed, setAuthed] = useState(false);
  const [session, setSession] = useState(0);
  const handleLogout = () => {
    setAuthed(false);
    setSession(s => s + 1);
  };

  return authed ? (
    <Layout onLogout={handleLogout} />
  ) : (
    <Login key={`login-${session}`} onSuccess={() => setAuthed(true)} />
  );
}
