var cartContainer = document.getElementById("cart-container");
var closeBtn = document.getElementById("x-icon");
const cartQuantity = document.getElementById("cart-quantity");
const openCartButtons = document.querySelectorAll(".open-cart-btn");

if (openCartButtons) {
  openCartButtons.forEach((cartBtn) => {
    cartBtn.onclick = () => {
      closeMenu();
      openShoppingCart();
    };
  });
}

if (closeBtn) {
  closeBtn.onclick = () => {
    cartContainer.classList.remove("cart-show");
  };
}

function setCartItemsToLocalStorage(cartItems) {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function addProductToShoppingCart(product, selectedSize) {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const existingCartItem = cartItems.find((item) => item.id === product.id);

  if (existingCartItem && existingCartItem.selectedSize === selectedSize) {
    existingCartItem.quantity += 1;
  } else {
    product.quantity = 1;
    product.selectedSize = selectedSize;
    cartItems.push(product);
  }

  product.price = parseFloat(product.price);
  product.quantity = parseInt(product.quantity);
  setCartItemsToLocalStorage(cartItems);
  openShoppingCart();
}

function openShoppingCart() {
  renderCartItems();
  cartContainer.classList.add("cart-show");
}

function updateCartMenuItemQuantity() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  const cartQuantityElements = document.querySelectorAll(
    ".open-cart-btn > span"
  );

  if (cartItems && cartQuantityElements) {
    let total = 0;

    cartItems.forEach((cartItem) => {
      total += cartItem.quantity;
    });

    cartQuantityElements.forEach(
      (cartElement) => (cartElement.innerHTML = total)
    );
  }
}

function renderCartItems() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalValue = document.getElementById("cart-total-value");
  const cartCheckoutWrapper = document.getElementById("cart-checkout-wrapper");

  updateCartMenuItemQuantity();

  if (cartItemsContainer) {
    cartItemsContainer.innerHTML = "";
    let totalPrice = 0;
    if (cartItems.length === 0) {
      const emptyCartMessage = document.createElement("div");
      emptyCartMessage.classList.add("empty-cart-message");
      emptyCartMessage.innerHTML =
        "<p>You have no items in your shopping cart.</p>";
      cartItemsContainer.appendChild(emptyCartMessage);
      cartCheckoutWrapper.style.display = "none";
    } else {
      cartCheckoutWrapper.style.display = "flex";
      cartItems.forEach((cartItem, index) => {
        totalPrice += cartItem.price * cartItem.quantity;

        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");

        itemElement.innerHTML = `
     <ion-icon class="x-btn" id="x-btn-${
       cartItem.id
     }" name="close-outline"></ion-icon>

      <div class="image-box">
        <img src="images/${cartItem.image}" alt="" />
        <div class="product-quantity">
          <button class="quantity-btn" id="decrease-btn-${
            cartItem.id
          }">-</button>
          <p class="item-quantity" id="quantity-${cartItem.id}">${
          cartItem.quantity
        }</p>
          <button class="quantity-btn" id="increase-btn-${
            cartItem.id
          }">+</button>
        </div>
      </div>
      <div class="left">
        <p>${cartItem.name}</p>
        <p id="size-${cartItem.id}">SELECTED SIZE: ${cartItem.selectedSize}</p> 

        <p id="price-${cartItem.id}">PRICE: €${cartItem.price.toFixed(2)}</p> 
      </div>
    `;
        cartItemsContainer.appendChild(itemElement);

        const removeProductBtn = document.getElementById(
          `x-btn-${cartItem.id}`
        );
        if (removeProductBtn) {
          removeProductBtn.addEventListener("click", function () {
            cartItems.splice(index, 1);
            setCartItemsToLocalStorage(cartItems);
            renderCartItems();
          });
        }

        const increaseBtn = document.getElementById(
          `increase-btn-${cartItem.id}`
        );
        if (increaseBtn) {
          increaseBtn.addEventListener("click", function () {
            cartItem.quantity += 1;
            setCartItemsToLocalStorage(cartItems);
            renderCartItems();
          });
        }

        const decreaseBtn = document.getElementById(
          `decrease-btn-${cartItem.id}`
        );
        if (decreaseBtn) {
          decreaseBtn.addEventListener("click", function () {
            if (cartItem.quantity > 1) {
              cartItem.quantity -= 1;
              setCartItemsToLocalStorage(cartItems);
              renderCartItems();
            }
          });
        }
      });
    }

    if (cartTotalValue) {
      cartTotalValue.innerHTML = totalPrice.toFixed(2);
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const checkoutBtn = document.getElementById("checkout-btn");
  checkoutBtn.addEventListener("click", function () {
    window.location.href = "checkout.html";
  });
});

document.addEventListener("DOMContentLoaded", updateCartMenuItemQuantity);
