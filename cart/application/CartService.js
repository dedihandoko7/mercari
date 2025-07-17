const CartRepository = require('../infrastructure/CartRepositorySequelize')

async function fetchProduct(productId) {
    const resp = await fetch(`http://localhost:3000/products/${productId}`);
    if(!resp.ok) throw new Error('Produk tidak ditemukan di product-service!');
    return resp.json();
}

async function getCartByUserId(userId) {
    return await CartRepository.getByUserId(userId);
}

async function addItem(userId, productId, quantity) {
    await fetchProduct(productId);
    return await CartRepository.addItem(userId, productId,quantity); 
}

async function removeItem(userId, productId) {
    return await CartRepository.removeItem(userId, productId); 
}

async function clearCart(userId) {
    return await CartRepository.clearCart(userId); 
}

module.exports = {getCartByUserId,addItem,removeItem,clearCart};