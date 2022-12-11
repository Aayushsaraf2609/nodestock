const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path =require('path');

const PORT = process.env.PORT || 5000;

app.engine('handlebars', exphbs.engine({layoutsDir: __dirname + '/views/layouts',}));
app.set('view engine', 'handlebars');

const otherstuff = "hello there, this is other stuff!";

app.get('/', function (req, res) {
    res.render('home', {
        stuff: otherstuff
    });
});

app.use(express.static('public'));

app.listen(PORT, () => console.log('Server listening on port' + PORT));