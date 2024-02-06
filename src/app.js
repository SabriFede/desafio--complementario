const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const socket = require("socket.io");
const PUERTO = 8080;
require ("./database.js");


const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router");

const path = require("path");

//middleware para archivos estaticos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));


//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//routing

// app.use(express.static("public"));
// app.use("/static", express.static("public"));
// app.use("/static", express.static(path.join(__dirname, ".." + "public")));

//Rutas: 
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);




//me guardo una referencia a mi servidor
const server = app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});



//Socket.io:

//creamos una instancia de socket.io pasandole como parametro el servidor:
const io = new socket.Server(server);

io.on("connection", async (socket) => {
    console.log("Nuevo cliente conectado");

    // envio el array de productos al nuevo cliente que se contecto:
    socket.emit("products", await productManager.getProducts());

    //recibo el evento "eliminarProducto"
    socket.on("deleteProduct", async (id) => {
        await productManager.deleteProductById(id);
        //enviamos el array de productos actualizado 
        io.sockets.emit("products", await productManager.getProducts());
    })
    // recibimos el evento "agregarProducto" desde el cliente
    socket.on("addProduct", async (product) => {
        await productManager.addProduct(product);
        //enviamos el array de productos actualizado 
        io.sockets.emit("products", await productManager.getProducts());
    });
})