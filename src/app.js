import express from "express";
import http from 'http'
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js'
import handlebars from "express-handlebars";
import __dirname from './utils.js';
import { Server } from "socket.io";


const app = express();
const server = http.createServer(app)
const io = new Server(server)

app.engine('handlebars', handlebars.engine())

app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.json());  
app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'))

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter)

// io es el socket server
io.on('connection', socket => {
    console.log('nuevo cliente conectado');

    socket.on('message', data => {
        console.log(data)
    })

    socket.emit('evento_para_socket_individual', 'este mensaje solo lo debe recibir el socket');
    socket.broadcast.emit('evento_para_todos_menos_el_socket_actual', 'este evento lo veran todos los sockets menos el del cual se envio el msj');
    io.emit('evento_para_todos', 'este msj lo reciben todos los sockets conectados');
});





const port = 8080;

server.listen(port, ()=> {
    console.log('servidor corriendo');
});