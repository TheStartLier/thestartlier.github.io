var app = express();
var cors = require('cors');
app.use(cors());

var hueIp = "192.168.0.136";
var client;

// These are configs
var hostname = "broker.emqx.io";
var port = "8083";
var mqtt_Topic = "Smoke9Rooms";
var clientId;

let diningRoomStatus = false;
let smokePowerStatus = false;
let VladPowerStatus = false;
let geurDrugsLab = false;

let verlaagdeReset = false;
let drugslabReset = false;
let diningReset = false;
let vladreset = false;
let cprOverrule = false;
let fallbackOverrule = false;
let drugsReset = false;


let boxReset = false;
let darkReset = false;
let laserReset = false;
let bombReset = false;

let firstReset = false;

let topLaserEasy = true;
let bottomLaserEasy = true;


let difficulty = 1;

//create client ID or load from storage
if ( window.sessionStorage.clientId){
  clientId = window.sessionStorage.clientId;
}else{
  clientId = "SmokeThestartmqtt_js_" + parseInt(Math.random() * 100000, 10);
  window.sessionStorage.clientId = clientId;
}

// This is called after the webpage is completely loaded
// It is the main entry point into the JS code
function connect(){
	// Set up the client
	client = new Paho.MQTT.Client(hostname, Number(port), clientId);
	console.info('Connecting to Server: Hostname: ', hostname, '. Port: ', port, '. Client ID: ', clientId);

	// set callback handlers
	client.onConnectionLost = onConnectionLost;
	client.onMessageArrived = onMessageArrived;

	// see client class docs for all the options
	var options = {
		onSuccess: onConnect, // after connected, subscribes
		onFailure: onFail,    // useful for logging / debugging
    useSSL:false
	};
	// connect the client
	client.connect(options);
	console.info('Connecting...');
}


var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}



function updateBox(mode){
	difficulty= mode;
	let button = document.getElementById('Easy');
    button.innerHTML = "Easy";
    button.classList.remove("example_a");
    button.classList.add("example_b");
	
	
	 button = document.getElementById('Normal');
    button.innerHTML = "Normal";
    button.classList.remove("example_a");
    button.classList.add("example_b");
	
	
	
	 button = document.getElementById('Hard');
    button.innerHTML = "Hard";
    button.classList.remove("example_a");
    button.classList.add("example_b");
	
	
  if(mode == 0){
    let button = document.getElementById('Easy');
    button.innerHTML = "Box in Easy mode";
    button.classList.remove("example_b");
    button.classList.add("example_a");
  }
  
  if(mode == 1){
    let button = document.getElementById('Normal');
    button.innerHTML = "Box in Normal mode";
    button.classList.remove("example_b");
    button.classList.add("example_a");
  }
  
  if(mode == 2){
    let button = document.getElementById('Hard');
    button.innerHTML = "Box in Hard mode";
    button.classList.remove("example_b");
    button.classList.add("example_a");
  }
}




function bottomLaser(){
  if(topLaserEasy == false){
    let button = document.getElementById('BottomLaser');
    button.innerHTML = "Laser in Hard mode";
    button.classList.remove("example_a");
    button.classList.add("example_b");
	sendMessage(`http://192.168.0.118/update?value=NormalLasersBottom`);
   
    topLaserEasy = true;
  }else{
    let button = document.getElementById('BottomLaser');
    button.innerHTML = "Laser in Easy Mode";
    button.classList.remove("example_b");
    button.classList.add("example_a");
     sendMessage(`http://192.168.0.118/update?value=EasyLasersBottom`);
    topLaserEasy = false;
  }
}


function topLaser(){
  if(bottomLaserEasy == false){
    let button = document.getElementById('TopLaser');
    button.innerHTML = "Laser in Hard mode";
    button.classList.remove("example_a");
    button.classList.add("example_b");
    sendMessage(`http://192.168.0.118/update?value=NormalLasersTop`);
    bottomLaserEasy = true;
  }else{
    let button = document.getElementById('TopLaser');
    button.innerHTML = "Laser in Easy Mode";
    button.classList.remove("example_b");
    button.classList.add("example_a");
    sendMessage(`http://192.168.0.118/update?value=EasyLasersTop`);
    bottomLaserEasy = false;
  }
}



