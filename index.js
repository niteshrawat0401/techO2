const express = require('express');
const connection = require('./db/db');
const authRouter = require('./router/authRouter');
const cors = require('cors');
require("dotenv").config();

const app = express()
// app.use(cors({
//   origin: ["http://localhost:3000"],
// }))
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use('/auth', authRouter);
app.get('/', (req,res) => res.send('Hello'))

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  await connection;
  console.log(`Server started on http://localhost:${PORT}`);
});
//techo2