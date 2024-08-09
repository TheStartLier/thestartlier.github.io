$('head').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">');

var saveddata = [];
var queueddata = [];
var verjaardagen = [];
var vlaaikes = [];

setInterval(fetchBookingDetails, 5000);

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

var styles = `
    i.fa{
      margin-right: 3px;
    }
`;

var styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
