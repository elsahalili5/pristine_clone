let menuList = document.getElementById("menu-item");
const menuToggle = document.getElementById("menu-toggle");
const menuX = document.getElementById("menu-x");

function unToggleClass() {
  menuList.classList.replace("active", "nonactive");
  menuX.classList.replace("show-x", "nonactive");
  menuToggle.classList.toggle("show", "nonactive");
}

menuToggle.addEventListener("click", function () {
  menuX.classList.toggle("show-x");
  menuToggle.classList.toggle("show");
  menuList.classList.toggle("active");
});
menuX.addEventListener("click", function () {
  menuList.classList.replace("active", "nonactive");
  menuX.classList.replace("show-x", "nonactive");
  menuToggle.classList.replace("show", "nonactive");
});

document.addEventListener("DOMContentLoaded", function () {
  const loggedInUserData = JSON.parse(localStorage.getItem("loggedInUser"));

  const myAccount = document.getElementById("myaccount");
  const logOutBtn = document.getElementById("logout-btn");
  const logInBtn = document.getElementById("login-btn");
  const username = document.getElementById("user-name");
  const lastname = document.getElementById("user-lastname");
  const userEmail = document.getElementById("user-email");

  if (!loggedInUserData) {
    return;
  }

  myAccount.classList.remove("hidden");

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

  logInBtn.classList.add("hidden");
});
