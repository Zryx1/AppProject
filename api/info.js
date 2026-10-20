module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  res.json({
    ok: true,
    service: 'Vercel Bridge API',
    version: '1.0.0',
    endpoints: [
      { path: '/api/ping',    method: 'GET' },
      { path: '/api/process', method: 'POST', body: { text: 'string' } },
      { path: '/api/proxy',   method: 'GET',  query: { url: 'string' } },
      { path: '/api/info',    method: 'GET' }
    ],
    node: process.version,
    env: process.env.VERCEL_ENV || 'development',
    region: process.env.VERCEL_REGION || 'unknown',
    time: new Date().toISOString()
  });
};