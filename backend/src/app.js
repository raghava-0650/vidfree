import { createServer } from 'node:http';

import express from 'express';
import mongoose from 'mongoose';
import { Server } from 'socket.io';

const app = express();

const server = createServer(app);
const io = new Server(server)

app.set("port",(process.env.PORT || 8000));

app.get("/home",(req, res) =>{
    return res.json({ "hello":"world" })
})

const start = async()=>{
    const connectiondb = await mongoose.connect("mongodb+srv://admin:admin@cluster0.kl33zyc.mongodb.net/");

    console.log(`mongo connected db host: ${connectiondb.connection.host}`);
    server.listen(app.get("port"),()=>{
        console.log("listening on port 8000")
    });
}

start();