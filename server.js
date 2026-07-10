const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const DEFAULT_PLANS = {
  "2026-07-31": [
    {
      id: 1001,
      location: "Re Cheng Hall (CYCU Dormitory)",
      desc: "Dormitory Check-in (12:00-16:00) & Meet & Greet (18:00). Please gather in front of the dormitory gate.",
      time: "12:00",
      author: "Camp Coordinator",
      address: "Chung Yuan Christian University, Zhongli District, Taoyuan City",
      lat: 24.9576,
      lng: 121.2407,
      createdAt: 1720000000000
    }
  ],
  "2026-08-03": [
    {
      id: 1005,
      location: "CYCU EE Building (EE105)",
      desc: "10:20 Opening Ceremony. 12:00 Welcome Lunch. 14:00 Introduction to Taiwan. 16:00 Lab Check-in.",
      time: "10:20",
      author: "Camp Coordinator",
      address: "CYCU Electrical Engineering Building, Zhongli District, Taoyuan City",
      lat: 24.9582,
      lng: 121.2415,
      createdAt: 1720000000004
    }
  ],
  "2026-08-04": [
    {
      id: 1006,
      location: "CYCU EE Building (EE105)",
      desc: "09:30 Lecture (Speakers A & B). 14:00 Lecture (Speakers C & D).",
      time: "09:30",
      author: "Camp Coordinator",
      address: "CYCU Electrical Engineering Building, Zhongli District, Taoyuan City",
      lat: 24.9582,
      lng: 121.2415,
      createdAt: 1720000000005
    }
  ],
  "2026-08-05": [
    {
      id: 1007,
      location: "Field Trip Day 1",
      desc: "All-day off-campus cultural/scientific field trip. Meet at the dormitory gate in the morning.",
      time: "09:00",
      author: "Camp Coordinator",
      address: "Taoyuan, Taiwan",
      lat: 24.9600,
      lng: 121.2300,
      createdAt: 1720000000006
    }
  ],
  "2026-08-06": [
    {
      id: 1008,
      location: "CYCU Campus",
      desc: "09:10-12:00 Mandarin Course. 14:00-17:00 Project Collaboration.",
      time: "09:10",
      author: "Camp Coordinator",
      address: "Chung Yuan Christian University, Zhongli District, Taoyuan City",
      lat: 24.9576,
      lng: 121.2407,
      createdAt: 1720000000007
    }
  ],
  "2026-08-07": [
    {
      id: 1009,
      location: "CYCU Lab / Project Room",
      desc: "09:10-17:00 Dedicated Project Work Day.",
      time: "09:10",
      author: "Camp Coordinator",
      address: "Chung Yuan Christian University, Zhongli District, Taoyuan City",
      lat: 24.9576,
      lng: 121.2407,
      createdAt: 1720000000008
    }
  ],
  "2026-08-10": [
    {
      id: 1012,
      location: "CYCU EE Building (EE105)",
      desc: "09:30 Lecture (Speakers E & F). 14:00-17:00 Dedicated project work.",
      time: "09:30",
      author: "Camp Coordinator",
      address: "CYCU Electrical Engineering Building, Zhongli District, Taoyuan City",
      lat: 24.9582,
      lng: 121.2415,
      createdAt: 1720000000011
    }
  ],
  "2026-08-11": [
    {
      id: 1013,
      location: "CYCU Lab / Project Room",
      desc: "09:10-17:00 Dedicated Project Work Day.",
      time: "09:10",
      author: "Camp Coordinator",
      address: "Chung Yuan Christian University, Zhongli District, Taoyuan City",
      lat: 24.9576,
      lng: 121.2407,
      createdAt: 1720000000012
    }
  ],
  "2026-08-12": [
    {
      id: 1014,
      location: "Field Trip Day 2",
      desc: "Second all-day field trip. Details to be announced.",
      time: "09:00",
      author: "Camp Coordinator",
      address: "Taoyuan, Taiwan",
      lat: 24.9600,
      lng: 121.2300,
      createdAt: 1720000000013
    }
  ],
  "2026-08-13": [
    {
      id: 1015,
      location: "CYCU Lab / Project Room",
      desc: "09:10-17:00 Dedicated Project Work Day.",
      time: "09:10",
      author: "Camp Coordinator",
      address: "Chung Yuan Christian University, Zhongli District, Taoyuan City",
      lat: 24.9576,
      lng: 121.2407,
      createdAt: 1720000000014
    }
  ],
  "2026-08-14": [
    {
      id: 1016,
      location: "CYCU Lab / Project Room",
      desc: "09:10-17:00 Dedicated Project Work Day.",
      time: "09:10",
      author: "Camp Coordinator",
      address: "Chung Yuan Christian University, Zhongli District, Taoyuan City",
      lat: 24.9576,
      lng: 121.2407,
      createdAt: 1720000000015
    }
  ],
  "2026-08-17": [
    {
      id: 1019,
      location: "CYCU Lab / Project Room",
      desc: "09:10-17:00 Dedicated Project Work Day.",
      time: "09:10",
      author: "Camp Coordinator",
      address: "Chung Yuan Christian University, Zhongli District, Taoyuan City",
      lat: 24.9576,
      lng: 121.2407,
      createdAt: 1720000000018
    }
  ],
  "2026-08-18": [
    {
      id: 1020,
      location: "CYCU Lab / Project Room",
      desc: "09:10-17:00 Project wrapping up and testing.",
      time: "09:10",
      author: "Camp Coordinator",
      address: "Chung Yuan Christian University, Zhongli District, Taoyuan City",
      lat: 24.9576,
      lng: 121.2407,
      createdAt: 1720000000019
    }
  ],
  "2026-08-19": [
    {
      id: 1021,
      location: "CYCU Hall / Banquet Room",
      desc: "09:30-12:00 Closing & Project Presentation. 14:00-16:00 Free time. 17:00-19:30 Award Ceremony, Closing Ceremony & Banquet.",
      time: "09:30",
      author: "Camp Coordinator",
      address: "Chung Yuan Christian University, Zhongli District, Taoyuan City",
      lat: 24.9576,
      lng: 121.2407,
      createdAt: 1720000000020
    }
  ],
  "2026-08-20": [
    {
      id: 1022,
      location: "Dormitory Check-out & Drop-off",
      desc: "09:30-12:00 Dormitory Check-out. 12:00-14:00 Drop-off service.",
      time: "09:30",
      author: "Camp Coordinator",
      address: "Chung Yuan Christian University, Zhongli District, Taoyuan City",
      lat: 24.9576,
      lng: 121.2407,
      createdAt: 1720000000021
    }
  ]
};

