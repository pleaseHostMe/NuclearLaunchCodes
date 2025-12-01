require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Configuration
const PORT = process.env.PORT || 3005;
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

// Hidden endpoints that create network activity (red herring - no real hints here)
app.get('/heartbeat', (req, res) => {
  const requestId = req.headers['x-request-id'] || 'unknown';
  const timestamp = new Date().toISOString();
  
  // Just log generic stuff - the real answer is in the browser console!
  const messages = [
    `[${timestamp}] Heartbeat received from ${requestId}`,
    `[${timestamp}] System status: OPERATIONAL`,
    `[${timestamp}] Monitoring active...`,
    `[${timestamp}] All systems nominal`,
    `[${timestamp}] Checking channels...`,
    `[${timestamp}] Secure transmission detected`,
    `[${timestamp}] Access granted to monitoring systems`
  ];
  
  const msgIndex = Math.floor(Date.now() / 10000) % messages.length;
  console.log(messages[msgIndex]);
  
  res.set({
    'X-System-Status': 'OPERATIONAL',
    'X-Monitor-ID': requestId,
    'X-Timestamp': timestamp
  });
  
  res.json({
    status: 'active',
    timestamp: timestamp,
    message: 'Monitoring system operational'
  });
});

// Noise endpoints that don't reveal anything
app.get('/status', (req, res) => {
  console.log(`[${new Date().toISOString()}] Status check - nothing here`);
  res.status(404).json({ error: 'Not found' });
});

app.get('/health', (req, res) => {
  console.log(`[${new Date().toISOString()}] Health check - nothing here`);
  res.status(404).json({ error: 'Not found' });
});

app.get('/api/check', (req, res) => {
  console.log(`[${new Date().toISOString()}] API check - nothing here`);
  res.status(404).json({ error: 'Not found' });
});

app.get('/monitor', (req, res) => {
  console.log(`[${new Date().toISOString()}] Monitor check - nothing here`);
  res.status(404).json({ error: 'Not found' });
});

// THE HIDDEN DOWNLOAD ENDPOINT - revealed through logs
app.get('/codes/launch-sequence', (req, res, next) => {
  const imagePath = path.join(PUBLIC_DIR, 'puzzle.png');
  const timestamp = new Date().toISOString();
  
  console.log(`\n${'='.repeat(60)}`);
  console.log(`[${timestamp}] ⚠️  SECURE DOWNLOAD INITIATED`);
  console.log(`[${timestamp}] Accessing launch sequence codes...`);
  console.log(`[${timestamp}] File transfer authorized`);
  console.log(`${'='.repeat(60)}\n`);
  
  res.set({
    'Content-Type': 'image/png',
    'Content-Disposition': 'attachment; filename="launch-codes.png"',
    'X-File-Type': 'launch-sequence',
    'X-Authorization': 'GRANTED'
  });
  
  res.sendFile(imagePath, (err) => {
    if (err) {
      next(err);
    } else {
      console.log(`[${new Date().toISOString()}] Transfer complete`);
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


