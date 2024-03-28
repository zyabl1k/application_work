import express from "express";
import {config} from "dotenv";
import {ApplicationController} from "./controllers/application.controller.js";

async function bootstrap() {
    const app = await express();
    config();
    const PORT = parseInt(process.env.PORT) || 5000;

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        next();
    });

    app.use(express.json())
    app.use('/', new ApplicationController())

    await app.listen(PORT, (error) => {
        if (error) return console.log(`Error: ${error}`);
        console.log(`\x1b[34m[User Server] \x1b[32mСервер запущен на порту: \x1b[33m${PORT}\x1b[0m`);
    });
}

bootstrap().catch(err => console.error(err))
