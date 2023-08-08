document.addEventListener("DOMContentLoaded", function () {
  const orderHistoryElement = document.getElementById("order-history");
  const orderTable = document.getElementById("orders-container");
  const loggedInUserData = JSON.parse(localStorage.getItem("loggedInUser"));
  const allOrders = JSON.parse(localStorage.getItem("orderedItems")) || [];
  const myOrders = allOrders.filter((item) => item.user.email === loggedInUserData.email);

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
        <td><button class="view-btn">VIEW</button></td>

      `;

        orderHistoryElement.appendChild(newRow);
      });
    }
  } else {
    orderTable.textContent = "No order has been made yet.";
  }
});
