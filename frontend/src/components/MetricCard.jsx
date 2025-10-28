import React from "react";
import "../App.css";

const MetricCard = ({ title, value, unit, icon: Icon, color }) => {
  const formattedValue =
    value !== undefined && value !== null && !isNaN(value)
      ? Number(value).toFixed(1)
      : "";

  return (
    <div className="metric-card" style={{ borderColor: "#374151" }}>
      
      {/* Render icon wrapper only if Icon exists */}
      {Icon && (
        <div className="icon-wrapper" style={{ backgroundColor: color }}>
          <Icon size={24} />
        </div>
      )}

      <div className="card-title">{title}</div>

      <div className="card-value">
        {formattedValue}
        <span className="card-unit">{unit}</span>
      </div>
    </div>
  );
};

export default MetricCard;
