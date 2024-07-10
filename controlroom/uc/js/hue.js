var hueIp = "192.168.0.136";
var client;

// These are configs
var hostname = "broker.emqx.io";
var port = "8083";
var mqtt_Topic = "Smoke9Rooms";
var clientId;
var pingTimer = 10000;

let diningRoomStatus = false;
let smokePowerStatus = false;
let VladPowerStatus = false;
let geurDrugsLab = false;
let diningVoices = true;

let verlaagdeReset = false;
let drugsReset = false;
let diningReset = false;
let vladreset = false;
let cprOverrule = false;
let fallbackOverrule = false;


let boxReset = false;
let darkReset = false;
let laserReset = false;
let bombReset = false;

let firstReset = false;

let topLaserEasy = true;
let bottomLaserEasy = true;


let difficulty = 1;

let rooms = [
	{
		name: "firstRoom",
		IP: "https://192.168.0.215:5000",
		reset: false,
		newPi: true
	},
	{
		name: "verlaagdeKamer",
		IP: "http://192.168.0.145",
		reset: false,
		newPi: false
	},
	{
		name: "drugsLab",
		IP: "https://192.168.0.110:5000",
		reset: false,
		newPi: true
	},
	{
		name: "diningRoom",
		IP: "https://192.168.0.232:5000",
		reset: false,
		newPi: true
	},
	{
		name: "laserRoom",
		IP: "http://192.168.0.158",
		reset: false,
		newPi: false
	},
	{
		name: "vladimir",
		IP: "http://192.168.0.246",
		reset: false,
		newPi: false
	},
	{
		name: "boxRoom",
		IP: "https://192.168.0.196:5000",
		reset: false,
		newPi: true
	},
	{
		name: "bombRoom",
		IP: "https://192.168.0.112:5000",
		reset: false,
		newPi: true
	}
];




const url = 'http://128.199.55.42/sessions/6107/tip/204';

const headers = {
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
  'Accept-Encoding': 'gzip, deflate',
  'Accept-Language': 'en-US,en;q=0.9,nl-NL;q=0.8,nl;q=0.7',
  'Cache-Control': 'max-age=0',
  'Connection': 'keep-alive',
  'Content-Length': '60', // This will be set automatically by fetch
  'Content-Type': 'application/x-www-form-urlencoded',
  'Cookie': 'XSRF-TOKEN=eyJpdiI6IjJqdzdzSVZLT1FaWXZGTkVKTGNsbFE9PSIsInZhbHVlIjoiYzBzUU9zUktXdFI4N01BWC84WitndERaaDVvMExWUEY1bUxnZkovbGREby9JMDBid204Y1Rmd1NiUlY3c3ZRWk9ZSk9KM1RkWTNyRUJOZzd5ZTVVclNKdmp6bDlEM3lLK2lIV1VGcnI1UVhaQXJoNFV2K0trc1ZoWW5yMjJWUnkiLCJtYWMiOiIzMjMyNzcyYTg4NDUyMTkyNjU0YTA2M2UyYjlhZWM1ZjUxNzhmNDE1MGQzM2YyNjE3MzIyMmU2MzJiNDUwZmQ0In0%3D; escaperoom_tipsysteem_admin_session=eyJpdiI6Ik5GeTBrNkdrUEprd2EraEZJYndPSUE9PSIsInZhbHVlIjoicHBwVjBXYzhlaTVTRnVlcW1iZkphU2lVZkhkWW52UUNzMTBrengzczRhUFE0b3ZLcytpWVlXeDNJR1VwTlN2OTVjRFROU2Fld0FGbEd5NW1BNnQxcmU1a09vT3JiNjloMm42L0I5OXhPSWdVUEJjdit3OUVWN0FUN0RaY0l3YXYiLCJtYWMiOiIwMzMwNDEwOGE5M2I1ZTQ2NzgzNmQyNWVjODQxNTcwNDIwMGRjNTYyODcyYTQ1YWQxNjMyZTM2OTFlMDk2MTc0In0%3D; io=lKDnOjI8PgC-2jZUTZlI',
  'Host': '128.199.55.42',
  'Origin': 'http://128.199.55.42',
  'Referer': 'http://128.199.55.42/sessions/6107',
  'Upgrade-Insecure-Requests': '1',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
};

