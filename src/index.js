const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3000;

app.get('/generate-token', (req, res) => {
  const privateKey = process.env.PRIVATE_KEY;

  if (!privateKey) {
    return res.status(500).json({ error: 'Private key not found' });
  }

  const payload = {
    iss: 'fluxoidv2@08db60a1-ac4e-43c9-b3f2-9ae0f5939254.iam.acesso.io',
    scope: '*',
    aud: 'https://identityhomolog.acesso.io',
    exp: Math.floor(Date.now() / 1000) + 3600,
    iat: Math.floor(Date.now() / 1000)
  };

  try {
    const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error generating token' });
  }
});

app.listen(port, () => {
  console.log(`JWT service running on port ${port}`);
});
