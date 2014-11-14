
function playSong(nr){
	var title = " ";
	switch(nr){
		case 1: title = "Amelie";
				break;
		case 2: title = "Between Us";
				break;
		case 3: title = "The Assassination of Jesse James";
				break;
		case 4: title = "Lily & Madeleine";
				break;
		case 5: title = "The Lumineers";
				break;
		case 6: title = "...And Then We Saw Land";
				break;

		default: break;
	}

	var tit = document.getElementById("title");
	tit.innerHTML = title;
}


var al1 = document.getElementById('alb1');
al1.addEventListener('click', function(){moveTo(al1)}, false); 

var al2 = document.getElementById('alb2');
al2.addEventListener('click', function(){moveTo(al2)}, false); 

var al3 = document.getElementById('alb3');
al3.addEventListener('click', function(){moveTo(al3)}, false); 

var al4 = document.getElementById('alb4');
al4.addEventListener('click', function(){moveTo(al4)}, false); 

var al5 = document.getElementById('alb5');
al5.addEventListener('click', function(){moveTo(al5)}, false); 

var al6 = document.getElementById('alb6');
al6.addEventListener('click', function(){moveTo(al6)}, false); 

var current = null;
var currTop = 0;
var currLeft = 0;

var title = " ";

function moveTo(el){
	var pholder = document.getElementById('img-placeholder');

	if(current != null){
		current.style.marginLeft = currLeft + 'px';
    	current.style.marginTop = currTop + 'px';

    	current.style.width = '160px';
    	current.style.height = '160px';
    	current.style['opacity'] = '0.6';
    	current.style['z-index'] = '0';
	}

    el.style.marginLeft = pholder.offsetLeft + 'px';
    el.style.marginTop = pholder.offsetTop + 'px';

    el.style.width = pholder.offsetWidth + 'px';
    el.style.height = pholder.offsetHeight + 'px';

    el.style['opacity'] = '1';
    el.style['z-index'] = '1';

    title = el.alt;
    var tit = document.getElementById("title");
	tit.innerHTML = title;

    current = el;
    currTop = el.offsetTop;
    currLeft = el.offsetLeft;

}

function moveToPh(nr){
	var newParent = document.getElementById('img-placeholder');
	var contAll = document.getElementById('im-list');

	switch(nr){
		//case 1: elem = "alb1";
				//break;
		case 2: elem = "alb2";
				break;
		case 3: elem = "alb3";
				break;
		case 4: elem = "alb4";
				break;
		case 5: elem = "alb5";
				break;
		case 6: elem = "alb6";
				break;
	}	
	var elem = document.getElementById(elem);
	var prev = newParent.firstElementChild;

	elem.style.width = "400px";
	elem.style.height = "400px";

	prev.style.width = "160px";
	prev.style.height = "160px";

	console.log("nazwa: "+prev.getAttribute('id'));

	if(prev.getAttribute('id') == "ph"){
		newParent.removeChild(prev);
	}else{
		contAll.appendChild(prev);
	}

	newParent.appendChild(elem);
	//newParent.insertBefore(elem, newParent.firstChild);
	
}

function playAndMove(nr){
	playSong(nr);
	moveToPh(nr);
}

//----------------------



//----------------

var music = document.getElementById('music'); // id for audio element
var duration; // Duration of audio clip
var pButton = document.getElementById('pButton'); // play button

var playhead = document.getElementById('playhead'); // playhead

var timeline = document.getElementById('timeline'); // timeline
// timeline width adjusted for playhead
var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

// timeupdate event listener
music.addEventListener("timeupdate", timeUpdate, false);

//Makes timeline clickable
timeline.addEventListener("click", function (event) {
	moveplayhead(event);
	music.currentTime = duration * clickPercent(event);
}, false);

// returns click as decimal (.77) of the total timelineWidth
function clickPercent(e) {
	return (event.pageX - timeline.offsetLeft) / timelineWidth;
}

// Makes playhead draggable 
playhead.addEventListener('mousedown', mouseDown, false);
window.addEventListener('mouseup', mouseUp, false);

// Boolean value so that mouse is moved on mouseUp only when the playhead is released 
var onplayhead = false;
// mouseDown EventListener
function mouseDown() {
	onplayhead = true;
	window.addEventListener('mousemove', moveplayhead, true);
	music.removeEventListener('timeupdate', timeUpdate, false);
}
// mouseUp EventListener
// getting input from all mouse clicks
function mouseUp(e) {
	if (onplayhead == true) {
		moveplayhead(e);
		window.removeEventListener('mousemove', moveplayhead, true);
		// change current time
		music.currentTime = duration * clickPercent(e);
		music.addEventListener('timeupdate', timeUpdate, false);
	}
	onplayhead = false;
}
// mousemove EventListener
// Moves playhead as user drags
function moveplayhead(e) {
	var newMargLeft = e.pageX - timeline.offsetLeft;
	if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
		playhead.style.marginLeft = newMargLeft + "px";
	}
	if (newMargLeft < 0) {
		playhead.style.marginLeft = "0px";
	}
	if (newMargLeft > timelineWidth) {
		playhead.style.marginLeft = timelineWidth + "px";
	}
}

// timeUpdate 
// Synchronizes playhead position with current point in audio 
function timeUpdate() {
	var playPercent = timelineWidth * (music.currentTime / duration);
	playhead.style.marginLeft = playPercent + "px";
	if (music.currentTime == duration) {
		pButton.className = "";
		pButton.className = "play";
	}
}

//Play and Pause
function play() {
	// start music
	if (music.paused) {
		music.play();
		// remove play, add pause
		pButton.className = "";
		pButton.className = "pause";
	} else { // pause music
		music.pause();
		// remove pause, add play
		pButton.className = "";
		pButton.className = "play";
	}
}

// Gets audio file duration
music.addEventListener("canplaythrough", function () {
	duration = music.duration;  
}, false);