const body = 'your-form-urlencoded-data';




function sendCustomTip() {
  const url = "http://128.199.55.42/sessions/6107/customTip";

  const headers = {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "en-US,en;q=0.9,nl-NL;q=0.8,nl;q=0.7",
    "cache-control": "max-age=0",
    "content-type": "application/x-www-form-urlencoded",
    "upgrade-insecure-requests": "1"
  };

  const body = "_token=QovoVsPw9s9IE9WkKjvQfFgkqdGwWpTsm8PVMNY3&_method=POST&tip_text=MML+Team%2C+volgens+de+toezichthouders+zijn+de+eerste+2+toegangscodes+correct.+Met+name+26.+De+laatste+2+kunnen+we+echter+niet+achterhalen.";

  fetch(url, {
    method: "POST",
    headers: headers,
    body: body,
    referrer: "http://128.199.55.42/sessions/6107",
    referrerPolicy: "strict-origin-when-cross-origin",
    mode: "cors",
    credentials: "include"
  })
  .then(response => response.text())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}




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

// Click on a room header to expand/collapse menu buttons
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


// Radioactive box difficulty
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



// Bottom laser difficulty
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

// Top laser difficulty
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

function resetRoom(roomnumber){
	let room = rooms[roomnumber-1]; // zero based Array
	if(room.reset){
		let button = document.getElementById(room.name + 'Reset');
		if(button){
			button.innerHTML = "Room Active ";
			button.classList.remove("example_b");
			button.classList.add("example_a");
		}
		if(room.newPi){
			sendPiMessage(room.IP + '/restart');
			sendPiMessage(room.IP + '/relay/on');
		}else{
			xmlhttp = new XMLHttpRequest();
			xmlhttp.open("GET", room.IP + `/Off`);
			xmlhttp.send();
		}
		room.reset = false;
	}else{
		let button = document.getElementById(room.name + 'Reset');
		if(button){
			button.innerHTML = "Room in Reset Mode";
			button.classList.remove("example_a");
			button.classList.add("example_b");
		}
		if(room.newPi){
			sendPiMessage(room.IP + '/reset');
			sendPiMessage(room.IP + '/relay/off');
		}else{
			xmlhttp = new XMLHttpRequest();
			xmlhttp.open("GET", room.IP + `/On`);
			xmlhttp.send();
		}
		room.reset = true;
	}
}


// Drugslab reset
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


// Simple GET request
function sendMessage(message){
    xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", message);
    xmlhttp.send();  
}


// Verlaagde kamer telefoon sounds
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
	
// Test function, not actively used
async function sendMessageRichardTest(soundFile){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://192.168.0.232:5000/http://192.168.0.232:5000/play_effect"); // Change "your_new_ip_address" to the correct IP address
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }
    };

    let data = JSON.stringify({ "effect": soundFile }); // Convert soundFile to JSON format if needed

    xhr.setRequestHeader("Content-Type", "application/json"); // Set request header for JSON data
    xhr.send(data);
}
	
	
// POST request function for the new Raspberry Pi's
async function sendPiMessage(message, jsonString = null){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", message); // Change "your_new_ip_address" to the correct IP address
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }
    };
	
    let data = null;
	if(jsonString){
		if(typeof jsonString === 'string' || jsonString instanceof String){
			// If just a sound file is specified for example
			data = JSON.stringify({ "effect": jsonString });
		}else{
			// If custom json is specified, such as language
			data = JSON.stringify(jsonString);
		}
	}

    xhr.setRequestHeader("Content-Type", "application/json"); // Set request header for JSON data
    xhr.send(data);
}
	