function rebootDrugs(){
  if(drugsReset == false){
    let button = document.getElementById('resetDrugsButton');
    button.innerHTML = "Room in Reset Mode";
    button.classList.remove("example_a");
    button.classList.add("example_b");
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `http://192.168.0.224/On`);
    xmlhttp.send();
    drugsReset = true;
  }else{
    let button = document.getElementById('resetDrugsButton');
    button.innerHTML = "Room Active ";
    button.classList.remove("example_b");
    button.classList.add("example_a");
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `http://192.168.0.224/Off`);
    xmlhttp.send();
    drugsReset = false;
  }
}



function sendMessage(message){
    xmlhttp = new XMLHttpRequest();
   // xmlhttp.open("GET", `http://espucroom4test/on`);
	xmlhttp.open("GET", message);
    xmlhttp.send();
    drugsReset = true;
  
}



async function sendCall(soundFile){
		/*
      var payload = soundFile;
      message = new Paho.MQTT.Message(payload);
      message.destinationName = mqtt_Topic;
      message.retained = false;
      client.send(message);
      console.info("sending: ", payload);*/
	  let xhr = new XMLHttpRequest();
		xhr.open("POST", "http://192.168.0.230:8000/data");
		
		xhr.onreadystatechange = function () {
		  if (xhr.readyState === 4) {
			console.log(xhr.status);
			console.log(xhr.responseText);
		  }};

		let data = soundFile;

		xhr.send(data);
		
    }
	



function rebootLeft(){
    sendMessage(`http://192.168.0.224/On`);
	sendMessage(`http://192.168.0.224/On`);
	sendMessage(`http://192.168.0.223/On`);
	sendMessage(`http://192.168.0.166/updates?value=Reset`);
	sendMessage(`http://192.168.0.158/updates?value=Reset`);
	sendMessage(`http://192.168.0.118/update?value=Reset`);
	topLaserEasy = false;
	bottomLaserEasy = false;
	topLaser();
	bottomLaser();
	
	
	setTimeout(function () {
		sendMessage(`http://192.168.0.224/Off`);
		sendMessage(`http://192.168.0.224/Off`);
		sendMessage(`http://192.168.0.223/Off`);
		sendMessage(`http://192.168.0.166/updates?value=TurnOn`);
		sendMessage(`http://192.168.0.158/updates?value=TurnOn`);
	}, 5000);
  
}


function rebootRight(){
    sendMessage(`http://192.168.0.246/On`);
	sendMessage(`http://192.168.0.184/update?value=Reset`);
	sendMessage(`http://192.168.0.149/updates?value=Reset`);
	sendMessage(`http://192.168.0.107/updates?value=Reset`);
	sendMessage(`http://192.168.0.246/CPROff`);
	sendMessage(`http://192.168.0.246/FallbackOff`);
	
	setTimeout(function () {
		sendMessage(`http://192.168.0.246/Off`);
		sendMessage(`http://192.168.0.184/update?value=TurnOn`);
		sendMessage(`http://192.168.0.149/updates?value=TurnOn`);
		sendMessage(`http://192.168.0.107/updates?value=TurnOn`);
	}, 5000);
	
  
}





function rebootDiningRoom(){
  if(diningReset == false){
    let button = document.getElementById('resetDiningButton');
    button.innerHTML = "Room in Reset Mode";
    button.classList.remove("example_a");
    button.classList.add("example_b");
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `http://192.168.0.223/On`);
    xmlhttp.send();
    diningReset = true;
	
	turnLightGroupOnOrOff(20, true);
    diningRoomStatus = true;
	
	
  }else{
    let button = document.getElementById('resetDiningButton');
    button.innerHTML = "Room Active ";
    button.classList.remove("example_b");
    button.classList.add("example_a");
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `http://192.168.0.223/Off`);
    xmlhttp.send();
    diningReset = false;
	
	turnLightGroupOnOrOff(20, true);
    diningRoomStatus = true;
  }
}


