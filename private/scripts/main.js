const submitBtn = document.getElementById("submit");
const inputEl = document.querySelectorAll("input");
const form = document.querySelector("form");
const alertWindow = document.querySelector(".alertWindow");
const originContainer = document.getElementById("origin");

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

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const user = {
    id: Math.random().toString(32).substring(2, 8),
    surname: data.get("surname"),
    firstName: data.get("first-name"),
    lastName: data.get("last-name"),
    email: data.get("email"),
    password: data.get("password"),
    gender: data.get("gender"),
    phone: data.get("tel"),
    origin: data.get("origin"),
    dateOfBirth: data.get("date-of-birth"),
  };
  const response = await fetch("/biafra/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const resData = await response.json();
  console.log(resData);
  if (resData.stat) {
    location.assign(`http://localhost:1990/home?${user.id}`);
  }
});
