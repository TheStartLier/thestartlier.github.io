  var texticon = '<i class="mdi mdi-text"></i>&nbsp;';
  var movieicon = '<i class="mdi mdi-movie"></i>&nbsp;';
  var movietips = [];
  var text_tips = [];
if($("#movie_tips").length){
  movietips = JSON.parse($("#movie_tips").val());
  text_tips = JSON.parse($("#text_tips").val());
}
  var room = $(".title")[0].innerText;

  if(room.includes("9Kamers")){
	  // Undercover
	  $("legend:contains('Statistics')").parent(".content").parent(".column").parent(".columns").addClass("statistics");
	  var teamname = $(".statistics tbody td:contains('Team'), .statistics tbody td:contains('team')")[0].innerText;
	  $('head title', window.parent.document).text(teamname);
  }
  
  for (var i = 0; i < movietips.length; i++){
    $("button[data-type='movie'][data-tip_id='" + movietips[i]["id"] + "']").html(movieicon+movietips[i]["video"]);
  }
  
  for (var i = 0; i < text_tips.length; i++){
    var tiptext = text_tips[i]["text"];
    switch(text_tips[i]["id"]){
      case 351:
      case 737:
        tiptext = "R1 - Tetris";
        break;
      case 816:
      case 352:
        tiptext = "R1 - Vormen samenvoegen";
        break;
      case 802:
      case 349:
        tiptext = "R1 - Sleutel";
        break;
      case 895:
      case 350:
        tiptext = "Handboeien uitdoen";
        break;
      case 900:
        tiptext = "R2 - Begin in de schachten";
        break;
      case 805:
      case 353:
        tiptext = "R2 - Tel knipperingen";
        break;
      case 815:
      case 354:
        tiptext = "R2 - Tel opnieuw knipperingen";
        break;
      case 541:
        tiptext = "R2 - Reset (666)";
        break;
      case 431:
      case 355:
        tiptext = "R3 - Drugsinval";
        break;
      case 356:
        tiptext = "R3 - Don't open pots";
        break;
      case 432:
      case 897:
        tiptext = "R3 - Blokkeer de deur";
        break;
      case 898:
        tiptext = "R3 - Verstop jullie";
        break;
      case 898:
        tiptext = "R3 - Blokkeer de deur";
        break;
      case 357:
        tiptext = "R3 - 881 is correct";
        break;
      case 358:
        tiptext = "R3 - 604 is correct";
        break;
      case 359:
        tiptext = "R3 - First code is 881";
        break;
      case 360:
        tiptext = "R3 - First code is 604";
        break;
      case 330:
        tiptext = "R3 - Som optellen";
        break;
      case 832:
      case 831:
        tiptext = "R3 - Crimineel opgepakt";
        break;
      case 361:
        tiptext = "R4 - Briefing";
        break;
      case 834:
      case 833:
        tiptext = "R4 - 1 persoon zitten";
        break;
      case 729:
      case 870:
        tiptext = "R4 - Nicole waarheid";
        break;
      case 819:
      case 428:
        tiptext = "R4 - 3 personen liegen";
        break;
      case 896:
        tiptext = "R4 - Ilse lamp";
        break;
      case 818:
      case 817:
      case 901:
        tiptext = "R4 - Schilderijen";
        break;
      case 425:
        tiptext = "R4 - Schuif dichter";
        break;
      case 362:
        tiptext = "R4 - Tweede kans";
        break;
      case 876:
      case 877:
        tiptext = "R4 - Walter dood";
        break;
      case 274:
        tiptext = "R5 - 2 lasers tegelijk";
        break;
      case 363:
        tiptext = "R5 - Slow but steady";
        break;
      case 544:
      case 278:
      case 374:
        tiptext = "Stress";
        break;
      case 436:
        tiptext = "Don't go back";
        break;
      case 561:
        tiptext = "R6 - Start boven vlad";
        break;
      case 325:
      case 367:
        tiptext = "R6 - Stage 2";
        break;
      case 869:
      case 868:
        tiptext = "R6 - Defibrillator";
        break;
      case 871:
      case 872:
        tiptext = "R6 - Deur";
        break;
      case 437:
      case 370:
        tiptext = "R7 - Algemene uitleg";
        break;
      case 867:
      case 866:
        tiptext = "R7 - Box andere kant";
        break;
      case 296:
      case 369:
        tiptext = "R7 - Teamwork";
        break;
      case 331:
        tiptext = "R8 - Kijk op pillaar";
        break;
      case 835:
      case 836:
        tiptext = "R8 - Volgorde letters";
        break;
      case 859:
      case 858:
        tiptext = "R8 - Geen stemactivatie";
        break;
      case 286:
      case 375:
        tiptext = "R9 - Station vinden";
        break;
      case 824:
      case 438:
        tiptext = "R9 - Richtingenslot";
        break;
      case 376:
        tiptext = "R9 - Hammels Gate";
        break;
      case 899:
        tiptext = "R9 - Tijd";
        break;
      case 457:
      case 856:
        tiptext = "R9 - Bom active";
        break;
      case 206:
        tiptext = "Besmettelijk - quarantine";
        break;
      case 552:
        tiptext = "Briefing - Onderstreepte / fluo text";
        break;
      case 204:
        tiptext = "Briefing - Correct jaar, foute maand";
        break;
      case 205:
        tiptext = "Briefing - ? 6 ? 1";
        break;
      case 202:
        tiptext = "Briefing - 2 6 ? ?";
        break;
      case 203:
        tiptext = "Briefing - Teams die zijn binnengegaan";
        break;
      case 246:
        tiptext = "Briefing - Sluit de deur";
        break;
      case 200:
        tiptext = "Lobby - Zoek ook in de briefingtent";
        break;
      case 46:
      case 194:
        tiptext = "Lobby - Gebruik de generator";
        break;
      case 199:
        tiptext = "Lobby - Objecten 6813";
        break;
      case 198:
        tiptext = "Lobby - Boris boek";
        break;
      case 873:
      case 874:
        tiptext = "Lobby - Boris vodka";
        break;
      case 863:
        tiptext = "Lobby - Trek aan slot";
        break;
      case 197:
        tiptext = "Lobby - Check onderhoudsrooster";
        break;
      case 196:
        tiptext = "Lobby - Onderhoudsrooster startpunten";
        break;
      case 518:
        tiptext = "Lobby - Helft van Andrey";
        break;
      case 523:
        tiptext = "Lobby - Mila 6 en Olek 9";
        break;
      case 468:
        tiptext = "Lobby - Stroompunten aan muur";
        break;
      case 466:
        tiptext = "Lobby - Ijzeren staven";
        break;
      case 527:
        tiptext = "Pas op voor besmette persoon";
        break;
      case 192:
        tiptext = "Fabriek - kijk naar de 3 machines";
        break;
      case 485:
        tiptext = "Fabriek - Trek niet aan de kokers";
        break;
      case 191:
        tiptext = "Fabriek A - stappen";
        break;
      case 189:
        tiptext = "Fabriek A - knoppen wisselen";
        break;
      case 546:
        tiptext = "Fabriek A - achterzijde";
        break;
      case 188:
        tiptext = "Fabriek A - 8 stappen";
        break;
      case 187:
        tiptext = "Fabriek A - formule";
        break;
      case 547:
        tiptext = "Fabriek B - kleurcodes blokkeren";
        break;
      case 184:
        tiptext = "Fabriek B - bevriezen";
        break;
      case 182:
        tiptext = "Fabriek C - panelen zoeken";
        break;
      case 183:
        tiptext = "Fabriek C - werk als een team";
        break;
      case 510:
        tiptext = "Fabriek C - witte vierkant inhouden";
        break;
      case 181:
        tiptext = "Jerrycans - zet licht uit en wees stil";
        break;
      case 441:
        tiptext = "Zoek jerrycans in fabriek";
        break;
      case 245:
        tiptext = "Nucleaire opslag achter douche";
        break;
      case 180:
        tiptext = "Douche - Radioactief water";
        break;
      case 179:
        tiptext = "Jerrycans in fabriek bij Machine A";
        break;
      case 178:
        tiptext = "Check document achter douche";
        break;
      case 177:
        tiptext = "Jerrycan achter douche";
        break;
      case 176:
        tiptext = "Douche - metalen kratten";
        break;
      case 175:
        tiptext = "Douche - vind 3 documenten";
        break;
      case 174:
        tiptext = "Douche - Jerrycan D aan XXX";
        break;
      case 243:
        tiptext = "Douche - Jerrycan E en C";
        break;
      case 244:
        tiptext = "Douche - Jerrycans juist, zoek cijferslot";
        break;
      case 549:
        tiptext = "Douche - 4 cijfers nodig";
        break;
      case 514:
        tiptext = "Endgame - 4 noodknoppen";
        break;
      case 173:
        tiptext = "Endgame - hurry up";
        break;
      case 172:
        tiptext = "3 extra min";
        break;
      case 171:
        tiptext = "6 extra min";
        break;
      case 169:
        tiptext = "Endgame - 2 players 4 buttons";
        break;
      case 170:
        tiptext = "Endgame - kantel serum niet";
        break;
      case 820:
        tiptext = "Sleutel gebroken - forceer deur";
        break;
      case 814:
        tiptext = "Receptie - Kijk lamp";
        break;
      case 756:
        tiptext = "Receptie - Kijk klok";
        break;
      case 418:
        tiptext = "Gang - Deurhangers";
        break;
      case 799:
        tiptext = "Gang - Verstop Dieter";
        break;
      case 713:
        tiptext = "Werk sneller";
        break;
      case 712:
        tiptext = "Niet vloeken";
        break;
      case 711:
        tiptext = "SLPKMR - Kamerjas zak";
        break;
      case 590:
        tiptext = "SLPKMR - Steeksleutel";
        break;
      case 792:
        tiptext = "SLPKMR - Leer tellen";
        break;
      case 451:
        tiptext = "SLPKMR - Schilderij code";
        break;
      case 680:
        tiptext = "SLPKMR - Code start bij 6";
        break;
      case 875:
        tiptext = "Buizen - Dieter badge";
        break;
      case 316:
        tiptext = "Buizen - 10 richtingen";
        break;
      case 566:
        tiptext = "Buizen - Oplossing";
        break;
      case 474:
        tiptext = "Was - Handdoeken in slpkmr";
        break;
      case 554:
        tiptext = "Was - Lift kleuren";
        break;
      case 319:
        tiptext = "Was - Werk sneller";
        break;
      case 308:
        tiptext = "End - Verzamel objecten";
        break;
      default:
        if (tiptext.length > 30){
          tiptext = tiptext.substring(0, 30) + "...";
        }
        break;
    }
    $("button[data-type='text'][data-tip_id='" + text_tips[i]["id"] + "']").html(texticon+tiptext).attr("style", "justify-content: left;");
  }