function rebootBox(){
  if(boxReset == false){
    let button = document.getElementById('resetBoxButton');
    button.innerHTML = "Room in Reset Mode";
    button.classList.remove("example_a");
    button.classList.add("example_b");
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `http://192.168.0.107/updates?value=Reset`);
    xmlhttp.send();
    boxReset = true;
	
	sendMessage(`http://192.168.0.162/updates?value=Reset`);
	
	
  }else{
    let button = document.getElementById('resetBoxButton');
    button.innerHTML = "Room Active";
    button.classList.remove("example_b");
    button.classList.add("example_a");
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `http://192.168.0.107/updates?value=TurnOn`);
    xmlhttp.send();
    boxReset = false;
  }
}

function rebootLaser(){
  if(laserReset == false){
    let button = document.getElementById('resetLaserButton');
    button.innerHTML = "Room in Reset Mode";
    button.classList.remove("example_a");
    button.classList.add("example_b");
    sendMessage(`http://192.168.0.158/updates?value=Reset`);
	
	
	button = document.getElementById('resetLaserButton');
    button.innerHTML = "Room in Reset Mode";
    button.classList.remove("example_a");
    button.classList.add("example_b");
    sendMessage(`http://192.168.0.118/update?value=Reset`);
	
	
    laserReset = true;
	
	 button = document.getElementById('BottomLaser');
    button.innerHTML = "Laser in Hard mode";
    button.classList.remove("example_a");
    button.classList.add("example_b");
	sendMessage(`http://192.168.0.118/update?value=NormalLasersBottom`);
   
    topLaserEasy = true;
	
	button = document.getElementById('TopLaser');
    button.innerHTML = "Laser in Hard mode";
    button.classList.remove("example_a");
    button.classList.add("example_b");
    sendMessage(`http://192.168.0.118/update?value=NormalLasersTop`);
    bottomLaserEasy = true;
	
	
  }else{
    let button = document.getElementById('resetLaserButton');
    button.innerHTML = "Room Active";
    button.classList.remove("example_b");
    button.classList.add("example_a");
    sendMessage(`http://192.168.0.158/updates?value=TurnOn`);
    laserReset = false;
  }
}


function rebootFirst(){

  if(firstReset == false){
    let button = document.getElementById('resetFirstButton');
    button.innerHTML = "Room in Reset Mode";
    button.classList.remove("example_a");
    button.classList.add("example_b");
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `http://192.168.0.210/updates?value=Reset`);
    xmlhttp.send();
    firstReset = true;
  }else{
    let button = document.getElementById('resetFirstButton');
    button.innerHTML = "Room Active";
    button.classList.remove("example_b");
    button.classList.add("example_a");
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `http://192.168.0.210/updates?value=Off`);
    xmlhttp.send();
    firstReset = false;
  }
}



function rebootVerlaagde(){

  if(verlaagdeReset == false){
    let button = document.getElementById('resetVerlaagdeButton');
    button.innerHTML = "Room in Reset Mode";
    button.classList.remove("example_a");
    button.classList.add("example_b");
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `http://192.168.0.145/On`);
    xmlhttp.send();
    verlaagdeReset = true;
  }else{
    let button = document.getElementById('resetVerlaagdeButton');
    button.innerHTML = "Room Active";
    button.classList.remove("example_b");
    button.classList.add("example_a");
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `http://192.168.0.145/Off`);
    xmlhttp.send();
    verlaagdeReset = false;
  }
}

function rebootDarkRoom(){
  if(darkReset == false){
    let button = document.getElementById('resetDarkButton');
    button.innerHTML = "Room in Reset Mode";
    button.classList.remove("example_a");
    button.classList.add("example_b");
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `http://192.168.0.184/update?value=Reset`);
    xmlhttp.send();
    darkReset = true;
  }else{
    let button = document.getElementById('resetDarkButton');
    button.innerHTML = "Room Active";
    button.classList.remove("example_b");
    button.classList.add("example_a");
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `http://192.168.0.184/update?value=TurnOn`);
    xmlhttp.send();
    darkReset = false;
  }
}

