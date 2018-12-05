const MAIN_URL = "http://scorebot.sportzcast.net:1402/";
const IFRAME_URL = "http://scoreboards.sportzcast.net/Prod/";

function loadLargeScoreboard(src) {
  window.location.href=src.replace("Small", "Large")
}
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
  // for some reason, current prototype includes an erroneous entry. Delete it
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

  // get bots associated with site
  // map bots array to array of { siteString : arrayOfBotIDs }
  let sitesBots = {};
  bots.forEach(function(a, index) {
    let botIDArray = sitesBots[a.site];
    if(botIDArray === undefined || botIDArray.length === 0) {
      sitesBots[a.site] = [ parseInt(a.botnum) ];
    } else {
      sitesBots[a.site].push(parseInt(a.botnum));
    }
  });
  // add each non-empty site to selection list, hiding them before mounting
  $.each(sitesBots, function(site, botIDArray) {
    let el = $(`<li id="${site}LIEntry" onclick="selectSite('${site}')">${site}</li>`);
    el.hide();
    $("#siteUL").append(el);
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
  // add each non-empty affiliation to selection list, hiding them before mounting
  $.each(affilsBots, function(affil, botIDArray) {
    let el = $(`<li id="${affil}LIEntry" onclick="selectAffil('${affil}')">${affil}</li>`);
    el.hide();
    $("#affilUL").append(el);
  });

  // display all iframes initially
  Object.keys(affilsSites).forEach(function(affil) {
    affilsSites[affil].forEach(function(site) {
      let src = `${IFRAME_URL}SAMIFRAME_DEMO_${sessionStorage.getItem("franchise")}_${affil}_${site}_Small_IFrame/content.html`;
      $("#container").append(
        `<div onclick="loadLargeScoreboard('${src}')" class="filterDiv ${sessionStorage.getItem("franchise")} ${affil} ${site}">
          <label for="${sessionStorage.getItem("franchise")} ${affil} ${site}">${affil} ${site}</label>
          <iframe id="${sessionStorage.getItem("franchise")} ${affil} ${site}" style="height:165; width:885" src="${src}" frameborder="0" scrolling="no"></iframe>
        </div>`
      );
    });
  });
}

function filterBySite() {
  const input = $("#siteInput");
  const filter = input.val().toUpperCase();
  const li = $("#siteUL").children();
  // Loop through all list items, and hide those that don't match the search query
  if(filter === undefined || filter === ""){
    if($(document.activeElement).is(input)) {
      li.each(function(index, element) {
        $(element).show();
      });
    } else {
      li.each(function(index, element) {
        $(element).hide();
      });
    }
  } else {
    li.each(function(index, element) {
      if (element.innerHTML.toUpperCase().indexOf(filter) > -1) {
        $(element).show();
      } else {
        $(element).hide();
      }
    });
  }
}
function selectSite(site) {
  const input = $("#siteInput");
  input.val(site);
  filterBySite();
  $("#container").children().not("."+site).each(function(index, element){
    $(element).hide();
  });
  $("#container").children("."+site).each(function(index, element){
    $(element).show();
  });
}

function filterByAffil() {
  const input = $("#affilInput");
  const filter = input.val().toUpperCase();
  const li = $("#affilUL").children();
  // Loop through all list items, and hide those that don't match the search query
  // unless the query is empty -- then show all
  if(filter === undefined || filter === ""){
    if($(document.activeElement) === input) {
      li.each(function(index, element) {
        $(element).show();
      });
    } else {
      li.each(function(index, element) {
        $(element).hide();
      });
    }
  } else {
    li.each(function(index, element) {
      if (element.innerHTML.toUpperCase().indexOf(filter) > -1) {
        $(element).show();
      } else {
        $(element).hide();
      }
    });
  }
}
function selectAffil(affil) {
  const input = $("#affilInput");
  input.val(affil);
  filterByAffil();
  $("#container").children().not("."+affil).each(function(index, element){
    $(element).hide();
  });
  $("#container").children("."+affil).each(function(index, element){
    $(element).show();
  });
}

function clearFilters() {
  $("#affilInput").val("");
  $("#siteInput").val("");
  filterByAffil();
  filterBySite();
  $("#container").children().each(function(index, element){
    $(element).show();
  });
}
