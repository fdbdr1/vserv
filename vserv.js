const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8083;

const app = express();
app.use(bodyParser.json());
app.set({'json escape': true});

let values = new Array();

// app.post('', (req, res) => {
//     console.log(Math.floor(new Date().getTime()) + " [POST] " + req.url + "\t" + JSON.stringify(req.body));
// });

app.post('/add', (req, res) => {
    console.log(Math.floor(new Date().getTime()) + " [POST] " + req.url + "\t" + JSON.stringify(req.body));

    let newValue= req.body;

    // check if value with for this content already exists
    let indexOfContentIdLocaleValue = values.findIndex(value => value.id === newValue.id);

    // if value doesn't exist, add it
    if(indexOfContentIdLocaleValue < 0){
        values.push(newValue);
        console.log(Math.floor(new Date().getTime()) + " new Value added: " + newValue.id);
    }
    res.send(values);
});

app.post('/get', (req, res) => {
    console.log(Math.floor(new Date().getTime()) + " [POST] " + req.url + "\t" + JSON.stringify(req.body));

    let searchValue = req.body;

    if (searchValue.id){
        let indexOfContentIdLocaleValue = values.findIndex(value => value.id === searchValue.id);

        if (indexOfContentIdLocaleValue < 0){
            res.send("Value with id: " + searchValue.id + " not found.");
        }
        else {
            res.send(values[indexOfContentIdLocaleValue]);
        }
    }
    else if(searchValue.contentId){
        res.send(values.filter(value => value.contentId === searchValue.contentId));
    }
});

app.listen(PORT, () => {console.log(Math.floor(new Date().getTime()) + ` listening on port ${PORT}...`)});