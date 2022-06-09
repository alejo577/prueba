const express = require('express');

const CategoriasService= require('./../servicios/categorias.servicios');

const servicio = new CategoriasService();

const app = express();

const router = express.Router();

app.get("/categorias/:categoriaId/productos/:productoId", (req, res) => {
  const { categoriaId, productoId } = req.params;
  res.json({
      categoriaId,
      productoId
  });
})



router.get('/', async (req, res) => {
  const categoria = await servicio.find()
   res.json(categoria);
});

//router.get('/filter', (req, res) => {
// res.send('Yo soy un filter')
//  });

router.get('/:id', async (req, res) => {
   const { id } = req.params;
   const categoria = await servicio.findOne(id);
   res.json(categoria);
});

router.post("/", async (req, res) => {
 const body = req.body;
 const newCategoria = await servicio.create(body);
 res.status(201).json(newCategoria);
});

router.patch('/:id', async (req, res) => {
 try {
   const { id } = req.params;
   const body = req.body;
   const categoria = await servicio.update(id, body);
   res.json(categoria);
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
