const express = require('express')
const CategoriesService = require("./../services/categoriesService")
const validatorHandler = require("./../middlewares/validator.handler")
const {createCategorySchema, updateCategorySchema, getCategorySchema} = require("./../schemas/categorySchema")
const router = express.Router();

const service = new CategoriesService()

router.get('/', async(req, res)=>{
    const categories = await service.find()
    res.json(categories)
})

router.get('/filter', (req, res)=>{
    res.send("Yo soy un filter")
})


router.get('/:id', 
 validatorHandler(getCategorySchema, 'params'),
    async(req, res, next)=>{
        try {
            const { id }= req.params;
            const user = await service.findone(id);
            res.json(user) 
        } catch (error) {
            next(error)
        }
        
    })

router.patch('/:id', 
validatorHandler(getCategorySchema, 'params'),
validatorHandler(updateCategorySchema, 'body'),
async(req, res, next)=>{
    try {
    const { id }= req.params;
    const body = req.body;
    const user = await service.update(id, body)
    res.json(user)
    } catch (error) {
        next(error)
    }
    
})

router.delete('/:id', async(req, res)=>{
    const { id }= req.params;
    const rta= await service.delete(id)
    res.json(rta)
})

router.post('/', 
validatorHandler(createCategorySchema, 'body'),
async (req, res)=>{
    const body = req.body;
    const newCategories = await service.create(body)
    res.status(201).json(newCategories)
})

module.exports = router;