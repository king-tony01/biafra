const http = require("http");
const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;
const route = require("url");
const qs = require("querystring");
const PORT = process.env.PORT || 3000;

const server = http.createServer((request, response) => {
  console.log(request.method, request.url);
  let filePath = path.join(__dirname, "public", "index.html");
  if (request.url.match(/.js$/)) {
    let jsPath = path.join(__dirname, request.url);
    let jsStream = fs.createReadStream(jsPath, "utf-8");
    response.writeHead(200, { "Content-Type": "application/javascript" });
    jsStream.pipe(response);
  }
  if (request.url.match(/.css$/)) {
    let cssPath = path.join(__dirname, request.url);
    let cssStream = fs.createReadStream(cssPath, "utf-8");
    response.writeHead(200, { "Content-Type": "text/css" });
    cssStream.pipe(response);
  }

  if (request.url.match(/.jpeg$/)) {
    let jpegPath = path.join(
      __dirname,
      `${request.url.startsWith("public") ? "public" : "private"}`,
      request.url
    );
    let jpegStream = fs.createReadStream(jpegPath);
    response.writeHead(200, { "Content-Type": "image/jpeg" });
    jpegStream.pipe(response);
  }
  if (request.url.match(/.jpg$/)) {
    let jpgPath = path.join(
      __dirname,
      `${request.url.startsWith("public") ? "public" : "private"}`,
      request.url
    );
    let jpgStream = fs.createReadStream(jpgPath);
    response.writeHead(200, { "Content-Type": "image/jpg" });
    jpgStream.pipe(response);
  }

  if (request.url === "/") {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) throw err;
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(data);
    });
  } else if (request.url === "/login.html") {
    fs.readFile("./public/login.html", "utf-8", (err, data) => {
      if (err) throw err;
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(data);
    });
  } else if (request.url === "/signup.html") {
    fs.readFile("./public/signup.html", "utf-8", (err, data) => {
      if (err) throw err;
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(data);
    });
  } else if (request.url === "/index.html") {
    fs.readFile("./public/index.html", "utf-8", (err, data) => {
      if (err) throw err;
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(data);
    });
  }

  // HANDLING FORM DATA
  let path1 = route.parse(request.url, true);
  if (request.url === "/process" && request.method === "POST") {
    fs.readFile("./private/main.html", "utf-8", (err, data) => {
      if (err) throw err;

      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(data);
    });
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
