document.addEventListener("DOMContentLoaded", function () {
  const orderHistoryElement = document.getElementById("order-history");
  const orderTable = document.getElementById("orders-container");

  const loggedInUserData = JSON.parse(localStorage.getItem("loggedInUser"));
  const allOrders = JSON.parse(localStorage.getItem("orderedItems")) || [];
  const myOrders = allOrders.filter(
    (item) => item.user.email === loggedInUserData.email
  );

  if (myOrders.length > 0) {
    if (orderHistoryElement) {
      orderHistoryElement.textContent = "";

      myOrders.forEach((order, index) => {
        const newRow = document.createElement("tr");
        const itemNames = order.orderItems.map((item) => item.name).join(", ");

        newRow.innerHTML = `
          <td>${index + 1}</td>
          <td>${itemNames}</td>
          <td>${order.date}</td>
          <td>€${order.total.toFixed(2)}</td>
          <td><button class="view-btn" data-orderId="${
            order.id
          }">VIEW</button></td>
        `;

        orderHistoryElement.appendChild(newRow);
      });

      const viewOrderBtns = document.querySelectorAll(".view-btn");
      const customModal = document.getElementById("customOrderModal");
      const closeCustomModal = document.getElementById("closeCustomModal");
      const orderName = document.getElementById("usernameSpan");
      const orderCountry = document.getElementById("countrySpan");
      const orderAddress = document.getElementById("addressSpan");
      const orderCity = document.getElementById("citySpan");
      const orderDate = document.getElementById("dateSpan");
      const orderEmail = document.getElementById("emailSpan");
      const orderPhone = document.getElementById("phoneSpan");
      const orderPaymentMethod = document.getElementById("paymentMethodSpan");
      const orderItemsElement = document.getElementById("order-items");
      const orderItem = document.getElementById("order-item");

      viewOrderBtns.forEach((viewOrderBtn) => {
        viewOrderBtn.addEventListener("click", function () {
          const orderId = viewOrderBtn.getAttribute("data-orderId");
          const order = myOrders.find((order) => order.id === Number(orderId));

          if (order) {
            orderName.textContent = order.user.username;
            orderCountry.textContent = order.billingDetails.country;
            orderAddress.textContent = order.billingDetails.address;
            orderCity.textContent = order.billingDetails.city;
            orderDate.textContent = order.date;
            orderEmail.textContent = order.user.email;
            orderPhone.textContent = order.billingDetails.phone;
            orderPaymentMethod.textContent = order.paymentMethod;

            orderItemsElement.innerHTML = "";

            order.orderItems.forEach((orderItem) => {
              orderItemsElement.innerHTML += `
                    <div class="order-item">
                      <img  src="./images/${orderItem.image}" >
                    <div class="order-item-details">
                      <p>${orderItem.name}</p>
                      <p>Size: ${orderItem.selectedSize}</p>
                      <p>Quantity: ${orderItem.quantity}</p>
                      <p>Price: €${orderItem.price.toFixed(2)} </p>
                    </div>
                    </div>
                `;
            });

            customModal.style.display = "block";
            var bodyElement = document.body;

            bodyElement.style.overflow = "hidden";
            document.getElementById("order-total").textContent =
              order.total.toFixed(2);
          }

          customModal.style.display = "block";
          document.getElementById("order-total").textContent =
            order.total.toFixed(2);
        });
      });

      closeCustomModal.addEventListener("click", function () {
        customModal.style.display = "none";
        bodyElement.style.overflow = "scroll";
      });
    }
  } else {
    orderTable.textContent = "No order has been made yet.";
  }
});
