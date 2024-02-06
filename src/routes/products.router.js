const express = require("express");
const router = express.Router();

const ProductManager = require("../dao/db/product-manager-db.js");
const productManager = new ProductManager();

// rutas:

router.get("/", async (req, res) => {
    try {
        const limit = req.query.limit;
        const products = await productManager.getProducts();
        if (limit) {
            res.json(products.slice(0, limit));
        } else {
            res.json(products);
        }
    } catch (error) {

        console.error("Error al obtener productos", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
})

// retorno producto por ID:

router.get("/:pid", async (req, res) => {
    const id = req.params.pid;

    try {
        //const productManager = new ProductManager("./src/models/products.json");
        const product = await productManager.getProductById(id);
        if (!product) {
            return res.json({
                error: "Producto no encontrado"
            });
        }

        res.json(product);
    } catch (error) {
        console.error("Error al obtener el producto", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
})

// creo un nuevo producto

router.post("/", async (req, res) => {
    try {
        const newProduct = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            img: req.body.img, 
            code: req.body.code,
            stock: req.body.stock,
            category: req.body.category,
            status: req.body.status,
            thumbnails: req.body.thumbnails
        }        
        const addedProduct = await productManager.addProduct(newProduct);
        res.json(addedProduct);
    } catch (error) {
        console.error ("Error al crear un nuevo producto", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


router.put("/:pid", async (req, res) => {
    try {
        const id = req.params.pid;
        const updateProduct = {
            id: id,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            img: req.body.img, 
            code: req.body.code,
            stock: req.body.stock,
            category: req.body.category,
            status: req.body.status,
            thumbnails: req.body.thumbnails
        }        
        const updatedProduct = await productManager.updateProduct(id, updateProduct);
        res.json(updatedProduct);
    } catch (error) {
        console.error ("Error al actualizar un producto", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// elimino un producto por id

router.delete("/:pid", async (req, res) => {
    const id = req.params.pid;

    try {
        await productManager.deleteProductById(id);

        res.json({result: "Producto eliminado exitosamente"});
    } catch (error) {
        console.error("Error al eliminar el producto", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
})


module.exports = router; 