require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Configuration
const PORT = process.env.PORT || 3001;
const PUBLIC_DIR = path.join(__dirname, 'public');

// Middleware
app.use(cors());
app.use(express.static(PUBLIC_DIR));

// Routes
app.get('/', (req, res, next) => {
  try {
    res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
  } catch (err) {
    next(err);
  }
});

app.get('/puzzle.png', (req, res, next) => {
  const imagePath = path.join(PUBLIC_DIR, 'puzzle.png');
  res.sendFile(imagePath, (err) => {
    if (err) {
      next(err);
    }
  });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).send('You are looking in the wrong place.');
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unexpected error:', err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).send('Something went wrong. The code is not here.');
});

// Startup
app.listen(PORT, () => {
  console.log(`NuclearLaunchCodes server is listening on port ${PORT}`);
  console.log('Visit http://localhost:' + PORT + ' to begin.');
  console.log('The puzzle image is served at /puzzle.png');
});


