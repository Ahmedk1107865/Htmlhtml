const axios = require('axios');

module.exports = async (req, res) => {
  const { type, name } = req.query;
  
  if (!type || !name) {
    return res.status(400).json({ error: 'Type and name parameters are required' });
  }

  try {
    const apiUrl = `http://fi3.bot-hosting.net:21943/api/ephoto/${type}?text=${encodeURIComponent(name)}`;
    const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
    
    res.setHeader('Content-Type', 'image/png');
    res.send(response.data);
  } catch (error) {
    console.error('Error generating logo:', error);
    res.status(500).json({ error: 'Failed to generate logo' });
  }
};
