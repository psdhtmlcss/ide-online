import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('db.json');

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
