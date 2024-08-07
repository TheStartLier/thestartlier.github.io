$('head').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">');

var saveddata = [];
var queueddata = [];
var verjaardagen = [];
var vlaaikes = [];

setInterval(fetchBookingDetails, 5000);

// Verjaardag en vlaaikes icons
function fetchBookingDetails(){
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
    }else{
      if(queueddata.indexOf(bookingid) < 0){
        queueddata.push(bookingid);
        setTimeout(function(){
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
              saveddata.push(bookingid);
              let queueindex = queueddata.indexOf(bookingid);
              queueddata.splice(queueindex, 1);
              if(data.indexOf("Verjaardag") > 0){
                $(".box_icons", bookingslot).prepend('<i class="fa fa-birthday-cake"></i>');
                verjaardagen.push(bookingid);
              };
              if(data.indexOf("Lekker. Dit mag je ons allemaal serveren (te betalen ter plaatse)") > 0){
                $(".box_icons", bookingslot).prepend('<i class="fa fa-cutlery"></i>');
                vlaaikes.push(bookingid);
              }
            }
          });
        }, i * 1000);
      }
    }
  })
}

// Customer history
$(document).on("click", "#ui3tab_beb_history", function(){
  let cusemail = $("#emailAddress-IdFC").val();
  $.ajax({
    type: "POST",
    url: "https://web-2556h.bookeo.com/bookeo/dwr/call/plaincall/DWRCustomers.getCustomersReduced.dwr",
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
`;

var styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