function rebootLeft(){
    sendMessage(`http://192.168.0.224/On`);
	sendMessage(`http://192.168.0.224/On`);
	sendMessage(`http://192.168.0.150/On`);
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
		sendMessage(`http://192.168.0.150/Off`);
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





/*function rebootDiningRoom(){
  if(diningReset == false){
    let button = document.getElementById('resetDiningButton');
    button.innerHTML = "Room in Reset Mode";
    button.classList.remove("example_a");
    button.classList.add("example_b");
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `http://192.168.0.150/On`);
    xmlhttp.send();
    diningReset = true;
	
	
  }else{
    let button = document.getElementById('resetDiningButton');
    button.innerHTML = "Room Active ";
    button.classList.remove("example_b");
    button.classList.add("example_a");
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `http://192.168.0.150/Off`);
    xmlhttp.send();
    diningReset = false;
  }
    diningRoomStatus = true;
	changeDiningScene('start');
}*/

function toggleDiningRoom(){
  if(diningReset == false){
    let button = document.getElementById('diningRoomReset');
    button.innerHTML = "Room in Reset Mode";
    button.classList.remove("example_a");
    button.classList.add("example_b");
	sendPiMessage('http://192.168.0.232:5000/reset');
	sendPiMessage('http://192.168.0.232:5000/relay/off');
    diningReset = true;
  }else{
    let button = document.getElementById('diningRoomReset');
    button.innerHTML = "Room Active ";
    button.classList.remove("example_b");
    button.classList.add("example_a");
    sendPiMessage('http://192.168.0.232:5000/restart');
	sendPiMessage('http://192.168.0.232:5000/relay/on');
    diningReset = false;
  }
    diningRoomStatus = true;
	changeDiningScene('start');
}

function toggleDiningVoices(){
  if(diningVoices == true){
    let button = document.getElementById('diningRoomVoices');
    button.innerHTML = "Motion sensor off";
    button.classList.remove("example_a");
    button.classList.add("example_b");
	sendPiMessage('http://192.168.0.232:5000/sensor_triggers/disable');
    diningVoices = false;
  }else{
    let button = document.getElementById('diningRoomVoices');
    button.innerHTML = "Motion sensor on ";
    button.classList.remove("example_b");
    button.classList.add("example_a");
	sendPiMessage('http://192.168.0.232:5000/sensor_triggers/enable');
    diningVoices = true;
  }
}


function rebootBox(){
  if(boxReset == false){
    let button = document.getElementById('boxRoomReset');
    button.innerHTML = "Room in Reset Mode";
    button.classList.remove("example_a");
    button.classList.add("example_b");
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `http://192.168.0.107/updates?value=Reset`);
    xmlhttp.send();
    boxReset = true;
	
	sendMessage(`http://192.168.0.162/updates?value=Reset`);
	
	
  }else{
    let button = document.getElementById('boxRoomReset');
    button.innerHTML = "Room Active";
    button.classList.remove("example_b");
    button.classList.add("example_a");
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `http://192.168.0.107/updates?value=TurnOn`);
    xmlhttp.send();
    boxReset = false;
  }
	
	// Zet box op Easy
	sendMessage(`http://192.168.0.162/updates?value=time%3D2500`); 
	sendMessage(`http://192.168.0.162/updates?value=kantel%3D54`); 
	updateBox(0);
}

function rebootLaser(){
  if(laserReset == false){
    let button = document.getElementById('laserRoomReset');
    button.innerHTML = "Room in Reset Mode";
    button.classList.remove("example_a");
    button.classList.add("example_b");
    sendMessage(`http://192.168.0.158/updates?value=Reset`);
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
    let button = document.getElementById('laserRoomReset');
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
    let button = document.getElementById('darkRoomReset');
    button.innerHTML = "Room in Reset Mode";
    button.classList.remove("example_a");
    button.classList.add("example_b");
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `http://192.168.0.184/update?value=Reset`);
    xmlhttp.send();
    darkReset = true;
  }else{
    let button = document.getElementById('darkRoomReset');
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



function reboot	(){
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
	sendMessage(`http://192.168.0.114/relay/on`);
	

  }else{
    let button = document.getElementById('resetVladButton');
    button.innerHTML = "Room Active";
    button.classList.remove("example_b");
    button.classList.add("example_a");
    sendMessage(`http://192.168.0.246/Off`);
    vladreset = false;
	
	// Door close
	sendMessage(`http://192.168.0.114/relay/off`);
  }
}



