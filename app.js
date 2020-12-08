require("dotenv").config();
const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const dns = require("dns");

const app = express();
const port = 3000;

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.sendFile(__dirname + "/views/index.html"));
app.use(express.static(__dirname + "/public"));

let listUrl = [
    {
        original_url: "https://www.google.com",
        short_url: 1
    },
    {
        original_url: "https://www.freecodecamp.com",
        short_url: 2
    }
];

app.post('/api/shorturl/new', (req, res) => {
    let url = req.body.url;
    let httpRegex = /^https:\/\//;
    if (httpRegex.test(url)) {
        let rest = url.replace(httpRegex, '');
        if (rest === '') {
            res.json({ error: 'invalid url' });
        } else {
            dns.lookup(rest, (err) => {
                if (err) {
                    res.json({ error: 'invalid url' });
                } else {
                    if (listUrl.filter(li => li.original_url === url).length == 0) {
                        listUrl.push({
                            original_url: url,
                            short_url: listUrl.length + 1
                        })
                        res.json(listUrl.filter(li => li.original_url === url)[0])
                    } else {
                        res.json(listUrl.filter(li => li.original_url === url)[0])
                    }
                }
            })
        }
    } else {
        res.json({ error: 'invalid url' });
    }
})

app.get('/api/shorturl/:short_url', (req, res) => {
    let nonNumberRegex = /\D/g;
    if (nonNumberRegex.test(req.params.short_url)) {
        res.json({ error: "Wrong format" })
    } else {
        if (listUrl.filter(li => li.short_url == req.params.short_url).length == 0) {
            res.json({ error: "No short URL found for the given input" })
        } else {
            res.redirect(listUrl.filter(li => li.short_url == req.params.short_url)[0].original_url)
        }
    }
})

app.listen(port, () => {
    console.log('Your app is listening on port ' + port);
})