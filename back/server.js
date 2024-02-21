const express = require('express');
const cors = require('cors');
const db = require('./db_config.js');
const router = require('./request_router.js');


const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`${PORT} 포트 작동중`)
});