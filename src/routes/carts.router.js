const express = require("express");
const router = express.Router();

const CartManager = require("../dao/fs/cart-manager.js");
const cartManager =  new CartManager("./src/models/carts.json");

//1. creamos un nuevo carrito:

router.post("/carts", async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.json(newCart);
    } catch (error) {
        console.error ("Error al crear un nuevo carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


//2. listamos los productos que pertenecen a determinado carrito

router.get("/carts/:cid", async (req, res) =>{
    const cartId = parseInt(req.params.cid);

    try {
        const cart = await cartManager.getCartById(cartId);
        res.json(cart.products);
    } catch (error) {
        console.error("Error al obtener el carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

//3. Agregar productos a disintos carritos

router.post("/carts/:cid/product/:pid", async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;

    try {
        const updateCart = await cartManager.addProductToCart(cartId, productId, quantity);
        res.json(updateCart.products);
    } catch (error) {
        console.error ("Error al agregar el producto al carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


module.exports = router;