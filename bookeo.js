if(window.location.href.includes("book_viewSchedules")){
  
$('head').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">');

var saveddata = [];
var savedcustomers = [];
var alreadyLoading = false;
var baseUrl = window.location.origin;

var gamecategories = {
  "3461702": "42556XHK796170DA4D0A5F",
  "3951928": "425564T7UW617242435EBD",
  "3951519": "42556EM36J617241F5016B",
  "6113921": "42556YLHPTF177256777C2",
  "14171703": "42556AJNX791845EEA313E",
  "24825668": "42556W7PC9W1904AFECC0E"
};

setInterval(buildIcons, 1000);
setInterval(loadWaivers, 1500);


$(document).on("mousedown", ".hidden_wrapper .close, .hidden_wrapper", function (e) {
  if(e.target.classList.contains("hidden_wrapper") || e.target.classList.contains("close")){
    $(".hidden_wrapper").fadeOut(400);
  }
});
$(document).keyup(function (e) {
  if (e.key === "Escape") {
    $(".hidden_wrapper").fadeOut(400);
  }
});
$(document).on("click", ".hidden_wrapper div", function (e) {
  e.stopPropagation();
});

var styles = `
    i.fa{
      margin-right: 3px;
    }
    .box_icons span{
      margin-right: 3px;
      font-weight: bold;
      font-size: 11px;
    }
    .bookeocss.nav_schedule .b_fullWB.pink{
      background: pink;
    }
    .bookeocss.nav_schedule .b_fullWB.cyan{
      background: cyan;
    }
    .ctev_in .numBookings{
      position: absolute;
      top: 5px;
      right: 5px;
      transition: all 0.4s ease 0s;
    }
    .ctev_in .numBookings:hover{
      color: black;
      font-weight: bold;
    }
    .ctev_in .print{
      position: absolute;
      bottom: 2px;
      left: 4px;
      font-size: 1.1em;
      opacity: 0;
      transition: all 0.4s ease 0s;
    }
    .ctev_in .print{
      position: absolute;
      bottom: 2px;
      left: 4px;
      font-size: 1.1em;
      opacity: 0;
      transition: all 0.4s ease 0s;
    }
    .ctev:hover .print{
      opacity: 1;
    }
    .ctev_in .waiverinfo{
      position: absolute;
      top: 25px;
      right: 5px;
      transition: all 0.4s ease 0s;
    }
    .ctev_in .waiverinfo:hover{
      color: black;
      font-weight: bold;
    }
    .hidden{
      display: none;
    }
    .hidden_wrapper{
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      z-index: 99;
    }
    #bookingHistory{
      position: absolute;
      top: calc(50% - 110px);
      left: calc(50% - 200px);
      z-index: 100;
    }
    .customtable{
      background-color: white;
      border-radius: 5px;
      overflow: hidden;
      border: 1px solid #263346;
      padding: 0;
    }
    .customtable .close{
      cursor: pointer;
      float: right;
      padding: 0 5px;
      color: white;
      font-size: 20px;
      margin-left: 15px;
    }
    .customtable h2{
      background-color: rgb(45, 99, 165);
      color: white;
      margin: 0;
      padding: 15px;
    }
    .customtable table{
      margin: 15px;
    }
    .customtable table th{
      background-color: rgb(45, 99, 165);
      color: white;
      text-align: left;
    }
    .customtable table th, .customtable table td{
      padding: 3px 10px;
    }
`;

var styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

async function loadWaivers(){
  if($(".bookingInfo").length && $(".winTitle").length && !$("#waivers").length){
    var bookingID = $(".bookingInfo .details tbody tr:contains('Booking number') td").text();
    var datum = $(".winTitle").text().split("\n")[3].trim();
    var newdatum = new Date(datum + " UTC");
    $.ajax({
        url : 'https://intern.thestart.be/api.php',
        type : 'GET',
        data : {
          'type' : "waivers",
          'datum' : newdatum.toISOString().split("T")[0],
          'bookingNumber' : bookingID
        },
        dataType:'json',
        success : function(data) {
          $(".bookingInfo").after('<div id="waivers" class="customtable"><h2>Disclaimers ingevuld:</h2><table><thead><tr><th>Voornaam</th><th>Achternaam</th><th>Email</th><th>Taal</th><th>Print</th></tr></thead><tbody></tbody></table></div>');
                                  
          if(data.length){
            data.forEach(function(item, i) {
              let print = "";
              if(item.game_played == "uc"){
                // Capitalize every first letter
                 let splitStr1 = item.first_name.toLowerCase().split(' ');
                 let splitStr2 = item.last_name.toLowerCase().split(' ');
                 let splitStr = splitStr1.concat(splitStr2);
                 for (var i = 0; i < splitStr.length; i++) {
                     splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
                 }
                 let capitalizedNaam = splitStr.join('%20'); 
                print = '<a target="_blank" href="https://intern.thestart.be/strafblad.php?name=' + capitalizedNaam + '">Strafblad</a>';
              }
              $(".customtable table tbody").append('<tr>' +
                                                    '<td>' + item.first_name + '</td>' +
                                                    '<td>' + item.last_name + '</td>' +
                                                    '<td>' + item.email + '</td>' +
                                                    '<td>' + item.lang.toUpperCase() + '</td>' +
                                                    '<td>' + print + '</td>' +
                                                    '</tr>');
            });
          }else{
              $(".customtable table tbody").append(`<tr>
                                                    <td colspan="3">Deze groep heeft het formulier nog niet ingevuld.<br><br><br>
                                                     Vergeten in te vullen? <a href="https://intern.thestart.be/waiver" target="_blank">Doe het hier zelf handmatig</a>.
                                                   </td>
                                                    </tr>`);
          }
        },
        error : function(request,status, error)
        {
            console.log("Request: "+JSON.stringify(request));
        }
    });
  }
}
// Nieuwe icons toevoegen
function buildIcons(){
  let selectedDate = $("#scheduleTitle").text().trim().split("\n- ")[1];
  let curDate = new Date(selectedDate + " UTC").toISOString().split("T")[0];
  if(saveddata[curDate]){
    $(".ctev.b_fullWB:not(.done)").each(function(i){
      let bookingslot = this;
        
      let timeslot = $(".b_fixedSlotTitle", bookingslot)[0].innerHTML.trim();
      let naam = $(".b_detailsText", bookingslot)[0].innerHTML;
      naam = naam.substring(naam.indexOf('<b>')+3, naam.indexOf("</b>")).trim();
      let ppl = $(".b_detailsText", bookingslot)[0].innerHTML;
      ppl = ppl.substring(ppl.indexOf('<br>')+9, ppl.indexOf(" booked")).trim();

      let bookingid = $(bookingslot).attr("onclick");
      let battr = bookingid.split(',');
      let bdate = battr[3].split("'")[1];
      let bcategory = battr[1];

      switch(bcategory){
        case "3951928":
          // Harbor Hotel
          let thisdate = new Date(bdate);
          let dow = thisdate.getDay();
          if(dow == 0){
            dow = 7;
          }
           let splitStr3 = naam.substring(naam.indexOf(' ') + 1).split(" ");
           for (var i = 0; i < splitStr3.length; i++) {
               splitStr3[i] = splitStr3[i].charAt(0).toUpperCase() + splitStr3[i].substring(1);     
           }
           let capitalizedNaam1 = splitStr3.join('%20'); 
          $(".ctev_in", bookingslot).append(`<div class="print" onclick="event.stopPropagation();window.open('https://intern.thestart.be/HH_gang.php?name=` 
                                            + capitalizedNaam1 + `&day=` + dow + 
                                          `','_blank');" title="Print Gang document."><i class="fa fa-print"></i></div>`);
          break;
        case "3461702":
          // Undercover
           let splitStr4 = naam.split(" ");
           for (var i = 0; i < splitStr4.length; i++) {
               splitStr4[i] = splitStr4[i].charAt(0).toUpperCase() + splitStr4[i].substring(1);     
           }
           let capitalizedNaam2 = splitStr4.join('%20'); 
          $(".ctev_in", bookingslot).append(`<div class="print" onclick="event.stopPropagation();window.open('https://intern.thestart.be/strafblad.php?name=` 
                                            + capitalizedNaam2 + `','_blank');" title="Print Strafblad."><i class="fa fa-print"></i></div>`);
          break;
      }
      
      saveddata[bdate].forEach(function(item, index) {
        let startTime = item.startTime.split(":00+")[0].split("T")[1];
        if(startTime.substring(0, 1) == "0"){
          startTime = startTime.substring(1);
        }
        if(item.participants.numbers[0].number == ppl && item.title == naam && timeslot == startTime && gamecategories[bcategory] == item.productId){
          // We have a match!
          $(bookingslot).attr("booking-id", item.bookingNumber);
          
          if(item.customer.emailAddress){
            $(bookingslot).attr("data-email", item.customer.emailAddress);
          }
          
          let ervaring = "";
          item.options.forEach(function(value, key) {
            if((value.value.indexOf("Verjaardag") > -1 || (value.name.indexOf("verjaardag") > -1 && value.value != "")) && $(".box_icons .fa-birthday-cake", bookingslot).length == 0){
              $(".box_icons", bookingslot).prepend('<i class="fa fa-birthday-cake"></i>');
            }

            if(value.value.indexOf("Lekker. Dit mag je ons allemaal serveren") > -1 || 
              value.value.indexOf("Ja, perfect voor na onze escape") > -1 || 
              value.value.indexOf("Ja, lekker!") > -1 || 
              value.value.indexOf("Jaaa, lekker, serveer maar een sharingportie na de escape!") > -1){
              $(".box_icons", bookingslot).prepend('<i class="fa fa-cutlery"></i>');
            }

            if(value.value.indexOf("Engels") > -1){
              $(".box_icons", bookingslot).prepend('<span>EN</span>');
              if($(".print", bookingslot).length){
                $(".print", bookingslot).attr("onclick", $(".print", bookingslot).attr("onclick").split("','_blank'")[0] + "&lang=EN','_blank');");
              }
            }

            if(value.value.indexOf("ZONDER LIVE ACTEUR") > -1){
              $(bookingslot).addClass('cyan').attr("title", "Zonder live acteur");
            }

            if(value.name.indexOf("Hoeveel") > -1){
              ervaring = value.value;
              if(ervaring.length > 15){
                ervaring = ervaring.substring(0, 15) + "...";
              }
            }
          });
          if(ervaring){
            ervaring = "Ervaring: <strong>" + ervaring + "</strong>";
          }
          $(".b_detailsText", bookingslot)[0].innerHTML = $(".b_detailsText", bookingslot)[0].innerHTML.replace("0 available", ervaring).replaceAll("???", "");
        }
      });

      if(Number(ppl) > 7){
        // Battle
        $(bookingslot).addClass('pink').attr("title", "Battle");
      }

      if($("#dataTable")[0].innerHTML.split(naam).length > 2){
        // Player has booked more than 1 room today
        $(bookingslot).addClass('pink').attr("title", "Hebben meerdere kamers geboekt vandaag");
      }

      $(bookingslot).addClass("done");
    })
  }else{
    fetchBookeoDetails(curDate);
  }
  
  $(".ctev.b_fullWB[data-email]:not(.numBookingsdone)").each(function(i){
    let bookingslot = this;
    let email = $(bookingslot).attr("data-email");
    if(savedcustomers[email]){
      if(savedcustomers[email]["totalBookings"] != "loading"){
        $(bookingslot).addClass("numBookingsdone");
      }
      if(savedcustomers[email]["totalBookings"] > 1){
        $(".ctev_in", bookingslot).append(`<div class="numBookings" data-email="` + email + `" title="Deze klant heeft al ` + savedcustomers[email]["totalBookings"] + ` keer geboekt bij TheStart.">(`
                                          + savedcustomers[email]["totalBookings"] + `)</div>`);
      }
    }else{
      fetchCustomer(email);
    }
  });

  if(!$(".hidden_wrapper").length){
    $("body").append('<div class="hidden_wrapper hidden"><div id="bookingHistory" class="customtable"></div></div>');
  }
}

$(document).on("click", ".numBookings", function(e){
  e.stopPropagation();
  loadCustomerHistory($(this).attr("data-email"));
});

var lastRequest = Date.now();
function fetchBookeoDetails(curDate){
  if(alreadyLoading || Date.now() - lastRequest < 5000){
    return;
  }
  alreadyLoading = true;
  lastRequest = Date.now();
  $.ajax({
      url : 'https://intern.thestart.be/api.php',
      type : 'GET',
      data : {
          'type' : "bookings",
          'startTime' : curDate + "T00:00:00Z",
          'endTime' : curDate + "T23:59:59Z"
      },
      dataType:'json',
      success : function(data) {
        alreadyLoading = false;
        saveddata[curDate] = data.data;
      },
      error : function(request,status, error)
      {
            console.log("Request: "+JSON.stringify(request));
        setTimeout(function(){
          alreadyLoading = false;
        }, 5000);
      }
  });

}

function fetchCustomer(email){
  if(!savedcustomers[email]){
    savedcustomers[email] = new Array();
    savedcustomers[email]["totalBookings"] = "loading";
    $.ajax({
        url : 'https://intern.thestart.be/api.php',
        type : 'GET',
        data : {
            'type' : "totalBookings",
            'email' : email
        },
        dataType:'json',
        success : function(data) {
          var totalBookings = 0;
          data.data.forEach(function(row, index) {
             totalBookings+= row.numBookings - row.numCancelations;
          });
          savedcustomers[email]["totalBookings"] = totalBookings;
          savedcustomers[email]["customerdata"] = data.data;
        },
        error : function(request,status, error)
        {
            console.log("Request: "+JSON.stringify(request));
        }
    });
  }
}

// Customer history
async function loadCustomerHistory(email){
  $("#bookingHistory").empty();
  if(savedcustomers[email] && savedcustomers[email]["customerdata"]){
    savedcustomers[email]["customerdata"].forEach(function(row, index) {
      if(index == 0){
        $("#bookingHistory").html('<h2>Booking History: ' + row.firstName + ' ' + row.lastName + '<span class="close">X</span></h2><table><thead><tr><th>Room</th><th>Datum</th><th>Spelers</th></tr></thead><tbody></tbody></table>');
      }
      $.ajax({
          url : 'https://intern.thestart.be/api.php',
          type : 'GET',
          data : {
              'type' : "bookingHistory",
              'customerID' : row.id
          },
          dataType:'json',
          success : function(data) {
            if(data.data.length){
              data.data.forEach(function(item, i) {
                $("#bookingHistory table tbody").append('<tr>' +
                                                      '<td>' + item.productName + '</td>' +
                                                      '<td>' + item.startTime.split(":00+")[0].replace("T", " ") + '</td>' +
                                                      '<td>' + item.participants.numbers[0].number + '</td>' +
                                                      '</tr>');
              });
            }else{
              let bookingdate = row.startTimeOfPreviousBooking ? row.startTimeOfPreviousBooking : row.startTimeOfNextBooking;
              if(bookingdate){
                $("#bookingHistory table tbody").append('<tr>' +
                                                      '<td>- Te lang geleden -</td>' +
                                                      '<td>' + bookingdate.split(":00+")[0].replace("T", " ") + '</td>' +
                                                      '<td></td>' +
                                                      '</tr>');
              }
            }
            $(".hidden_wrapper").removeClass("hidden").fadeIn(400);
          },
        error : function(request,status, error)
        {
            console.log("Request: "+JSON.stringify(request));
        }
      });
    });
  }
}

}
