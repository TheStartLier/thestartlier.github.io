
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
      case "286":
        $(this).html(texticon+"R9 - Station vinden");
        break;
      case "824":
        $(this).html(texticon+"R9 - Richtingenslot");
        break;
      case "457":
        $(this).html(texticon+"R9 - Bom active");
        break;
    }
  })
