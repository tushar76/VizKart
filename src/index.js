const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const events = [
  { id: 1, description: "User logged in", timestamp: Date.now() - 240000 },
  { id: 2, description: "Product added to cart", timestamp: Date.now() - 180000 },
  { id: 3, description: "Checkout started", timestamp: Date.now() - 120000 },
  { id: 4, description: "Payment successful", timestamp: Date.now() - 60000 },
  { id: 5, description: "User logged out", timestamp: Date.now() },    
  { id: 6, description: "New user registered", timestamp: Date.now() + 60000 }, 
  { id: 7, description: "Profile updated", timestamp: Date.now() + 120000 }, 
  { id: 8, description: "Password changed", timestamp: Date.now() + 180000 },
];

const chartData = [
  { label: "Jan", value: 100 },
  { label: "Feb", value: 150 },
  { label: "Mar", value: 200 },
  { label: "Apr", value: 175 },
  { label: "May", value: 220 },
  { label: "Jun", value: 180 },
  { label: "Jul", value: 250 },
  { label: "Aug", value: 210 },
  { label: "Sep", value: 190 },
  { label: "Oct", value: 230 },
  { label: "Nov", value: 210 },
  { label: "Dec", value: 240 },
];
app.get("/api/events", (req, res) => {
  res.json(events);
});

app.get("/api/chart-data", (req, res) => {
  res.json(chartData); 
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