$("button[data-target='modal-textmovietip'][data-type='text']").parent("td").append('<i class="mdi mdi-sync"></i>');

$("#modal-session-finish .modal-card-body .content, #modal-session-pause .modal-card-body .content").html('<div class="field"><p class="is-size-4">Are you sure?</p></div>');

$("#modal-textmovietip .modal-card-body .content").append('<i class="mdi mdi-pencil"></i>');

$(document).on("click", "i.mdi-sync", function(){
  var tipID = $(this).siblings("button").attr("data-tip_id");
  
  for (var i = 0; i < text_tips.length; i++){
    if(text_tips[i]["id"] == tipID){
      $('#modal-customtip textarea[name="tip_text"]').val(text_tips[i]["text"]);
    }
  }

  $('button[data-target="modal-customtip"]').click();
});

$(document).on("click", "i.mdi-pencil", function(){
  var tipText = $(this).siblings(".is-size-4").text();
  
  $('#modal-customtip textarea[name="tip_text"]').val(tipText);
  $('#modal-textmovietip.is-active').removeClass("is-active");
  $('button[data-target="modal-customtip"]').click();
});

// Drugslab tip sound
$(document).on("click", `#modal-textmovietip .session-form[action$='/tip/887'] button[type='submit'], 
	       #modal-textmovietip .session-form[action$='/tip/885'] button[type='submit'], 
		#modal-textmovietip .session-form[action$='/tip/884'] button[type='submit'], 
		#modal-textmovietip .session-form[action$='/tip/882'] button[type='submit'], 
		#modal-textmovietip .session-form[action$='/tip/886'] button[type='submit']`, function(e){
    e.preventDefault();
	var tipID = $(this).closest('.session-form')[0].action.split("/tip/");
	tipID = tipID[1];
	console.log(tipID);
    $("#modal-textmovietip").removeClass("is-active");

    $.ajax({
	url: window.location.href + '/customTip',
	type: 'POST',
	data: {
	    "_token": $('input[name="_token"]').val(),
	    "tip_text": "Attention!"
	},
	success: function(){
	  setTimeout(function() {
	      $("#modal-textmovietip .session-form[action$='/tip/" + tipID + "']").submit();
	  }, 2000);
	},
	error: function(msg){
	  console.log(msg);
	  $("#modal-textmovietip .session-form[action$='/tip/" + tipID + "']").submit();
	}
    });
});


