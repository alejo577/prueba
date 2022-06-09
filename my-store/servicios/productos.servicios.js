const faker = require('faker');
const boom = require('@hapi/boom'); 

class ProductosService{

  constructor(){
    this.productos = [];
    this.generate();
  }

  generate(){

    const limit = 100;
    for (let index = 0; index < limit; index++) {
        this.productos.push({
          id: faker.datatype.uuid(),
            nombre: faker.commerce.productName(),
            precio: parseInt(faker.commerce.price(), 10),
            image: faker.image.imageUrl(),
            isBlock: faker.datatype.boolean(),
        });
    }
  }

  async create(data){
    const newProducto = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.productos.push(newProducto);
    return newProducto;

  }

  async find(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.productos);
      }, 5000);
    })
  }

  async findOne(id){
    const product = this.productos.find(item => item.id === id);
    if(!product){
      throw boom.notFound('product not found');
    }
    if(product.isBlock){
      throw boom.conflict('product is block');
    }
    return product;
  }

  async update(id, changes){
    const index = this.productos.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const producto = this.productos[index];
    this.productos[index] = {
      ...producto,
      ...changes
    };
    return this.productos[index];
  }

  async delete(id){
    const index = this.productos.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.productos.splice(index, 1);
    return { id };
  }

}

module.exports = ProductosService;
