  var texticon = '<i class="mdi mdi-text"></i>&nbsp;';
  var movieicon = '<i class="mdi mdi-movie"></i>&nbsp;';
  var movietips = JSON.parse($("#movie_tips").val());
  var text_tips = JSON.parse($("#text_tips").val());
  
  for (var i = 0; i < movietips.length; i++){
    $("button[data-type='movie'][data-tip_id='" + movietips[i]["id"] + "']").html(movieicon+movietips[i]["video"]);
  }
  
  for (var i = 0; i < text_tips.length; i++){
    var tiptext = text_tips[i]["text"];
    switch(text_tips[i]["id"]){
      case 737:
        tiptext = "R1 - Tetris";
        break;
      case 816:
        tiptext = "R1 - Vormen samenvoegen";
        break;
      case 802:
        tiptext = "R1 - Sleutel";
        break;
      case 861:
        tiptext = "Handboeien uitdoen";
        break;
      case 805:
        tiptext = "R2 - Tel knipperingen";
        break;
      case 815:
        tiptext = "R2 - Tel opnieuw knipperingen";
        break;
      case 541:
        tiptext = "R2 - Reset (666)";
        break;
      case 431:
        tiptext = "R3 - Drugsinval";
        break;
      case 330:
        tiptext = "R3 - Som optellen";
        break;
      case 832:
        tiptext = "R3 - Crimineel opgepakt";
        break;
      case 834:
        tiptext = "R4 - 1 persoon zitten";
        break;
      case 729:
        tiptext = "R4 - Nicole waarheid";
        break;
      case 819:
        tiptext = "R4 - 3 personen liegen";
        break;
      case 818:
        tiptext = "R4 - Schilderijen";
        break;
      case 274:
        tiptext = "R5 - 2 lasers tegelijk";
        break;
      case 544:
      case 278:
        tiptext = "Stress";
        break;
      case 561:
        tiptext = "R6 - Start boven vlad";
        break;
      case 325:
        tiptext = "R6 - Stage 2";
        break;
      case 437:
        tiptext = "R7 - Algemene uitleg";
        break;
      case 296:
        tiptext = "R7 - Teamwork";
        break;
      case 331:
        tiptext = "R8 - Kijk op pillaar";
        break;
      case 836:
        tiptext = "R8 - Volgorde letters";
        break;
      case 859:
        tiptext = "R8 - Geen stemactivatie";
        break;
      case 286:
        tiptext = "R9 - Station vinden";
        break;
      case 824:
        tiptext = "R9 - Richtingenslot";
        break;
      case 457:
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
      case 199:
        tiptext = "Lobby - Gebruik de generator";
        break;
      case 198:
        tiptext = "Lobby - Boris boek";
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
      case 194:
        tiptext = "Lobby - Gebruik de generator opnieuw";
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

$("#modal-textmovietip .session-form").submit(function(){
  var tipID = $(this).attr("action");
  tipID = tipID.substring(tipID.length - 3);
  
  if(tipID == "681"){
    $('#modal-customtip textarea[name="tip_text"]').val("Attention!");
    $('#modal-customtip form').submit();
    setTimeout(function() {
      return true;
    }, 5000);
  }else{
    return true;
  }
});

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