function overruleCPR(){
  if(cprOverrule == false){
    let button = document.getElementById('OverruleCPR');
    button.innerHTML = "CPR Overruled";
    button.classList.remove("example_b");
    button.classList.add("example_a");
    sendMessage(`http://192.168.0.246/CPROn`);
    cprOverrule = true;
  }else{
    let button = document.getElementById('OverruleCPR');
    button.innerHTML = "CPR Normal";
    button.classList.remove("example_a");
    button.classList.add("example_b");
    sendMessage(`http://192.168.0.246/CPROff`);
    cprOverrule = false;
  }
}

function FallbackControl(){
  if(fallbackOverrule == false){
    let button = document.getElementById('Fallback');
    button.innerHTML = "Team cannot fall back";
    button.classList.remove("example_b");
    button.classList.add("example_a");
    sendMessage(`http://192.168.0.246/FallbackOn`);
    fallbackOverrule = true;
  }else{
    let button = document.getElementById('Fallback');
    button.innerHTML = "Team can fall back";
    button.classList.remove("example_a");
    button.classList.add("example_b");
    sendMessage(`http://192.168.0.246/FallbackOff`);
    fallbackOverrule = false;
  }
}



function rebootVlad(){
  if(vladreset == false){
    let button = document.getElementById('resetVladButton');
    button.innerHTML = "Room in Reset Mode";
    button.classList.remove("example_a");
    button.classList.add("example_b");
    sendMessage(`http://192.168.0.246/On`);
    vladreset = true;
	
	button = document.getElementById('OverruleCPR');
    button.innerHTML = "CPR Normal";
    button.classList.remove("example_a");
    button.classList.add("example_b");
    sendMessage(`http://192.168.0.246/CPROff`);
	

	button = document.getElementById('Fallback');
    button.innerHTML = "Team can fall back";
    button.classList.remove("example_a");
    button.classList.add("example_b");
    sendMessage(`http://192.168.0.246/FallbackOff`);
	
	// Door open
	sendMessage(`http://192.168.0.245/relay/on`);
	

  }else{
    let button = document.getElementById('resetVladButton');
    button.innerHTML = "Room Active";
    button.classList.remove("example_b");
    button.classList.add("example_a");
    sendMessage(`http://192.168.0.246/Off`);
    vladreset = false;
	
	// Door close
	sendMessage(`http://192.168.0.245/relay/off`);
  }
}



function rebootBom(){
  if(bombReset == false){
    let button = document.getElementById('resetBomButton');
    button.innerHTML = "Room in Reset Mode";
    button.classList.remove("example_a");
    button.classList.add("example_b");
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `http://192.168.0.149/On`);
    xmlhttp.send();
    bombReset = true;
  }else{
    let button = document.getElementById('resetBomButton');
    button.innerHTML = "Room Active";
    button.classList.remove("example_b");
    button.classList.add("example_a");
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `http://192.168.0.149/Off`);
    xmlhttp.send();
    bombReset = false;
  }
}


function quickReset(roomNumber){
  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", `http://ESPUCRoom${roomNumber}/on`);
  xmlhttp.send();
  setTimeout(() => {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `http://ESPUCRoom${roomNumber}/off`);
    xmlhttp.send(); }, 2000);
}

function onConnect(context) {
	console.log("Client Connected");



    // And subscribe to our topics	-- all with the same callback function
	options = {qos:0, onSuccess:function(context){ console.log("subscribed"); } }
	client.subscribe(mqtt_Topic, options);

}

function onFail(context) {
  console.log("Failed to connect");
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("Connection Lost: " + responseObject.errorMessage);
    window.alert("Someone else took my websocket!\nRefresh to take it back.");
  }
}

function onMessageArrived(message) {
  console.log(
    "got message to topic:",
    message.destinationName,
    "message:",
    message.payloadString
  );
  if (message.destinationName == mqtt_Topic) {
    console.log("got LED message");
  }
}

