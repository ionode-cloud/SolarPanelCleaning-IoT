import React, { useState } from "react";
import { Sun, Clock, RefreshCcw } from "lucide-react";
import "../App.css";

const DustLevelBar = ({ percentage, status, lastCleaned, onForceClean }) => {
  const [currentPercentage, setCurrentPercentage] = useState(percentage);
  const [currentStatus, setCurrentStatus] = useState(status);
  const [lastClean, setLastClean] = useState(lastCleaned);

  // Handle Force Cleaning
  const handleForceClean = () => {
    setCurrentPercentage(0);
    setCurrentStatus("Clean");
    const now = new Date().toLocaleString();
    setLastClean(now);

    // Notify parent to update history
    if (onForceClean) {
      onForceClean({
        date: now,
        duration: "3 min",
        efficiency: 98,
        status: "Completed (Force Clean)"
      });
    }
  };

  // Color logic
  let barColor = "#f59e0b";
  if (currentPercentage < 20) barColor = "#10b981";
  else if (currentPercentage > 50) barColor = "#ef4444";

  return (
    <div className="dust-bar">
      <div className="dust-bar-container" style={{ borderColor: "#374151" }}>
        <div className="dust-header">
          <Sun className="dust-icon" size={24} />
          <div className="dust-title">Dust Status - {currentStatus}</div>
          <div className="last-cleaned">
            <Clock size={16} style={{ marginRight: "0.25rem" }} /> Last Cleaned: {lastClean}
          </div>
        </div>

        <div className="dust-level-label">Dust Level ({currentStatus})</div>
        <div className="progress-wrapper">
          <div className="progress-bg">
            <div
              className="progress-bar"
              style={{ width: `${currentPercentage}%`, backgroundColor: barColor }}
            ></div>
          </div>
          <span className="progress-percentage">{currentPercentage}%</span>
        </div>

        {/* Force Cleaning Button */}

        <button
          className="force-clean-btn"
          style={{
            padding: "6px 12px",
            backgroundColor: "rgb(59, 130, 246)",
            color: "#fff",
            marginTop:"15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}
          onClick={handleForceClean}
        >
          <RefreshCcw size={16} />
          Force Cleaning
        </button>

      </div>

    </div>

  );
};

export default DustLevelBar;
