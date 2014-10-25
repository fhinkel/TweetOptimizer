var socket = io();

var emitCurrentTweet = function () {
    console.log('tweet: ' + $("#input").val());
    socket.emit('tweet', $('#input').val());
}

var updateCharCount = function () {
    $('#character-count').html(e.target.value.length);
}

$(document).ready(function () {
    var feed = $('#feed-container');

    var createFeedItem = function (className, $contentDiv) {
        var $baseItem = $('<div/>')
            .addClass('col-sm-6');
        var $container = $('<div/>')
            .addClass('optimization')
            .addClass(className)
            .appendTo($baseItem);
        var $row = $('<div/>')
            .addClass('row')
            .appendTo($container);
        $contentDiv
            .addClass('col-xs-9')
            .appendTo($row);
        var $apply = $('<div/>')
            .addClass('col-xs-3')
            .html('<button class="btn btn-primary pull-right"><span class="glyphicon glyphicon-ok"></span></button>')
            .appendTo($row);
        return $baseItem;
    }

    var $test = createFeedItem('optimization-hashtag', $('<div/>').text('test'));
    feed.append($test);

    $('#input').keyup(function (e) {
        updateCharCount();

        // 13: enter, 32: spacebar
        if (e.keyCode === 13 || e.keyCode === 32) {
            emitCurrentTweet();
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
    if (offset > 50) {
        // $headerExpanded.hide();
        $headerSmall.show();
    } else {
        // $headerExpanded.show();
        $headerSmall.hide();
    }
});
