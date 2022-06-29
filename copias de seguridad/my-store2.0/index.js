const express = require('express')

const cors = require('cors');

const routerApi = require('./routes')

const app = express();

//const port = 3000;

const port=process.env.PORT||3000;

app.use(express.json());
app.use(cors());

const {logErrors, errorHandler, boomErrorHandler} = require("./middlewares/errorHandler")
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Hola mi server en express')
})

app.get('/nueva-ruta', (req, res)=>{
    res.send('Esta es una nueva ruta')
})

routerApi(app)

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port,()=>{
    console.log('Mi port '+ port)
})

