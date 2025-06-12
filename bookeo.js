$('head').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">');

var baseUrl = window.location.origin;
  
var saveddata = [];
var savedcustomers = [];
var alreadyLoading = false;

var gamecategories = {
  "3461702": "42556XHK796170DA4D0A5F",
  "3951928": "425564T7UW617242435EBD",
  "3951519": "42556EM36J617241F5016B",
  "6113921": "42556YLHPTF177256777C2",
  "14171703": "42556AJNX791845EEA313E",
  "24825668": "42556W7PC9W1904AFECC0E"
};

setInterval(buildIcons, 1000);

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
      
      saveddata[bdate].forEach(function(item, index) {
        let startTime = item.startTime.split(":00+")[0].split("T")[1];
        if(startTime.substring(0, 1) == "0"){
          startTime = startTime.substring(1);
        }
        if(item.participants.numbers[0].number == ppl && item.title == naam && timeslot == startTime && gamecategories[bcategory] == item.productId){
          // We have a match!
          if(item.customer.emailAddress){
            $(bookingslot).attr("data-email", item.customer.emailAddress);
          }
          
          let ervaring = "";
          item.options.forEach(function(value, key) {
            if(value.value.indexOf("Verjaardag") > -1 || (value.name.indexOf("verjaardag") > -1 && value.value != "")){
              $(".box_icons", bookingslot).prepend('<i class="fa fa-birthday-cake"></i>');
            }

            if(value.value.indexOf("Lekker. Dit mag je ons allemaal serveren") > -1 || 
              value.value.indexOf("Ja, perfect voor na onze escape") > -1 || 
              value.value.indexOf("Jaaa, lekker, serveer maar een sharingportie na de escape!") > -1){
              $(".box_icons", bookingslot).prepend('<i class="fa fa-cutlery"></i>');
            }

            if(value.value.indexOf("Engels") > -1){
              $(".box_icons", bookingslot).prepend('<span>EN</span>');
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
          $(".b_detailsText", bookingslot)[0].innerHTML = $(".b_detailsText", bookingslot)[0].innerHTML.replace("0 available", ervaring);
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
        $(".ctev_in", bookingslot).append(`<div class="numBookings" onclick="event.stopPropagation();loadCustomerHistory('` + email + 
                                          `');" title="Deze klant heeft al ` + savedcustomers[email]["totalBookings"] + ` keer geboekt bij TheStart.">(`
                                          + savedcustomers[email]["totalBookings"] + `)</div>`);
      }
    }else{
      fetchCustomer(email);
    }
  });

  if(!$(".hidden_wrapper").length){
    $("body").append('<div class="hidden_wrapper hidden"><div id="bookingHistory"></div></div>');
  }
}

function fetchBookeoDetails(curDate){
  if(alreadyLoading){
    return;
  }
  alreadyLoading = true;
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
      error : function(request,error)
      {
          console.log("Request: "+JSON.stringify(request));
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
             totalBookings+= row.numBookings;
          });
          savedcustomers[email]["totalBookings"] = totalBookings;
          savedcustomers[email]["customerdata"] = data.data;
        },
        error : function(request,error)
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
            console.log(row);
            console.log(data);
            if(data.data.length){
              $("#bookingHistory table tbody").append('<tr>' +
                                                      '<td>' + data.data[0].productName + '</td>' +
                                                      '<td>' + data.data[0].startTime.split(":00+")[0].replace("T", " ") + '</td>' +
                                                      '<td>' + data.data[0].participants.numbers[0].number + '</td>' +
                                                      '</tr>');
            }else{
              let bookingdate = row.startTimeOfPreviousBooking ? row.startTimeOfPreviousBooking : row.startTimeOfNextBooking;
              $("#bookingHistory table tbody").append('<tr>' +
                                                      '<td>Too long ago to retrieve</td>' +
                                                      '<td>' + bookingdate.split(":00+")[0].replace("T", " ") + '</td>' +
                                                      '<td></td>' +
                                                      '</tr>');
            }
            $(".hidden_wrapper").removeClass("hidden").fadeIn(400);
          },
          error : function(request,error)
          {
              console.log("Request: "+JSON.stringify(request));
          }
      });
    });
  }
}

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
      background-color: white;
      z-index: 100;
      width: 400px;
      border-radius: 5px;
      overflow: hidden;
      border: 1px solid #263346;
      padding: 0;
    }
    #bookingHistory .close{
      cursor: pointer;
      float: right;
      padding: 0 5px;
      color: white;
      font-size: 20px;
    }
    #bookingHistory h2{
      background-color: rgb(45, 99, 165);
      color: white;
      margin: 0;
      padding: 15px;
    }
    #bookingHistory table{
      margin: 15px;
    }
    #bookingHistory table th{
      background-color: rgb(45, 99, 165);
      color: white;
      text-align: left;
    }
    #bookingHistory table th, #bookingHistory table td{
      padding: 3px 10px;
    }
`;

var styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