function rebootBom(){
  if(bombReset == false){
    let button = document.getElementById('bombRoomReset');
    button.innerHTML = "Room in Reset Mode";
    button.classList.remove("example_a");
    button.classList.add("example_b");
	sendPiMessage('http://192.168.0.112:5000/reset');
	sendPiMessage('http://192.168.0.112:5000/relay/on');
    bombReset = true;
  }else{
    let button = document.getElementById('bombRoomReset');
    button.innerHTML = "Room Active";
    button.classList.remove("example_b");
    button.classList.add("example_a");
	sendPiMessage('http://192.168.0.112:5000/restart');
	sendPiMessage('http://192.168.0.112:5000/relay/off');
    bombReset = false;
  }
}


function rebootVlad(){
  if(vladreset == false){
    let button = document.getElementById('vladimirReset');
    button.innerHTML = "Room in Reset Mode";
    button.classList.remove("example_a");
    button.classList.add("example_b");
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `http://192.168.0.246/On`);
    xmlhttp.send();
    vladreset = true;
	
	// Open door
	sendMessage(`http://192.168.0.114/relay/on`); 
    document.getElementById('toggleVladDoor').textContent = "Door is open";
	document.getElementById('toggleVladDoor').className = "example_a";
  }else{
    let button = document.getElementById('vladimirReset');
    button.innerHTML = "Room Active";
    button.classList.remove("example_b");
    button.classList.add("example_a");
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `http://192.168.0.246/Off`);
    xmlhttp.send();
    vladreset = false;
	
	// Close door
	sendMessage(`http://192.168.0.114/relay/off`); 
    document.getElementById('toggleVladDoor').textContent = "Door is closed";
	document.getElementById('toggleVladDoor').className = "example_b";
  }
}

async function toggleVladDoor(){
  var doorStatus = "OFFLINE";
  const doorConfig = {
	  method: 'get',
	  url: `http://192.168.0.114/Status`
  };
  let resDoor = await axios(doorConfig)
  switch(resDoor.data.DoorState){
	  case true:
		// Close door
		sendMessage(`http://192.168.0.114/relay/off`);
		doorStatus = "closed";
		document.getElementById('toggleVladDoor').className = "example_b";
	  break;
	  case false:
		// Open door
		sendMessage(`http://192.168.0.114/relay/on`);
		doorStatus = "open";
		document.getElementById('toggleVladDoor').className = "example_a";
	  break;
  }
  document.getElementById('toggleVladDoor').textContent = "Door is " + doorStatus;
}

async function toggleDiningDoor(){
  var doorStatus = "OFFLINE";
  const doorConfig = {
	  method: 'get',
	  url: `http://192.168.0.232:5000/status`
  };
  let resDoor = await axios(doorConfig)
  switch(resDoor.data.relay_state){
	  case 0:
		// Close door
		sendPiMessage('http://192.168.0.232:5000/relay/on');
		doorStatus = "closed";
		document.getElementById('diningDoor').className = "example_b";
	  break;
	  case 1:
		// Open door
		sendPiMessage('http://192.168.0.232:5000/relay/off');
		doorStatus = "open";
		document.getElementById('diningDoor').className = "example_a";
	  break;
  }
  document.getElementById('diningDoor').textContent = "Door is " + doorStatus;
}

async function toggleDoor(roomnumber){
  let room = rooms[roomnumber-1];
  let doorStatus = "OFFLINE";
  const doorConfig = {
	  method: 'get',
	  url: room.IP + `/status`
  };
  let resDoor = await axios(doorConfig)
  switch(resDoor.data.relay_state){
	  case 0:
		// Close door
		sendPiMessage(room.IP + '/relay/on');
		doorStatus = "closed";
		document.getElementById(room.name + 'Door').className = "example_b";
	  break;
	  case 1:
		// Open door
		sendPiMessage(room.IP + '/relay/off');
		doorStatus = "open";
		document.getElementById(room.name + 'Door').className = "example_a";
	  break;
  }
  document.getElementById(room.name + 'Door').textContent = "Door is " + doorStatus;
}

