import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./home.css";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const hasToken = user?.tokenCount === 1;

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>WebName</h1>
        <div className="profile-circle"></div>
      </header>

      <div className="token-card">
        <h2>Current Tokens: {user?.tokenCount ?? 0}</h2>
      </div>

      <button
        className="submit-btn"
        disabled={!hasToken}
        onClick={() => navigate("/submit")}
      >
        Proceed to Submission Page
      </button>

      {!hasToken && (
        <p className="warning">
          You have already submitted a suggestion for this period.
        </p>
      )}
    </div>
  );
}
