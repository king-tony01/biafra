import * as mysql from "mysql";
// import * as bcrypt from "bcrypt";
const myDb = mysql.createConnection({
  user: "root",
  host: "localhost",
  database: "biafra",
  password: "password",
});

myDb.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("Connection successful");
});

export async function createUser(details) {
  const {
    id,
    surname,
    firstName,
    lastName,
    email,
    password,
    gender,
    phone,
    origin,
    dateOfBirth,
  } = details;
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(password, salt);
  let query = `INSERT INTO users(id, surname, firstName, lastName, email, userPassword, gender, phone, origin, dateOfBirth) VALUES("${id}", "${surname}", "${firstName}", "${lastName}", "${email}", "${password}", "${gender}", "${phone}", "${origin}", "${dateOfBirth}")`;
  return new Promise((reject, resolve) => {
    try {
      myDb.query(query, function (err, results, fields) {
        if (err) {
          reject({
            message: "Error occured while registring your account",
            stat: false,
          });
          // myDb.end((err) => {
          //   console.log(err);
          // });
        }
        resolve({
          message: "Registration successful!",
          stat: true,
        });
        console.log(results);
        // myDb.end((err) => {
        //   console.log(err);
        // });
      });
    } catch (err) {
      reject(err);
    }
  });
}

export function fetchUser(id, email) {
  if (id !== null && email == null) {
    const query = `SELECT * FROM users WHERE id = "${id}";`;
    return new Promise((resolve, reject) => {
      myDb.query(query, async function (err, results, fields) {
        if (err) {
          reject(err);
        }
        if (results.length == 0) {
          reject({
            message: "No user found in our records",
            stat: false,
          });
        } else {
          resolve({
            data: results,
            stat: true,
          });
        }
      });
    });
  } else if (id == null && email !== null) {
    const query = `SELECT * FROM users WHERE email = "${email}";`;
    return new Promise((resolve, reject) => {
      myDb.query(query, async function (err, results, fields) {
        if (err) {
          reject(err);
        }
        if (results.length == 0) {
          reject({
            message: "No user found in our records",
            stat: false,
          });
        } else {
          resolve({
            data: results,
            stat: true,
          });
        }
      });
    });
  }
}

export function addPost(post) {
  const { content, id, likes, comments, shares, post_id, poster } = post;
  const insertQuery = `INSERT INTO posts(post_id, id, content, likes, comments, shares, time_posted, date_posted, poster) VALUES("${post_id}", "${id}", "${content}", ${likes}, ${comments}, ${shares}, NOW(), CURDATE(), "${poster}")`;
  return new Promise((resolve, reject) => {
    myDb.query(insertQuery, function (err, results, fieldData) {
      if (err) {
        reject(err);
      } else {
        console.log(results);
        if (results.serverStatus == 2) {
          resolve({
            serverResponse: 1,
            message: "Posted succesfully!",
          });
        }
      }
    });
  });
}

export function getAllPost() {
  return new Promise((resolve, reject) => {
    myDb.query("SELECT * FROM posts", function (err, results, fieldData) {
      if (err) {
        reject(err);
      } else {
        resolve(results);
        console.log(results);
      }
    });
  });
}

export function updatePost(type) {
  const { message, post_id } = type;
  if (message == "liked") {
    const insertQuery = `UPDATE posts SET likes = likes + 1 WHERE post_id = "${post_id}"; `;
    return new Promise((resolve, reject) => {
      myDb.query(insertQuery, function (err, results, fieldData) {
        if (err) {
          reject(err);
        } else {
          console.log(results);
        }
      });
    });
  } else if (message == "unliked") {
    const insertQuery = `UPDATE posts SET likes = likes - 1 WHERE post_id = "${post_id}"; `;
    return new Promise((resolve, reject) => {
      myDb.query(insertQuery, function (err, results, fieldData) {
        if (err) {
          reject(err);
        } else {
          console.log(results);
        }
      });
    });
  }
}
