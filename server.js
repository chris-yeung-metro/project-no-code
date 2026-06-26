const express = require('express');
const https = require('https');
const xml2js = require('xml2js');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const BBC_RSS_URL = 'https://feeds.bbci.co.uk/news/rss.xml';

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/news', (req, res) => {
  https.get(BBC_RSS_URL, (feedRes) => {
    let data = '';
    feedRes.on('data', (chunk) => { data += chunk; });
    feedRes.on('end', () => {
      xml2js.parseString(data, { explicitArray: false }, (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to parse feed' });
        }
        const items = result.rss.channel.item || [];
        const news = (Array.isArray(items) ? items : [items]).map((item) => ({
          title: item.title,
          description: item.description,
          link: item.link,
          pubDate: item.pubDate,
          thumbnail: item['media:thumbnail']
            ? item['media:thumbnail'].$.url
            : null,
        }));
        res.json({ title: result.rss.channel.title, items: news });
      });
    });
  }).on('error', (err) => {
    console.error('Failed to fetch BBC news feed:', err.message);
    res.status(502).json({ error: 'Failed to fetch BBC news feed' });
  });
});

app.listen(PORT, () => {
  console.log(`BBC News app running at http://localhost:${PORT}`);
});
