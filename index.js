require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const PORT = process.env.APP_PORT || 3000;

const app = express();

const router = require("./router/index");
const errorHandler = require("./middleware/errorHandler");


app.use(morgan("dev"));
app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(express.json());

// app.use("/api", router);
app.use(errorHandler);

const start = async () => {
    const startServ = Date.now();
    try {
        app.listen(PORT, () => {
            const ms = Date.now() - startServ;
            const mb = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);

            console.log(
                'SERVER running at http://localhost:' +
                PORT +
                '\nStarting up app: ' +
                ms +
                'ms, used: ' +
                mb +
                ' MB'
            );
        });
    } catch (e) {
        console.log(e);
    }
};

start().then(r => r);

