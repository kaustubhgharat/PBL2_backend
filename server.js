const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

// Simulated database (in-memory storage for now)
let patents = [
  { id: 1, text: "Granted Patent on 'System and Method for Motion Analysis and Feedback for Amendment of Human Action.' (Patent No.: 201621029482, Registered on: 30/08/2016)" },
  { id: 2, text: "Granted Patent 'System and method for automated evaluation of multimodal content.' (Patent No.: 202221060608, Registered on: 11/11/2022 Granted)" },
  { id: 3, text: "Granted Patent on 'System and method for analysis of human movement and suggestions of amendment if any.' (Patent No.: 2023/05683)" },
  { id: 4, text: "'Personalized physical activity recommendations system using federated learning (FL) and a method.' (Patent No.: 202321029305, Published on: 15/09/2023)" },
  { id: 5, text: "'Hydroponic Nutrient Prediction Device using IoT.' (Patent No.: 202321039419, Published on: 18/08/2023)" },
];

// Get all patents
app.get("/patents", (req, res) => {
  res.json(patents);
});

// Add a new patent
app.post("/patents", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });

  const newPatent = { id: patents.length + 1, text };
  patents.push(newPatent);
  res.json(newPatent);
});

// Delete a patent
app.delete("/patents/:id", (req, res) => {
  const { id } = req.params;
  patents = patents.filter((patent) => patent.id !== parseInt(id));
  res.json({ message: "Patent deleted" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
