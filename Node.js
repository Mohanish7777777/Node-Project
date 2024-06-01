const express = require('express');
const Redis = require('ioredis');
const app = express();
const redis = new Redis('rediss://red-cpda5b7sc6pc738p2qbg:DFrBhggQ8HyQBh2BcktBdCguXqPNcy9q@oregon-redis.render.com:6379');

app.get('/set/:key/:value', async (req, res) => {
  const { key, value } = req.params;
  await redis.set(key, value);
  res.send(`Set ${key} to ${value}`);
});

app.get('/get/:key', async (req, res) => {
  const { key } = req.params;
  const value = await redis.get(key);
  res.send(`Value for ${key} is ${value}`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
