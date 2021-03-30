const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())
const itemsRouter = require("./items/items-router.js");
const usersRouter = require("./users/users-router.js");


server.use("/api/items", itemsRouter);
server.use("/api/users", usersRouter);


server.get('/', (req,res) => {
    res.json('app is working')
})

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
      message: err.message,
      stack: err.stack,
    });
  });
module.exports = server
