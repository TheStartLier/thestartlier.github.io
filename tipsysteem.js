
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
        $(this).html(texticon+"Briefingtent - Onderstreepte / fluo text");
        break;
      case "204":
        $(this).html(texticon+"Briefingtent - Correct jaar, foute maand");
        break;
      case "205":
        $(this).html(texticon+"Briefingtent - ? 6 ? 1");
        break;
      case "202":
        $(this).html(texticon+"Briefingtent - 2 6 ? ?");
        break;
      case "203":
        $(this).html(texticon+"Briefingtent - Teams die zijn binnengegaan");
        break;
      case "246":
        $(this).html(texticon+"Briefingtent - Sluit de deur");
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
        $(this).html(texticon+"Fabriek - Machine A stappen");
        break;
      case "189":
        $(this).html(texticon+"Fabriek - Machine A knoppen wisselen");
        break;
      case "546":
        $(this).html(texticon+"Fabriek - Machine A achterzijde");
        break;
      case "188":
        $(this).html(texticon+"Fabriek - Machine A 8 stappen");
        break;
      case "187":
        $(this).html(texticon+"Fabriek - Machine A formule");
        break;
      case "547":
        $(this).html(texticon+"Fabriek - Machine B kleurcodes blokkeren");
        break;
      case "184":
        $(this).html(texticon+"Fabriek - Machine B bevriezen");
        break;
      case "182":
        $(this).html(texticon+"Fabriek - Machine C panelen zoeken");
        break;
      case "183":
        $(this).html(texticon+"Fabriek - Machine C werk als een team");
        break;
      case "510":
        $(this).html(texticon+"Fabriek - Machine witte vierkant inhouden");
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
        $(this).html(texticon+"Reception - Kijk naar lamp");
        break;
      case "756":
        $(this).html(texticon+"Reception - Kijk naar klok");
        break;
      case "418":
        $(this).html(texticon+"Gang - Kijk naar deurhangers");
        break;
      case "799":
        $(this).html(texticon+"Gang - Dieter mag niet gezien worden");
        break;
      case "713":
        $(this).html(texticon+"Werk sneller");
        break;
      case "712":
        $(this).html(texticon+"Niet vloeken");
        break;
      case "711":
        $(this).html(texticon+"Slaapkamer - Kamerjas zakken");
        break;
      case "590":
        $(this).html(texticon+"Slaapkamer - Bureaulade steeksleutel");
        break;
      case "792":
        $(this).html(texticon+"Slaapkamer - Leer tellen");
        break;
      case "451":
        $(this).html(texticon+"Slaapkamer - Schilderij code");
        break;
      case "680":
        $(this).html(texticon+"Slaapkamer - Code start bij 6");
        break;
      case "316":
        $(this).html(texticon+"Buizenkamer - 10 richtingen");
        break;
      case "566":
        $(this).html(texticon+"Buizenkamer - Oplossing");
        break;
      case "474":
        $(this).html(texticon+"Waskamer - Handdoeken in slaapkamer");
        break;
      case "554":
        $(this).html(texticon+"Waskamer - Lift kleuren");
        break;
      case "319":
        $(this).html(texticon+"Waskamer - Werk sneller");
        break;
      case "308":
        $(this).html(texticon+"Endgame - Verzamel objecten");
        break;
    }
  })
