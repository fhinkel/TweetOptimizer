var should = require('should');
var expect = require('expect');
var crawler = require('../src/dataCrawler');

describe('tweet', function () {

    var expectedResponse =
        "[{\"confidence\": -2.2204460492503131e-16, \"tag\": \"#burda\", \"ratio\": \"NA\"}, {\"confidence\": 0.12738455121263037, \"tag\": \"mai\", \"ratio\": \"NA\"}, {\"confidence\": 0.18108177090888677, \"tag\": \"#patterns\", \"ratio\": \"NA\"}, {\"confidence\": 0.22269087003944132, \"tag\": \"#sewing\", \"ratio\": \"NA\"}, {\"confidence\": 0.23506182194961833, \"tag\": \"#beautifulhousestyle\\u2026\", \"ratio\": \"NA\"}, {\"confidence\": 0.2357918253879755, \"tag\": \"tobias\", \"ratio\": \"NA\"}, {\"confidence\": 0.24113485546354774, \"tag\": \"#look\", \"ratio\": \"NA\"}, {\"confidence\": 0.24191322079595601, \"tag\": \"#summer\", \"ratio\": \"NA\"}, {\"confidence\": 0.2447118036721686, \"tag\": \"#ootd\", \"ratio\": \"NA\"}, {\"confidence\": 0.24491775609001143, \"tag\": \"#hm\", \"ratio\": \"NA\"}, {\"confidence\": 0.25006861314399287, \"tag\": \"grunge\", \"ratio\": \"NA\"}, {\"confidence\": 0.25010669370565464, \"tag\": \"#mensfashion\", \"ratio\": \"NA\"}, {\"confidence\": 0.25142933508921994, \"tag\": \"#christmas\", \"ratio\": \"NA\"}, {\"confidence\": 0.25189694570701504, \"tag\": \"@simplymrt\", \"ratio\": \"NA\"}, {\"confidence\": 0.25353351731196894, \"tag\": \"#tribal\", \"ratio\": \"NA\"}, {\"confidence\": 0.25640538595952389, \"tag\": \"#aviator\", \"ratio\": \"NA\"}, {\"confidence\": 0.25644015159315869, \"tag\": \"#ocean\", \"ratio\": \"NA\"}, {\"confidence\": 0.25692376306627107, \"tag\": \"#nofucksgiven\", \"ratio\": \"NA\"}, {\"confidence\": 0.25817095828157455, \"tag\": \"#alsop\", \"ratio\": \"NA\"}, {\"confidence\": 0.26038934329324215, \"tag\": \"#lacoste\", \"ratio\": \"NA\"}, {\"confidence\": 0.26394841625255516, \"tag\": \"bewerte\", \"ratio\": \"NA\"}, {\"confidence\": 0.26430944557835923, \"tag\": \"#sailing\", \"ratio\": \"NA\"}, {\"confidence\": 0.26444178781617267, \"tag\": \"#fantastic\", \"ratio\": \"NA\"}, {\"confidence\": 0.26455759239229992, \"tag\": \"#collection\", \"ratio\": \"NA\"}, {\"confidence\": 0.26476088615089244, \"tag\": \"#instabaku\", \"ratio\": \"NA\"}, {\"confidence\": 0.26487774297481337, \"tag\": \"#streetstyle\", \"ratio\": \"NA\"}, {\"confidence\": 0.26553019764792896, \"tag\": \"#baku\", \"ratio\": \"NA\"}, {\"confidence\": 0.26637818044315142, \"tag\": \"#bling\", \"ratio\": \"NA\"}, {\"confidence\": 0.26719793898446709, \"tag\": \"#cat#wintermode\", \"ratio\": \"NA\"}, {\"confidence\": 0.26754837042723534, \"tag\": \"#menswear\", \"ratio\": \"NA\"}, {\"confidence\": 0.26760579817877772, \"tag\": \"#polyvore\", \"ratio\": \"NA\"}, {\"confidence\": 0.26852211709813678, \"tag\": \"wechat/lineyurish812\", \"ratio\": \"NA\"}, {\"confidence\": 0.26889743672124578, \"tag\": \"#antique\", \"ratio\": \"NA\"}, {\"confidence\": 0.2694330304323509, \"tag\": \"#boss\", \"ratio\": \"NA\"}, {\"confidence\": 0.26945661516251551, \"tag\": \"#beautiful\", \"ratio\": \"NA\"}, {\"confidence\": 0.27027458017284411, \"tag\": \"#foodporn\", \"ratio\": \"NA\"}, {\"confidence\": 0.27050063549359571, \"tag\": \"#airmax\", \"ratio\": \"NA\"}, {\"confidence\": 0.27121943094087053, \"tag\": \"#shoping\", \"ratio\": \"NA\"}, {\"confidence\": 0.27228395579898568, \"tag\": \"#bohemian\", \"ratio\": \"NA\"}, {\"confidence\": 0.27339390515317619, \"tag\": \"grossartiges\", \"ratio\": \"NA\"}, {\"confidence\": 0.27357069649983956, \"tag\": \"#etsyretwt\", \"ratio\": \"NA\"}, {\"confidence\": 0.27414778944757823, \"tag\": \"#inlove\", \"ratio\": \"NA\"}, {\"confidence\": 0.27421435642298353, \"tag\": \"#stil\", \"ratio\": \"NA\"}, {\"confidence\": 0.27425259074120378, \"tag\": \"#morning\", \"ratio\": \"NA\"}, {\"confidence\": 0.27499961417290297, \"tag\": \"#clothing\", \"ratio\": \"NA\"}, {\"confidence\": 0.27524473527383286, \"tag\": \"#casual\", \"ratio\": \"NA\"}, {\"confidence\": 0.27533787324424763, \"tag\": \"#boho\", \"ratio\": \"NA\"}, {\"confidence\": 0.27738949167208038, \"tag\": \"#shirt\", \"ratio\": \"NA\"}, {\"confidence\": 0.27769090458606405, \"tag\": \"#brandedbag\", \"ratio\": \"NA\"}, {\"confidence\": 0.27864569239083259, \"tag\": \"#giorgioarmani\", \"ratio\": \"NA\"}, {\"confidence\": 0.27936032346787576, \"tag\": \"#newbrand\", \"ratio\": \"NA\"}, {\"confidence\": 0.27975533961411714, \"tag\": \"#glamour\", \"ratio\": \"NA\"}, {\"confidence\": 0.28026352112372799, \"tag\": \"#girl\", \"ratio\": \"NA\"}, {\"confidence\": 0.2802776129772353, \"tag\": \"#gatsby\", \"ratio\": \"NA\"}, {\"confidence\": 0.28032167566581134, \"tag\": \"#sparkle\", \"ratio\": \"NA\"}, {\"confidence\": 0.28105154394012799, \"tag\": \"#ootd#falloutfit\", \"ratio\": \"NA\"}, {\"confidence\": 0.28123481801691252, \"tag\": \"#michael#michaelkors\", \"ratio\": \"NA\"}, {\"confidence\": 0.2834715348212653, \"tag\": \"#woman\", \"ratio\": \"NA\"}, {\"confidence\": 0.28347828097744576, \"tag\": \"#konya\", \"ratio\": \"NA\"}, {\"confidence\": 0.28359064592129568, \"tag\": \"#ask\", \"ratio\": \"NA\"}, {\"confidence\": 0.28382143392570647, \"tag\": \"#jeans\", \"ratio\": \"NA\"}, {\"confidence\": 0.28446622849858316, \"tag\": \"#amazing\", \"ratio\": \"NA\"}, {\"confidence\": 0.28528440867846261, \"tag\": \"#ebay\", \"ratio\": \"NA\"}, {\"confidence\": 0.28539780126714009, \"tag\": \"#chef\", \"ratio\": \"NA\"}, {\"confidence\": 0.28592211941537626, \"tag\": \"#ux\", \"ratio\": \"NA\"}, {\"confidence\": 0.28693147211205339, \"tag\": \"#ibiza\", \"ratio\": \"NA\"}, {\"confidence\": 0.28773924505049808, \"tag\": \"#accessory\", \"ratio\": \"NA\"}, {\"confidence\": 0.28825318539517841, \"tag\": \"#classic\", \"ratio\": \"NA\"}, {\"confidence\": 0.28831077957073314, \"tag\": \"#me\\u2026\", \"ratio\": \"NA\"}, {\"confidence\": 0.28876747578729589, \"tag\": \"#moda\", \"ratio\": \"NA\"}, {\"confidence\": 0.28896415369656603, \"tag\": \"#mango\", \"ratio\": \"NA\"}, {\"confidence\": 0.28924701165498956, \"tag\": \"#dress\", \"ratio\": \"NA\"}, {\"confidence\": 0.28986469871342524, \"tag\": \"+62811605252\", \"ratio\": \"NA\"}, {\"confidence\": 0.29000326784255193, \"tag\": \"#promomyshop\", \"ratio\": \"NA\"}, {\"confidence\": 0.29041469199234027, \"tag\": \"#we\", \"ratio\": \"NA\"}, {\"confidence\": 0.29041824268538852, \"tag\": \"#tarz#legend\", \"ratio\": \"NA\"}, {\"confidence\": 0.29107940811776123, \"tag\": \"#rockabilly\", \"ratio\": \"NA\"}, {\"confidence\": 0.29147727448895244, \"tag\": \"#instaaz\", \"ratio\": \"NA\"}, {\"confidence\": 0.2916073009163449, \"tag\": \"#gifts\", \"ratio\": \"NA\"}, {\"confidence\": 0.29313429536253477, \"tag\": \"#modernsisters\", \"ratio\": \"NA\"}, {\"confidence\": 0.29331549049011707, \"tag\": \"shoppe\", \"ratio\": \"NA\"}, {\"confidence\": 0.29378695471706562, \"tag\": \"#fashion\\u2026\", \"ratio\": \"NA\"}, {\"confidence\": 0.29419358403126183, \"tag\": \"#cool\", \"ratio\": \"NA\"}, {\"confidence\": 0.29430297168052832, \"tag\": \"#outfit\", \"ratio\": \"NA\"}, {\"confidence\": 0.29440755667041407, \"tag\": \"#porn\", \"ratio\": \"NA\"}, {\"confidence\": 0.29450619165691228, \"tag\": \"#style\", \"ratio\": \"NA\"}, {\"confidence\": 0.29537511969850738, \"tag\": \"#chic\", \"ratio\": \"NA\"}, {\"confidence\": 0.29712367291825259, \"tag\": \"#etsylove\", \"ratio\": \"NA\"}, {\"confidence\": 0.29720290885859635, \"tag\": \"#xxx\", \"ratio\": \"NA\"}, {\"confidence\": 0.29732848055795946, \"tag\": \"#ooak\", \"ratio\": \"NA\"}, {\"confidence\": 0.29734654621726297, \"tag\": \"@\\u2026\", \"ratio\": \"NA\"}, {\"confidence\": 0.29818945150821818, \"tag\": \"#tee\", \"ratio\": \"NA\"}, {\"confidence\": 0.29823863569966991, \"tag\": \"#men\", \"ratio\": \"NA\"}, {\"confidence\": 0.29900793415584714, \"tag\": \"#smile\", \"ratio\": \"NA\"}, {\"confidence\": 0.2996841519630028, \"tag\": \"#pinup\", \"ratio\": \"NA\"}, {\"confidence\": 0.29968816396456144, \"tag\": \"'camp\", \"ratio\": \"NA\"}, {\"confidence\": 0.30066591706995494, \"tag\": \"#celebritynews\", \"ratio\": \"NA\"}, {\"confidence\": 0.30086079227861107, \"tag\": \"#inspiration\", \"ratio\": \"NA\"}, {\"confidence\": 0.30086219150202942, \"tag\": \"#coffee\", \"ratio\": \"NA\"}, {\"confidence\": 0.30091379990653166, \"tag\": \"#myw\", \"ratio\": \"NA\"}]";
    it('should send a request do data crawler and return full data', function (next) {
        var postData = JSON.stringify({"term": "#burda"});
        crawler.sendRequest(postData, '/relatedWords', function (response) {
            response.toString()
                .should.be.equal(expectedResponse);
            next();
        });
    });

    var expectedResponseForUsers =
        "[{\"confidence\": 0.25189694570701504, \"tag\": \"@simplymrt\", \"ratio\": \"NA\"}, {\"confidence\": 0.29734654621726297, \"tag\": \"@\\u2026\", \"ratio\": \"NA\"}]";
    it('should send a request do data crawler for users and return full data', function (next) {
        var postData = JSON.stringify({"term": "#burda"});
        crawler.sendRequest(postData, '/relatedUsers', function (response) {
            response.toString()
                .should.be.equal(expectedResponseForUsers);
            next();
        });
    });

    it('should return the first 3 related hash tags from the real response', function (next) {
        crawler.relatedTags("#burda", function (error, response) {
            JSON.stringify(response[0])
                .should.containEql("{\"confidence\":");
            next()
        });
    });

    it('should return the first 3 related hash tags from given data', function (next) {
        crawler.filterFirstThreeResults(expectedResponse, 3, function (error, response) {
            JSON.stringify(response[0])
                .should.be.equal("{\"confidence\":-2.220446049250313e-16,\"tag\":\"#burda\",\"ratio\":\"NA\"}");
            next()
        });
    });
});
