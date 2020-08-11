var player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		width: '640',
		height: '360',
		videoId: 'M7lc1UVf-VE',
		playerVars: {
			rel: 0,
			autoplay: 1
		},
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}

function onPlayerReady(event) {
	event.target.seekTo(0);
	event.target.playVideo();
}

var done = false;
function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING && !done) {
		done = true;
	}
}

$("#play").on('click', function () {
	player.playVideo();
});

$("#stop").on('click', function () {
	player.pauseVideo();
});

$("#question").on('click', function () {
	var message = "はてなボタンが押されました。";
	var time = Math.round(player.getCurrentTime());
	confirm(message + "\n現在時刻: " + time + "秒");
});

$("#understood").on('click', function () {
	var message = "分かったボタンが押されました。";
	var time = Math.round(player.getCurrentTime());
	confirm(message + "\n現在時刻: " + time + "秒");
});

$("#exclamation").on('click', function () {
	var message = "興味ありボタンが押されました。";
	var time = Math.round(player.getCurrentTime());
	confirm(message + "\n現在時刻: " + time + "秒");
});