async function startBriefing(roomNumber){
	let room = rooms[roomNumber-1];
	sendPiMessage(room.IP + '/start_briefing');
}

async function win(roomNumber){
	let room = rooms[roomNumber-1];
	sendPiMessage(room.IP + '/win');
}

async function lose(roomNumber){
	let room = rooms[roomNumber-1];
	sendPiMessage(room.IP + '/lose');
}

async function play_tip(roomNumber, message){
	let room = rooms[roomNumber-1];
	sendPiMessage(room.IP + '/play_tip', message);
}

async function TestDoor(){
  var doorStatus = "OFFLINE";
  const doorConfig = {
	  method: 'get',
	  url: `http://192.168.0.215:5000/status`
  };
  let resDoor = await axios(doorConfig)
  switch(resDoor.data.relay_state){
	  case 0:
		// Close door
		sendPiMessage('http://192.168.0.215:5000/relay/on');
		doorStatus = "closed";
		document.getElementById('testDoor').className = "example_b";
	  break;
	  case 1:
		// Open door
		sendPiMessage('http://192.168.0.215:5000/relay/off');
		doorStatus = "open";
		document.getElementById('testDoor').className = "example_a";
	  break;
  }
  document.getElementById('testDoor').textContent = "Door is " + doorStatus;
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




const turnLightOnOrOffTwo = async (lightId, on) => {
    const url = `http://192.168.0.208/api/vmvRoxgP6Dlv6E7MoIA0iMTIZNXvpDukECZMpoup/lights/${lightId}/state`;
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
    case "tuurTip":
      SceneId = "Y1PVIn-OXWG5WjFv";
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

  }, pingTimer);


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
  
  const firstRoomConfig = {
    method: 'get',
    url: `http://192.168.0.215:5000/status`
  };
  
  const verlaagdeConfig = {
    method: 'get',
    url: `http://192.168.0.145/Status`
  };

	const drugsConfig = {
    method: 'get',
    url: `http://192.168.0.110:5000/status`
  };
  
  const diningConfig = {
    method: 'get',
    url: `http://192.168.0.232:5000/status`
  };
  
  
  const LaserConfig = {
    method: 'get',
    url: `http://192.168.0.158/Status`
  };
  
  let ressmokePwr = await axios(smokeConfig);
  let resGeurPower = await axios(geurConfig);
  
  
  const BombConfig = {
    method: 'get',
    url: `http://192.168.0.112:5000/status`
  };
  
  document.getElementById('offlineRooms').querySelector("ul").innerHTML = "";
  document.getElementById('offlineRooms').className = "hidden";
  
		
  // For some reason, Laser room always returns "reset":false, no matter what the actual status is, so removing this ping for now
  /*try {
        let verlaagdeInfo = await axios(LaserConfig);
		
		  if(verlaagdeInfo.data.reset == true){
			let button = document.getElementById('laserRoomReset');
			button.innerHTML = "Room in Reset Mode";
			button.classList.remove("example_a");
			button.classList.add("example_b");
			verlaagdeReset = true;
		  }else{
			let button = document.getElementById('laserRoomReset');
			button.innerHTML = "Room Active";
			button.classList.remove("example_b");
			button.classList.add("example_a");
			verlaagdeReset = false;
		  }
    } catch (err) {
        console.error(err);
			let button = document.getElementById('laserRoomReset');
			button.innerHTML = "Room is OFFLINE";
			button.classList.remove("example_a");
			button.classList.add("example_b");
		let li = document.createElement('li');
		li.appendChild(document.createTextNode("Laser Room is OFFLINE"));
		document.getElementById('offlineRooms').querySelector("ul").appendChild(li);
		document.getElementById('offlineRooms').classList.remove("hidden");
    }*/
	
	rooms.forEach(async function (room, index) {
		try {
		  let url = room.IP + `/status`;
		  if(!room.newPi){
			  url = room.IP + `/Status`;
		  }
		  let roomInfo = await axios({
			method: 'get',
			url: url
		  });
		  // For some reason, laser room status always returns reset true
		  if(room.name != "laserRoom"){
			  // Room reset status
			  if(roomInfo.data.roomreset == true || roomInfo.data.reset == true){
				room.reset = true;
				let button = document.getElementById(room.name + 'Reset');
				if(button){
					button.innerHTML = "Room in Reset Mode";
					button.classList.remove("example_a");
					button.classList.add("example_b");
				}
			  }else{
				room.reset = false;
				let button = document.getElementById(room.name + 'Reset');
				if(button){
					button.innerHTML = "Room Active";
					button.classList.remove("example_b");
					button.classList.add("example_a");
				}
			  }
		  }
		  // Door status
		  if(roomInfo.data.relay_state == 1){
		    let button = document.getElementById(room.name + 'Door');
			if(button){
				button.innerHTML = "Door is closed";
				button.classList.remove("example_a");
				button.classList.add("example_b");
			}
		  }else{
		    let button = document.getElementById(room.name + 'Door');
			if(button){
				button.innerHTML = "Door is open";
				button.classList.remove("example_b");
				button.classList.add("example_a");
			}
		  }
		  // Briefing status text
		  if(roomInfo.data.roomStarted == true){
			let button = document.getElementById(room.name + 'Briefing');
			if(button){
				button.setAttribute("title", "Briefing has already played");
			}
		  }else{
			let button = document.getElementById(room.name + 'Briefing');
			if(button){
				button.setAttribute("title", "Briefing has not yet played");
			}
		  }
		  // Open the door if the Room is in Reset but for some reason the door is still closed
		  if(room.newPi && roomInfo.data.roomreset == true && roomInfo.data.relay_state == 1 && room.name != "bombRoom"){
			  toggleDoor(index);
		  }
		  
		  // Dining Room
		  if(room.name == "diningRoom"){
			  // Chairs motion sensor on/off status
			  if(roomInfo.data.sensor_triggers_enabled == false){
				let button = document.getElementById('diningRoomVoices');
				button.innerHTML = "Motion sensor off";
				button.classList.remove("example_a");
				button.classList.add("example_b");
				diningVoices = false;
			  }else{
				let button = document.getElementById('diningRoomVoices');
				button.innerHTML = "Motion sensor on ";
				button.classList.remove("example_b");
				button.classList.add("example_a");
				diningVoices = true;
			  }
		  }
		  
		  // Vladimir
		  if(room.name == "vladimir"){
			  // CPR overrule
			  if(roomInfo.data.cprOverule == false){
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
			  
			  // Team can/cannot fall back
			  if(roomInfo.data.fallbackOverrule == false){
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
		  }
			
		} catch (err) {
			console.error(err);
			let button = document.getElementById(room.name + 'Reset');
			if(button){
				button.innerHTML = "Room is OFFLINE";
				button.classList.remove("example_a");
				button.classList.add("example_b");
			}
			let li = document.createElement('li');
			li.appendChild(document.createTextNode(room.name + " is OFFLINE"));
			document.getElementById('offlineRooms').querySelector("ul").appendChild(li);
			document.getElementById('offlineRooms').classList.remove("hidden");
		} 
	});
	
	
    // Verlaagde kamer
	/*try {
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
			let button = document.getElementById('resetVerlaagdeButton');
			button.innerHTML = "Room is OFFLINE";
			button.classList.remove("example_a");
			button.classList.add("example_b");
		let li = document.createElement('li');
		li.appendChild(document.createTextNode("Verlaagde kamer is OFFLINE"));
		document.getElementById('offlineRooms').querySelector("ul").appendChild(li);
		document.getElementById('offlineRooms').classList.remove("hidden");
    }*/
	
	// Dining Room
	/*try {
        let diningResult = await axios(diningConfig);
		  // Room reset status
		  if(diningResult.data.roomreset == true){
			let button = document.getElementById('diningRoomReset');
			button.innerHTML = "Room in Reset Mode";
			button.classList.remove("example_a");
			button.classList.add("example_b");
			diningReset = true;
		  }else{
			let button = document.getElementById('diningRoomReset');
			button.innerHTML = "Room Active";
			button.classList.remove("example_b");
			button.classList.add("example_a");
			diningReset = false;
		  }
		  // Door status
		  if(diningResult.data.relay_state == 1){
			let button = document.getElementById('diningDoor');
			button.innerHTML = "Door is closed";
			button.classList.remove("example_a");
			button.classList.add("example_b");
		  }else{
			let button = document.getElementById('diningDoor');
			button.innerHTML = "Door is open";
			button.classList.remove("example_b");
			button.classList.add("example_a");
		  }
		  // Chairs motion sensor on/off status
		  if(diningResult.data.sensor_triggers_enabled == false){
			let button = document.getElementById('diningRoomVoices');
			button.innerHTML = "Motion sensor off";
			button.classList.remove("example_a");
			button.classList.add("example_b");
			diningVoices = false;
		  }else{
			let button = document.getElementById('diningRoomVoices');
			button.innerHTML = "Motion sensor on ";
			button.classList.remove("example_b");
			button.classList.add("example_a");
			diningVoices = true;
		  }
		  // Briefing status text
		  if(diningResult.data.roomStarted == false){
			let button = document.getElementById('diningRoomBriefing');
			button.setAttribute("title", "Briefing has not yet played");
		  }else{
			let button = document.getElementById('diningRoomBriefing');
			button.setAttribute("title", "Briefing has already played");
		  }
		  // Open the door if the Room is in Reset but for some reason the door is still closed
		  if(diningResult.data.roomreset == true && diningResult.data.relay_state == 1){
			  toggleDiningDoor();
		  }
		
    } catch (err) {
        console.error(err);
		let button = document.getElementById('diningRoomReset');
		button.innerHTML = "Room is OFFLINE";
		button.classList.remove("example_a");
		button.classList.add("example_b");
		let li = document.createElement('li');
		li.appendChild(document.createTextNode("Dining Room is OFFLINE"));
		document.getElementById('offlineRooms').querySelector("ul").appendChild(li);
		document.getElementById('offlineRooms').classList.remove("hidden");
    } */
	
	// Drugslab
	/*try {
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
		let button = document.getElementById('resetDrugsButton');
		button.innerHTML = "Room is OFFLINE";
		button.classList.remove("example_a");
		button.classList.add("example_b");
		let li = document.createElement('li');
		li.appendChild(document.createTextNode("Drugslab is OFFLINE"));
		document.getElementById('offlineRooms').querySelector("ul").appendChild(li);
		document.getElementById('offlineRooms').classList.remove("hidden");
    }*/
	
	// Vladimir room
	/*try {
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
		  
		  // CPR overrule
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
		  
		  // Team can/cannot fall back
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
			let button = document.getElementById('resetVladButton');
			button.innerHTML = "Room is OFFLINE";
			button.classList.remove("example_a");
			button.classList.add("example_b");
		let li = document.createElement('li');
		li.appendChild(document.createTextNode("Vladimir Room is OFFLINE"));
		document.getElementById('offlineRooms').querySelector("ul").appendChild(li);
		document.getElementById('offlineRooms').classList.remove("hidden");
    }*/
	
  // Vladimir Door
  try {
	  var doorStatus = "OFFLINE";
      const doorConfig = {
          method: 'get',
          url: `http://192.168.0.114/Status`
      };
      let resDoor = await axios(doorConfig)
	  switch(resDoor.data.DoorState){
		  case true:
			doorStatus = "open";
			document.getElementById('toggleVladDoor').className = "example_a";
		  break;
		  case false:
			doorStatus = "closed";
			document.getElementById('toggleVladDoor').className = "example_b";
		  break;
	  }
      document.getElementById('toggleVladDoor').textContent = "Door is " + doorStatus;
	  
    } catch (err) {
        console.error(err);
		let li = document.createElement('li');
		li.appendChild(document.createTextNode("Vladimir deur is OFFLINE"));
		document.getElementById('offlineRooms').querySelector("ul").appendChild(li);
		document.getElementById('offlineRooms').classList.remove("hidden");
    }
	
	
	
	// Bomb Room
	/*try {
        let bombInfo = await axios(BombConfig);
		
		  if(bombInfo.data.roomreset == true){
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
		  if(bombInfo.data.roomStarted == false){
			let button = document.getElementById('bomRoomBriefing');
			button.setAttribute("title", "Briefing has not yet played");
		  }else{
			let button = document.getElementById('bomRoomBriefing');
			button.setAttribute("title", "Briefing has already played");
		  }
    } catch (err) {
        console.error(err);
			let button = document.getElementById('resetBomButton');
			button.innerHTML = "Room is OFFLINE";
			button.classList.remove("example_a");
			button.classList.add("example_b");
		let li = document.createElement('li');
		li.appendChild(document.createTextNode("Bomb Room is OFFLINE"));
		document.getElementById('offlineRooms').querySelector("ul").appendChild(li);
		document.getElementById('offlineRooms').classList.remove("hidden");
    }*/
	
	
  
  //console.log(JSON.stringify(ressmokePwr));
  smokePowerStatus = ressmokePwr.data.state.on;
  

  // Dining Room lights
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
  
  
  
  
  // Laser room smoke machine
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
  
  // Vladimir reuk
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
  
  




},pingTimer);