function forceSmoke(){

  document.getElementById('forceButton').disabled = true;
  document.getElementById('forceButton').innerHTML = "SMOKING...";
  document.getElementById('forceButton').classList.remove('example_b');
  document.getElementById('forceButton').classList.add('example_a');
  /*var payload = "f";
  message = new Paho.MQTT.Message(payload);
  message.destinationName = mqtt_Topic;
  message.retained = false;
  client.send(message);
  console.info("sending: ", payload);*/
  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", `http://ESPUCSmoker/off`);
  xmlhttp.send();
  
  
  setTimeout(function () {
	  
	  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", `http://ESPUCSmoker/on`);
  xmlhttp.send();
  
  
  document.getElementById('forceButton').disabled = false;
  document.getElementById('forceButton').innerHTML = "Force Smoke";
  document.getElementById('forceButton').classList.remove('example_a');
  document.getElementById('forceButton').classList.add('example_b');

}, 10000);


}

  async function getApi(){
  connect();
  const config = {
    method: 'get',
    url: 'https://discovery.meethue.com/'
  }
  let res = await axios(config);
  console.log("Found bridge at: " + res.data[0].internalipaddress);
  //hueIp = res.data[0].internalipaddress;
  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", `http://ESPUCSmoker/on`);
  xmlhttp.send()
  
  const vladConfig = {
    method: 'get',
    url: `http://192.168.0.246/Status`
  };
  
  
	
	try {
        let resVladPower = await axios(vladConfig);
		  if(resVladPower.data.reset == true){
			let button = document.getElementById('resetVladButton');
			button.innerHTML = "Room in Reset Mode";
			button.classList.remove("example_a");
			button.classList.add("example_b");
			vladreset = true;
		  }else{
			let button = document.getElementById('resetVladButton');
			button.innerHTML = "Room Active";
			button.classList.remove("example_b");
			button.classList.add("example_a");
			vladreset = false;
		  }
		  
		  if(resVladPower.data.cprOverule == false){
			let button = document.getElementById('OverruleCPR');
			button.innerHTML = "CPR normal";
			button.classList.remove("example_a");
			button.classList.add("example_b");
			cprOverrule = false;
			sendMessage(`http://192.168.0.246/CPROff`);
		  }else{
			let button = document.getElementById('OverruleCPR');
			button.innerHTML = "CPR Overruled";
			button.classList.remove("example_b");
			button.classList.add("example_a");
			cprOverrule = true;
			sendMessage(`http://192.168.0.246/CPROn`);
		  }
		  
		  
		  if(resVladPower.data.fallbackOverrule == false){
			let button = document.getElementById('Fallback');
			button.innerHTML = "Team can fall back";
			button.classList.remove("example_a");
			button.classList.add("example_b");
			fallbackOverrule = false;
			sendMessage(`http://192.168.0.246/FallbackOff`);
		  }else{
			let button = document.getElementById('Fallback');
			button.innerHTML = "Team cannot fall back";
			button.classList.remove("example_b");
			button.classList.add("example_a");
			fallbackOverrule = true;
			sendMessage(`http://192.168.0.246/FallbackOn`);
		  }
  
    } catch (err) {
        console.error(err);
    }
  
  
}


const turnLightOnOrOff = async (lightId, on) => {
    const url = `http://${hueIp}/api/FswU2OL6HzX9kDVwNNL9GTMjvD4wdQVeeIOuMqpE/lights/${lightId}/state`;
    try {
        return await axios.put(url, {
            on,
        });
    } catch (err) {
        console.error(err);
    }
};

const turnLightGroupOnOrOff = async (groupId, on) => {
    const url = `http://${hueIp}/api/FswU2OL6HzX9kDVwNNL9GTMjvD4wdQVeeIOuMqpE/groups/${groupId}/action`;
    try {
        return await axios.put(url, {
            on,
        });
    } catch (err) {
        console.error(err);
    }
};

