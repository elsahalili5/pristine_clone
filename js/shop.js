function loadData(products) {
  let container = document.getElementById("items-container");
  let out = "";

  for (let [index, product] of products.entries()) {
    out += `
        <div class="item">
          <a href="product-details.html" class="product-item-link" data-productid="${product.id}">
            <div class="image-wrapper">
              <img src="./images/${product.image}" alt="" class="default_photo" />
              <img src="${product.hoverImage}" alt="" class="hover_photo" />
            </div>

            <h2>${product.name}</h2>
          </a>
        </div>
      `;
  }

  container.innerHTML = out;
}

loadData(products);

document.addEventListener("DOMContentLoaded", function () {
  const productLinks = document.querySelectorAll(".product-item-link");

  productLinks.forEach((item) => {
    const productId = item.dataset.productid;
    item.onclick = function () {
      localStorage.setItem("product-details", productId);
    };
  });
});

var chatIcon = document.getElementById("chat_icon");
var chatBox = document.getElementById("chat_box");
var removeIcon = document.getElementById("remove-icon");

chatIcon.onclick = () => {
  chatBox.classList.add("active");
};
removeIcon.onclick = () => {
  chatBox.classList.remove("active");
};
