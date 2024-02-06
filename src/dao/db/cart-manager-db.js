const CartModel = require("../models/cart.model.js");

class CartManager {
    async createCart() {
        try{
            const newCart = new CartModel({products: []});
            await newCart.save();
            return newCart;

        } catch (error) {
            console.log("Error al crear el nuevo carrito de compras");
        }
    }

    async getCartById(cartId) {
        try {
            const cart = await CartModel.findById(cartId);
            if(!cart) {
                console.log("No existe ningun carrito con ese ID");
                return null;
            }
            
            return cart;

        } catch (error) {
            console.log("Error al obtener el carrito por ID, error")

        }
    }


    async addProductToCart(cartId, productId, quantity = 1) {
        try {
            const cart = await this.getCartById(cartId);
            const productExists = cart.products.find(item => item.product.toString() === productId);

            if(productExists) {
                productExists.quantity += quantity;
            } else {
                cart.products.push({product: productId, quantity});
            }

            cart.markModified("products");

            await cart.save();
            return cart;
            

        } catch (error) {
            console.log("Error al agregar un producto", error);
        }
    }
}


module.exports = CartManager;