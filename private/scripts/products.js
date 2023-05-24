const addToCartBtn = document.querySelectorAll(".add-to-cart");
const checkoutPage = document.querySelector(".check-out");
const closeCheckoutPage = document.querySelector(".fa-close");
const cartButton = document.querySelector(".cart-button");
const lists = document.getElementById("list-container");

const itemCounter = document.querySelector(".item-counter");

const decreaseItemBtn = document.querySelectorAll(".fa-minus");

const cartCounter = document.querySelector(".cart-counter");
let counter = 0;
let items = 0;

addToCartBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    itemCounter.textContent = `${counter} Items to checkout`;
    const li = document.createElement("li");
    li.innerHTML = ` <div class="details"><img src="./images/jewelry-01.jpg" alt="">
            <div><p>Original Vintage</p>
                <div class="quantity">
                    <small>Quantity:</small>
                    <div class="quantity-counter">
                        <i class="fa fa-minus"></i>
                        <span class="quantity-number"></span>
                        <i class="fa fa-plus" onclick="add()"></i>
                    </div>
                </div>
            <b class="price">£110</b></div></div>
            <div class="custom-check"><input type="checkbox" name="" id=""><span class="checkmark"></span</div>
            <i class="fas fa-trash"></i>`;
    btn.setAttribute("disabled", "");
    if (btn.getAttribute("disabled") != true) {
      lists.appendChild(li);
      itemCounter.textContent = `${counter} Items to checkout`;
    }

    btn.style.background = "green";
    btn.textContent = "Added to cart";
    counter++;
    cartCounter.classList.add("active");
    cartCounter.textContent = counter;
  });
});

cartButton.addEventListener("click", () => {
  counter = 0;
  cartCounter.textContent = counter;
  cartCounter.classList.remove("active");
  checkoutPage.classList.toggle("active");
});

closeCheckoutPage.addEventListener("click", () => {
  checkoutPage.classList.add("active");
});

function add() {
  const increaseItemBtn = document.querySelectorAll(".fa-plus");
  const quantityNumber = document.querySelectorAll(".quantity-number");
  increaseItemBtn.forEach((el) => {
    el.addEventListener("click", () => {
      items++;
      quantityNumber.forEach((e) => {
        e.textContent = items;
      });
    });
  });
}