// Manual Bomb Room power reboot (not the same as room reset), no longer in use
/*function rebootBombRoom(){
	document.getElementById('rebootBombRoom').innerHTML = "Rebooting...";
	turnLightOnOrOffTwo(49, false);
	
	setTimeout(function() {
		turnLightOnOrOffTwo(49, true);
		
		setTimeout(function() {
			document.getElementById('rebootBombRoom').innerHTML = "Reboot bomb room";
		}, 8000);
	}, 8000);

}*/

function resetAll(mode){
	firstReset = mode;
	verlaagdeReset = mode;
	drugsReset = mode;
	diningReset = mode;
	laserReset = mode;
	vladreset = mode;
	boxReset = mode;
	darkReset = mode;
	bombReset = mode;
	//rebootFirst();
	//rebootVerlaagde();
	//rebootDrugs();
	//toggleDiningRoom();
	//rebootLaser();
	//rebootVlad();
	//rebootBox();
	rebootDarkRoom();
	//rebootBom();
	
	for (let i = 0; i < rooms.length; i++) {
		rooms[i].reset = mode;
		resetRoom(i+1);
	}
}

function setLanguage(language){
	document.querySelectorAll('.languagebutton').forEach(e => e.classList.replace('example_a', 'example_b'))
	
    let button = document.getElementById(language.toLowerCase());
    button.classList.remove("example_b");
    button.classList.add("example_a");
	
	// For the new pi's
	var piLanguage = language.toLowerCase();
	if(language == "Nederlands"){
		piLanguage = "default";
	}
	rooms.forEach(async function (room) {
		if(room.newPi){
			if(piLanguage == "kids" && room.name != "diningRoom"){ // Only dining room has a kids version atm
				sendPiMessage(room.IP + '/set_language', {'language': "default"});
			}else{
				sendPiMessage(room.IP + '/set_language', {'language': piLanguage});
			}
		}
	});
	
	// For the old rooms
	if(language == "kids"){
		language = "Nederlands";
	}
	sendMessage(`http://192.168.0.145/` + language); // Verlaagde kamer
	sendMessage(`http://192.168.0.158/updates?value=` + language); // Laser room
	sendMessage(`http://192.168.0.246/update?value=` + language); // Vladimir
	sendMessage(`http://192.168.0.107/updates?value=` + language); // Box room
	sendMessage(`http://192.168.0.162/updatess?value=` + language); // Box
	sendMessage(`http://192.168.0.184/update?value=` + language); // Dark room
}

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
