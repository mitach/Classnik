require('dotenv').config();
const express = require('express');

const app = express();
require('./config/express-config')(app);

const routes = require('./routes');
const PORT = process.env.PORT || 8080;
const initDatabase = require('./config/database-config');

app.use(routes);

initDatabase();
app.listen(PORT, () => console.log(`The app is listening on http://localhost:${PORT}`));