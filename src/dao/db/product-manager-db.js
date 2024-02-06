const ProductModel = require("../models/product.model.js");

class ProductManager {

    async addProduct(newObject) {
        let { title, description, price, img, code, stock, category, status, thumbnails } = newObject;

        try {

            if (!title || !description || !price || !img || !code || !stock || !category) {
                console.log("Todos los datos son obligatorios, por favor completar todos los campos")
                return;
            }

            const productExists = await ProductModel.findOne({ code: code });

            if (productExists) {
                console.log("El codigo debe ser unico");
                return;
            }

            const newProduct = new ProductModel({
                title,
                description,
                price,
                img,
                code,
                stock,
                category,
                status: true,
                thumbnails: thumbnails || []
            });

            await newProduct.save();

        } catch (error) {
            console.log("Error al agregar el producto", error);
            throw error;
        }
    }

    async getProducts() {
        try {
            const products = await ProductModel.find();
            return products
        } catch (error) {
            console.log("Error al obtener los productos", error);

        }
    }

    async getProductById(id) {
        try {
            const product = await ProductModel.findById(id);

            if (!product) {
                console.log("Producto no encontrado");
                return null;
            }

            console.log("Producto encontrado");
            return product;

        } catch (error) {
            console.log("Error al obtener un producto por ID");
        }
    }
    async updateProduct(id, productUpdated) {
        try {

            const updated = await ProductModel.findByIdAndUpdate(id, productUpdated);

            if (!updated) {
                console.log("No se encuentra el producto");
                return null;
            }

            console.log("Producto actualizado con exito");
            return updated;

        } catch (error) {
            console.log("Error al actualizar el producto", error);
        }
    }

    async deleteProductById(id) {
        try {
           const deleted = await ProductModel.findByIdAndDelete(id);

            if(!deleted) {
                console.log("No se encontro");
                return null;
            }
            console.log("Producto eliminado correctamente");
        } catch (error) {
            console.log("Error al eliminar el producto", error);
            throw error;
        }
    }
}

module.exports = ProductManager;