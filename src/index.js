const URL = "http://scorebot.sportzcast.net:1402/";
const NEXT_PAGE = "scoreView.html";
const DEFAULT_CREDS = {
  user:"SEC",
  password:"CDE50A071FD29CE8EBF9813061A2DB77"
};

function login() {
  $.get(
    URL,
    {
      cmd:"gt",
      user:$("#usernameInput").text() || DEFAULT_CREDS.user,
      password:$("#passwordInput").text() || DEFAULT_CREDS.password
    },
    function(data) {
      sessionStorage.setItem("token", JSON.parse(data).parm3);
      sessionStorage.setItem("user", JSON.parse(data).parm4);
      sessionStorage.setItem("franchise", JSON.parse(data).parm19);

      getStatus(JSON.parse(data).parm3, JSON.parse(data).parm19);

      window.location = "scoreView.html";
    }
  );
}

function getStatus(token, franchise) {
  $.get(
    URL,
    {
      cmd:"gs",
      token:token,
      franchise:franchise
    },
    function(data) {
      sessionStorage.setItem("franchise", JSON.parse(data).parm19);
    }
  );
}
