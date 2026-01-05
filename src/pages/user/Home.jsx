import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [tokens, setTokens] = useState(0);
  const [forms, setForms] = useState([]);
  const [userTokens, setUserTokens] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!auth.user || !auth.user.token) {
          navigate("/");
          return;
        }
        
        // Fetch forms
        const formsResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/forms`,
          { headers: { Authorization: `Bearer ${auth.user.token}` } }
        );
        if (formsResponse.ok) {
          setForms(await formsResponse.json());
        }
        
        // Fetch user tokens
        const tokensResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/tokens/user/${auth.user.id}`,
          { headers: { Authorization: `Bearer ${auth.user.token}` } }
        );
        if (tokensResponse.ok) {
          const tokenData = await tokensResponse.json();
          setUserTokens(tokenData);
          setTokens(tokenData.length);
        }
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchData();
  }, [auth.user, navigate]);

  const handleAnswer = (formId) => {
    navigate(`/submit/${formId}`);
  };

  const hasTokenForForm = (formId) => {
    return userTokens.some(token => token.formId === formId || token.formId._id === formId);
  };

  return (
    <div className="user-home">
      {/* Top bar */}
      <div className="top-bar">
        <h1 className="web-name">Home </h1>
        <button className="account-btn" onClick={() => navigate("/profile")} />
      </div>

      <div className="content-container">
        {/* Tokens */}
        <div className="token-card">
          <h2>Current Tokens: {tokens}</h2>
        </div>

        {/* Table */}
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Form Title</th>
                <th>Season</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {forms.map((form) => {
                const isExpired = new Date(form.expiresAt) < new Date();
                const hasToken = hasTokenForForm(form._id);
                return (
                  <tr key={form._id}>
                    <td>{form.title}</td>
                    <td>{form.season}</td>
                    <td>{new Date(form.expiresAt).toLocaleDateString()}</td>
                    <td className={isExpired ? "expired" : form.status === "closed" ? "closed" : "open"}>
                      {isExpired ? "Expired" : form.status === "closed" ? "Closed" : "Open"}
                    </td>
                    <td>
                      {!isExpired && form.status !== "closed" && hasToken ? (
                        <button
                          className="answer-btn"
                          onClick={() => handleAnswer(form._id)}
                        >
                          Answer
                        </button>
                      ) : (
                        <span className="submitted">
                          {isExpired ? "Expired" : form.status === "closed" ? "Closed" : "Submitted"}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
