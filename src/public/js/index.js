// creamos una instancia de socket.io del lado del cliente ahora:
const socket = io();

socket.on("products", (data) => {
    renderProducts(data);
});

//Funcion para renderizar la tabla de productos
const renderProducts = (products) => {
    const productsContainer = document.getElementById("productsContainer");
    productsContainer.innerHTML = "";

    products.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");
        // agrego boton para eliminar:
        card.innerHTML = `
        <p> Id ${item.id} </p>
        <p> Titulo ${item.title} </p>
        <p> Precio ${item.price} </p>
        <button> Eliminar Producto </button>
        `;
        productsContainer.appendChild(card);

        card.querySelector("button").addEventListener("click", () => {
            deleteProduct(item.id);
        });
    });
}

// eliminar producto:
const deleteProduct = (id) => {
    socket.emit("deleteProduct", id);
}

// Agregar poroducto
document.getElementById("btnEnviar").addEventListener("click", () => {
    addProduct();
});

const addProduct = () => {
    const product = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        img: document.getElementById("img").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
        category: document.getElementById("category").value,
        status: document.getElementById("status").value === "true"
    };

    socket.emit("addProduct", product);
};