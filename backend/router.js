import { readFile } from "fs";
import { extname } from "path";
export function serveLanding(res) {
  readFile("../BIAFRA/public/index.html", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Internal server error!" }));
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
}

export function servePage(fPath, res) {
  readFile(`../BIAFRA${fPath}`, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Internal server error!" }));
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
}

export function serverContentType(fPath, res) {
  let contentType;
  const extension = extname(fPath);
  switch (extension) {
    case ".css":
      contentType = "text/css";
      readFile(`../BIAFRA${fPath}`, "utf-8", (err, data) => {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
      });
      break;
    case ".js":
      contentType = "application/javascript";
      readFile(`../BIAFRA${fPath}`, "utf-8", (err, data) => {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
      });
      break;
    case ".jpeg":
      contentType = "image/jpeg";
      readFile(`../BIAFRA${fPath}`, "", (err, data) => {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
      });
      break;
    case ".jpg":
      contentType = "image/jpg";
      readFile(`../BIAFRA${fPath}`, "", (err, data) => {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
      });
      break;
    case ".png":
      contentType = "image/png";
      readFile(`../BIAFRA${fPath}`, "", (err, data) => {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
      });
      break;
    case ".woff2":
      contentType = "icon/woff2";
      readFile(`../BIAFRA${fPath}`, "", (err, data) => {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
      });
      break;
    case ".ttf":
      contentType = "icon/ttf";
      readFile(`../BIAFRA${fPath}`, "", (err, data) => {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
      });
      break;
  }
}
