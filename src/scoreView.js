const MAIN_URL = "http://scorebot.sportzcast.net:1402/";
const IFRAME_URL = "http://scoreboards.sportzcast.net/Prod/";
$(document).ready(function() {
  $.get(
    MAIN_URL,
    {
      cmd:"gs",
      token:sessionStorage.getItem("token"),
      franchise:sessionStorage.getItem("franchise")
    },
    function(data) {
      fillPage(JSON.parse(data).response);
    }
  );
});

function fillPage(bots) {
  // change all spaces to dashes in affiliation and site
  bots.forEach(function(bot) {
    bot.affiliation = bot.affiliation.replace(/ /g, "-");
    bot.site = bot.site.replace(/ /g, "-");
  });
  bots = bots.filter(function(bot) {
    return !(bot.affiliation === "TBD-No-Flange");
  });
  // get bots associated with site
  // map bots array to array of { affiliationString : arrayOfSiteStrings }
  let affilsSites = {};
  bots.forEach(function(a, index) {
    let siteArray = affilsSites[a.affiliation];
    if(siteArray === undefined || siteArray.length === 0) {
      affilsSites[a.affiliation] = [ a.site ];
    } else {
      affilsSites[a.affiliation].push(a.site);
    }
  });

  // get bots associated with affiliation
  // map bots array to array of { affiliationString : arrayOfBotIDs }
  let affilsBots = {};
  bots.forEach(function(a, index) {
    let botIDArray = affilsBots[a.affiliation];
    if(botIDArray === undefined || botIDArray.length === 0) {
      affilsBots[a.affiliation] = [ parseInt(a.botnum) ];
    } else {
      affilsBots[a.affiliation].push(parseInt(a.botnum));
    }
  });
  // display each non-empty affiliation in selection list
  $.each(affilsBots, function(affil, botIDArray) {
    $("#affilUL").append(`<li id="${affil}LIEntry" onclick="selectAffil('${affil}')">${affil}</li>`);
  });

  // display all iframes initially
  $.each(bots, function(index, bot) {
    Object.keys(affilsSites).forEach(function(affil) {
      affilsSites[affil].forEach(function(site) {
        let src = `${IFRAME_URL}SAMIFRAME_DEMO_${sessionStorage.getItem("franchise")}_${affil}_${site}_Small_IFrame/content.html`;
        $("#container").append(
          `<div filterDiv ${Object.entries(bot)[0].map(function(pair){return pair[0] + '="' + pair[1] + '"'}).join(' ')} class="filterDiv ${Object.entries(bot)[0].map(function(pair){return pair[1]}).join(' ')}">
            <iframe style="height:165; width:885" src="${src}" frameborder="0" scrolling="no"></iframe>
          </div>`
        );
      });
    });
  });
}

function filterByAffil() {
  // Declare variables
  var input, filter, li, a, i, txtValue;

  input = $("#affilUL");
  filter = input.value.toUpperCase();

  li = $("#affilUL:li");

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
