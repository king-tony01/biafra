const openMessages2 = document.getElementById("open-message2");
const openMessages = document.getElementById("open-message");
const openNotifications = document.getElementById("open-notifications");
const openNotifications2 = document.getElementById("open-notifications2");
const closeNotifications = document.getElementById("close-notifications");
const openMenu = document.getElementById("open-menu");
const closeMenu = document.getElementById("close-menu");
const spinner = document.querySelector(".spinner");
const messagesContainer = document.querySelector(".messages");
const notificationsContainer = document.querySelector(".notifications");
const menu = document.querySelector(".settings");
const emoji = document.querySelector("fa-face-smile");
const username = document.querySelectorAll(".username");
const email = document.querySelectorAll(".email");
const createPostContainer = document.getElementById("form");
const postImage = document.querySelector(".post-image");
const postImageButton = document.querySelector(".fa-image");
const closeCreatePost = document.querySelector(".one");
const menus = document.querySelector(".menus");
const menuBar = document.querySelector(".menu-bar");
const notifyContainer = document.querySelector(".notify-container");
const createPostBtn = document.getElementById("create-post-button");
const chats = document.querySelector(".chats");
const likeBtn = document.querySelectorAll(".fa-star");

const modal = document.getElementById("modal");

const chatRoom = document.querySelector(".chat-room");

const openChatRoomBtn = document.querySelectorAll(".user-chat");

const closeChatRoom = document.getElementById("close-chats");
init();
const userState = {
  fullName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
};

// INITIATING WEBSOCKET
const websocket = new WebSocket("ws://localhost:1990");

menus.addEventListener("click", async (e) => {
  console.log(e.target.dataset.id);
  const btnTarget = e.target.dataset.id;
  switch (btnTarget) {
    case "home":
      menu.classList.remove("active");
      await fetchPosts();
      break;
    case "profile":
      menu.classList.remove("active");
      centerFeed.innerHTML = `      <section class="profile-section">
        <div class="profile-head">
          <div class="profile-image-con">
            <img src="/private/images/image-01.jpeg" alt="" />
            <i class="fas fa-pen"></i>
          </div>
          <div class="username-con">
            <b id="username" class="username">${userState.fullName}</b>
            <small id="email" class="email">${userState.email}</small>
            <span id="phone" class="phone" style="color: red;">${userState.phone}</span>
          </div>
        </div>
        <div class="history"></div>
      </section>`;
      break;
  }
});

menuBar.addEventListener("click", async (e) => {
  console.log(e.target.dataset.id);
  const btnTarget = e.target.dataset.id;
  switch (btnTarget) {
    case "home":
      await fetchPosts();
      break;
    default:
      centerFeed.innerHTML = `<section><h2>Coming soon!</h2></section>`;
      break;
  }
});

async function init() {
  const userId = window.location.search.slice(1);
  console.log(userId);
  const resData = await getJSON(`getuser/?${userId}`);
  const { data } = resData;
  userState.fullName = `${data[0].surname} ${data[0].firstName}`;
  userState.email = data[0].email;
  userState.dateOfBirth = data[0].dateOfBirth;
  userState.phone = data[0].phone;
  username.forEach((con) => {
    con.textContent = `${data[0].surname} ${data[0].firstName}`;
  });
  email.forEach((con) => {
    con.textContent = data[0].email;
  });
  console.log(resData);
  notifyContainer.innerHTML = `<section class="notify" onclick='openPost()'>
            <div>
              <b>King Tony:</b>
              <p>You recieved a new alert</p>
            </div>
            <span class="time">20:33 pm</span>
          </section>`;
  chats.innerHTML = `<div class="user-chat">
            <img src="./images/image-01.jpeg" alt="" id="user-image" />
            <div class="user-name-and-message">
              <b>Ifesinachi Odidi</b>
              <small>Do you really want to do this?</small>
            </div>
            <div class="time-and-alert">
              <span class="time"> 1:43 pm </span>
              <small class="alert">4</small>
            </div>
          </div>`;
  fetchPosts();
}

// CENTER FEEDS
const centerFeed = document.querySelector(".center");
const text = document.getElementById("text");
const postBtn = document.getElementById("post-button");

// POSTING
postBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  if (text.value.length == 0) {
    postBtn.setAttribute("disabled", "");
    return;
  } else {
    postBtn.removeAttribute("disabled");
    centerFeed.innerHTML = `<div class="spinner"><i class="fa fa-spinner"></i></div>`;
    createPostContainer.classList.remove("active");
    modal.classList.remove("active");
    const post = {
      post_id: Math.random().toString(32).substring(5, 20),
      id: "30mk2o",
      content: text.value,
      likes: 0,
      comments: 0,
      shares: 0,
      poster: userState.fullName,
    };
    const response = await fetch("http://localhost:1990/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      await fetchPosts();
    }
  }
});

