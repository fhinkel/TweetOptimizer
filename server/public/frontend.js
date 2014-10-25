$(document).ready(function () {
    console.log('hello tweet');
    var socket = io();

    $("#tweet").on('click', function (data) {
        console.log('tweet: ' + $("#input").val());
        socket.emit('tweet', $('#input').val());
    });

    socket.on('tweet analysis', function (data) {
        console.log('we received analysis: ' + data);
        var result = JSON.parse(data);
        for (var hashtag in result) {
            if (result.hasOwnProperty(hashtag)) {
                $('body').append('<br>');
                $('body').append(hashtag + '<br>');
                $('body').append('trenddata:' + result.burda.trend.toString() + '<br>');
            }
        }
    });
});