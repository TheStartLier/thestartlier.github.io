  var texticon = '<i class="mdi mdi-text"></i>&nbsp;';
  var movieicon = '<i class="mdi mdi-movie"></i>&nbsp;';
  var movietips = JSON.parse($("#movie_tips").val());
  var text_tips = JSON.parse($("#text_tips").val());
  
  for (var i = 0; i < movietips.length; i++){
    $("button[data-type='movie'][data-tip_id='" + movietips[i]["id"] + "']").html(movieicon+movietips[i]["video"]);
  }
  
  for (var i = 0; i < text_tips.length; i++){
    var tiptext = text_tips[i]["text"];
    if (tiptext.length > 30){
      tiptext = tiptext.substring(0, 30) + "...";
    }
    $("button[data-type='text'][data-tip_id='" + text_tips[i]["id"] + "']").html(texticon+tiptext).attr("style", "justify-content: left;");
  }
    
  $("button[data-target='modal-textmovietip']").each(function(){
    switch($(this).attr("data-tip_id")){
      case "737":
        $(this).html(texticon+"R1 - Tetris");
        break;
      case "816":
        $(this).html(texticon+"R1 - Vormen samenvoegen");
        break;
      case "802":
        $(this).html(texticon+"R1 - Sleutel");
        break;
      case "805":
        $(this).html(texticon+"R2 - Tel knipperingen");
        break;
      case "815":
        $(this).html(texticon+"R2 - Tel opnieuw knipperingen");
        break;
      case "541":
        $(this).html(texticon+"R2 - Reset (666)");
        break;
      case "431":
        $(this).html(texticon+"R3 - Drugsinval");
        break;
      case "330":
        $(this).html(texticon+"R3 - Som optellen");
        break;
      case "832":
        $(this).html(texticon+"R3 - Crimineel opgepakt");
        break;
      case "834":
        $(this).html(texticon+"R4 - 1 persoon zitten");
        break;
      case "729":
        $(this).html(texticon+"R4 - Nicole waarheid");
        break;
      case "819":
        $(this).html(texticon+"R4 - 3 personen liegen");
        break;
      case "818":
        $(this).html(texticon+"R4 - Schilderijen");
        break;
      case "274":
        $(this).html(texticon+"R5 - 2 lasers tegelijk");
        break;
      case "544":
      case "278":
        $(this).html(texticon+"Stress");
        break;
      case "561":
        $(this).html(texticon+"R6 - Start boven vlad");
        break;
      case "325":
        $(this).html(texticon+"R6 - Stage 2");
        break;
      case "437":
        $(this).html(texticon+"R7 - Algemene uitleg");
        break;
      case "296":
        $(this).html(texticon+"R7 - Teamwork");
        break;
      case "331":
        $(this).html(texticon+"R8 - Kijk op pillaar");
        break;
      case "836":
        $(this).html(texticon+"R8 - Volgorde letters");
        break;
      case "859":
        $(this).html(texticon+"R8 - Geen stemactivatie");
        break;
      case "286":
        $(this).html(texticon+"R9 - Station vinden");
        break;
      case "824":
        $(this).html(texticon+"R9 - Richtingenslot");
        break;
      case "457":
        $(this).html(texticon+"R9 - Bom active");
        break;
      case "206":
        $(this).html(texticon+"Besmettelijk - quarantine");
        break;
      case "552":
        $(this).html(texticon+"Briefing - Onderstreepte / fluo text");
        break;
      case "204":
        $(this).html(texticon+"Briefing - Correct jaar, foute maand");
        break;
      case "205":
        $(this).html(texticon+"Briefing - ? 6 ? 1");
        break;
      case "202":
        $(this).html(texticon+"Briefing - 2 6 ? ?");
        break;
      case "203":
        $(this).html(texticon+"Briefing - Teams die zijn binnengegaan");
        break;
      case "246":
        $(this).html(texticon+"Briefing - Sluit de deur");
        break;
      case "200":
        $(this).html(texticon+"Lobby - Zoek ook in de briefingtent");
        break;
      case "199":
        $(this).html(texticon+"Lobby - Gebruik de generator");
        break;
      case "198":
        $(this).html(texticon+"Lobby - Boris boek");
        break;
      case "197":
        $(this).html(texticon+"Lobby - Check onderhoudsrooster");
        break;
      case "196":
        $(this).html(texticon+"Lobby - Onderhoudsrooster startpunten");
        break;
      case "518":
        $(this).html(texticon+"Lobby - Helft van Andrey");
        break;
      case "523":
        $(this).html(texticon+"Lobby - Mila 6 en Olek 9");
        break;
      case "468":
        $(this).html(texticon+"Lobby - Stroompunten aan muur");
        break;
      case "466":
        $(this).html(texticon+"Lobby - Ijzeren staven");
        break;
      case "194":
        $(this).html(texticon+"Lobby - Gebruik de generator opnieuw");
        break;
      case "527":
        $(this).html(texticon+"Pas op voor besmette persoon");
        break;
      case "192":
        $(this).html(texticon+"Fabriek - kijk naar de 3 machines");
        break;
      case "485":
        $(this).html(texticon+"Fabriek - Trek niet aan de kokers");
        break;
      case "191":
        $(this).html(texticon+"Fabriek A - stappen");
        break;
      case "189":
        $(this).html(texticon+"Fabriek A - knoppen wisselen");
        break;
      case "546":
        $(this).html(texticon+"Fabriek A - achterzijde");
        break;
      case "188":
        $(this).html(texticon+"Fabriek A - 8 stappen");
        break;
      case "187":
        $(this).html(texticon+"Fabriek A - formule");
        break;
      case "547":
        $(this).html(texticon+"Fabriek B - kleurcodes blokkeren");
        break;
      case "184":
        $(this).html(texticon+"Fabriek B - bevriezen");
        break;
      case "182":
        $(this).html(texticon+"Fabriek C - panelen zoeken");
        break;
      case "183":
        $(this).html(texticon+"Fabriek C - werk als een team");
        break;
      case "510":
        $(this).html(texticon+"Fabriek C - witte vierkant inhouden");
        break;
      case "181":
        $(this).html(texticon+"Jerrycans - zet licht uit en wees stil");
        break;
      case "441":
        $(this).html(texticon+"Zoek jerrycans in fabriek");
        break;
      case "245":
        $(this).html(texticon+"Nucleaire opslag achter douche");
        break;
      case "180":
        $(this).html(texticon+"Douche - Radioactief water");
        break;
      case "179":
        $(this).html(texticon+"Jerrycans in fabriek bij Machine A");
        break;
      case "178":
        $(this).html(texticon+"Check document achter douche");
        break;
      case "177":
        $(this).html(texticon+"Jerrycan achter douche");
        break;
      case "176":
        $(this).html(texticon+"Douche - metalen kratten");
        break;
      case "175":
        $(this).html(texticon+"Douche - vind 3 documenten");
        break;
      case "174":
        $(this).html(texticon+"Douche - Jerrycan D aan XXX");
        break;
      case "243":
        $(this).html(texticon+"Douche - Jerrycan E en C");
        break;
      case "244":
        $(this).html(texticon+"Douche - Jerrycans juist, zoek cijferslot");
        break;
      case "549":
        $(this).html(texticon+"Douche - 4 cijfers nodig");
        break;
      case "514":
        $(this).html(texticon+"Endgame - 4 noodknoppen");
        break;
      case "173":
        $(this).html(texticon+"Endgame - hurry up");
        break;
      case "172":
        $(this).html(texticon+"3 extra min");
        break;
      case "171":
        $(this).html(texticon+"6 extra min");
        break;
      case "169":
        $(this).html(texticon+"Endgame - 2 players 4 buttons");
        break;
      case "170":
        $(this).html(texticon+"Endgame - kantel serum niet");
        break;
      case "820":
        $(this).html(texticon+"Sleutel gebroken - forceer deur");
        break;
      case "814":
        $(this).html(texticon+"Receptie - Kijk lamp");
        break;
      case "756":
        $(this).html(texticon+"Receptie - Kijk klok");
        break;
      case "418":
        $(this).html(texticon+"Gang - Deurhangers");
        break;
      case "799":
        $(this).html(texticon+"Gang - Verstop Dieter");
        break;
      case "713":
        $(this).html(texticon+"Werk sneller");
        break;
      case "712":
        $(this).html(texticon+"Niet vloeken");
        break;
      case "711":
        $(this).html(texticon+"SLPKMR - Kamerjas zak");
        break;
      case "590":
        $(this).html(texticon+"SLPKMR - Steeksleutel");
        break;
      case "792":
        $(this).html(texticon+"SLPKMR - Leer tellen");
        break;
      case "451":
        $(this).html(texticon+"SLPKMR - Schilderij code");
        break;
      case "680":
        $(this).html(texticon+"SLPKMR - Code start bij 6");
        break;
      case "316":
        $(this).html(texticon+"Buizen - 10 richtingen");
        break;
      case "566":
        $(this).html(texticon+"Buizen - Oplossing");
        break;
      case "474":
        $(this).html(texticon+"Was - Handdoeken in slpkmr");
        break;
      case "554":
        $(this).html(texticon+"Was - Lift kleuren");
        break;
      case "319":
        $(this).html(texticon+"Was - Werk sneller");
        break;
      case "308":
        $(this).html(texticon+"End - Verzamel objecten");
        break;
    }
    $(this).parent("td").append('<i class="mdi mdi-sync"></i>');
  })

$(document).on("click", "i.mdi-sync", function(){
  var tipID = $(this).siblings("button").attr("data-tip_id");
  
  for (var i = 0; i < text_tips.length; i++){
    if(text_tips[i]["id"] == tipID){
      $('#modal-customtip textarea[name="tip_text"]').val(text_tips[i]["text"]);
    }
  }

  $('button[data-target="modal-customtip"]').click();
});

$("#modal-session-finish .modal-card-body .content, #modal-session-pause .modal-card-body .content").html('<div class="field"><p class="is-size-4">Are you sure?</p></div>');

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
`;

var styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
