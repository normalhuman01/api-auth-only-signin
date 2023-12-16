const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("./config.js");
const cors = require("cors");
const app = express();

const user = require("./user.json");

app.use(cors());
app.set("llave", config.llave);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});

app.get("/", (req, res) => {
    res.send("hello");
});

app.post("/auth", (req, res) => {
    const matchPassword = bcrypt.compareSync(req.body.password, user.password);

    if (req.body.username === user.username && matchPassword) {
        const payload = {
            check: true,
        };
        const token = jwt.sign(payload, app.get("llave"), {
            expiresIn: 1440,
        });
        res.status(200).json({
            mensaje: "Autenticación correcta",
            token: token,
        });
    } else {
        res.status(500).json({
            mensaje: "Usuario o contraseña incorrectos",
        });
    }
});
