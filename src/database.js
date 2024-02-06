//conexion con mongoDB

//1) instalo mongoose
const mongoose = require("mongoose");

//2) conecto a la BD
mongoose.connect("mongodb+srv://tinkiwinki:coderhouse@cluster0.mbknifv.mongodb.net/ecommerce?retryWrites=true&w=majority")
    .then(() => console.log("Conexión exitosa!"))
    .catch(() => console.log ("Error en la conexión"))


    