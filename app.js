const express = require("express");
const app = express();
const port = 3000;
const methodOverride = require("method-override");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const homeRoute = require("./src/routes/homeRoute");
const usuarioPainelRoute = require("./src/routes/usuarioPainelRoute");
const produtoRoute = require("./src/routes/produtoRoute");
const finalizarCompraRoute = require("./src/routes/finalizarCompraRoute");
const compraFinalizadaRoute = require("./src/routes/compraFinalizadaRoute");
const usuarioRoute = require("./src/routes/usuarioRoute.js");
const loginRoute = require("./src/routes/loginRoute");


// Configura o methodOverride no express
// methodOverride = Pacote que transforma um método http em outro
// Ex: POST => PUT
app.use(methodOverride("_method"));
// Converter corpo da requisição (body) em objeto literal
app.use(express.json());
// Converte requisição para formato que o json aceita
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({
  secret: "senha",
  resave: true,
  saveUninitialized: true,
}));

// Configura pasta estática para acesso externo
app.use(express.static(path.join(__dirname, "public")));
// Configura o template engine, troca do padrão (jade) para ejs
app.set("view engine", "ejs");
// Configura o caminho para os views, troca o padrão que é no raiz para o src
app.set("views", path.join(__dirname, "src", "views"));


app.use("/", homeRoute);

app.use("/usuarioPainel", usuarioPainelRoute);

app.use("/produto", produtoRoute);

app.use("/finalizarCompra", finalizarCompraRoute);

app.use("/compraFinalizada", compraFinalizadaRoute);

app.use("/usuario", usuarioRoute);

app.use("/login", loginRoute);

// Inicia o servidor
app.listen(port, () => {
  console.log("Estamos rodando em: http://localhost:" + port);
});