const { response } = require('express');
const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/api/quotes/random', (req, res, next) => {
    const quote = getRandomElement(quotes);
    const response = {
        quote: quote
    };
    res.send(response);
});

app.get('/api/quotes', (req, res, next) => {
    let response;
    if (req.query.person) {
        let personQuotes = [];
        for (let x = 0; x < quotes.length; x++) {
            if (quotes[x].person === req.query.person) {
                personQuotes.push(quotes[x]);
            }
        }
        if (personQuotes.length > 0) {
            response = {
                quotes: personQuotes
            };
        } else {
            response = {
                quotes: []
            }
        }
    } else {
        response = {
            quotes: quotes
        };
    }
    res.send(response);
});

app.post('/api/quotes', (req, res, next) => {
    if (req.query.quote && req.query.person) {
        const newQuote = {
            quote: req.query.quote,
            person: req.query.person
        };
        quotes.push.newQuote;
        let response = {
            quote: newQuote
        };
        res.send(response);
    } else {
        res.status(400).send();
    }
});
