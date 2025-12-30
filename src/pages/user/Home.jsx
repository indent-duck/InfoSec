import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();
  const [tokens] = useState(1);
  const [forms, setForms] = useState([]);

  useEffect(() => {
    setForms([
      { formId: "01111", title: "Form Title", season: "Season", deadline: "2025-07-16", status: "Pending" },
      { formId: "01110", title: "Form Title", season: "Season", deadline: "2025-07-14", status: "Submitted" },
      { formId: "01109", title: "Form Title", season: "Season", deadline: "2025-07-12", status: "Submitted" },
      { formId: "01108", title: "Form Title", season: "Season", deadline: "2025-07-11", status: "Submitted" },
      { formId: "01107", title: "Form Title", season: "Season", deadline: "2025-07-11", status: "Pending" },
    ]);
  }, []);

  const handleAnswer = (formId) => {
    navigate(`/submission/${formId}`);
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
            {forms.map((form) => (
              <tr key={form.formId}>
                <td>{form.formId}</td>
                <td>{form.title}</td>
                <td>{form.season}</td>
                <td>{form.deadline}</td>
                <td className={form.status === "Pending" ? "pending" : "submitted"}>
                  {form.status}
                </td>
                <td>
                  {form.status === "Pending" ? (
                    <button
                      className="answer-btn"
                      onClick={() =>
                        navigate("/submit", { state: { formId: form.id } })
                      }
                    >
                      Answer
                    </button>
                  ) : (
                    <span className="submitted">Submitted</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Home;
