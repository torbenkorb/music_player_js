

function Playlist() {
	this.songs = [];
	this.nowPlayingIndex = 0;
}

Playlist.prototype.add = function(song) {
	this.songs.push(song);
};

Playlist.prototype.play = function() {
	var currentSong = this.songs[this.nowPlayingIndex];
	currentSong.play();
};

Playlist.prototype.stop = function() {
	var currentSong = this.songs[this.nowPlayingIndex];
	currentSong.stop();
};

Playlist.prototype.next = function() {
	this.stop();
	this.nowPlayingIndex++;
	if(this.nowPlayingIndex === this.songs.length) {
		this.nowPlayingIndex = 0;
	}
	this.play();
};

Playlist.prototype.renderInElement = function(list) {
	list.innerHTML = "";
	for(var i = 0; i < this.songs.length; i++) {
		list.innerHTML += this.songs[i].toHTML();
	}
};






function Media(title, duration) {
	this.title = title;
	this.duration = duration;
	this.isPlaying = false;
}


Media.prototype.play = function() {
	this.isPlaying = true;
};

Media.prototype.stop = function() {
	this.isPlaying = false;
};






function Song(title, artist, duration) {
	Media.call(this, title, duration);
	this.artist = artist;
}

Song.prototype = Object.create(Media.prototype);


Song.prototype.toHTML = function() {
	var htmlString = '<li';
	if (this.isPlaying) {
		htmlString += ' class="current"';
	}
	htmlString += '>';
	htmlString += this.title;
	htmlString += ' - ';
	htmlString += this.artist;
	htmlString += ' <span class="duration">';
	htmlString += this.duration;
	htmlString += '</span></li>';
	return htmlString;
};







function Movie(title, year, duration) {
	Media.call(this, title, duration);
	this.year = year;
}

Movie.prototype = Object.create(Media.prototype);


Movie.prototype.toHTML = function() {
	var htmlString = '<li';
	if (this.isPlaying) {
		htmlString += ' class="current"';
	}
	htmlString += '>';
	htmlString += this.title;
	htmlString += ' (';
	htmlString += this.year;
	htmlString += ') ';
	htmlString += ' <span class="duration">';
	htmlString += this.duration;
	htmlString += '</span></li>';
	return htmlString;
};









var playlist = new Playlist();

var hereComesTheSun = new Song("Here comes the Sun", "The Beatles", "2:54");
var allAlongTheWatchtower = new Song("All Along The Watchtower", "Jimi Hendrix", "4:50");
var tobaccoRoad = new Song("Tobacco Road", "Nashville Teens", "3:51")
var amazingGrace = new Song("Amazing Grace", "Traditional", "6:35")
var planetApe = new Movie("Planet of The Apes", "1981", "1:15:41")

playlist.add(hereComesTheSun);
playlist.add(allAlongTheWatchtower);
playlist.add(tobaccoRoad);
playlist.add(amazingGrace);
playlist.add(planetApe);

var playlistElement = document.getElementById("playlist");

playlist.renderInElement(playlistElement);

var playButton = document.getElementById("play");
playButton.onclick = function() {
	playlist.play();
	playlist.renderInElement(playlistElement);
}
var nextButton = document.getElementById("next");
nextButton.onclick = function() {
	playlist.next();
	playlist.renderInElement(playlistElement);
}
var stopButton = document.getElementById("stop");
stopButton.onclick = function() {
	playlist.stop();
	playlist.renderInElement(playlistElement);
}






























