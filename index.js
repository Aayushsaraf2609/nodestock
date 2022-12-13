//Stock market portfolio app

//API KEY pk_f6cb16db118b468ca6e23acd967d2db5


const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path =require('path');
const request=require('request');
const bodyParser=require('body-parser');

const PORT = process.env.PORT || 5000;

//use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));


//create call api fn
function call_api(finishedApi,ticker){
    request('https://cloud.iexapis.com/stable/stock/'+ ticker +'/quote?token=pk_f6cb16db118b468ca6e23acd967d2db5',{json: true},(err,res,body) =>{
        if(err){return console.log(err);}
        if(res.statusCode==200){
            //console.log(body);
            finishedApi(body);
        };
    });
}
    


//Set Handlebars Milddleware
app.engine('handlebars', exphbs.engine({layoutsDir: __dirname + '/views/layouts',}));
app.set('view engine', 'handlebars');

const otherstuff="Hello there,this is raze stuff";


//set handlebar index Get route
app.get('/', function (req, res) {
    call_api(function(doneApi){
            res.render('home',{
            stock:doneApi
        });
    },"fb");
});


//call_api(function,req.body.stock_ticker)
//set handlebar index Post route
app.post('/', function (req, res) {
    call_api(function(doneApi){
        // posted_stuff=req.body.stock_ticker;
            res.render('home',{
            stock:doneApi,
            // posted_stuff:posted_stuff  check
        });
    },req.body.stock_ticker);
});


//create about page route
app.get('/about.html', function (req, res) {
    res.render('about')
});

app.use(express.static('public'));

app.listen(PORT, () => console.log('Server listening on port' + PORT));