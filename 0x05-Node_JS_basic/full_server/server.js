// full_server/server.js
import express from 'express';
import router from './routes/index';

const app = express();
const PORT = 1245;

app.use('/', router);

const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

process.on('SIGINT', () => {
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

export default app;