async function changeDiningScene(sceneName){

let SceneId = "";

	diningRoomStatus = true;
  switch (sceneName) {
    case "start":
      SceneId = "7efgb0NCfppgLL3";
      break;
    case "blue":
      SceneId = "gErHdHpricbcD9b";
      break;
    case "red":
      SceneId = "Hmzs-vbBtlunZuf";
      break;
    case "green":
      SceneId = "l92fHO0pf8YzVxo";
      break;
    default:
    SceneId = "";
    break;

  }

  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("PUT", `http://${hueIp}/api/FswU2OL6HzX9kDVwNNL9GTMjvD4wdQVeeIOuMqpE/groups/20/action`);
  xmlhttp.send(JSON.stringify({"scene": `${SceneId}`}));
  sendMessage(`http://192.168.0.118/update?value=NoCheating`);

}







async function changeLqserScene(sceneName){

let SceneId = "";

	diningRoomStatus = true;
  switch (sceneName) {
    case "start":
      SceneId = "Hc3HvF7IO2xWM6kc";
      break;
    case "blue":
      SceneId = "qOib3zVdajPUFyvN";
      break;
    case "red":
      SceneId = "eJqKS5iJdcVja0sG";
      break;
    case "green":
      SceneId = "kpzCcZNPHEmsEQHG";
      break;
    default:
    SceneId = "";
    break;

  }

  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("PUT", `http://192.168.0.208/api/vmvRoxgP6Dlv6E7MoIA0iMTIZNXvpDukECZMpoup/groups/86/action`);
  xmlhttp.send(JSON.stringify({"scene": `${SceneId}`}));

}

function diningRoomToggle(){

  if(diningRoomStatus == true){
    turnLightGroupOnOrOff(20, false);
    diningRoomStatus = false;
  }else{
    turnLightGroupOnOrOff(20, true)
    diningRoomStatus = true;
  };

}



function activateSmell(){

  turnLightOnOrOff(3, true);
  document.getElementById('Smell').disabled = true;
  document.getElementById('Smell').innerHTML = "Reuk busy...";
  document.getElementById('Smell').classList.remove('example_b');
  document.getElementById('Smell').classList.add('example_a');
  
  setTimeout(function () {
	  turnLightOnOrOff(3, false);
	  document.getElementById('Smell').disabled = false;
	  document.getElementById('Smell').innerHTML = "Activate 5 sec";
	  document.getElementById('Smell').classList.remove('example_a');
	  document.getElementById('Smell').classList.add('example_b');
	}, 5000);

}


function smokeToggle(){

  if(smokePowerStatus == true){
    turnLightOnOrOff(51, false);
    smokePowerStatus = false;
  }else{
    turnLightOnOrOff(51, true)
    smokePowerStatus = true;
  };

}



function DrugsToggle(){

  if(DrugsPowerStatus == true){
    turnLightOnOrOff(55, false);
    DrugsPowerStatus = false;
  }else{
    turnLightOnOrOff(55, true)
    DrugsPowerStatus = true;
  };

}


function VladToggle(){

  if(VladPowerStatus == true){
    turnLightOnOrOff(53, false);
    VladPowerStatus = false;
  }else{
    turnLightOnOrOff(53, true)
    VladPowerStatus = true;
  };

}


function geurControl(){

  if(geurDrugsLab == true){
    turnLightOnOrOff(21, false);
    geurDrugsLab = false;
  }else{
    turnLightOnOrOff(21, true)
    geurDrugsLab = true;
  };

}


var colorChecker = setInterval(async function(){

      const config = {
          method: 'get',
          url: `http://${hueIp}/api/FswU2OL6HzX9kDVwNNL9GTMjvD4wdQVeeIOuMqpE/groups/20`
      };
      let res = await axios(config)
      let rgb = ColorConverter.xyBriToRgb(res.data.action.xy[0], res.data.action.xy[1], 255);
      let color = (rgbToHex(rgb.r, rgb.g, rgb.b));
      document.getElementById('diningLight').style.backgroundColor = "" + color;

  }, 1000);



