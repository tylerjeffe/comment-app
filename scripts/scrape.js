var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {
    request("https://www.oregonlive.com/timbers/", function(err,res, body) {
        let $ = cheerio.load(body);

        let articles = [];

        $(".river-item").each(function(i, element){

            let head= $(this).children(".river-item__headline").text().trim();
            let sum= $(this).children(".river-item__summary").text().trim();

            if (head && sum) {
                let headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                let sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
      
                let dateToAdd = { headline: headNeat, summary: sumNeat };
      
                articles.push(dateToAdd);
              }
            });
            cb(articles);
          }
        );
      };
     
module.exports = scrape;