/**
 * Created by igor on 28.09.16.
 */

"use strict";

var setDraw = function() {
    var render = new Render();
    var audio = document.getElementById('remoteVideoLeft');
    var audioCtx = new AudioContext();
    var analyser = audioCtx.createAnalyser();
    var source = audioCtx.createMediaStreamSource(audio.srcObject);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = 64;
    var frequencyData = new Uint8Array(analyser.frequencyBinCount);
    render.init({
        count: analyser.frequencyBinCount,
        width: 360,
        height: 360
    });

    var renderFrame = function() {
        analyser.getByteFrequencyData(frequencyData);
        render.renderFrame(frequencyData);
        requestAnimationFrame(renderFrame);
    };

    renderFrame();
};

setTimeout(setDraw, 10000);

var Render = function() {
    var barsArr = [], initialized = false, barsEl;
    var height = 0;
    var init = function(config) {
            var count = config.count;
            var width = config.width;
            var barWidth = (width / count) >> 0;
            height = config.height;
            barsEl = document.getElementById('bars');
            for (var i = 0; i < count; i++) {
                var nunode = document.createElement('div');
                nunode.classList.add('bar');
                nunode.style.width = barWidth + 'px';
                nunode.style.left = (barWidth * i) + 'px';
                barsArr.push(nunode);
                barsEl.appendChild(nunode);
            }
            initialized = true;
        }
        ;
    var max = 256;
    var renderFrame = function(frequencyData) {
            for (var i = 0; i < barsArr.length; i++) {
                var bar = barsArr[i];
                bar.style.height = ((frequencyData[i] / max) * height + 'px');
            }
        }
        ;
    return {
        init: init,
        renderFrame: renderFrame
    }
};