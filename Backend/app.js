//importing express
const express = require('express');
//morgan is a logging package for node (getting information in terminal)
const morgan = require('morgan');
//importing body-parser
const bodyParser = require('body-parser');
//need request library
var request = require('request');

const app = express();

app.use(morgan('dev')); // logger middleware (document information in terminal about server actions)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Handling CORS Error
app.use((req, res, next) => {
    // adding headers to response
    // '*' gives access to any origin
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//.....Testing the working of the Server.........
//app.get('/', (req, res) => res.send('Server Working !'));

app.get("/getTrending", (req, res) => {

    request("https://api.stocktwits.com/api/2/streams/trending.json",
        function (error, response, body) {
            if (!error && response.statusCode == 200) {

                //getting trending information from api
                var parsedBody = JSON.parse(body);
                //return body
                res.send({ parsedBody });

            }
        }
    );

});


//Handling error  
app.use((req, res, next) => {
    const error = new Error('Not Found');
    res.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports = app;