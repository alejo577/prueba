const express = require('express');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');


// const faker = require('faker');
const app = express();
const port = 3000;

app.use(express.json());


 app.get('/',(req, res) =>{
    res.send('Hola mi server en express');
});

app.get('/nueva-ruta',(req, res) =>{
       res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(errorHandler);
app.use(boomErrorHandler);

app.listen(port, () => {
     console.log('Mi port' + port);
});
