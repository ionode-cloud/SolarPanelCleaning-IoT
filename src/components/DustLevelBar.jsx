import React from "react";
import { Sun, Clock } from "lucide-react";
import "../App.css"
const DustLevelBar = ({ percentage, status, lastCleaned }) => {
  let barColor = '#f59e0b';
  if (percentage < 20) barColor = '#10b981';
  else if (percentage > 50) barColor = '#ef4444';

  return (
    <div className="dust-bar-container" style={{ borderColor: '#374151' }}>
      <div className="dust-header">
        <Sun className="dust-icon" size={24} />
        <div className="dust-title">Dust Status - {status}</div>
        <div className="last-cleaned">
          <Clock size={16} style={{ marginRight: '0.25rem' }} /> Last Cleaned: {lastCleaned}
        </div>
      </div>

      <div className="dust-level-label">Dust Level ({status})</div>
      <div className="progress-wrapper">
        <div className="progress-bg">
          <div
            className="progress-bar"
            style={{ width: `${percentage}%`, backgroundColor: barColor }}
          ></div>
        </div>
        <span className="progress-percentage">{percentage}%</span>
      </div>
    </div>
  );
};

export default DustLevelBar;
