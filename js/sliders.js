        const PATH = 'music/',
              SOUNDS = ['greenday'];
        var myAudioContext, myAudioAnalyser,
            myBuffers = {}, mySource,
            myNodes = {},   mySpectrum, audio, source
            isPlaying = false;
 
        function init() {
            if('webkitAudioContext' in window) {
                myAudioContext = new webkitAudioContext();
                audio = new Audio();
                audio.src = "music/greenday.mp3";
                source = myAudioContext.createMediaElementSource(audio);
                // an analyser is used for the spectrum
                myAudioAnalyser = myAudioContext.createAnalyser();
                myAudioAnalyser.smoothingTimeConstant = 0.85;
                myAudioAnalyser.connect(myAudioContext.destination);
 
                fetchSounds();
            }
        }
 
        function fetchSounds() {
            //var request = new XMLHttpRequest();
            for (var i = 0, len = SOUNDS.length; i < len; i++) {
             //   request = new XMLHttpRequest();
                // the underscore prefix is a common naming convention
                // to remind us that the variable is developer-supplied



                // request._soundName = SOUNDS[i];
                // request.open('GET', PATH + request._soundName + '.mp3', true);
                // request.responseType = 'arraybuffer';
                // request.addEventListener('load', bufferSound, false);
                // request.send();
            }
            bufferSound();
        }
 
        function bufferSound() {
            //var request = event.target;
            //var buffer = myAudioContext.createMediaElementSource(document.getElementById('music'));

            //myAudioContext.createBuffer(request.response, false);
            myBuffers[0] = source;
            console.log("dlugosc: "+myBuffers.length);
        }
 
        function selectRandomBuffer() {
            var rand = Math.floor(Math.random() * SOUNDS.length);
            var soundName = SOUNDS[rand];

            //var buffer = myAudioContext.createMediaElementSource(document.getElementById('music'));
            return source;
        }
 
        function routeSound(source) {
            myNodes.filter = myAudioContext.createBiquadFilter();
            myNodes.panner = myAudioContext.createPanner();
            myNodes.volume = myAudioContext.createGainNode();
            // var compressor = myAudioContext.createDynamicsCompressor();
 
            // set node values to current slider values
            //var highpass = document.querySelector('#highpass').value;
            var panX = document.querySelector('#pan').value;
            var volume = document.querySelector('#volume').value;
 
            //myNodes.filter.type = 1; // highpass
            //myNodes.filter.frequency.value = highpass;
            myNodes.panner.setPosition(panX, 0, 0);
            myNodes.volume.gain.value = volume;
 
            // pass source through series of nodes
            source.connect(myNodes.filter);
            myNodes.filter.connect(myNodes.panner);
            myNodes.panner.connect(myNodes.volume);
            myNodes.volume.connect(myAudioAnalyser);
 
            return source;
        }
 
        function playSound() {
            // create a new AudioBufferSourceNode
            //var source = myAudioContext.createBufferSource();
            source = myAudioContext.createMediaElementSource(audio);
            source.buffer = selectRandomBuffer();
            source.loop = true;
            source = routeSound(source);
            // play right now (0 seconds from now)
            // can also pass myAudioContext.currentTime
            source.noteOn(0);
            mySpectrum = setInterval(drawSpectrum, 30);
            mySource = source;
        }
 
        function pauseSound() {
            var source = mySource;
            source.noteOff(0);
            clearInterval(mySpectrum);
        }
 
        function toggleSound(button) {

            // start music
            // if (music.paused) {
            //     music.play();
            //     // remove play, add pause
            //     pButton.className = "";
            //     pButton.className = "pause";
            // } else { // pause music
            //     music.pause();
            //     // remove pause, add play
            //     pButton.className = "";
            //     pButton.className = "play";
            // }

            if(!isPlaying) {
                playSound();
                button.value = "Pause sound";
                isPlaying = true;
            }
            else {
                pauseSound();
                button.value = "Play random sound";
                isPlaying = false;
            }
        }
 
        function drawSpectrum() {
            var canvas = document.querySelector('canvas');
            var ctx = canvas.getContext('2d');
            var width = canvas.width;
            var height = canvas.height;
            var bar_width = 10;
 
            ctx.clearRect(0, 0, width, height);
 
            var freqByteData = new Uint8Array(myAudioAnalyser.frequencyBinCount);
            myAudioAnalyser.getByteFrequencyData(freqByteData);
 
            var barCount = Math.round(width / bar_width);
            for (var i = 0; i < barCount; i++) {
                var magnitude = freqByteData[i];
                // some values need adjusting to fit on the canvas
                ctx.fillRect(bar_width * i, height, bar_width - 2, -magnitude + 60);
            }
        }
 
        function sliderChange(slider) {
            if(myAudioContext.activeSourceCount > 0) {
                // if(slider.id == 'highpass') {
                //     var highpass = slider.value;
                //     myNodes.filter.frequency.value = highpass;
                // }
                // else 
                    if(slider.id == 'pan') {
                    var panX = slider.value;
                    myNodes.panner.setPosition(panX, 0, 0);
                }
                else if(slider.id == 'volume') {
                    var volume = slider.value;
                    myNodes.volume.gain.value = volume;
                }
            }
        }