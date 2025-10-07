const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Custom routes for authentication
server.post('/api/citizen/login', (req, res) => {
  const { email, password } = req.body;
  const citizen = router.db.get('citizens').find({ email, password }).value();
  citizen ? res.json({ ...citizen, role: 'citizen' }) : res.status(401).json({ error: 'Invalid credentials' });
});

server.post('/api/police/login', (req, res) => {
  const { badge, password } = req.body;
  const police = router.db.get('police').find({ badge, password }).value();
  police ? res.json({ ...police, role: 'police' }) : res.status(401).json({ error: 'Invalid credentials' });
});

server.use(router);
server.listen(3001, () => {
  console.log('JSON Server is running on http://localhost:3001');
});