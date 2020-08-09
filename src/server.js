// npm install express
const express = require('express');
// Express
const server = express();
// npm install nunjucks
const nunjucks = require('nunjucks');
// npm install multer
const multer = require('multer');
// importa o modulo path nativo do nodejs (eu acho)
// const path = require('path');

// Importa as funções e a constante que está no arquivo pages.js para que possam ser utilizadas nesse arquivo!
const { pageGiveClasses, pageLanding, pageStudy, uploadForm, storage } = require('./pages');
// Faz uma chamada à função!
const upload = multer({ storage });

nunjucks.configure('src/views', {
    // Configurações do nunjucks
    express: server,
    // Desativa o cache para o desenvolvimento
    noCache: true,
})
// Iniciar as configurações do servidor
server
    // Receber dados do req.body
    .use(express.urlencoded({ extended: true }))
    // Configuração dos arquivos estáticos
    .use(express.static("public/uploads"))
    .use(express.static("public"))
    // Rota para a pagina principal
    .get('/', pageLanding)
    // Rota para a pagina study.html
    .get("/study", pageStudy)
    // Rota para a pagina classes.html
    .get("/classes", pageGiveClasses)
    // Configura o upload de imagens no input type file no form
    .post('/study', upload.single("avatar-input"), uploadForm)
    // Escuta na porta 5500 ( variavel )
    .listen(5500)