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
      user:,
      password:"CDE50A071FD29CE8EBF9813061A2DB77"
    },
    function(data) {
      sessionStorage.setItem("token", JSON.parse(data).parm3);
      sessionStorage.setItem("user", JSON.parse(data).parm4);
      sessionStorage.setItem("franchise", JSON.parse(data).parm19);
    }
  );
  $.get(
    URL,
    {
      cmd:"gs",
      token:sessionStorage.getItem("token"),
      franchise:sessionStorage.getItem("franchise")
    },
    function(data) {
      window.location = "scoreView.html";
    }
  );
}
