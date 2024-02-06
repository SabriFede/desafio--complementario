// creamos una instancia de socket.io del lado del cliente ahora:
const socket = io();

// creamos una variable para guardar el usuario

let user;
const chatBox = document.getElementById("chatBox");


// Sweetalert2: es una libreria que nos permite crear alertas personalizadas

// swal: es un objeto global de la libreria que nos permite usar los metodos de la libreria
// Fire es un metodo que nos permite configurar el alerta

Swal.fire({
    title: "Identificate",
    input: "text",
    text: "Ingresa un usuario para comunicarte en el chat",
    inputValidator: (value) => {
        return !value && "Necesitas escribir un nombre para continuar"
    },
    allowOutsideclick: false,
}).then( result => {
    user = result.value;
})

chatBox.addEventListener("keyup", (event) => {
    if(event.key === "Enter") {
        //para evitar que se envien mensajes vacios:
        if(chatBox.value.trim().length > 0) {
            //trim nos permite sacar los espacios en blanco del ppio y final de un string
            //si el mensaje tiene mas de 0 caracteres, lo enviamos al servidor
            socket.emit("message", {user: user, message: chatBox.value});
            chatBox.value = "";
        }
    } 
})

socket.on("message", data => {
    let log = document.getElementById("messagesLogs");
    let messages = "";

    data.forEach( message => {
        messages = messages + `${message.user} dice: ${message.message} <br>`
    })

    log.innerHTML = messages;
})