// Load database helper
function readDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(DEFAULT_PLANS, null, 2), 'utf-8');
      return DEFAULT_PLANS;
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data || '{}');
  } catch (err) {
    console.error('Error reading DB file:', err);
    return DEFAULT_PLANS;
  }
}

// Write database helper
function writeDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing DB file:', err);
  }
}

// Routes
app.get('/api/plans', (req, res) => {
  const data = readDb();
  res.json(data);
});

app.post('/api/plans', (req, res) => {
  const { date, plan } = req.body;
  if (!date || !plan) {
    return res.status(400).json({ error: 'Missing date or plan content' });
  }

  const db = readDb();
  const datePlans = db[date] || [];

  // If it's an update, find and replace; otherwise push new
  const index = datePlans.findIndex(p => p.id === plan.id);
  if (index !== -1) {
    datePlans[index] = plan;
  } else {
    datePlans.push(plan);
  }

  db[date] = datePlans;
  writeDb(db);
  res.json(db);
});

app.delete('/api/plans/:date/:id', (req, res) => {
  const { date, id } = req.params;
  const planId = Number(id);

  const db = readDb();
  if (db[date]) {
    db[date] = db[date].filter(p => p.id !== planId);
    if (db[date].length === 0) {
      delete db[date];
    }
    writeDb(db);
  }
  res.json(db);
});

// Fallback to index.html for single page application styling
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

module.exports = app;
