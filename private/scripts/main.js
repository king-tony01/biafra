const submitBtn = document.getElementById("submit");
const inputEl = document.querySelectorAll("input");
const form = document.querySelector("form");
const alertWindow = document.querySelector(".alertWindow");
const originContainer = document.getElementById("origin");

form.addEventListener("submit", function (e) {
  // e.preventDefault();
  const data = new FormData(form);
  for (const [name, value] of data) {
    console.log(name, ":", value);
  }
  // if (data.values() !== "") {
  //   location.reload();
  // }
});

const request = new XMLHttpRequest();
request.open("GET", "https://restcountries.com/v3.1/all");
request.send();

request.addEventListener("load", function () {
  const retrieved = JSON.parse(this.responseText);
  retrieved.sort();
  for (let i = 0; i < retrieved.length; i++) {
    const options = document.createElement("option");
    options.textContent = retrieved[i].name.common;
    originContainer.appendChild(options);
  }
});

// var qs = require('querystring');

// function parseBody(req, callback) {
//     var body = '';
//     req.on('data', (data) => body += data);
//     req.on('end', () => callback(qs.parse(body)))
// }

// post: function (url, handler) {
//     if (this.request.method === 'POST' && this.request.url === url) {
//         parseBody (this.request, function (data) {
//             console.log(data);
//         })
//     }
// }

// var mysql = require("mysql");

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "yourusername",
//   password: "yourpassword",
//   database: "mydb",
// });

// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "INSERT INTO customers (name, address) VALUES ?";
//   var values = [
//     ["John", "Highway 71"],
//     ["Peter", "Lowstreet 4"],
//     ["Amy", "Apple st 652"],
//     ["Hannah", "Mountain 21"],
//     ["Michael", "Valley 345"],
//     ["Sandy", "Ocean blvd 2"],
//     ["Betty", "Green Grass 1"],
//     ["Richard", "Sky st 331"],
//     ["Susan", "One way 98"],
//     ["Vicky", "Yellow Garden 2"],
//     ["Ben", "Park Lane 38"],
//     ["William", "Central st 954"],
//     ["Chuck", "Main Road 989"],
//     ["Viola", "Sideway 1633"],
//   ];
//   con.query(sql, [values], function (err, result) {
//     if (err) throw err;
//     console.log("Number of records inserted: " + result.affectedRows);
//   });
// });
