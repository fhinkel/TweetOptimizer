var socket = io();

var emitCurrentTweet = function () {
    console.log('tweet: ' + $("#input").val());
    socket.emit('tweet', $('#input').val());
};

var $feed = $('#feed-container');
var renderOptimization = function (data, templateId) {    
    var source   = $(templateId).html();
    var template = Handlebars.compile(source);
    $feed.append(template(data));
};

var updateCharCount = function (c) {
    var MAX_CHARS = 140;
    $('#curr-character-count').html(MAX_CHARS - c);
};

$(document).ready(function () {

    // render a testItem
    // renderOptimization({
    //     originalHashtag: 'Peter',
    //     newHashtag: 'Hans',
    // }, '#template');

    $('#input').keyup(function (e) {
        updateCharCount(e.target.value.length);

        // 13: enter, 32: spacebar
        if (e.keyCode === 13 || e.keyCode === 32) {
            emitCurrentTweet();
        }
    });

    socket.on('tweet analysis', function (data) {
        console.log(data);
        var result = JSON.parse(data);
        for (var i = result.length - 1; i >= 0; i--) {
            result[i]
        };
        // for (var hashtag in result) {
        //     if (result.hasOwnProperty(hashtag)) {
        //         $('body').append('<br>');
        //         $('body').append(hashtag + '<br>');
        //         $('body').append('trenddata:' + result.burda.trend.toString() + '<br>');
        //     }
        // }
    });

    socket.on('bunte', function(headline) {
        console.log('Bunte Article: ' + headline);
    })
});

window.addEventListener('scroll', function() {
    var offset = window.pageYOffset;
    var $headerSmall = $('header.small');
    if (offset > 60) {
        // $headerExpanded.hide();
        $headerSmall.show();
    } else {
        // $headerExpanded.show();
        $headerSmall.hide();
    }
});
