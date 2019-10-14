const express = require('express');
const expressLiquid = require('express-liquid');
const bodyParser = require('body-parser')

const helpers = require('./web3');
const app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

const options = {
    traceError: true
};
app.set('view engine', 'liquid');
app.engine('liquid', expressLiquid(options));
app.use(expressLiquid.middleware);
app.set('views', './');


app.get('/', async (req, res) => {
    const data = {};
    data.projects = await helpers.getAllProjects();
    res.render('index', data);
});

app.get('/add', async (req, res) => {
    const data = {};
    data.projects = await helpers.getAllProjects();
    res.render('add', data);
});

app.post('/add', async (req, res) => {
    await helpers.createNewProject(req.body);
    res.redirect('/');
});

app.post('/', async (req, res) => {
    await helpers.donate(req.body);
    res.redirect('/');
});

app.use('/public', express.static('public'))


app.listen(8081);