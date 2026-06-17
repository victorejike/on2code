const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to On2Code backend' });
});

app.get('/api/courses', (req, res) => {
  res.json({
    courses: [
      { id: 1, slug: 'cs101', title: 'CS101: Intro to Code' },
      { id: 2, slug: 'web101', title: 'Web Development Basics' }
    ]
  });
});

app.post('/api/login', (req, res) => {
  const { email } = req.body;
  res.json({ status: 'ok', email: email || 'student@example.com', token: 'demo-token' });
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
