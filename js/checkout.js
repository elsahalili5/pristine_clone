const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
const orderedItemsContainer = document.getElementById("ordered-items");
const subtotalSpan = document.getElementById("subtotal");
const orderBtn = document.getElementById("order-btn");
const loggedInUserData = JSON.parse(localStorage.getItem("loggedInUser"));
const checkoutInputs = document.querySelectorAll(
  ".checkout-form input, .checkout-form select"
);
const errorsElement = document.getElementById("errors");

function populateCountriesSelect() {
  const billingCountryElement = document.getElementById("billing-country");

  if (countries && billingCountryElement) {
    countries.forEach((country) => {
      const option = document.createElement("option");
      option.value = country.value;
      option.textContent = country.label;
      billingCountryElement.appendChild(option);
    });
  }
}
function fillForm() {
  if (loggedInUserData) {
    document.getElementById("billing-email").value = loggedInUserData.email;
    document.getElementById("billing-first-name").value =
      loggedInUserData.username;
    document.getElementById("billing-last-name").value =
      loggedInUserData.lastname;
  }
}

function updateCheckoutSection() {
  orderedItemsContainer.innerHTML = "";
  let orderedTotalPrice = 0;

  cartItems.forEach((cartItem) => {
    orderedTotalPrice += cartItem.price * cartItem.quantity;

    const orderedItemElement = document.createElement("div");
    orderedItemElement.classList.add("ordered-item");
    orderedItemElement.innerHTML = `
    <div class="image-box">
        <img src="images/${cartItem.image}" alt="" />
      </div>

      <div class="left-side">
        <p class="product-name">${
          cartItem.name
        }  <strong class="ordered-item-quantity">×${
      cartItem.quantity
    }</strong> </p>
        <div class="bottom-side">
          <ul>
            <li class="ordered-item-size">${cartItem.selectedSize}</li>
          </ul>
          <p class="ordered-item-price">€${cartItem.price.toFixed(2)}</p>
        </div>
      </div>
    </div>`;

    orderedItemsContainer.appendChild(orderedItemElement);
  });

  subtotalSpan.innerHTML = orderedTotalPrice.toFixed(2);
}

updateCheckoutSection(cartItems);

document.addEventListener("DOMContentLoaded", function () {
  populateCountriesSelect();
  fillForm();

  orderBtn.addEventListener("click", function () {
    let billingDetails = {};
    let hasError = false;

    const placeOrderButton = document.getElementById("order-btn");

    placeOrderButton.addEventListener("click", () => {
      if (loggedInUserData === null || loggedInUserData.length === 0) {
        hasError = true;
        errorsElement.innerHTML = "<li>Please log in to place an order.</li>";
        return;
      } else {
        errorsElement.innerHTML = "";
        checkoutInputs.forEach((input) => {
          if (input.id === "billing-country") {
            const foundCountry = countries.find(
              (country) => country.value === input.value
            );
            if (foundCountry) {
              billingDetails[input.name.replace("billing-", "")] =
                foundCountry.label;
            }
          } else {
            billingDetails[input.name.replace("billing-", "")] = input.value;
          }

          if (input.value === "") {
            hasError = true;
            input.classList.add("input-error");

            if (input.id === "billing-country") {
              errorsElement.innerHTML += `<li >Country is a required field!</li>`;
            } else {
              errorsElement.innerHTML += `<li >${input.placeholder} is a required field!</li>`;
            }
          } else {
            input.classList.remove("input-error");
          }
        });
        // document.getElementById("errors-container").style.marginTop = "100px";
      }

      if (!hasError) {
        const orderedItems =
          JSON.parse(localStorage.getItem("orderedItems")) || [];
        const creditCardCheckbox = document.getElementById(
          "credit-card-checkbox"
        );
        const paypalCheckbox = document.getElementById("paypal-checkbox");
        let selectedPaymentMethod = "";
        let calculatedTotalPrice = 0;
        cartItems.forEach((cartItem) => {
          calculatedTotalPrice += cartItem.price * cartItem.quantity;
        });
        if (creditCardCheckbox.checked) {
          selectedPaymentMethod = "Credit Card";
        } else if (paypalCheckbox.checked) {
          selectedPaymentMethod = "PayPal";
        }

        creditCardCheckbox.addEventListener("change", function () {
          if (creditCardCheckbox.checked) {
            paypalCheckbox.checked = false;
          }
        });

        paypalCheckbox.addEventListener("change", function () {
          if (paypalCheckbox.checked) {
            creditCardCheckbox.checked = false;
          }
        });

        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${
          currentDate.getMonth() + 1
        }-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

        const newOrder = {
          user: loggedInUserData,
          id: generateOrderId(),
          billingDetails: billingDetails,
          orderItems: cartItems,
          paymentMethod: selectedPaymentMethod,
          total: calculatedTotalPrice,
          date: formattedDate,
        };
        orderedItems.push(newOrder);
        localStorage.setItem("orderedItems", JSON.stringify(orderedItems));
        localStorage.removeItem("cartItems");
        window.location.href = "order-confirmation.html";
      }
    });
  });
});

function generateOrderId() {
  return Math.floor(Math.random() * 100000);
}

console.log(generateOrderId());
