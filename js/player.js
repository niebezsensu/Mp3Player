$(document).ready(function () {
    //your code here
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var audio = new Audio(),
        context = new AudioContext(),
        panner = context.createPanner(),
        onError = function (e) {
            console.log('There was an error!! ', e);
        },
        source;
//  set up audio graph
    audio.src = "music/greenday.mp3";
    source = context.createMediaElementSource(audio);
    context.listener.setPosition(0, 0, 0);
    panner.setPosition(0, 0, 1);
    panner.panningModel = 'equalpower';
    source.connect(panner);
    panner.connect(context.destination);

    var samples = 32;

    //create fft
    fft = context.createAnalyser();
    fft.fftSize = samples;

    var setup = false;

    //connect them up into a chain
    source.connect(fft);
    fft.connect(context.destination);

    var gfx;
    function setupCanvas() {
        var canvas = document.getElementById('canvas');
        gfx = canvas.getContext('2d');
        webkitRequestAnimationFrame(update);
    }

    function update() {
        webkitRequestAnimationFrame(update);
        if(!setup) return;
        gfx.clearRect(0,0,340,100);
        gfx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        gfx.fillRect(0,0,340,100);

        var data = new Uint8Array(samples);
        fft.getByteFrequencyData(data);
        gfx.fillStyle = 'hsla(200, 20%, 40%, 0.6)';
        for(var i=0; i<data.length; i++) {
            //trzeci parametr to grubosc paskow dlugosc
            gfx.fillRect(i*15,100+128-data[i],12,75);
        }

    }

//playing or pausing
    $("#button").click(function () {

        if (source.mediaElement.paused) {
            source.mediaElement.play();
            //renderFrame();

        } else {
            source.mediaElement.pause();
        }
    });

//  2D Panning

    $("#pan").change(function() {
        var x = document.getElementById('pan').valueAsNumber,
            y = 0,
            z = 1 - Math.abs(x),
            parent = this.parentNode;
        console.log(x, y, z);
        panner.setPosition(x, y, z);
        //  update labels
    });

    $("#volume").change(function() {
        source.mediaElement.volume = this.value;
    });



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

    playMusic(title);


}

function playMusic(titl){
	console.log("czy amelia: "+(titl == "Amelie"));
	console.log("czy betw: "+(titl == "Between Us"));
	console.log("czy Lily & Madeleine: "+(titl == "Lily & Madeleine"));
	switch(titl){
		case "Amelie": audio.src = "music/amelie.mp3"; console.log("podstawione"); break;
		case "Between Us": audio.src = "music/bridge.mp3"; break;
		case "The Assassination of Jesse James": audio.src = "music/jesse.mp3"; break;
		case "Lily & Madeleine": audio.src = "music/sea.mp3"; break;
		case "The Lumineers": audio.src = "music/stub.mp3"; break;
		case "...And Then We Saw Land": audio.src = "music/hustle.mp3"; break;
		default: break;
	}

	source.mediaElement.load();
    source.mediaElement.play();
    setup = true;
    setupCanvas();

}

 });




