const Product = require ('../domain/Product');
const ProductRepository = require('../infrastructure/ProductRepositorySequelize');

async function listProducts(){
    const product = await ProductRepository.getAll();
    return product.map(p => new Product(p));
}

async function getProductById(id) {
    const prod = await ProductRepository.getById(id);
    if (!prod) return null;
    return new Product(prod);
}

async function createProduct(data) {
    if(!data.name || !data.price) throw new Error ("Name & price are required");
    const created = await ProductRepository.create(data);
    return new Product(created);
}

module.exports = {listProducts, getProductById, createProduct};