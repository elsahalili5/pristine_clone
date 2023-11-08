function loginUser() {
  var enterEmail = document.getElementById("email").value;
  var enterPwd = document.getElementById("pwd").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (user) => user.email == enterEmail && user.password == enterPwd
  );

  if (!user) {
    alert("Invalid email or password");
    return false;
  } else {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    redirectToHomePage();
    return false;
  }
}
function redirectToHomePage() {
  const currentURL = window.location.href;
  const newURL = currentURL.replace("login.html", "myaccount.html");
  window.location.href = newURL;
}
