$("#search").on('click', function () {
	const APIKEY = "";
	var city = $("#city").val();
	console.log(city);
	var url = 'http://api.openweathermap.org/data/2.5/weather';
	$.ajax({
		url: url,
		data: "q=" + city + "&lang=jp" + "&units=metric" + "&appid=" + APIKEY,
		datatype: "html",
		type: 'GET',
	})
	.done(function(data) {
		$("#info").html("体感温度: " + Math.round(data.main.feels_like) + "℃");
		console.log("成功しました。");
	})
	.fail(function(data) {
		console.log("失敗しました。");
	});
});
