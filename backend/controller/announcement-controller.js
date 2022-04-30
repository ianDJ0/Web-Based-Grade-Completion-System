const axios = require('axios');
const uuid = require("uuid");
const cheerio = require('cheerio');

const url = 'https://bulsu.edu.ph/announcements/'

const allAnnouncement = async (req, res)=>{
    let html;
    let item = [];
    axios(url)
        .then(response=>{
            html = response.data;
            const $ = cheerio.load(html);
            $('.col-md-12 > div > a', html).each(function(){
                const scrapeId = uuid.v4();
                const scrapeTitle = $(this).find('.announcement-title').text();
                const scrapeDate = $(this).find('.announcement-date').text();
                const scrapeURL = url.substring(0,20) +$(this).attr('href');
                item.push({
                        scrapeId,
                        scrapeTitle,
                        scrapeDate,
                        scrapeURL
                    })
            })
            return res.json(item);
        }).catch(err=>{
            return res.json(err);
        })
}


exports.allAnnouncement = allAnnouncement; 