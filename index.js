// app.js

// Import required modules
const express = require('express');

// Create an instance of Express
const app = express();

// const PORT: number = parseInt(process.env.PORT || 3000);
const PORT = process.env.PORT || 3000;
const HOST = process.env.IP || 'localhost';

// Define a route
app.get('/', (req, res) => {
  // res.send('Hello, Express!');
  res.json({ok:true})
});

// start server
const server = app.listen(PORT, HOST, () => {
  console.log(`⚡️ Server listening on port ${PORT} at ${HOST}`);
});

// For coverage, handle Ctrl+C gracefully
process.on('SIGINT', () => {
  server.close(() => console.log('Shutting down server gracefully.'));
});
