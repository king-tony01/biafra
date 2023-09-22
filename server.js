import { createServer } from "http";
import { parse } from "url";
import { WebSocketServer } from "ws";
import * as route from "./backend/router.js";
import {
  addPost,
  createUser,
  fetchUser,
  getAllPost,
  updatePost,
} from "./backend/database.js";

const PORT = process.env.PORT || 1990;

const server = createServer(async (req, res) => {
  // Server logic here
  const { pathname, query } = parse(req.url);
  if (pathname.includes(".")) {
    route.serverContentType(pathname, res);
  }
  console.log(pathname);
  if (pathname == "/") {
    // Landing page here
    route.serveLanding(res);
  }
  if (pathname == "/signup") {
    route.servePage("/public/signup.html", res);
  }
  if (pathname == "/login") {
    route.servePage("/public/login.html", res);
  }
  if (pathname == "/biafra/signup") {
    let body;
    req.on("data", (chunk) => {
      body = chunk;
    });
    req.on("end", async () => {
      try {
        console.log(JSON.parse(body));
        const userData = JSON.parse(body);
        let userRes = await createUser(userData);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(userRes));
      } catch (error) {
        console.log(error);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(error));
      }
    });
  }

  if (pathname == "/biafra/login") {
    let body;
    req.on("data", (chunk) => {
      body = chunk;
    });
    req.on("end", async () => {
      try {
        console.log(JSON.parse(body));
        const userData = JSON.parse(body);
        const { email } = userData;
        let userRes = await fetchUser(null, email);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(userRes));
      } catch (error) {
        console.log(error);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(error));
      }
    });
  }
  if (pathname == "/getuser/") {
    console.log(query);
    try {
      console.log(await fetchUser(query, null));
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(await fetchUser(query, null)));
    } catch (err) {
      console.log(err);
    }
  }
  if (pathname == "/post") {
    let body;
    req.on("data", (chunk) => {
      body = chunk;
    });
    req.on("end", async () => {
      try {
        const postData = JSON.parse(body);
        console.log(postData);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(await addPost(postData)));
      } catch (err) {
        console.log(err);
      }
    });
  }
  if (pathname == "/posts/all") {
    try {
      console.log(await getAllPost());
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(await getAllPost()));
    } catch (err) {
      console.log(err);
    }
  }
  if (pathname == "/home") {
    route.servePage("/private/main.html", res);
  }
  if (pathname == "/update/like") {
    let body;
    req.on("data", (chunk) => {
      body = chunk;
    });
    req.on("end", async () => {
      try {
        const data = JSON.parse(body);
        console.log(data);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(await updatePost(data)));
      } catch (err) {
        console.log(err);
      }
    });
  }
});

const websocket = new WebSocketServer({ server: server });
websocket.on("connection", (ws) => {
  console.log("Client connected");
  ws.on("message", (message) => {
    console.log(JSON.parse(message));
    ws.send(JSON.stringify({ response: "What's up client" }));
  });
  ws.on("off", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
