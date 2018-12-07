const MAIN_URL = "http://livescore-demo.azurewebsites.net/";
const NEXT_PAGE = "scoreView.html";
const DEFAULT_CREDS = {
  user:"SEC",
  password:"CDE50A071FD29CE8EBF9813061A2DB77"
};

function login() {
  let user=$("#usernameInput").text();
  let password=$("#passwordInput").text();
  $.get(
    MAIN_URL + "login.aspx?user=" + user + "&password=" + password, {},
    function(data) {
      console.log(data);
      sessionStorage.setItem("token", JSON.parse(data).parm3);
      sessionStorage.setItem("user", JSON.parse(data).parm4);
      sessionStorage.setItem("franchise", JSON.parse(data).parm19);
      sessionStorage.setItem("allowedBotIDs", JSON.parse(data).parm12);

      window.location = "scoreView.html";
    }
  );
}

