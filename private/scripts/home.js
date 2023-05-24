const openMessages2 = document.getElementById("open-message2");
const openMessages = document.getElementById("open-message");
const openNotifications = document.getElementById("open-notifications");
const openNotifications2 = document.getElementById("open-notifications2");
const closeNotifications = document.getElementById("close-notifications");
const openMenu = document.getElementById("open-menu");
const closeMenu = document.getElementById("close-menu");

const messagesContainer = document.querySelector(".messages");
const notificationsContainer = document.querySelector(".notifications");
const menu = document.querySelector(".settings");

const createPostContainer = document.getElementById("form");

const closeCreatePost = document.querySelector(".one");

const createPostBtn = document.getElementById("create-post-button");

const likeBtn = document.querySelectorAll(".fa-star");

const modal = document.getElementById("modal");

const chatRoom = document.querySelector(".chat-room");

const openChatRoomBtn = document.querySelectorAll(".user-chat");

const closeChatRoom = document.getElementById("close-chats");

// CENTER FEEDS
const centerFeed = document.querySelector(".center");
const text = document.getElementById("text");
const postBtn = document.getElementById("post-button");

// POSTING
postBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const container = document.createElement("section");
  container.className = "post";
  container.innerHTML = `<section class="post-head">
        <div class="name"><img src="./images/image-02.jpeg" alt="" id="user-image"/>
        <div class="user-details">
          <b id="username">Ifesinachi Odidi</b>
          <span class="date">11:08 am</span>
        </div></div>
        <a href="#" id="follow-btn"><i class="fa fa-plus"></i> Follow</a>
      </section>
      <section class="post-body">
        <article>
          <p>${text.value}</p>
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
            6 comments
          </div>
        </div>
        <div class="action-btn">
          <p><i class="far fa-star"></i> Like</p>
          <p><i class="far fa-comment"></i> Comment</p>
          <p><i class="fa fa-share"></i> Share</p>
        </div>
        <div class="comment-area">
          <img src="./images/image-03.jpeg" alt="" id="user-image"/>
          <div class="comment-box">
            <textarea name="" id="comment-input" placeholder="Comment something"></textarea>
          <i class="far fa-paper-plane"></i></div>
        </div>
      </section>`;
  centerFeed.appendChild(container);
});

// END OF CENTER FEED

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

likeBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("fas");
  });
});

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
