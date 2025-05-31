$('head').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">');

var baseUrl = window.location.origin;
  
var saveddata = [];
var verjaardagen = [];
var vlaaikes = [];
var engels = [];
var zonderacteur = [];
var alreadyLoading = false;
var ervaringen = new Array();

var gamecategories = {
  "3461702": "42556XHK796170DA4D0A5F",
  "3951928": "425564T7UW617242435EBD",
  "3951519": "42556EM36J617241F5016B",
  "6113921": "42556YLHPTF177256777C2",
  "14171703": "42556AJNX791845EEA313E",
  "24825668": "42556W7PC9W1904AFECC0E"
};

setInterval(buildIcons, 3000);

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
      
          console.log(ppl);
          console.log(naam);
          console.log(timeslot);
          console.log(gamecategories[bcategory]);
        saveddata[bdate].forEach(function(item, index) {
          let startTime = item.startTime.split(":00+")[0].split("T")[1];
          console.log(item);
          if(item.participants.numbers[0].number == ppl && item.title == naam && timeslot == startTime && gamecategories[bcategory] == item.productId){
            // We have a match!
            console.log("We have a match!");

            item.options.forEach(function(value, key) {
              console.log(value);
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
                let ervaring = value.value;
                if(ervaring.length > 15){
                  ervaring = ervaring.substring(0, 15) + "...";
                }
                if(ervaring){
                  ervaring = "Ervaring: <strong>" + ervaring + "</strong>";
                }
                $(".b_detailsText", bookingslot)[0].innerHTML = $(".b_detailsText", bookingslot)[0].innerHTML.replace("0 available", ervaring);
              }
            });
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
}

function fetchBookeoDetails(curDate){
  $.ajax({
      url : 'https://intern.thestart.be/api.php',
      type : 'GET',
      data : {
          'type' : "bookings",
          'startTime' : curDate + "T00:00:00Z",
          'endTime' : curDate + "T23:59:59Z",
          'source' : "bookeo"
      },
      dataType:'json',
      success : function(data) {
        saveddata[curDate] = data.data;
      },
      error : function(request,error)
      {
          console.log("Request: "+JSON.stringify(request));
      }
  });

}

function fetchBookingDetails(battr, bdate, bookingid, bookingslot){
  if(alreadyLoading){
    setTimeout(function(){
      fetchBookingDetails(battr, bdate, bookingid, bookingslot);
    }, 1500);
  }else{
    if(saveddata.indexOf(bookingid) < 0){
      alreadyLoading = true;
      $.ajax({
        type: "POST",
        url: baseUrl + "/bookeo/book_viewEventSlotDetails.html",
        data: {
          "rid": battr[1],
          "esid": battr[2],
          "date": bdate,
          "refresh_schedule_next": true,
          "refresh_startDate": bdate,
          "ncs": _axiom_nocsrfid,
          "ncs2": _axiom_nocsrfid2
        },
        success: function(data){
          alreadyLoading = false;
          saveddata.push(bookingid);
          if(data.indexOf("Verjaardag") > 0){
            $(".box_icons", bookingslot).prepend('<i class="fa fa-birthday-cake"></i>');
            verjaardagen.push(bookingid);
          }
          if(data.indexOf("Lekker. Dit mag je ons allemaal serveren") > 0 || data.indexOf("Ja, perfect voor na onze escape") > 0 || data.indexOf("Jaaa, lekker, serveer maar een sharingportie na de escape!") > 0){
            $(".box_icons", bookingslot).prepend('<i class="fa fa-cutlery"></i>');
            vlaaikes.push(bookingid);
          }
          if(data.indexOf("Engels") > 0){
            $(".box_icons", bookingslot).prepend('<span>EN</span>');
            engels.push(bookingid);
          }
          if(data.indexOf("ZONDER LIVE ACTEUR") > 0){
            $(bookingslot).addClass('cyan').attr("title", "Zonder live acteur");
            zonderacteur.push(bookingid);
          }
          let datasplit = data.split("Hoeveel escape rooms heeft je team");
          let ervaring = "";
          if(datasplit.length > 1){
            ervaring = datasplit[1];
          }
          let datasplitVR = data.split("Hoeveel VR escape rooms heb je al gedaan");
          if(datasplitVR.length > 1){
            ervaring = datasplitVR[1];
          }
          ervaring = ervaring.substring(ervaring.indexOf("<td >")+5, ervaring.indexOf("</td>")).trim();
          if(ervaring.length > 15){
            ervaring = ervaring.substring(0, 15) + "...";
          }
          if(ervaring){
            ervaring = "Ervaring: <strong>" + ervaring + "</strong>";
          }
          $(".b_detailsText", bookingslot)[0].innerHTML = $(".b_detailsText", bookingslot)[0].innerHTML.replace("0 available", ervaring);
          ervaringen[bookingid] = ervaring;
        },
        error: function(){
          alreadyLoading = false;
        }
      });
    }
  }
}

// Customer history
$(document).on("click", "#ui3tab_beb_history", function(){
  let cusemail = $("#emailAddress-IdFC").val();
  $.ajax({
    type: "POST",
    url: baseUrl + "/bookeo/dwr/call/plaincall/DWRCustomers.getCustomersReduced.dwr",
    data: {
      "callCount":1,
      "page":"/bookeo/cust_viewCustomers.html?ncs="+_axiom_nocsrfid,
      "httpSessionId":dwr.engine._getJSessionId(),
      "scriptSessionId":dwr.engine._getScriptSessionId(),
      "c0-scriptName":"DWRCustomers",
      "c0-methodName":"getCustomersReduced",
      "c0-id":0,
      "c0-param0":"string:"+cusemail,
      "c0-param1":"string:NAME",
      "c0-param2":"string:ALL",
      "c0-param3":"boolean:true",
      "c0-param4":"number:0",
      "c0-param5":"number:50",
      "batchId":2
    },
    success: function(data){
      let idsplit = data.split(".id=");
      let userids = [];
      idsplit.forEach((item) => {
        userids.push(item.split(";")[0]);
      });
      console.log(userids);
      for (let i = 1; i < userids.length; i++) {
        $("#historyDiv .bookingHistoryRecords").html("<p id='loading'>Loading...</p>");
        setTimeout(function() {
          $.ajax({
            type: "POST",
            url: baseUrl + "/bookeo/cust_viewCustomerBookings.html",
            data: {
              "cid": userids[i],
              "ncs": _axiom_nocsrfid
            },
            success: function(bookingdata){
              let bookings = bookingdata.substring(bookingdata.indexOf('<div class="bookingInfo">'), bookingdata.indexOf("bcbookings_Init();") - 44);
              $("#historyDiv .bookingHistoryRecords").append(bookings);
              if(i == userids.length-1){
                $("#historyDiv .bookingHistoryRecords #loading").remove();
              }
            }
          });
        }, i * 1000);
      }
    }
  });
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
`;

var styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
