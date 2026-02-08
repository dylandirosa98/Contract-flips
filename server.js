const express = require('express');
const path = require('path');

const app = express();
const PORT = 3002;

app.use(express.json());

// Proxy form submissions to GHL (avoids CORS + reCAPTCHA domain issues)
app.post('/api/submit', async (req, res) => {
  const { formId, locationId, formData, captchaV3 } = req.body;

  if (!formId || !locationId || !formData || !captchaV3) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
    const url = `https://backend.leadconnectorhq.com/forms/submit`;
    const body = new URLSearchParams();
    body.append('formId', formId);
    body.append('locationId', locationId);
    body.append('formData', JSON.stringify(formData));
    body.append('captchaV3', captchaV3);

    const ghlRes = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'channel': 'APP',
        'source': 'WEB_USER',
        'version': '2021-04-15',
      },
      body: body.toString(),
    });

    const text = await ghlRes.text();
    res.status(ghlRes.status).send(text);
  } catch (err) {
    console.error('GHL proxy error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

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
