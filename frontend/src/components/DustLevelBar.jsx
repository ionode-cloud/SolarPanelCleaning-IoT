import React, { useState, useEffect } from "react";
import { Sun, Clock, RefreshCcw } from "lucide-react";
import "../App.css";

const DustLevelBar = ({ percentage, status, lastCleaned, onForceClean, forceCleaningStatus }) => {
  const [currentPercentage, setCurrentPercentage] = useState(percentage);
  const [currentStatus, setCurrentStatus] = useState(status);
  const [lastClean, setLastClean] = useState(lastCleaned);

  // Update component state when parent data changes
  useEffect(() => {
    setCurrentPercentage(percentage);
    setCurrentStatus(status);
    setLastClean(lastCleaned);
  }, [percentage, status, lastCleaned]);

  // Handle Force Cleaning
  const handleForceClean = () => {
    if (onForceClean && !forceCleaningStatus) {
      onForceClean(); // call parent API trigger
    }
  };

  // Color logic
  let barColor = "#f59e0b";
  if (currentPercentage < 20) barColor = "#10b981"; // green = clean
  else if (currentPercentage > 50) barColor = "#ef4444"; // red = dirty

  return (
    <div className="dust-bar">
      <div className="dust-bar-container" style={{ borderColor: "#374151" }}>
        {/* Header */}
        <div className="dust-header">
          <Sun className="dust-icon" size={24} />
          <div className="dust-title">Dust Status - {currentStatus}</div>
          <div className="last-cleaned">
            <Clock size={16} style={{ marginRight: "0.25rem" }} /> 
            Last Cleaned: {lastClean || "N/A"}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="dust-level-label">Dust Level ({currentStatus})</div>
        <div className="progress-wrapper">
          <div className="progress-bg">
            <div
              className="progress-bar"
              style={{
                width: `${currentPercentage}%`,
                backgroundColor: barColor,
                transition: "width 0.8s ease-in-out",
              }}
            ></div>
          </div>
          <span className="progress-percentage">{currentPercentage}%</span>
        </div>

        {/* Force Cleaning Button */}
        <button
          className="force-clean-btn"
          onClick={handleForceClean}
          disabled={forceCleaningStatus}
          style={{
            padding: "8px 14px",
            backgroundColor: forceCleaningStatus ? "#10b981" : "rgb(59,130,246)",
            color: "#fff",
            fontWeight: 500,
            border: "none",
            borderRadius: "6px",
            cursor: forceCleaningStatus ? "not-allowed" : "pointer",
            marginTop: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            opacity: forceCleaningStatus ? 0.7 : 1,
            transition: "background-color 0.3s ease",
          }}
        >
          <RefreshCcw
            size={16}
            className={forceCleaningStatus ? "spin-animation" : ""}
          />
          {forceCleaningStatus ? "Cleaning in Progress..." : "Force Cleaning"}
        </button>
      </div>
    </div>
  );
};

export default DustLevelBar;
