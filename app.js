require("dotenv").config();

// Importa o express e atribui a variável
const express = require('express');

// Inicializando o express
const app = express();

// Porta que irá rodar o Servidor
const port = 3000;

// Pacote para salvar aquivos no lado do cliente "no navegador do usuário"
const cookieParser = require('cookie-parser');

// Pacote utilizado para sobrescrever com PUT/DELETE o methode GET/POST no formulário
const methodOverride = require('method-override');

// Pacote utilizado para armazenar informações de maneira segura no servidor durante a visita do usuário ao site
const session = require('express-session');

// Atribui conteúdo do Route a variável
const administratorRoute = require('./src/routes/administratorPanelRoute');
const productRoute = require('./src/routes/productRoute');
const indexRoute = require('./src/routes/indexRoute');
const userRoute = require('./src/routes/userRoute');
const categoryRoute = require('./src/routes/categoryRoute');
const orderRoute = require('./src/routes/orderRoute');
const authRoute = require('./src/routes/authRoute');
const sobreNosRoute = require('./src/routes/sobreNosRoute');



// Metodo utilizado para sobrescrever com PUT/DELETE o methode GET/POST no formulário
app.use(methodOverride('_method'));

// Configuração para acessar externamente conteúdo de uma pasta
app.use(express.static(__dirname + "/public"));

// Altera confugiração inicial do express para do template engine para ejs
app.set('view engine', 'ejs');

// Configurando a frase para criptografia e mudar algumas configurações como essas informações seram salvas
app.use(session({
    secret: 'secretidhere',
    resave: true,
    saveUninitialized: true,
}));

app.use(cookieParser());

// ALtera configuração inicial do express do caminho do views para o nosso caminho de arquivos
app.set('views', __dirname + '/src/views');

// Converte o "body" da requisição para json (objeto)
app.use(express.json());

//Middleware global
app.use((req, res, next) => {
    next();
});

// Pegar o conteúdo do body das requisições e deixar organizado pra gente trabalhar mais fácil esses dados
app.use(express.urlencoded({ extended: false }));


//localhost:3000/administrator/
app.use('/administrator', administratorRoute);
//localhost:3000/user/
app.use('/user', userRoute);
//localhost:3000/product/
app.use('/product', productRoute);
//localhost:3000/category/
app.use('/category', categoryRoute);
//localhost:3000/order/
app.use('/order', orderRoute);
//localhost:3000/
app.use('/', authRoute);
//localhost:3000/
app.use('/', indexRoute);

app.use('/sobrenos', sobreNosRoute);

// Rota de erros 404
app.use((req, res, next) => {
    return res.status(404).render('not-found', { title: "Error", message: "Página não encontrada" });
});

// Roda o express na porta definida
app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});