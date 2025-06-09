import axios from 'axios';

export default async function handler(req, res) {
  const logoType = req.query.logoType;
  const logoText = req.query.logoText;
  const apiUrl = `http:                                                                     

  try {
    const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
    const logoBuffer = Buffer.from(response.data, 'binary');
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', `//fi3.bot-hosting.net:21943/api/ephoto/${logoType}?text=${logoText}`;

  try {
    const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
    const logoBuffer = Buffer.from(response.data, 'binary');
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', `attachment; filename="logo.png"`);
    res.write(logoBuffer);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate logo' });
  }
}
