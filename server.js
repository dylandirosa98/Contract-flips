const express = require('express');
const path = require('path');

const app = express();
const PORT = 3002;

app.use(express.json());

// Routes before static
app.get('/tools/confirm', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'confirm.html'));
});

app.get('/tools', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/inner', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'inner.html'));
});

app.get('/optin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'optin.html'));
});

app.get('/theinnercircle', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'theinnercircle.html'));
});

app.get('/resources', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'resources.html'));
});

app.get('/ic', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'ic.html'));
});

app.get('/contracts', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contracts.html'));
});

app.get('/innercircle', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'innercircle.html'));
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/tools`);
});
