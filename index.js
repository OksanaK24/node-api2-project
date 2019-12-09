const express = require("express");
const PostRouter = require("./routers/Posts");

const server = express();

server.use(express.json());

server.use("/api/posts", PostRouter);

const port = 2801
const host = "127.0.0.1" 

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`)
})