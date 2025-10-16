import React from "react";
import "../App.css"
const MetricCard = ({ title, value, unit, icon: Icon, color }) => (
  <div className="metric-card" style={{ borderColor: '#374151' }}>
    <div className="icon-wrapper" style={{ backgroundColor: color }}>
      <Icon size={24} />
    </div>
    <div className="card-title">{title}</div>
    <div className="card-value">
      {value.toFixed(1)} <span className="card-unit">{unit}</span>
    </div>
  </div>
);

export default MetricCard;
