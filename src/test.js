const login_URL = "http://scorebot.sportzcast.net:1402/";
const status_URL = "http://192.168.7.101:1402/";

// function login() {
//   $.get(
//     login_URL,
//     {
//       cmd:"gt",
//       user:"playontest1",
//       password:"826BF2EF4A0B7D3E39B0FFC6CC5BC2C0"
//     },
//     function(data) {
//       window.token = JSON.parse(data).token;
//       window.location = "scoreView.html";
//     }
//   );
// }

function getStatus(franchise) {
  window.location = "scoreView.html";
  // $.get(
  //   status_URL,
  //   {
  //     cmd:"gs",
  //     token:"000000000000145B8D653D71A8F3",
  //     franchise:"PlayOn Sports"
  //   },
  //   function(data) {
	// 	console.log("hey");
  //     // window.location = "scoreView.html";
  //   }
  // );
}

var ScoreboardInfo = [];
function receiveMessage(evt) {
  ScoreboardInfo.push(evt.data);
}
window.addEventListener('message', receiveMessage);


// ['3087','3100', '20'].forEach(function(a) {
//   let SBRef = new Firebase('https://sportzcastdev.firebaseio.com/BOT'+a);
//   let arr = [];
//   SBRef.orderByValue().on("value", function(snapshot) {
//     snapshot.forEach(function(data) {
//       arr.push(data.key());
//     });
//   });
// });
