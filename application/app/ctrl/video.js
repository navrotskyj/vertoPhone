/**
 * Created by igor on 29.09.16.
 */

"use strict";
    
function fullScreen() {
    document.getElementById(this.name).webkitEnterFullscreen();
}

for (let btn of document.getElementsByClassName('f-screen-btn')) {
    btn.addEventListener('click', fullScreen);
}