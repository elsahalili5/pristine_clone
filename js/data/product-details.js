let selectedSize = "";

function loadProductDetails(id) {
  let productName = document.getElementById("item-name");
  let productPrice = document.getElementById("item-price");
  let shippingInfo = document.getElementById("shipping-info");
  let mainImg = document.getElementById("mainImg");
  let itemPicsContainer = document.getElementById("itemPicsContainer");
  let productDetails = document.getElementById("item-details-list");
  let productSizes = document.getElementById("sizes-list");
  let itemDescription = document.getElementById("item-description-text");

  const foundProduct = products.find((item) => item.id == id);

  if (foundProduct) {
    addCartBtnEventListener(foundProduct);

    productName.innerHTML = foundProduct.name;
    productPrice.innerHTML = "€" + foundProduct.price.toFixed(2);

    mainImg.src = `./images/${foundProduct.mainImg}`;
    itemPicsContainer.innerHTML = "";
    let itemPicsHTML = "";
    foundProduct.itemPics.forEach((picSrc) => {
      itemPicsHTML += `<img class="small-img" src="${picSrc}" alt="" />`;
    });
    itemPicsContainer.innerHTML = itemPicsHTML;

    // add dynamic product details
    let detailsHTML = "";
    foundProduct.details.forEach((detail, index) => {
      detailsHTML += `<li>${detail}</li>`;
    });
    productDetails.innerHTML = detailsHTML;
    if (foundProduct.description) {
      itemDescription.innerHTML = foundProduct.description;
    }
    shippingInfo.innerHTML = foundProduct.shippingInfo;

    // add dynamic sizes html
    let sizesHTML = "";
    foundProduct.sizes.forEach((size, index) => {
      sizesHTML += `<li class="size${index + 1}">${size}</li>`;
    });
    productSizes.innerHTML = sizesHTML;
  }
}
function showModal(message, modalId, modalMessageClass) {
  const modal = document.getElementById(modalId);
  const modalMessage = modal.querySelector("." + modalMessageClass);
  const closeModal = modal.querySelector(".custom-close");

  modalMessage.textContent = message;
  modal.style.display = "block";

  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}

function addCartBtnEventListener(product) {
  const addToCartBtn = document.getElementById("add-item-btn");

  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", function () {
      if (!selectedSize) {
        showModal("Please select a size before adding this product to cart!", "sizeModal", "modal-message");
      } else {
        addProductToShoppingCart(product, selectedSize);
      }
    });
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const productDetailsId = localStorage.getItem("product-details");

  if (productDetailsId) {
    loadProductDetails(productDetailsId);
  }

  const sizeListItems = document.querySelectorAll("#sizes-list li");
  const selectedSizeParagraph = document.getElementById("selectedSizeParagraph");
  const clearBtn = document.getElementById("clear-btn");

  sizeListItems.forEach((item) => {
    item.addEventListener("click", () => {
      sizeListItems.forEach((item) => item.classList.remove("selected"));
      item.classList.add("selected");
      clearBtn.classList.remove("hidden");
      selectedSize = item.innerText;
      selectedSizeParagraph.textContent = `: ${selectedSize}`;

      // Add event listener for clear button
      clearBtn.addEventListener("click", () => {
        sizeListItems.forEach((item) => item.classList.remove("selected"));
        clearBtn.classList.add("hidden");
        selectedSizeParagraph.textContent = ``;
        selectedSize = "";
      });
    });
  });

  const mainImg = document.getElementById("mainImg");
  const smallImages = document.querySelectorAll(".small-img");
  smallImages.forEach((image) => {
    image.onclick = function () {
      mainImg.src = image.src;
    };
  });
});
