var socket = io();

var emitCurrentTweet = function () {
    socket.emit('tweet', $('#input').val());
};

var $feed = $('#feed-container');
var renderRelatedTags = function (data) {
    var source = $('#template-related-tags').html();
    var template = Handlebars.compile(source);
    console.log(data);
    console.log(data.hashTag, data.related);
    $feed.append(template({
        hashtag: data.hashTag,
        related: data.related
    }));
};
var renderRelatedUsers = function (data) {
    var source = $('#template-related-users').html();
    var template = Handlebars.compile(source);
    console.log(data);
    console.log(data.hashTag, data.related);
    $feed.append(template({
        hashtag: data.hashTag,
        related: data.related
    }));
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
        if (e.keyCode === 13 || e.keyCode === 32) {
            emitCurrentTweet();
        }
    });

    socket.on('related users', function (data) {
        console.log('we received related users:' + data);
        var result = JSON.parse(data);
        renderRelatedUsers(result);
    });

    socket.on('related tags', function (data) {
        console.log('we received related tags: ' + data);
        var result = JSON.parse(data);
        renderRelatedTags(result);
    });

    socket.on('bunte', function (headline) {
        console.log('Bunte Article: ' + headline);
    })
});

window.addEventListener('scroll', function () {
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
