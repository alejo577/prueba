const faker = require('faker');

class CategoriasService{

  constructor(){
    this.categorias = [];
    this.generate();
  }

  generate(){

    const limit = 100;
    for (let index = 0; index < limit; index++) {
        this.categorias.push({
          id: faker.datatype.uuid(),
            nombre: faker.commerce.productName(),
            image: faker.image.imageUrl(),
        });
    }
  }

  async create(data){
    const newCategoria = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.categorias.push(newCategoria);
    return newCategoria;

  }

  async find(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.categorias);
      }, 5000);
    })
  }

  async findOne(id){
    return this.categorias.find(item => item.id === id);

  }

  async update(id, changes){
    const index = this.categorias.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('categoria no encontrada');
    }
    const categoria = this.categorias[index];
    this.categorias[index] = {
      ...categoria,
      ...changes
    };
    return this.categorias[index];
  }

  async delete(id){
    const index = this.categorias.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('categoria no encontrada');
    }
    this.categorias.splice(index, 1);
    return { id };
  }

}

module.exports = CategoriasService;