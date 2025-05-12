import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import glove from './glove.js'; // No change needed since both are in the same folder

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Optional health check
app.get('/', (req, res) => {
  res.send('Server is up and running');
});

// POST /rank route
app.post('/rank', (req, res) => {
  const { clue, words } = req.body;

  if (!clue || !Array.isArray(words)) {
    return res.status(400).json({ error: 'Invalid input: clue and words are required.' });
  }

  try {
    const results = glove.rankWords(clue, words); // Expects: [{ word, score }]
    res.json(results);
  } catch (error) {
    console.error('Error ranking words:', error);
    res.status(500).json({ error: 'Internal server error while ranking words.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
