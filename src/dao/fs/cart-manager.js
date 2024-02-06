const fs = require("fs").promises;

class CartManager {
    constructor(path) {
        this.carts = [];
        this.path = path;
        this.ultId = 0;

        // cargo los carritos almacenados en archivo
        this.loadCarts();
    }

    async loadCarts() {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            this.carts = JSON.parse(data);
            if (this.carts.length > 0) {
                // verifico si hay al menos un carrito creado:
                this.ultId = Math.max(...this.carts.map(cart => cart.id));
                // utilizo el metodo map para crear un nuevo array que solo tenga los id del carrito y con math.max obtengo el mayor
            }
        } catch (error) {
            console.error("Error al cargar los carritos desde el archivo", error);
            // si no existe el archivo, lo creo.
            await this.saveCarts();
        }
    }

    async saveCarts() {
        await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
    }

    async createCart() {
        const newCart = {
            id: ++this.ultId,
            products: []
        };

        this.carts.push(newCart);

        //guardamos el array en el archivo
        await this.saveCarts();
        return newCart;
    }

    async getCartById (cartId) {
        try {
            const cart = this.carts.find(c => c.id === cartId);

            if (!cart) {
                throw new Error (`No existe un carrito con el ID ${cartId}`);
            }

            return cart;
        } catch (error) {
            console.error("Error al obtener el carrito por ID", error);
            throw error;
        }
    }


    async addProductToCart(cartId, productId, quantity = 1) {
        const cart = await this.getCartById(cartId);
        const productFound = cart.products.find(p => p.product === productId);

        if (productFound) {
            productFound.quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        await this.saveCarts();
        return cart;
    }
}

module.exports = CartManager;