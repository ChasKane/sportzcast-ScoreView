$(document).ready(function() {
  const iframe_URL = "http://localhost:1338/";
  const sportsList = ["Football", "Baseball", "Basketball", "Softball", "Soccer", "Tennis", "Volleyball"];
  // hard coded -- will update from login() in index.js
  const botIDs=("1123", "20", "2179", "3084", "3086", "3091", "3164")
  const bots = {
    1123:{
      "franchise": "SEC",
      "botnum": "1123",
      "site": "TBD No Flange",
      "event_type": "Auto Detect",
      "zipcode": "",
      "connected": "1",
      "active": "1"
    },
    20:{
      "franchise": "SEC",
      "botnum": "20",
      "site": "UGA Football",
      "event_type": "Football",
      "zipcode": "30601",
      "city": "Athens",
      "county": "Clarke",
      "state": "GA",
      "connected": "1",
      "active": "0"
    },
    2179:{
      "franchise": "SEC",
      "botnum": "2179",
      "site": "UGA Basketball",
      "event_type": "Auto Detect",
      "zipcode": "30602",
      "city": "Athens",
      "county": "Clarke",
      "state": "GA",
      "connected": "1",
      "active": "1"
    },
    3084:{
      "franchise": "SEC",
      "botnum": "3084",
      "site": "Vanderbilt Womens Basketball",
      "event_type": "Auto Detect",
      "zipcode": "37212",
      "city": "Nashville",
      "county": "Davidson",
      "state": "TN"
    },
    3086:{
      "franchise": "SEC",
      "botnum": "3086",
      "site": "Tennessee Basketball",
      "event_type": "Auto Detect",
      "zipcode": "37996",
      "city": "Knoxville",
      "county": "Knox",
      "state": "TN"
    },
    3091:{
      "franchise": "SEC",
      "botnum": "3091",
      "site": "Tennessee Basketball",
      "event_type": "Auto Detect",
      "zipcode": "37996",
      "city": "Knoxville",
      "county": "Knox",
      "state": "TN"
    },
    3164:{
      "franchise": "SEC",
      "botnum": "3164",
      "site": "Tennessee Basketball",
      "event_type": "Auto Detect",
      "zipcode": "37996",
      "city": "Knoxville",
      "county": "Knox",
      "state": "TN"
    }
  };

  // sites -> [ {string: number}, {sitename: botID}, {"site1":20}, ... ]
  const sites = Object.entries(bots).map(function(a) { return { [a[1].site]: a[0] } });
  $.each(sites, function(index,site) { // site -> {sitename: botID}
    let sitename = Object.entries(site)[0][0];
    let id = Object.entries(site)[0][1];
    $("#schoolUL").append(`<li id="${sitename+id}" onclick="selectSchool('${sitename}')">${sitename}</li>`);
  });

  $.each(bots, function(id,bot) {
    sportsList.forEach(function(sport) {
      let src = `${iframe_URL}SAMIFRAME_DEMO_${id}_Small_${sport}_IFrame/content.html`;
      $("#container").append(
        `<div filterDiv ${Object.entries(bot)[0].map(function(pair){return pair[0] + '="' + pair[1] + '"'}).join(' ')} class="filterDiv ${Object.entries(bot)[0].map(function(pair){return pair[1]}).join(' ')}">
          <iframe style="height:165; width:885" src="${src}" frameborder="0" scrolling="no"></iframe>
        </div>`
      );
    });
  });

  function filterBySchool() {
    // Declare variables
    var input, filter, li, a, i, txtValue;

    input = $("#schoolInput");
    filter = input.value.toUpperCase();

    li = $("#schoolUL:li");

    // Loop through all list items, and hide those who don't match the search query
    li.forEach(function(index, element) {
      if (element.innerHTML.toUpperCase().indexOf(filter) > -1) {
        element.hide();
      } else {
        element.show();
      }
    });
  }

  function selectSchool(school) {
    alert(school);
  }
});
