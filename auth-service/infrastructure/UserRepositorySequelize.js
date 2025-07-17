const sequelize = require ('./db');
const initModels = require('./UserModel');
const UserModel = initModels(sequelize);

const UserRepository = require('../domain/UserRepository');

class UserRepositorySequelize extends UserRepository {
    async findByEmail(email) {
        try {
            return await UserModel.findOne({ where: { email } });
        } catch (err) {
            throw new Error(`Failed to find user by email: ${err.message}`);
        }
    }

    async create(userData) {
        try {
            return await UserModel.create(userData);
        } catch (err) {
            throw new Error(`Failed to create user: ${err.message}`);
        }
    }
}

module.exports = new UserRepositorySequelize();