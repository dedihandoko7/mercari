class CartRepository{
    getUserById(userId){throw new Error('Not Implemented');}
    addItem(userId, productId, quantity){throw new Error('Not Implemented');}
    removeItem(userId, productId){throw new Error('Not Implemented');}
    clearCart(userId){throw new Error('Not Implemented');}
}
module.exports = CartRepository;