//Fetching posts
async function fetchPosts() {
  const response = await fetch("http://localhost:1990/posts/all");
  const data = await response.json();
  console.log(data);
  if (response.ok) {
    centerFeed.innerHTML = "";
  }
  centerFeed.innerHTML = `${data.map((post) => {
    const {
      content,
      likes,
      comments,
      shares,
      date_posted,
      time_posted,
      poster,
      post_id,
    } = post;
    return `<section class="post" id="${post_id}">
    <section class="post-head">
        <div class="name"><img src="./images/image-02.jpeg" alt="" id="user-image"/>
        <div class="user-details">
          <b id="username">${poster}</b>
          <span class="date">${time_posted.slice(0, 5)} ${
      time_posted.slice(0, 2) > 12 ? "PM" : "AM"
    }</span>
        </div></div>
      </section>
      <section class="post-body">
        <article>
          <p>${content}</p>
        </article>
        <section class="images">
          <img src="./images/image-01.jpeg" alt="" />
          <img src="./images/image-03.jpeg" alt="" />
        </section>
      </section>
      <section class="actions">
        <div class="display-actions">
          <div class="icons">
            <i class="fas fa-star"></i>
            <i class="fas fa-face-smile"></i>
            <i class="fas fa-heart"></i>
          </div>
          <div class="comment-share">
            <span>${comments} Comments</span>
            <span id="like">${likes} Likes</span>
            <span>${shares} Shares</span>
          </div>
        </div>
        <div class="action-btn">
          <p><i class="far fa-star" onclick='like(this, "${post_id}", "${content.slice(
      0,
      20
    )}...")'></i> Like</p>
          <p><i class="far fa-comment"></i> Comment</p>
          <p><i class="fa fa-share"></i> Share</p>
        </div>
        <div class="comment-area">
          <img src="./images/image-03.jpeg" alt="" id="user-image"/>
          <div class="comment-box">
            <textarea name="" id="comment-input" placeholder="Comment something"></textarea>
          <i class="far fa-paper-plane"></i></div>
        </div>
      </section>
      </section>`;
  })}`;
}
// END OF CENTER FEED

// NOTIFICATIONS

function sendWebSocket(type, content, callback) {
  const payload = {
    type: type,
    data: content,
  };
  websocket.addEventListener("open", () => {
    console.log("Connection established");
    websocket.send(JSON.stringify(payload));
    websocket.addEventListener("message", (event) => {
      const resData = JSON.parse(event.data);
      console.log(resData);
      callback(resData);
    });
  });
}

//sendWebSocket({ type: "notification", message: "Someone liked your post" });
function sendLike(id, content) {
  sendWebSocket(
    "notification",
    {
      content_id: id,
      content_data: content,
    },
    function callback(data) {
      console.log(data);
    }
  );
}
// END OF NOTIFICATIONS
// FORM EVENTS
createPostContainer.addEventListener("onsubmit", (e) => {
  e.preventDefault();
});

openMessages.addEventListener("click", () => {
  openMessages.classList.toggle("fa-chevron-down");
  messagesContainer.classList.toggle("active");
});
openMessages2.addEventListener("click", () => {
  openMessages.classList.toggle("fa-chevron-down");
  messagesContainer.classList.toggle("active");
});
// openMessages.addEventListener("click", () => {
//   openMessages.classList.toggle("fa-chevron-down");
//   messagesContainer.classList.toggle("active");
// });
openNotifications.addEventListener("click", () => {
  openNotifications.classList.toggle("fa-chevron-down");
  notificationsContainer.classList.toggle("active");
});
openNotifications2.addEventListener("click", () => {
  openNotifications.classList.toggle("fa-chevron-down");
  notificationsContainer.classList.toggle("active");
});
closeNotifications.addEventListener("click", () => {
  notificationsContainer.classList.toggle("active");
});
openMenu.addEventListener("click", () => {
  menu.classList.add("active");
});
closeMenu.addEventListener("click", () => {
  menu.classList.remove("active");
});

createPostBtn.addEventListener("click", () => {
  createPostContainer.classList.add("active");
  modal.classList.add("active");
});

closeCreatePost.addEventListener("click", () => {
  createPostContainer.classList.remove("active");
  modal.classList.remove("active");
});

//emoji.addEventListener("click", () => {});

async function like(btn, id, content) {
  btn.classList.toggle("fas");
  if (btn.classList.contains("fas")) {
    sendLike(id, content);
    const data = await getJSON(`update/like`, {
      message: "liked",
      post_id: id,
    });
    console.log(data);
  } else {
    const data = await getJSON(`update/like`, {
      message: "unliked",
      post_id: id,
    });
    if (data.ok) {
      // setLike(id, btn.closest())
    }
  }
}

function setLike(id, like) {
  const data = getJSON(`get/like?id=${id}`);
  like.textContent = `${data} Likes`;
}

// CHAT ROOM
openChatRoomBtn.forEach((el) => {
  el.addEventListener("click", () => {
    chatRoom.classList.add("active");
    modal.classList.add("active");
  });
});

closeChatRoom.addEventListener("click", () => {
  chatRoom.classList.remove("active");
  modal.classList.remove("active");
});

async function getJSON(path, data) {
  if (data !== null) {
    const response = await fetch(`http://localhost:1990/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await response.json();
    return resData;
  } else {
    const response = await fetch(`http://localhost:1990/${path}`);
    const data = await response.json();
    return data;
  }
}

postImageButton.addEventListener("click", () => {
  postImage.click();
});

postImage.addEventListener("change", getImage, false);

function getImage() {
  console.log(postImage.files);
  console.log(postImage);
  const curFile = postImage.files;
  for (const file of curFile) {
    console.log(file);
  }
}
