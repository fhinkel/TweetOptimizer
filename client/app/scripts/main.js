$(document).ready(function () {
    console.log('helloo');

    $('#input').keyup(function (e) {
        $('#character-count').html(e.target.value.length);
    });
    var socket = io();
    $('#input').keyup(function (e) {
        if(e.keyCode == 13) {
            console.log('tweet: ' + $("#input").val());
            socket.emit('tweet', $('#input').val());
        }
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

window.addEventListener('scroll', function(e) {
    var offset = window.pageYOffset;
    var $headerExpanded = $('header.expanded');
    var $headerSmall = $('header.small');
    if (offset > 40) {
        $headerExpanded.hide();
        $headerSmall.show();
    } else {
        $headerExpanded.show();
        $headerSmall.hide();
    }
});
