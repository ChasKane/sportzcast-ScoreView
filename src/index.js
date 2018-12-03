const MAIN_URL = "http://scorebot.sportzcast.net:1402/";
const NEXT_PAGE = "scoreView.html";
const DEFAULT_CREDS = {
  user:"SEC",
  password:"CDE50A071FD29CE8EBF9813061A2DB77"
};

function login() {
  $.get(
    MAIN_URL,
    {
      cmd:"gt",
      user:$("#usernameInput").text() || DEFAULT_CREDS.user,
      password:$("#passwordInput").text() || DEFAULT_CREDS.password
    },
    function(data) {
      sessionStorage.setItem("token", JSON.parse(data).parm3);
      sessionStorage.setItem("user", JSON.parse(data).parm4);
      sessionStorage.setItem("franchise", JSON.parse(data).parm19);
      sessionStorage.setItem("allowedBotIDs", JSON.parse(data).parm12);

      window.location = "scoreView.html";
    }
  );
}

