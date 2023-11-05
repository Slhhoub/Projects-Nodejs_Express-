const express=require('express');
const exphbs = require('express-handlebars');
const bodyParder=require('body-parser');
const mysql=require('mysql');
const bodyParser = require('body-parser');

require('dotenv').config();

const app=express();
const port=process.env.port || 5000;

//Parsing middleware
//Parse application/x-www-form-urlencoded
app.use(bodyParder.urlencoded({extended:false}));
// Parse application / json 
app.use(bodyParser.json());
// static files
app.use(express.static('public'));
// Templating Engine
app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "main"}));
app.set('view engine','hbs');


const routes=require('./server/routes/user');
app.use('/',routes);

app.listen(port,()=>{
    console.log(`listening on port ${port} a http://localhost:${port}`);
})