/* Cool auto-googletranslate function which doesn't work because of CORS
$("#modal-open[data-target='modal-customtip']").parent("td").after(`<td style="border:none;">
                        <button id="modal-open" type="button" class="button is-link is-large is-fullwidth" data-target="modal-autotranslate" aria-haspopup="true"><i class="mdi mdi-lightbulb"></i>&nbsp;Auto translate</button>
                      </td>`);

$("#modal-customtip").after(`<div id="modal-autotranslate" class="modal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title is-size-3">Send a tip</p>
          <button id="modal-close" class="delete" aria-label="close"></button>
        </header>
        <form class="session-form">
          <section class="modal-card-body is-12 columns">
            <div class="content column is-10">
              <p>
                <textarea class="textarea is-large" id="to_translate" placeholder="Enter text to translate here.." style=""></textarea>
              </p>
              <h3>Translated content</h3>
              <p>
                <textarea class="textarea is-large" id="translated" placeholder="Auto-translated text will appear here.." style=""></textarea>
              </p>
            </div>
            <div class="content column is-1">
              <p>From
                <select id="translate-from">
                  <option>EN</option>
                </select>
              </p>
              <p>To
                <select id="translate-to">
                  <option>NL</option>
                </select>
              </p>
            </div>
          </section>
          <footer class="modal-card-foot">
            <div class="buttons-submit">
              <button type="submit" class="button is-success is-large">Send tip</button>
              <button id="modal-close" class="button is-large">Cancel</button>
            </div>
            <div class="buttons-close" style="display: none;">
              <button id="modal-close" class="button">Close</button>
            </div>
          </footer>
        </form>
      </div>
    </div>`);
    
$("#modal-open[data-target='modal-autotranslate']").click(function(){
  $("#modal-autotranslate").toggleClass("is-active");
});

$("#modal-autotranslate #modal-close").click(function(){
  $("#modal-autotranslate").toggleClass("is-active");
});

var typingTimer;                //timer identifier
var doneTypingInterval = 500;  //time in ms, 1.5 second for example
var listen = true;

$("#to_translate").on("keyup", function(){
	clearTimeout(typingTimer);
	if(listen){
		typingTimer = setTimeout(function(){
			listen = false;
			translateText();
			listen = true;
		}, doneTypingInterval);
	}
});

function translateText(){
  var texttotranslate = $("#to_translate").val();
    $.ajax({
			url: 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=nl&dt=t&q=' + encodeURI(texttotranslate),
			type: 'GET',
			success: function(msg) {
			  $("#translated").val(msg[0][0][0]);
			},
			error: function(msg){
			  //console.log(msg);
			}
		});
}*/

var styles = `
    @media only screen and (max-device-width: 1500px) {
      .button.is-large { 
          font-size: 1.3rem;
      }
    }
    @media only screen and (max-width: 700px) {
      .content table tbody td { 
          display: block;
      }
      .column.is-6 .content table tbody td { 
          display: table-cell;
      }
      .section.is-main-section[style*="position: fixed; right: 0; bottom: 0; z-index: 9999;"]{
        padding: 0;
      }
    }
    .content table tbody td { 
        position: relative;
    }
    td i.mdi-sync {
      display:none; 
      position: absolute;
      right: 25px;
      top: 20px;
      font-size: 1.5rem;
      cursor: pointer;
      color: #00947e;
    }
    td:has(> button:disabled) i.mdi-sync {
      display:block;
    }
    #modal-textmovietip .modal-card-body .content {
      position: relative;
    }
    #modal-textmovietip .modal-card-body .content .is-size-4{
      padding-right: 30px;
    }
    .mdi-pencil {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 1.5rem;
      cursor: pointer;
    }
`;

var styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
