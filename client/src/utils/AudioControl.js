let $ = require('jquery');

class AudioControl {

    constructor(selector) {
        this.element = $(selector);
        if (!this.element) throw new Error("Couldn't retrieve element with selector: " + selector);
        this.domElement = this.element[0];
        this.playList = null;
    }

    setPlayList(arrayOfURLs) {
        this.playList = arrayOfURLs;
    }

    playRandomSong() {
        if (!this.playList) throw new Error("playList not set!");

        this.element.attr("src", this.playList[Math.floor(Math.random() * (this.playList.length))]);

        this.resetSpeed();

        this.domElement.play();
    }

    stop() {
        this.domElement.pause();
    }
}

export default AudioControl;