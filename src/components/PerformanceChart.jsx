import React, { useState, useEffect } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const PerformanceChart = () => {
  const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];

  // Custom 24-hour data for each week
  const weeklyData = {
    "Week 1": [
      { hour: "0:00", open: 20, close: 25, high: 30, low: 18, efficiency: 50 },
      { hour: "1:00", open: 22, close: 28, high: 32, low: 20, efficiency: 52 },
      { hour: "2:00", open: 25, close: 30, high: 35, low: 22, efficiency: 55 },
      { hour: "3:00", open: 28, close: 32, high: 36, low: 25, efficiency: 57 },
      { hour: "4:00", open: 30, close: 34, high: 38, low: 28, efficiency: 60 },
      { hour: "5:00", open: 32, close: 36, high: 40, low: 30, efficiency: 62 },
      { hour: "6:00", open: 35, close: 38, high: 42, low: 33, efficiency: 65 },
      { hour: "7:00", open: 38, close: 42, high: 45, low: 36, efficiency: 68 },
      { hour: "8:00", open: 40, close: 45, high: 48, low: 38, efficiency: 70 },
      { hour: "9:00", open: 42, close: 47, high: 50, low: 40, efficiency: 72 },
      { hour: "10:00", open: 44, close: 50, high: 52, low: 42, efficiency: 75 },
      { hour: "11:00", open: 46, close: 52, high: 55, low: 44, efficiency: 78 },
      { hour: "12:00", open: 48, close: 55, high: 58, low: 46, efficiency: 80 },
      { hour: "13:00", open: 50, close: 57, high: 60, low: 48, efficiency: 82 },
      { hour: "14:00", open: 52, close: 60, high: 62, low: 50, efficiency: 85 },
      { hour: "15:00", open: 54, close: 62, high: 65, low: 52, efficiency: 87 },
      { hour: "16:00", open: 55, close: 63, high: 66, low: 53, efficiency: 88 },
      { hour: "17:00", open: 56, close: 64, high: 67, low: 54, efficiency: 89 },
      { hour: "18:00", open: 55, close: 62, high: 65, low: 53, efficiency: 87 },
      { hour: "19:00", open: 52, close: 60, high: 62, low: 50, efficiency: 85 },
      { hour: "20:00", open: 48, close: 55, high: 58, low: 46, efficiency: 80 },
      { hour: "21:00", open: 44, close: 52, high: 55, low: 42, efficiency: 75 },
      { hour: "22:00", open: 40, close: 48, high: 50, low: 38, efficiency: 70 },
      { hour: "23:00", open: 35, close: 42, high: 45, low: 33, efficiency: 65 },
    ],
    "Week 2": [
      { hour: "0:00", open: 18, close: 22, high: 25, low: 15, efficiency: 48 },
      { hour: "1:00", open: 20, close: 24, high: 28, low: 18, efficiency: 50 },
      { hour: "2:00", open: 22, close: 26, high: 30, low: 20, efficiency: 52 },
      { hour: "3:00", open: 25, close: 28, high: 32, low: 22, efficiency: 55 },
      { hour: "4:00", open: 28, close: 32, high: 35, low: 25, efficiency: 57 },
      { hour: "5:00", open: 30, close: 35, high: 38, low: 28, efficiency: 60 },
      { hour: "6:00", open: 32, close: 36, high: 40, low: 30, efficiency: 62 },
      { hour: "7:00", open: 35, close: 38, high: 42, low: 33, efficiency: 65 },
      { hour: "8:00", open: 38, close: 42, high: 45, low: 36, efficiency: 68 },
      { hour: "9:00", open: 40, close: 45, high: 48, low: 38, efficiency: 70 },
      { hour: "10:00", open: 42, close: 48, high: 50, low: 40, efficiency: 72 },
      { hour: "11:00", open: 44, close: 50, high: 52, low: 42, efficiency: 75 },
      { hour: "12:00", open: 46, close: 52, high: 55, low: 44, efficiency: 77 },
      { hour: "13:00", open: 48, close: 55, high: 58, low: 46, efficiency: 80 },
      { hour: "14:00", open: 50, close: 57, high: 60, low: 48, efficiency: 82 },
      { hour: "15:00", open: 52, close: 60, high: 62, low: 50, efficiency: 85 },
      { hour: "16:00", open: 54, close: 62, high: 65, low: 52, efficiency: 87 },
      { hour: "17:00", open: 55, close: 63, high: 66, low: 53, efficiency: 88 },
      { hour: "18:00", open: 53, close: 61, high: 64, low: 51, efficiency: 86 },
      { hour: "19:00", open: 50, close: 58, high: 60, low: 48, efficiency: 82 },
      { hour: "20:00", open: 46, close: 52, high: 55, low: 44, efficiency: 78 },
      { hour: "21:00", open: 42, close: 48, high: 50, low: 40, efficiency: 73 },
      { hour: "22:00", open: 38, close: 44, high: 46, low: 36, efficiency: 68 },
      { hour: "23:00", open: 35, close: 40, high: 42, low: 32, efficiency: 65 },
    ],
    "Week 3": [
      { hour: "0:00", open: 15, close: 20, high: 25, low: 12, efficiency: 45 },
      { hour: "1:00", open: 18, close: 22, high: 27, low: 15, efficiency: 48 },
      { hour: "2:00", open: 20, close: 25, high: 30, low: 18, efficiency: 50 },
      { hour: "3:00", open: 22, close: 28, high: 32, low: 20, efficiency: 52 },
      { hour: "4:00", open: 25, close: 30, high: 35, low: 22, efficiency: 55 },
      { hour: "5:00", open: 28, close: 33, high: 38, low: 25, efficiency: 58 },
      { hour: "6:00", open: 30, close: 35, high: 40, low: 28, efficiency: 60 },
      { hour: "7:00", open: 32, close: 38, high: 42, low: 30, efficiency: 62 },
      { hour: "8:00", open: 35, close: 40, high: 45, low: 33, efficiency: 65 },
      { hour: "9:00", open: 38, close: 42, high: 48, low: 36, efficiency: 68 },
      { hour: "10:00", open: 40, close: 45, high: 50, low: 38, efficiency: 70 },
      { hour: "11:00", open: 42, close: 48, high: 52, low: 40, efficiency: 72 },
      { hour: "12:00", open: 45, close: 50, high: 55, low: 42, efficiency: 75 },
      { hour: "13:00", open: 48, close: 52, high: 57, low: 45, efficiency: 78 },
      { hour: "14:00", open: 50, close: 55, high: 60, low: 48, efficiency: 80 },
      { hour: "15:00", open: 52, close: 57, high: 62, low: 50, efficiency: 82 },
      { hour: "16:00", open: 54, close: 60, high: 65, low: 52, efficiency: 85 },
      { hour: "17:00", open: 55, close: 62, high: 66, low: 53, efficiency: 87 },
      { hour: "18:00", open: 53, close: 60, high: 64, low: 50, efficiency: 84 },
      { hour: "19:00", open: 50, close: 57, high: 60, low: 48, efficiency: 80 },
      { hour: "20:00", open: 48, close: 54, high: 58, low: 46, efficiency: 77 },
      { hour: "21:00", open: 45, close: 50, high: 55, low: 42, efficiency: 72 },
      { hour: "22:00", open: 42, close: 48, high: 52, low: 40, efficiency: 68 },
      { hour: "23:00", open: 38, close: 45, high: 48, low: 35, efficiency: 63 },
    ],
    "Week 4": [
      { hour: "0:00", open: 10, close: 15, high: 20, low: 8, efficiency: 40 },
      { hour: "1:00", open: 12, close: 18, high: 22, low: 10, efficiency: 42 },
      { hour: "2:00", open: 15, close: 20, high: 25, low: 12, efficiency: 45 },
      { hour: "3:00", open: 18, close: 22, high: 28, low: 15, efficiency: 48 },
      { hour: "4:00", open: 20, close: 25, high: 30, low: 18, efficiency: 50 },
      { hour: "5:00", open: 22, close: 28, high: 32, low: 20, efficiency: 52 },
      { hour: "6:00", open: 25, close: 30, high: 35, low: 22, efficiency: 55 },
      { hour: "7:00", open: 28, close: 32, high: 36, low: 25, efficiency: 57 },
      { hour: "8:00", open: 30, close: 35, high: 40, low: 28, efficiency: 60 },
      { hour: "9:00", open: 32, close: 38, high: 42, low: 30, efficiency: 62 },
      { hour: "10:00", open: 35, close: 40, high: 45, low: 32, efficiency: 65 },
      { hour: "11:00", open: 38, close: 42, high: 46, low: 36, efficiency: 68 },
      { hour: "12:00", open: 40, close: 45, high: 50, low: 38, efficiency: 70 },
      { hour: "13:00", open: 42, close: 48, high: 52, low: 40, efficiency: 72 },
      { hour: "14:00", open: 45, close: 50, high: 55, low: 42, efficiency: 75 },
      { hour: "15:00", open: 48, close: 52, high: 57, low: 45, efficiency: 78 },
      { hour: "16:00", open: 50, close: 55, high: 60, low: 48, efficiency: 80 },
      { hour: "17:00", open: 52, close: 57, high: 62, low: 50, efficiency: 82 },
      { hour: "18:00", open: 50, close: 55, high: 60, low: 48, efficiency: 80 },
      { hour: "19:00", open: 48, close: 52, high: 57, low: 45, efficiency: 78 },
      { hour: "20:00", open: 45, close: 50, high: 55, low: 42, efficiency: 75 },
      { hour: "21:00", open: 42, close: 48, high: 52, low: 40, efficiency: 72 },
      { hour: "22:00", open: 38, close: 45, high: 48, low: 35, efficiency: 68 },
      { hour: "23:00", open: 35, close: 42, high: 45, low: 32, efficiency: 65 },
    ],
  };

  const [selectedWeek, setSelectedWeek] = useState(weeks[0]);
  const [data, setData] = useState(weeklyData[selectedWeek]);

  useEffect(() => {
    setData(weeklyData[selectedWeek]);
  }, [selectedWeek]);

  // CSV download
  const downloadCSV = () => {
    const headers = ["Hour", "Open", "Close", "High", "Low", "Efficiency (%)"];
    const rows = data.map(d => [d.hour, d.open, d.close, d.high, d.low, d.efficiency]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${selectedWeek}_data.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ padding: "20px", marginTop: "20px", backgroundColor: "#1f2937", borderRadius: "8px" }}>
      <h3 className="chart-title" style={{ color: '#e5e7eb' }}>Performance Analytics (Hourly Data)</h3>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", alignItems: "center" }}>
        <div>
          <label style={{ color: "#e5e7eb", marginRight: "10px" }}>Select Week:</label>
          <select
            value={selectedWeek}
            onChange={e => setSelectedWeek(e.target.value)}
            style={{
              padding: "6px 12px",
              backgroundColor: "#3b82f6",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {weeks.map(week => <option key={week} value={week}>{week}</option>)}
          </select>
        </div>
        <button
          onClick={downloadCSV}
          style={{
            padding: "6px 12px",
            backgroundColor: "#3b82f6",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Download CSV
        </button>
      </div>

      <div className="recharts-wrapper" style={{ height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
            <XAxis dataKey="hour" stroke="#9ca3af" tick={{ fill: "#e5e7eb" }} />
            <YAxis stroke="#9ca3af" tick={{ fill: "#e5e7eb" }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#111827", border: "1px solid #374151", borderRadius: "8px" }}
              labelStyle={{ color: "#f59e0b", fontWeight: "bold" }}
              formatter={(value, name) => [value, name]}
            />
            {/* Candlestick-style bars */}
            <Bar dataKey="close" fill="#f59e0b" barSize={8} background={{ fill: "#374151" }}>
              <LabelList dataKey="close" position="top" fill="#f59e0b" />
            </Bar>
            <Line type="monotone" dataKey="efficiency" stroke="#60a5fa" strokeWidth={2} dot={{ r: 3 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;
