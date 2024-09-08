$('head').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">');

var baseUrl = window.location.origin;
  
var saveddata = [];
var verjaardagen = [];
var vlaaikes = [];
var engels = [];
var zonderacteur = [];
var alreadyLoading = false;
var ervaringen = new Array();

setInterval(buildIcons, 3000);

// Nieuwe icons toevoegen
function buildIcons(){
  $(".ctev.b_fullWB").each(function(i){
    let bookingslot = this;
    let bookingid = $(bookingslot).attr("onclick");
    let battr = bookingid.split(',');
    let bdate = battr[3].split("'")[1];
    
    if(saveddata.indexOf(bookingid) > -1){
      if(verjaardagen.indexOf(bookingid) > -1 && $(".box_icons .fa-birthday-cake", bookingslot).length == 0){
        $(".box_icons", bookingslot).prepend('<i class="fa fa-birthday-cake"></i>');
      }
      if(vlaaikes.indexOf(bookingid) > -1 && $(".box_icons .fa-cutlery", bookingslot).length == 0){
        $(".box_icons", bookingslot).prepend('<i class="fa fa-cutlery"></i>');
      }
      if(engels.indexOf(bookingid) > -1 && $(".box_icons span", bookingslot).length == 0){
        $(".box_icons", bookingslot).prepend('<span>EN</span>');
      }
      if(zonderacteur.indexOf(bookingid) > -1 && !$(bookingslot).hasClass("cyan")){
        $(bookingslot).addClass('cyan').attr("title", "Zonder live acteur");
      }
      if(ervaringen[bookingid] != undefined){
        $(".b_detailsText", bookingslot)[0].innerHTML = $(".b_detailsText", bookingslot)[0].innerHTML.replace("0 available", ervaringen[bookingid]);
      }
    }else{
      fetchBookingDetails(battr, bdate, bookingid, bookingslot);
    }
  })
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
        url: "https://web-2556h.bookeo.com/bookeo/book_viewEventSlotDetails.html",
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
          if(data.indexOf("Lekker. Dit mag je ons allemaal serveren") > 0){
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
            ervaring = datasplit[1]
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
            url: "https://web-2556h.bookeo.com/bookeo/cust_viewCustomerBookings.html",
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
    .bookeocss.nav_schedule .b_fullWB.cyan{
      background: cyan;
    }
`;

var styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
