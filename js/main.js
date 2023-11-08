let menuList = document.getElementById("menu-item");
const menuToggle = document.getElementById("menu-toggle");
const menuX = document.getElementById("menu-x");

function closeMenu() {
  menuList.classList.replace("active", "nonactive");
  menuX.classList.replace("show-x", "nonactive");
  menuToggle.classList.replace("show", "nonactive");
}

menuToggle.addEventListener("click", function () {
  menuX.classList.toggle("show-x");
  menuToggle.classList.toggle("show");
  menuList.classList.toggle("active");
});

menuX.addEventListener("click", closeMenu);

document.addEventListener("DOMContentLoaded", function () {
  const loggedInUserData = JSON.parse(localStorage.getItem("loggedInUser"));

  const myAccountBtns = document.querySelectorAll(".myaccount-btn");
  const logOutBtn = document.getElementById("logout-btn");
  const logInBtns = document.querySelectorAll(".login-btn");
  const username = document.getElementById("user-name");
  const userEmail = document.getElementById("user-email");

  if (!loggedInUserData) {
    return;
  }

  myAccountBtns.forEach((btn) => {
    btn.classList.remove("hidden");
  });

  logInBtns.forEach((btn) => {
    btn.classList.add("hidden");
  });

  if (logOutBtn) {
    logOutBtn.classList.remove("hidden");
    logOutBtn.addEventListener("click", function () {
      localStorage.removeItem("loggedInUser");
      window.location.href = window.location.href.replace("myaccount.html", "login.html");
    });
  }

  if (username) {
    username.textContent = loggedInUserData.username + " " + loggedInUserData.lastname;
  }

  if (userEmail) {
    userEmail.textContent = loggedInUserData.email;
  }
});
