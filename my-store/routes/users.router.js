const express = require('express');
const app = express();

const UsuariosService= require('./../servicios/usuarios.servicios');

const router = express.Router();
const servicio = new UsuariosService();


app.get('/users', (req, res) =>{
  const { limit, offset} = req.query;
  if (limit && offset) {
      res.json({
          limit,
          offset
      });
  } else {
      res.send('No hay parametros')
  }
});


router.get('/', async (req, res) => {
    const usuarios = await servicio.find()
     res.json(usuarios);
 });
 
 //router.get('/filter', (req, res) => {
 // res.send('Yo soy un filter')
 //  });
 
 router.get('/:id', async (req, res) => {
     const { id } = req.params;
     const usuario = await servicio.findOne(id);
     res.json(usuario);
 });
 
 router.post("/", async (req, res) => {
   const body = req.body;
   const newUsuario = await servicio.create(body);
   res.status(201).json(newUsuario);
 });
 
 router.patch('/:id', async (req, res) => {
   try {
     const { id } = req.params;
     const body = req.body;
     const usuario = await servicio.update(id, body);
     res.json(usuario);
  } catch (error) {
     res.status(404).json({
       message: error.message
    });
 }
 
 });
 
 router.delete('/:id', async (req, res) => {
   const { id } = req.params;
   const rta = await servicio.delete(id);
   res.json(rta);
 });
 
 
 
 module.exports = router;

