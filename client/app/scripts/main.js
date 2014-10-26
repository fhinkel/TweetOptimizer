var socket = io();

var emitCurrentTweet = function () {
    socket.emit('tweet', $('#input').val());
};

var $tweet = $('#input');
var $feed = $('#feed-container');
var renderRelatedTags = function (data) {
    // if we alrdy have it or got no content, bail.
    if ($("[data-related-tag='" + data.hashTag + "']").length ||
        (!data.related[0] && !data.related[1] && !data.related[2]) ) {
        return;
    }
    var source = $('#template-related-tags').html();
    var template = Handlebars.compile(source);

    var $newItem = $(template({
        hashtag: data.hashTag,
        related: data.related
    }));

    $newItem.find('.btn-replace').each(function (index) {
        $(this).click(function() {
            $tweet.val($tweet.val().replace(new RegExp(data.hashTag, 'g'), data.related[index].tag));
            $newItem.fadeOut(300, function() { $(this).remove(); });
        })
    });

    $newItem.find('.btn-add').each(function (index) {
        $(this).click(function() {
            $tweet.val($tweet.val() + ' ' + data.related[index].tag);
        })
    });

    $feed.prepend($newItem);
    // http://c3js.org/samples/chart_bar.html
    // get the dom node for c3
    var chartNode = $("[data-related-tag='" + data.hashTag + "'] .chart")[0] ;
    var chart = c3.generate({
        bindto: chartNode,
        color: { pattern: ['#f1716e', '#55acee', '#b9bb30'] },
        data: {
            columns: [
                [data.related[0].tag, 0],
                [data.related[1].tag, 0],
                [data.related[2].tag, 0]
            ],
            type: 'bar'
        },
        bar: {
            width: {
                ratio: 0.8
            }
        },
        padding: { left: 0, right: 0, top: 0, bottom: 0 },
        interaction: false,
        axis: {
            x: {
                tick: {
                    format: function(){return null;}
                }
            },
            y: {
                // label: 'Beliebtheit',
                tick: {
                    format: function(){return null;}
                }
            }
        },
        legend: {
            show: false
        },
        tooltip: {
            show: false
        },
        size: {
            height: 120
        },
        transition: {
            duration: 1000
        }
    });
    // load data with delay
    // to get bar chart animations for patrick
    setTimeout(function () {
        chart.load({
            columns: [
                [data.related[0].tag, data.related[0].confidence],
                [data.related[1].tag, data.related[1].confidence],
                [data.related[2].tag, data.related[2].confidence]
            ],
        });
    }, 1);
};

var renderRelatedUsers = function (data) {
    // if we alrdy have it or we got no content, bail.
    if ($("[data-related-user='" + data.hashTag + "']").length ||
        data.related.length !== 3) {
        return;
    }
    var source = $('#template-related-users').html();
    var template = Handlebars.compile(source);
    $feed.prepend(template({
        hashtag: data.hashTag,
        related: data.related
    }));
    // get the dom node for c3
    var chartNode = $("[data-related-user='" + data.hashTag + "'] .chart")[0] ;
    var chart = c3.generate({
        bindto: chartNode,
        color: { pattern: ['#f1716e', '#55acee', '#b9bb30'] },
        data: {
            columns: [
                [data.related[0].tag, 0],
                [data.related[1].tag, 0],
                [data.related[2].tag, 0]
            ],
            type: 'bar'
        },
        bar: {
            width: {
                ratio: 0.8
            }
        },
        padding: { left: 0, right: 0, top: 0, bottom: 0 },
        interaction: false,
        axis: {
            x: {
                tick: {
                    format: function(){return null;}
                }
            },
            y: {
                // label: 'Beliebtheit',
                tick: {
                    format: function(){return null;}
                }
            }
        },
        legend: {
            show: false
        },
        tooltip: {
            show: false
        },
        size: {
            height: 120
        },
        transition: {
            duration: 1000
        }
    });
    // load data with delay
    // to get bar chart animations for patrick
    setTimeout(function () {
        chart.load({
            columns: [
                [data.related[0].tag, data.related[0].confidence],
                [data.related[1].tag, data.related[1].confidence],
                [data.related[2].tag, data.related[2].confidence]
            ],
        });
    }, 1);
};

var renderRelatedWords = function (data) {
    // if we alrdy have it or we got no content, bail.
    if ($("[data-related-words='" + data.hashTag + "']").length ||
        data.related.length !== 3) {
        return;
    }
    var source = $('#template-related-words').html();
    var template = Handlebars.compile(source);
    $feed.prepend(template({
        hashtag: data.hashTag,
        related: data.related
    }));
    // get the dom node for c3
    var chartNode = $("[data-related-words='" + data.hashTag + "'] .chart")[0];
    WordCloud(chartNode, {
        list: [
            [data.related[0].tag, 80*data.related[0].confidence],
            [data.related[1].tag, 80*data.related[1].confidence],
            [data.related[2].tag, 80*data.related[2].confidence]
        ],
        fontWeight: 'bold'
    });
};


var renderBunteFeedItem = function (headlines) {
    var currBunteItem = $("#bunte-item");
    if (headlines && headlines.length > 0) {
        console.log('alive!');
        var source = $('#template-bunte').html();
        var template = Handlebars.compile(source);
        var html = template({
            headlines: headlines.slice(0,3)
        });
        if (currBunteItem.length) {
            currBunteItem.replaceWith(html);
        } else {
            $html = $(html);
            console.log($html);
            $html.hide().appendTo($feed).fadeIn(200);
            // $feed.prepend(html);
        }
    } else {
        if (currBunteItem.length) {
            currBunteItem.remove();
        }
    }
};

var updateCharCount = function (c) {
    var MAX_CHARS = 140;
    $('#curr-character-count').html(MAX_CHARS - c);
};

$(document).ready(function () {
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

    socket.on('related words', function (data) {
        console.log('we received related words: ' + data);
        var result = JSON.parse(data);
        renderRelatedWords(result);
    });

    socket.on('bunte', function (headlines) {
        renderBunteFeedItem(headlines);
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
