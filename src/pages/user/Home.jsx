import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();
  const [tokens] = useState(1);
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/forms`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await response.json();
        setForms(data);
      } catch (err) {
        console.error("Error fetching forms", err);
      }
    };

    fetchForms();
  }, []);

  const handleAnswer = (formId) => {
    navigate(`/submit/${formId}`);
  };

  return (
    <div className="user-home">
      {/* Top bar */}
      <div className="top-bar">
        <h1 className="web-name">WebName</h1>
        <button className="account-btn" />
      </div>

      {/* Tokens */}
      <div className="token-card">
        <h2>Current Tokens: {tokens}</h2>
      </div>

      {/* Table */}
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Form ID</th>
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
              return (
                <tr key={form._id}>
                  <td>{form._id}</td>
                  <td>{form.title}</td>
                  <td>{form.season}</td>
                  <td>{new Date(form.expiresAt).toLocaleDateString()}</td>
                  <td className={isExpired ? "expired" : "pending"}>
                    {isExpired ? "Expired" : "Pending"}
                  </td>
                  <td>
                    {!isExpired ? (
                      <button
                        className="answer-btn"
                        onClick={() => handleAnswer(form._id)}
                      >
                        Answer
                      </button>
                    ) : (
                      <span className="submitted">Expired</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