var statusChecker = setInterval(async function(){
  
  const smokeConfig = {
    method: 'get',
    url: `http://${hueIp}/api/FswU2OL6HzX9kDVwNNL9GTMjvD4wdQVeeIOuMqpE/lights/51/`
  };
  const geurConfig = {
    method: 'get',
    url: `http://${hueIp}/api/FswU2OL6HzX9kDVwNNL9GTMjvD4wdQVeeIOuMqpE/lights/21/`
  };

	 const vladConfig = {
    method: 'get',
    url: `http://192.168.0.246/Status`
  };
  
  const verlaagdeConfig = {
    method: 'get',
    url: `http://192.168.0.145/Status`
  };


	const drugsConfig = {
    method: 'get',
    url: `http://192.168.0.224/Status`
  };
  
  const diningConfig = {
    method: 'get',
    url: `http://192.168.0.223/Status`
  };
  
  
  const LaserConfig = {
    method: 'get',
    url: `http://192.168.0.158/Status`
  };
  
  let ressmokePwr = await axios(smokeConfig);
  let resGeurPower = await axios(geurConfig);
  
  
	const BombConfig = {
    method: 'get',
    url: `http://192.168.0.149/Status`
  };
  
  
  /*
  try {
        let verlaagdeInfo = await axios(LaserConfig);
		
		  if(verlaagdeInfo.data.reset == true){
			let button = document.getElementById('resetLaserButton');
			button.innerHTML = "Room in Reset Mode";
			button.classList.remove("example_a");
			button.classList.add("example_b");
			verlaagdeReset = true;
		  }else{
			let button = document.getElementById('resetLaserButton');
			button.innerHTML = "Room Active";
			button.classList.remove("example_b");
			button.classList.add("example_a");
			verlaagdeReset = false;
		  }
    } catch (err) {
        console.error(err);
    }*/
	
	
	try {
        let verlaagdeInfo = await axios(BombConfig);
		
		  if(verlaagdeInfo.data.reset == true){
			let button = document.getElementById('resetBomButton');
			button.innerHTML = "Room in Reset Mode";
			button.classList.remove("example_a");
			button.classList.add("example_b");
			bombReset = true;
		  }else{
			let button = document.getElementById('resetBomButton');
			button.innerHTML = "Room Active";
			button.classList.remove("example_b");
			button.classList.add("example_a");
			bombReset = false;
		  }
    } catch (err) {
        console.error(err);
    }
	
	
  
	try {
        let verlaagdeInfo = await axios(verlaagdeConfig);
		
		  if(verlaagdeInfo.data.reset == true){
			let button = document.getElementById('resetVerlaagdeButton');
			button.innerHTML = "Room in Reset Mode";
			button.classList.remove("example_a");
			button.classList.add("example_b");
			verlaagdeReset = true;
		  }else{
			let button = document.getElementById('resetVerlaagdeButton');
			button.innerHTML = "Room Active";
			button.classList.remove("example_b");
			button.classList.add("example_a");
			verlaagdeReset = false;
		  }
    } catch (err) {
        console.error(err);
    }
	
	
	try {
        let diningResult = await axios(diningConfig);
		
		  if(diningResult.data.reset == true){
			let button = document.getElementById('resetDiningButton');
			button.innerHTML = "Room in Reset Mode";
			button.classList.remove("example_a");
			button.classList.add("example_b");
			diningReset = true;
		  }else{
			let button = document.getElementById('resetDiningButton');
			button.innerHTML = "Room Active";
			button.classList.remove("example_b");
			button.classList.add("example_a");
			diningReset = false;
		  }
		
    } catch (err) {
        console.error(err);
    }
	
	try {
        let resDrugsPower = await axios(drugsConfig);
		
		  if(resDrugsPower.data.reset == true){
			let button = document.getElementById('resetDrugsButton');
			button.innerHTML = "Room in Reset Mode";
			button.classList.remove("example_a");
			button.classList.add("example_b");
			drugsReset = true;
		  }else{
			let button = document.getElementById('resetDrugsButton');
			button.innerHTML = "Room Active";
			button.classList.remove("example_b");
			button.classList.add("example_a");
			drugsReset = false;
		  }
		
    } catch (err) {
        console.error(err);
    }
	
	
	try {
        let resVladPower = await axios(vladConfig);
		  if(resVladPower.data.reset == true){
			let button = document.getElementById('resetVladButton');
			button.innerHTML = "Room in Reset Mode";
			button.classList.remove("example_a");
			button.classList.add("example_b");
			vladreset = true;
		  }else{
			let button = document.getElementById('resetVladButton');
			button.innerHTML = "Room Active";
			button.classList.remove("example_b");
			button.classList.add("example_a");
			vladreset = false;
		  }
		  
		  if(resVladPower.data.cprOverule == false){
			let button = document.getElementById('OverruleCPR');
			button.innerHTML = "CPR normal";
			button.classList.remove("example_a");
			button.classList.add("example_b");
			cprOverrule = false;
		  }else{
			let button = document.getElementById('OverruleCPR');
			button.innerHTML = "CPR Overruled";
			button.classList.remove("example_b");
			button.classList.add("example_a");
			cprOverrule = true;
		  }
		  
		  
		  if(resVladPower.data.fallbackOverrule == false){
			let button = document.getElementById('Fallback');
			button.innerHTML = "Team can fall back";
			button.classList.remove("example_a");
			button.classList.add("example_b");
			fallbackOverrule = false;
		  }else{
			let button = document.getElementById('Fallback');
			button.innerHTML = "Team cannot fall back";
			button.classList.remove("example_b");
			button.classList.add("example_a");
			fallbackOverrule = true;
		  }
  
    } catch (err) {
        console.error(err);
    }
	
	
  
  console.log(JSON.stringify(ressmokePwr));
  smokePowerStatus = ressmokePwr.data.state.on;
  

  
  
  
  
  
  
  
  
  
  
  if(diningRoomStatus == true){
    let button = document.getElementById('diningRoomButton');
    button.innerHTML = "On";
    button.classList.remove("example_b");
    button.classList.add("example_a");
  }else{
    let button = document.getElementById('diningRoomButton');
    button.innerHTML = "off";
    button.classList.remove("example_a");
    button.classList.add("example_b");
  }
  
  if(smokePowerStatus == true){
    let button = document.getElementById('smokePButton');
    button.innerHTML = "ON";
    button.classList.remove("example_b");
    button.classList.add("example_a");
  }else{
    let button = document.getElementById('smokePButton');
    button.innerHTML = "off";
    button.classList.remove("example_a");
    button.classList.add("example_b");
  }
  
  const configReuk = {
          method: 'get',
          url: `http://192.168.0.208/api/vmvRoxgP6Dlv6E7MoIA0iMTIZNXvpDukECZMpoup/lights/12`
      };
	  
	  
  reuk = await axios(configReuk)
       let onstate = reuk.data.state.on;
	   if (onstate){
		   color = (rgbToHex(0, 255, 0));
		   document.getElementById('receptionreuk').style.backgroundColor = "Green";
	   }else{
		   document.getElementById('receptionreuk').style.backgroundColor = "Red";
	   }
  
  




},1000);

function getXY(red,green,blue){

if (red > 0.04045){
red = Math.pow((red + 0.055) / (1.0 + 0.055), 2.4);
}
else red = (red / 12.92);

 if (green > 0.04045){
green = Math.pow((green + 0.055) / (1.0 + 0.055), 2.4);
}
else green = (green / 12.92);

if (blue > 0.04045){
blue = Math.pow((blue + 0.055) / (1.0 + 0.055), 2.4);
}
else blue = (blue / 12.92);

var X = red * 0.664511 + green * 0.154324 + blue * 0.162028;
var Y = red * 0.283881 + green * 0.668433 + blue * 0.047685;
var Z = red * 0.000088 + green * 0.072310 + blue * 0.986039;
var x = X / (X + Y + Z);
var y = Y / (X + Y + Z);
return new Array(x,y);

}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
