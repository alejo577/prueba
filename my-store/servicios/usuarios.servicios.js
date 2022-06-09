const faker = require('faker');

class UsuariosService{

  constructor(){
    this.usuarios = [];
    this.generate();
  }

  generate(){

    const limit = 100;
    for (let index = 0; index < limit; index++) {
        this.usuarios.push({
          id: faker.datatype.uuid(),
            nombre: faker.commerce.productName(),
            apellido: faker.commerce.productName()
        });
    }
  }

  async create(data){
    const newUsuario = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.usuarios.push(newUsuario);
    return newUsuario;

  }

  async find(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.usuarios);
      }, 5000);
    })
  }

  async findOne(id){
    return this.usuarios.find(item => item.id === id);

  }

  async update(id, changes){
    const index = this.usuarios.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('usuario no encontrado');
    }
    const usuario = this.usuarios[index];
    this.usuarios[index] = {
      ...usuario,
      ...changes
    };
    return this.usuarios[index];
  }

  async delete(id){
    const index = this.usuarios.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('usuario no encontrado');
    }
    this.usuarios.splice(index, 1);
    return { id };
  }

}

module.exports = UsuariosService;
