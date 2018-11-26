['3087','3100', '20'].forEach(function(a) {
  let SBRef = new Firebase('https://sportzcastdev.firebaseio.com/BOT'+a);
  let arr = [];
  SBRef.orderByValue().on("value", function(snapshot) {
    snapshot.forEach(function(data) {
      arr.push(data.key());
    });
  });
  console.log(arr);
});
