const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const stream = require("stream");

io.on("connection", socket => {
  console.log("a user connected...");
  socket.on("draw", ({ data }) => {
    console.log("data recieved, emitting...");
    socket.broadcast.emit("rdraw", { data });
  });
  socket.on("video", data => {
    console.log(stream.Stream(data));
  });
  socket.on("peer", ({ id }) => {
    socket.broadcast.emit("new peer", { id });
  });
});

http.listen(8080, () => {
  console.log("server started...");
});
