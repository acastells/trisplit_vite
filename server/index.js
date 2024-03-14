const express = require('express');
const path = require('path');
const jsonServer = require('json-server');

const app = express();
const staticFilesPath = path.resolve(__dirname, './public');
app.use('/', express.static(staticFilesPath));
app.use('/api', jsonServer.router("db.json"));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});