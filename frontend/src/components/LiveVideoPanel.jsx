import React from "react";
import "../App.css";
import Robot from "../assets/solar img.jpg";
import video from "../assets/Solar Cleaning.mp4";

const LiveVideoPanel = ({ progress, robotPosition, batteryLevel, nextCleaning, cleaningHistory }) => {
  let batteryColor = "#4ade80";
  if (batteryLevel < 40) batteryColor = "#facc15";
  if (batteryLevel < 20) batteryColor = "#f87171";

  return (
    <div className="video-panel" style={{ borderColor: "#374151" }}>
      {/* Video Feed */}
      <div className="video-feed">
        <video
          className="video-player"
          src={video}
          poster={Robot}
          muted
          controls
        />
        <div className="cleaning-status">Cleaning: {progress}%</div>
      </div>

      {/* Live Status */}
      <div className="live-status-section">
        <h3 className="live-status-title">Live Status</h3>

        <div className="status-detail">
          <span className="status-label">Robot Position</span>
          <span className="status-value-lg">{robotPosition}</span>
        </div>

        <div className="status-detail">
          <span className="status-label">Battery Level</span>
          <span className="status-value-lg" style={{ color: batteryColor }}>
            {batteryLevel}%
          </span>
        </div>

        {/* Cleaning History */}
        <div className="cleaning-history-panel">
          <h3 className="Cleaning-History">Cleaning History</h3>
          <table className="cleaning-history-table">
            <thead>
              <tr>
                <th>Date</th>
                {/* <th>Duration</th>
                <th>Efficiency</th> */}
                <th>Status</th>
                <th>Created At</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {cleaningHistory && cleaningHistory.length > 0 ? (
                cleaningHistory.map((entry, idx) => (
                  <tr key={idx}>
                    <td>{entry.date}</td>
                    {/* <td>{entry.duration}</td>
                    <td>{entry.efficiency}%</td> */}
                    <td>{entry.status}</td>
                    <td>{entry.createdAt ? new Date(entry.createdAt).toLocaleString() : "-"}</td>
                    <td>{entry.updatedAt ? new Date(entry.updatedAt).toLocaleString() : "-"}</td>
                  </tr>
                ))
              ) : (
                <tr className="cleaning-history-empty">
                  <td colSpan="6">No cleaning history available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LiveVideoPanel;
