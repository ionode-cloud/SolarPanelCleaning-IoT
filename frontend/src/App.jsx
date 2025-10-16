import React, { useState, useCallback } from "react";
import { Download, Wifi, Zap, Bolt, Power, Gauge, TrendingUp, Thermometer } from "lucide-react";
import { initialMockData } from "./data/mockData";
import MetricCard from "./components/MetricCard";
import HourlyStatusCard from "./components/HourlyStatusCard";
import DustLevelBar from "./components/DustLevelBar";
import LiveVideoPanel from "./components/LiveVideoPanel";
import PerformanceChart from "./components/PerformanceChart";
import "./App.css"

const App = () => {
  const [data] = useState(initialMockData);

  const handleDownload = useCallback(() => {
    const dataToDownload = { timestamp: new Date().toISOString(), ...data };
    const jsonString = JSON.stringify(dataToDownload, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'solar_dashboard_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    console.log("Data download initiated.");
  }, [data]);

  return (
    <div className="dashboard-container">
      <header className="header">
        <div>
          <h1 className="header-title text-white"><span className="text-yellow">Solar</span> Panel</h1>
          <p className="header-subtitle">Real-time Monitoring & Control System</p>
        </div>
        <div className="header-actions">
          <button onClick={handleDownload} className="download-button" title="Download All Current Data">
            <Download size={18} className="download-icon" /> Download Data
          </button>
          <div className="text-green" style={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
            <Wifi size={20} style={{ marginRight: '0.5rem' }} /> System Online
          </div>
        </div>
      </header>

      <div className="main-grid">
        <div className="data-section">
          <div className="data-cards-grid">
            <MetricCard title="Voltage" value={data.voltage} unit="V" icon={Zap} color="#d97706" />
            <MetricCard title="Current" value={data.current} unit="A" icon={Bolt} color="#059669" />
            <MetricCard title="Power" value={data.power} unit="kW" icon={Power} color="#dc2626" />
            <MetricCard title="Energy Today" value={data.energyToday} unit="kWh" icon={Gauge} color="#2563eb" />
          </div>
          <div>
            <h3 className="hourly-status-section-title">Last Hourly Status</h3>
            <div className="hourly-status-grid">
              <HourlyStatusCard title="Avg Power (kW)" value={data.avgPower.toFixed(1)} unit="kW" color="#f87171" icon={Power} />
              <HourlyStatusCard title="Avg Voltage (V)" value={data.avgVoltage.toFixed(1)} unit="V" color="#facc15" icon={Zap} />
              <HourlyStatusCard title="Efficiency" value={data.efficiency} unit="%" color="#4ade80" icon={TrendingUp} />
              <HourlyStatusCard title="Temperature" value={data.temperature} unit="°C" color="#60a5fa" icon={Thermometer} />
            </div>
          </div>
          <DustLevelBar percentage={data.dustLevel} status={data.dustStatus} lastCleaned={data.lastCleaned} />
        </div>

        <div className="video-column">
          <LiveVideoPanel
            progress={data.cleaningProgress}
            robotPosition={data.robotPosition}
            batteryLevel={data.batteryLevel}
            nextCleaning={data.nextCleaning}
            cleaningHistory={data.cleaningHistory} // <-- pass here
          />
        </div>
      </div>

      <PerformanceChart data={data.performanceData} />
    </div>
  );
};

export default App;
