const faker = require('faker')
const boom = require('@hapi/boom')

class UsersService {
    constructor(){
        this.users = [];
        this.generate();
    }

    generate(){
    const limit = 100;
    for (let i = 0; i < limit; i++) {
        this.users.push({
            id: faker.datatype.uuid(),
            name: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            phone: faker.phone.phoneNumber(),
            isBlock: faker.datatype.boolean(),
        })
        
    }
    }

    async create(data){
        const newUser = {
            id: faker.datatype.uuid(),
            ...data
        }
        this.users.push(newUser)
        return newUser;
    }

    find(){
        return new Promise((resolve, reject)=>{
            setTimeout(() => {
                resolve(this.users);
            }, 5000);
        })
    }

    async findone(id){
        const user = this.users.find(item => item.id===id)
        if(!user){
           throw boom.notFound('user not found');
        }
        if(user.isBlock){
            throw boom.conflict('user is block')
        }
        return user;
    }

    async update(id, changes){
        const index = this.users.findIndex(item=>item.id===id )
        if(index === -1){
            throw boom.notFound('User not found');
        }
        const user = this.users[index]
        this.users[index] = {
            ...user,
            ...changes
        }
        return this.users[index]
    }

    async delete(id){
        const index = this.users.findIndex(item=>item.id===id )
        if(index === -1){
            throw boom.notFound('user not found');
        }
        this.users.splice(index, 1);
        return { id };
    }
}

module.exports = UsersService